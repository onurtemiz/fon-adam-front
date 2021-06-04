import React from 'react';
import { Link } from 'react-router-dom';
import PortfolioCardStyles, { Title, StatisticsWrapper } from './styles';

const PortfolioCard = ({ portfolio }) => {
  return (
    <Link to={`/portfolios/${portfolio._id}`}>
      <PortfolioCardStyles>
        <Title>{portfolio.title}</Title>
        <StatisticsWrapper></StatisticsWrapper>
      </PortfolioCardStyles>
    </Link>
  );
};

export default PortfolioCard;
