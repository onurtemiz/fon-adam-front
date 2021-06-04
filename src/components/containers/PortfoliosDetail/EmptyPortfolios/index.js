import React from 'react';
import api from '../../../../api';
import { errorHandler } from '@utils';
import EmptyPortfoliosStyles, {
  Hero,
  StyledButton,
  SubTitle,
  TextWrapper,
  Title,
} from './styles';
import { useHistory } from 'react-router';
import mixpanel from 'mixpanel-browser';
import { portfolioService } from '@services';

const EmptyPortfolios = () => {
  const history = useHistory();

  const createPortfolio = async () => {
    try {
      const portfolio = await portfolioService.create();
      history.push(`/portfolios/${portfolio._id}`);
    } catch (error) {
      errorHandler(error);
    }
  };

  return (
    <EmptyPortfoliosStyles>
      <TextWrapper>
        <Title>İlk Portföyünü oluştur.</Title>
        <SubTitle>
          Fon Adam ile excelsiz bir portföy deneyimi için ilk portföyünü
          oluştur.
        </SubTitle>
        <StyledButton type="primary" onClick={createPortfolio}>
          Yeni Portföy
        </StyledButton>
      </TextWrapper>

      <Hero src="/images/empty-portfolios.png" />
    </EmptyPortfoliosStyles>
  );
};

export default EmptyPortfolios;
