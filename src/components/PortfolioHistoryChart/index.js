import React, { useCallback, useEffect, useMemo, useState } from 'react';
import FundHistoryChartStyles, { StyledChart } from './styles';
import moment from 'moment';
import ChartMenu from './ChartMenu';
import { Space } from 'antd';
import { usePortfolio } from '../containers/PortfolioDetail/PortfolioContext';

const PortfolioHistoryChart = () => {
  const {
    portfolioHistory,
    portfolioNetHistory,
    comparisonHistories,
    comparisonNetHistories,
    isComparison,
  } = usePortfolio();
  const [selectedSpan, setSelectedSpan] = useState('threeMonth');
  const [selectedHistorySpan, setSelectedHistorySpan] = useState('all');
  const [selectedHistory, setSelectedHistory] = useState([]);

  useEffect(() => {
    const currentHistory =
      selectedHistorySpan === 'all' ? portfolioHistory : portfolioNetHistory;
    setSelectedHistory(
      currentHistory.map((h) => {
        return { ...h, category: 'Portföy' };
      })
    );
  }, [selectedHistorySpan, portfolioHistory, portfolioNetHistory]);

  const getHistoryBySpan = (selectedHistory) => {
    switch (selectedSpan) {
      case 'weekly':
        var weeklyFunds = getSpanHistory(selectedHistory, 1, 'week');
        return weeklyFunds;
      case 'monthly':
        var monthlyFunds = getSpanHistory(selectedHistory, 1, 'month');
        return monthlyFunds;

      case 'threeMonth':
        var threeMonth = getSpanHistory(selectedHistory, 3, 'month');
        return threeMonth;

      case 'sixMonth':
        var sixMonth = getSpanHistory(selectedHistory, 6, 'month');
        return sixMonth;

      case 'tbd':
        var tbd = selectedHistory.filter((hist) =>
          moment(hist.date).isSameOrAfter(moment().startOf('year'), 'day')
        );
        return tbd;

      case 'lastYear':
        var lastYear = getSpanHistory(selectedHistory, 1, 'year');
        return lastYear;

      case 'lastThreeYear':
        var lastThreeYear = getSpanHistory(selectedHistory, 3, 'year');
        return lastThreeYear;

      case 'lastFiveYear':
        var lastFiveYear = getSpanHistory(selectedHistory, 5, 'year');
        return lastFiveYear;

      case 'allTime':
        return selectedHistory;

      default:
        break;
    }
  };

  const getSpanHistory = (history, amount, span) => {
    return history.filter((hist) =>
      moment(hist.date).isSameOrAfter(
        moment().startOf('day').subtract(amount, span),
        'day'
      )
    );
  };

  const chartData = useMemo(() => {
    if (selectedHistory.length === 0) {
      return [];
    }

    if (isComparison) {
      let currentComparisons =
        selectedHistorySpan === 'all'
          ? comparisonHistories
          : comparisonNetHistories;

      currentComparisons = currentComparisons.map((comparison) =>
        getHistoryBySpan(comparison)
      );

      const spanHistory = getHistoryBySpan(selectedHistory);

      const filteredCurrentComparisons = currentComparisons.flat();

      const mixedHistory = [...spanHistory, ...filteredCurrentComparisons]
        .map((h) => {
          return { ...h, date: moment(h.date).format('DD.MM.YYYY') };
        })
        .filter((n) => !isNaN(n.value));

      return mixedHistory;
    } else {
      const spanHistory = getHistoryBySpan(selectedHistory);
      return spanHistory.map((h) => {
        return { ...h, date: moment(h.date).format('DD.MM.YYYY') };
      });
    }
  }, [
    isComparison,
    comparisonHistories,
    comparisonNetHistories,
    selectedSpan,
    selectedHistory,
  ]);

  const defaultConfig = {
    height: 300,
    xField: 'date',
    yField: 'value',

    tooltip: {
      showTitle: true,
      formatter: (datum) => {
        return {
          name: datum.category ?? 'Miktar',
          value: `${datum['value'].toFixed(2)}₺`,
        };
      },
    },

    seriesField: isComparison && 'category',

    lineStyle: {
      lineWidth: 2.5,
    },

    yAxis: {
      max:
        Math.max.apply(
          Math,
          chartData.map((d) => d.value)
        ) * 1.1,
      min:
        Math.min.apply(
          Math,
          chartData.map((d) => d.value)
        ) * 0.85,
    },

    pixelRatio: 3,

    color: isComparison
      ? ['#D946EF', '#F43F5E', '#22C55E', '#0EA5E9']
      : '#d946ef',
  };

  return (
    <FundHistoryChartStyles>
      <Space direction="vertical" size="middle">
        <ChartMenu
          setSelectedSpan={setSelectedSpan}
          selectedSpan={selectedSpan}
          selectedHistorySpan={selectedHistorySpan}
          setSelectedHistorySpan={setSelectedHistorySpan}
        />
        <StyledChart data={chartData} {...defaultConfig} />
      </Space>
    </FundHistoryChartStyles>
  );
};

export default PortfolioHistoryChart;
