import {
  Minus,
  TrendingDown,
  TrendingUp,
} from '@styled-icons/boxicons-regular';
import React, { useEffect, useRef, useState } from 'react';
import UpDownStatisticStyles, { Title, ValueText } from './styles';

const UpDownStatistic = ({ title, value }) => {
  const [refValue, setRefValue] = useState(value);

  useEffect(() => {
    setRefValue(value.toFixed(2));
  }, [value]);

  return (
    <UpDownStatisticStyles value={refValue}>
      {title && <Title>{title}</Title>}
      <ArrowIcon value={refValue} />
      <ValueText>{refValue}</ValueText>
    </UpDownStatisticStyles>
  );
};

export default UpDownStatistic;

const ArrowIcon = ({ value }) => {
  if (value > 0) return <TrendingUp className="arrow-icon" />;

  if (value < 0) return <TrendingDown className="arrow-icon" />;

  return <Minus className="arrow-icon" />;
};
