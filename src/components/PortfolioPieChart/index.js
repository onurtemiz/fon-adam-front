import React from 'react';
import PortfolioPieChartStyles from './styles';
import { Pie } from '@ant-design/charts';
import { usePortfolio } from '../containers/PortfolioDetail/PortfolioContext';

const PortfolioPieChart = () => {
  const { stacks } = usePortfolio();

  var config = {
    appendPadding: 10,
    angleField: 'value',
    colorField: 'code',
    color: ({ code }) => stacks.find((fund) => fund.code === code).color,
    radius: 1,
    innerRadius: 0.64,
    meta: {
      value: {
        formatter: (v) => `${v} ₺`,
      },
    },
    label: {
      type: 'inner',
      offset: '-50%',
      style: { textAlign: 'center' },
      autoRotate: false,
      content: '{value} ₺',
    },
    interactions: [
      // { type: 'element-selected' },
      // { type: 'element-active' },
      ...(stacks.length > 1 ? [{ type: 'pie-statistic-active' }] : []),
    ],

    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: 'pre-wrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
        formatter: function formatter(value) {
          if (value) {
            return `${value.code}\n${value.value}₺`;
          }
          return `TOPLAM\n${stacks.reduce(
            (acc, curr) => +(acc + curr.value).toFixed(2),
            0
          )}₺`;
        },
      },
    },
  };

  if (!stacks) {
    return null;
  }

  return (
    <PortfolioPieChartStyles>
      <Pie {...config} data={stacks} />
    </PortfolioPieChartStyles>
  );
};

export default PortfolioPieChart;
