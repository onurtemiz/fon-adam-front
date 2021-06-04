import React from 'react';
import HeaderStatisticCardStyles, {
  Title,
  Value,
  GradientWrapper,
  HeaderWrapper,
  ValueWrapper,
  Trend,
} from './styles';

const HeaderStatisticCard = ({
  title,
  current,
  trend,
  type = 'primary',
  Icon,
}) => {
  return (
    <HeaderStatisticCardStyles>
      <HeaderWrapper>
        <Title>{title}</Title>
        <ValueWrapper>
          <Value>{current && current.toFixed(2)}₺</Value>
          {trend && <Trend increasing={trend > 0}>{trend.toFixed(2)}%</Trend>}
        </ValueWrapper>
      </HeaderWrapper>
      <GradientWrapper type={type}>{Icon}</GradientWrapper>
    </HeaderStatisticCardStyles>
  );
};

export default HeaderStatisticCard;
