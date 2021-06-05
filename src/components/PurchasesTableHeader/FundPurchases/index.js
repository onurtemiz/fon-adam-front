import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../AuthContext';
import { errorHandler, showToOwner } from '@utils';
import { AddFundPurchase, AddGuessFundPurchase } from '@components';
import { usePortfolio } from '../../containers/PortfolioDetail/PortfolioContext';
import { StyledButton, ButtonWrapper, FundPurchasesWrapper } from './styles';
import lodash from 'lodash';
import { fundService, portfolioService, purchaseService } from '@services';
import { Select, Spin } from 'antd';

const FundPurchases = () => {
  const { portfolio, setPortfolio } = usePortfolio();
  const [purchases, setPurchases] = useState([]);
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [guessMode, setGuessMode] = useState(false);
  const [funds, setFunds] = useState([]);

  useEffect(() => {
    const fetchFunds = async () => {
      try {
        const { data } = await fundService.index();
        setFunds(data);
      } catch (error) {
        errorHandler(error);
      }
    };
    if (showToOwner(portfolio, user)) fetchFunds();
  }, []);

  if (!showToOwner(portfolio, user)) {
    return null;
  }

  const clearPurchases = () => {
    setPurchases([createPurchase()]);
  };

  const createPurchase = () => {
    return { _id: lodash.uniqueId(), portfolio: portfolio._id };
  };

  const addPurchase = () => {
    const initial = createPurchase();
    setPurchases([...purchases, initial]);
  };

  const addAll = async () => {
    try {
      setLoading(true);
      if (guessMode) {
        await addGuess();
      } else {
        await addNormal();
      }
    } catch (error) {
      errorHandler(error);
    } finally {
      setLoading(false);
    }
  };

  const calculateGuess = async (purchase) => {
    try {
      const { cost, pieces } = purchase;
      const fund = await fundService.show(purchase.fund);

      let bestCost = cost;
      let bestDate;

      fund.history.forEach((history) => {
        const currentCost = history.price * pieces;
        if (Math.abs(currentCost - cost) < bestCost) {
          bestCost = Math.abs(currentCost - cost);
          bestDate = history.date;
        }
      });

      purchase.date = bestDate;

      return Promise.resolve(purchase);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const addGuess = async () => {
    try {
      const goodies = purchases.filter(
        (purchase) =>
          purchase.fund &&
          purchase.cost &&
          purchase.cost > 0 &&
          purchase.pieces &&
          purchase.pieces > 0
      );

      for (const purchase of goodies) {
        const calculatedPurchase = await calculateGuess(purchase);
        const { _id, ...purch } = calculatedPurchase;
        await purchaseService.create(purch);
      }
      const ids = goodies.map((p) => p._id);
      setPurchases(purchases.filter((purch) => !ids.includes(purch._id)));
      const res = await portfolioService.show(portfolio._id);
      setPortfolio(res);

      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const addNormal = async () => {
    try {
      const goodies = purchases.filter(
        (purchase) =>
          purchase.date &&
          purchase.fund &&
          purchase.pieces &&
          purchase.pieces > 0
      );

      for (const purchase of goodies) {
        const { _id, ...purch } = purchase;
        await purchaseService.create(purch);
      }
      const ids = goodies.map((p) => p._id);
      setPurchases(purchases.filter((purch) => !ids.includes(purch._id)));
      const res = await portfolioService.show(portfolio._id);
      setPortfolio(res);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const handleGuessMode = () => {
    setGuessMode(!guessMode);
    clearPurchases();
  };

  return (
    <FundPurchasesWrapper>
      <Spin spinning={loading} wrapperClassName="spinner">
        {purchases.map((purchase) =>
          guessMode ? (
            <AddGuessFundPurchase
              setPurchases={setPurchases}
              purchases={purchases}
              purchase={purchase}
              key={purchase._id}
              funds={funds}
            />
          ) : (
            <AddFundPurchase
              setPurchases={setPurchases}
              purchases={purchases}
              purchase={purchase}
              key={purchase._id}
              funds={funds}
            />
          )
        )}
      </Spin>

      <ButtonWrapper>
        {purchases.length > 0 && (
          <StyledButton
            type="third"
            onClick={() => handleGuessMode()}
            disabled={loading}
          >
            Tarih {guessMode ? 'hatırlıyorum' : 'hatırlamıyorum'}
          </StyledButton>
        )}
        <StyledButton
          type="secondary"
          onClick={() => addPurchase()}
          disabled={loading}
        >
          {purchases.length > 0 ? 'Yeni Fon' : 'Fon Ekle'}
        </StyledButton>
        {purchases.length > 0 && (
          <StyledButton
            type="primary"
            onClick={() => addAll()}
            loading={loading}
          >
            Portföye Ekle
          </StyledButton>
        )}
      </ButtonWrapper>
    </FundPurchasesWrapper>
  );
};

export default FundPurchases;
