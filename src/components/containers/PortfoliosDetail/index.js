import React, { useEffect, useState } from 'react';
import PortfoliosDetailStyles, { StyledButton } from './styles';
import { errorHandler } from '@utils';
import api from '../../../api';
import { useAuth } from '../../../AuthContext';
import EmptyPortfolios from './EmptyPortfolios';
import { PortfolioCard } from '@components';
import { useHistory, useLocation, useParams } from 'react-router';
import queryString from 'query-string';
import { Col, Row } from 'antd';
import mixpanel from 'mixpanel-browser';
import { portfolioService } from '@services';
import Loading from 'components/Loading';
const PortfoliosDetail = () => {
  const { user } = useAuth();
  const history = useHistory();
  const { owner } = queryString.parse(useLocation().search);
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const portfolios = await portfolioService.index({ owner });
        setPortfolios(portfolios?.data);
      } catch (error) {
        errorHandler(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolios();
  }, [user, owner]);

  const createPortfolio = async () => {
    try {
      if (user) {
        const portfolio = await portfolioService.create();
        history.push(`/portfolios/${portfolio._id}`);
      } else {
        history.push('/signup');
      }
    } catch (error) {
      errorHandler(error);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {portfolios.length === 0 ? (
        <EmptyPortfolios />
      ) : (
        <PortfoliosDetailStyles>
          <Row gutter={[15, 15]} align="middle">
            {portfolios.map((portfolio) => (
              <Col key={portfolio._id}>
                <PortfolioCard portfolio={portfolio} />
              </Col>
            ))}
            <Col>
              <StyledButton type="primary" onClick={createPortfolio}>
                Yeni Portföy
              </StyledButton>
            </Col>
          </Row>
        </PortfoliosDetailStyles>
      )}
    </>
  );
};

export default PortfoliosDetail;
