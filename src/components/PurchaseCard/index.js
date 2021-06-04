import { Tooltip } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { UpDownStatistic } from '@components';
import PurchaseCardStyles, {
  Strip,
  Name,
  StyledAvatar,
  TitleWrapper,
  InsideWrapper,
  StatisticsWrapper,
} from './styles';

const PurchaseCard = ({ purchase }) => {
  const [color, setColor] = useState('#ffce14');

  useEffect(() => {
    var color = colors[Math.floor(Math.random() * colors.length)];
    setColor(color);
  }, []);

  return (
    <PurchaseCardStyles>
      <Strip color={color} />
      <InsideWrapper>
        <StyledAvatar color={color} size="large">
          {purchase.fund.code}
        </StyledAvatar>
        <TitleWrapper>
          <Tooltip
            title={purchase.fund.title}
            overlayClassName="default-tooltip"
          >
            <Name>{purchase.fund.title}</Name>
          </Tooltip>
        </TitleWrapper>

        <StatisticsWrapper>
          <UpDownStatistic title="1H" value={purchase.statistics.lastWeek} />
          <UpDownStatistic title="1A" value={purchase.statistics.lastMonth} />
          <UpDownStatistic title="1Y" value={purchase.statistics.lastYear} />
        </StatisticsWrapper>

        <span>{moment(purchase.date).format('DD/MM')}</span>
      </InsideWrapper>
    </PurchaseCardStyles>
  );
};

export default PurchaseCard;

const colors = [
  '#0077b6',
  '#00b4d8',
  '#264653',
  '#2a9d8f',
  '#e76f51',
  '#e63946',
  '#457b9d',
  '#006d77',
  '#f72585',
  '#480ca8',
  '#3f37c9',
  '#14213d',
  '#f77f00',
];
