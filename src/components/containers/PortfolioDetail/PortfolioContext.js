import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { errorHandler } from '@utils';
import api from '../../../api';
import {
  getStackFundNetHistory,
  getStackFundStatistics,
  stackFunds,
  stackSameFundPurchases,
  getStackFundPieces,
} from '../../../utils/stackPurchases';
import { comparisonService, portfolioService } from '@services';
import { useStickyState } from '@hooks';
import moment from 'moment';
import { notification } from 'antd';

const worker = new window.Worker('./comparison-worker.js');

export const PortfolioContext = React.createContext();

export const usePortfolio = () => {
  return useContext(PortfolioContext);
};

const defaultTableColumns = [
  { value: 'code', label: 'KOD', active: true, disabled: true },
  { value: 'title', label: 'FON', active: true },
  { value: 'date', label: 'ALIŞ/TARİH', active: true },
  { value: 'daily', label: '1 GÜN', active: false },
  { value: 'weekly', label: '1 HAFTA', active: false },
  { value: 'monthly', label: '1 AY', active: true },
  { value: 'yearly', label: '1 YIL', active: true },
  { value: 'allTime', label: 'TÜMÜ', active: true },
  { value: 'pieces', label: 'ADET', active: false },
  { value: 'boughtValue', label: 'MALİYET', active: true },
  { value: 'gain', label: 'KAZANÇ', active: true },
  { value: 'currentPrice', label: 'ANLIK', active: true },
];

export const PortfolioProvider = ({ children }) => {
  const history = useHistory();
  const { portfolioId } = useParams();
  const [portfolio, setPortfolio] = useState();
  const [purchases, setPurchases] = useState([]);
  const [portfolioHistory, setPortfolioHistory] = useState([]);
  const [portfolioNetHistory, setPortfolioNetHistory] = useState([]);
  const [stacks, setStacks] = useState([]);
  const [comparisonHistories, setComparisonHistories] = useState([]);
  const [comparisonNetHistories, setComparisonNetHistories] = useState([]);
  const [isComparison, setIsComparison] = useState(false);
  const [isComparisonLoading, setIsComparisonLoading] = useState(false);
  const [tableColumns, setTableColumns] = useStickyState(
    defaultTableColumns,
    'purchase-columns'
  );

  useEffect(() => {
    if (tableColumns.length !== defaultTableColumns) {
      setTableColumns(defaultTableColumns);
    }
  }, []);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const portfolio = await portfolioService.show(portfolioId);
        setPortfolio(portfolio);
      } catch (error) {
        errorHandler(error);
        history.push('/portfolios');
      }
    };

    fetchPortfolio();
  }, [portfolioId]);

  useEffect(() => {
    const handleComparisons = async () => {
      if (comparisonHistories.length === 0) {
        setIsComparisonLoading(true);
        let comparisons = await getComparisons();
        worker.postMessage({ comparisons, stacks, portfolioHistory });
      }
    };
    if (isComparison) handleComparisons();
  }, [isComparison, stacks]);

  useEffect(() => {
    worker.onmessage = (e) => {
      const { comparisonsHistories, comparisonsNetHistories, error } = e.data;
      if (error) {
        notification.error({
          message: 'Hata!',
          description: `Karşılaştırda bir hata çıktı. Lütfen daha sonra tekrar deneyin. Devam ederse "Hata ile karşılaştım!" linkiyle Fon Adam'a bildirin."`,
        });
      } else {
        setComparisonHistories(comparisonsHistories);
        setComparisonNetHistories(comparisonsNetHistories);
      }

      setIsComparisonLoading(false);
    };
  }, []);

  const getComparisons = async () => {
    const startDate = moment(portfolioNetHistory[0].date)
      .subtract('1', 'day')
      .toISOString();
    const bist = await comparisonService.show('BIST100', {
      startDate,
    });
    const usd = await comparisonService.show('USD', {
      startDate,
    });
    const euro = await comparisonService.show('EURO', {
      startDate,
    });
    return [bist, usd, euro];
  };

  const getPurchaseHistories = () => {
    let { purchases, histories } = portfolio;

    purchases = purchases.map((purchase) => {
      const portfolioHistory = histories.find(
        (history) => history.fund === purchase.fund._id
      );

      let history = portfolioHistory.history.filter(
        (hist) => +new Date(purchase.date) <= +new Date(hist.date)
      );

      history = history.map((hist) => {
        return { ...hist, value: hist.price * purchase.pieces };
      });

      return { ...purchase, history };
    });

    return purchases;
  };

  const updateHistory = (purchases) => {
    let history = [];

    purchases.forEach((purchase) => {
      purchase.history.forEach((hist) => {
        const portfolioPrice = history.find(
          (pInfo) => pInfo.date === hist.date
        );
        if (portfolioPrice) {
          portfolioPrice.value += hist.value;
        } else {
          history.push({ value: hist.value, date: hist.date });
        }
      });
    });

    history = history
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .map((h) => {
        return { ...h, value: +h.value.toFixed(2), category: 'Portföy' };
      });

    setPortfolioHistory(history);
  };

  const updateNetHistory = (stacks) => {
    let history = [];

    stacks.forEach((stack) => {
      stack.netHistory.forEach((hist) => {
        const portfolioPrice = history.find(
          (pInfo) => pInfo.date === hist.date
        );
        if (portfolioPrice) {
          portfolioPrice.value += hist.value;
        } else {
          history.push({ value: hist.value, date: hist.date });
        }
      });
    });

    history = history
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .map((h) => {
        return { ...h, value: +h.value.toFixed(2), category: 'Net Kazanç' };
      });

    setPortfolioNetHistory(history);
  };

  useEffect(() => {
    if (portfolio) {
      let purchases = getPurchaseHistories();
      let stacks = stackFunds(purchases);
      stacks = stacks.map((fund) => stackSameFundPurchases(fund));
      stacks = stacks.map((fund) => getStackFundNetHistory(fund));
      stacks = stacks.map((fund) => getStackFundStatistics(fund));
      stacks = stacks.map((fund) => getStackFundPieces(fund));
      setStacks(stacks);
      setPurchases(purchases);
      updateHistory(purchases);
      updateNetHistory(stacks);
    }
  }, [portfolio]);

  return (
    <PortfolioContext.Provider
      value={{
        portfolio,
        setPortfolio,
        portfolioHistory,
        setPortfolioHistory,
        purchases,
        setPurchases,
        stacks,
        portfolioNetHistory,
        setTableColumns,
        tableColumns,
        setIsComparison,
        isComparison,
        comparisonNetHistories,
        comparisonHistories,
        isComparisonLoading,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};
