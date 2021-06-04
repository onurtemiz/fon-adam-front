import { Tooltip } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import FundCardStyles, {
  Code,
  DateAdded,
  Piece,
  Price,
  Strip,
  Name,
  StyledAvatar,
  TitleWrapper,
  InsideWrapper,
} from './styles';

const FundCard = ({ fund, portfolio, setPortfolio }) => {
  const [color, setColor] = useState('#ffce14');

  useEffect(() => {
    var color = colors[Math.floor(Math.random() * colors.length)];

    setColor(color);
  }, []);

  const removeFund = () => {
    setPortfolio(
      portfolio.filter((f) =>
        f.code === fund.code ? (f.date === fund.date ? true : false) : false
      )
    );
  };

  return (
    <FundCardStyles>
      <Strip color={color} />
      <InsideWrapper>
        <StyledAvatar color={color} size="large">
          {fund.code}
        </StyledAvatar>
        <TitleWrapper>
          <Tooltip title={fund.title} overlayClassName="default-tooltip">
            <Name>{fund.title}</Name>
          </Tooltip>
        </TitleWrapper>

        <span>
          {(fund.price * fund.piece).toFixed(2)}{' '}
          {moment(fund.date).format('LLL')}
        </span>

        <button onClick={removeFund}>X</button>
      </InsideWrapper>
    </FundCardStyles>
  );
};

export default FundCard;

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
