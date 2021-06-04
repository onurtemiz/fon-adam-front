import React, { useEffect, useState } from 'react';
import FundHistoryChartStyles, { StyledChart } from './styles';
import moment from 'moment';
import ChartMenu from './ChartMenu';
import { Space } from 'antd';

const FundHistoryChart = ({ title, fundHistory, field = 'price' }) => {
  const [selectedSpan, setSelectedSpan] = useState('threeMonth');
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const changeHistory = () => {
      switch (selectedSpan) {
        case 'weekly':
          var weeklyFunds = getSpanHistory(fundHistory, 1, 'week');
          setHistory(weeklyFunds);
          break;
        case 'monthly':
          var monthlyFunds = getSpanHistory(fundHistory, 1, 'month');
          setHistory(monthlyFunds);
          break;
        case 'threeMonth':
          var threeMonth = getSpanHistory(fundHistory, 3, 'month');
          setHistory(threeMonth);
          break;
        case 'sixMonth':
          var sixMonth = getSpanHistory(fundHistory, 6, 'month');
          setHistory(sixMonth);
          break;
        case 'tbd':
          var tbd = fundHistory.filter((hist) =>
            moment(hist.date).isSameOrAfter(moment().startOf('year'), 'day')
          );
          setHistory(tbd);
          break;
        case 'lastYear':
          var lastYear = getSpanHistory(fundHistory, 1, 'year');
          setHistory(lastYear);
          break;
        case 'lastThreeYear':
          var lastThreeYear = getSpanHistory(fundHistory, 3, 'year');
          setHistory(lastThreeYear);
          break;
        case 'lastFiveYear':
          var lastFiveYear = getSpanHistory(fundHistory, 5, 'year');
          setHistory(lastFiveYear);
          break;
        case 'allTime':
          setHistory(fundHistory);
          break;
        default:
          break;
      }
    };
    if (fundHistory) {
      changeHistory();
    }
  }, [fundHistory, selectedSpan]);

  const getSpanHistory = (history, amount, span) => {
    return history.filter((hist) =>
      moment(hist.date).isSameOrAfter(
        moment().startOf('day').subtract(amount, span),
        'day'
      )
    );
  };

  const defaultConfig = {
    height: 300,
    xField: 'date',
    yField: field,

    tooltip: {
      showTitle: true,
      formatter: (datum) => {
        return { name: 'Miktar', value: `${datum[field]}₺` };
      },
    },
    yAxis: {
      max:
        Math.max.apply(
          Math,
          history.map((d) => d[field])
        ) * 1.05,
      min:
        Math.min.apply(
          Math,
          history.map((d) => d[field])
        ) * 0.95,
    },
    lineStyle: {
      lineWidth: 2.5,
      shadowColor: 'rgba(149, 157, 165, 0.2)',
      shadowBlur: 1,
      shadowOffsetX: 3,
      shadowOffsetY: 3,
    },

    color: '#22C55E',
  };

  return (
    <FundHistoryChartStyles>
      <Space direction="vertical" size="middle">
        <ChartMenu
          title={title}
          setSelectedSpan={setSelectedSpan}
          selectedSpan={selectedSpan}
        />
        <StyledChart
          data={history.map((h) => {
            return { ...h, date: moment(h.date).format('DD.MM.YYYY') };
          })}
          {...defaultConfig}
        />
      </Space>
    </FundHistoryChartStyles>
  );
};

export default FundHistoryChart;
