import React from 'react';
import PortfolioDetailStyles, {
  PortfolioWrapper,
  BelowPieAd,
  Title,
  Description,
  List,
} from './styles';
import { Col, Row } from 'antd';
import { usePortfolio, PortfolioProvider } from './PortfolioContext';
import PortfolioHeader from './PortfolioHeader';
import {
  PurchasesTableHeader,
  PortfolioPieChart,
  PurchasesTable,
  PortfolioHistoryChart,
} from '@components';
import Loading from 'components/Loading';

const PortfolioDetail = () => {
  return (
    <PortfolioProvider>
      <InnerPortfolio />
    </PortfolioProvider>
  );
};

export default PortfolioDetail;

const InnerPortfolio = () => {
  const { portfolio, stacks } = usePortfolio();

  if (!portfolio) {
    return <Loading />;
  }

  return (
    <PortfolioWrapper>
      <Row gutter={30}>
        <Col span={24}>
          <PortfolioHeader />
        </Col>
        <Col sm={24} xs={24} lg={8} xl={8}>
          <Row gutter={[0, 30]}>
            <Col span={24}>
              <PortfolioPieChart />
            </Col>
            <Col span={24}>
              <Feedback />
            </Col>
          </Row>
        </Col>

        <Col sm={24} xs={24} lg={16} xl={16}>
          <PortfolioHistoryChart title={portfolio.title} />
          <PurchasesTableHeader />
          <PurchasesTable purchases={stacks} />
        </Col>
      </Row>
    </PortfolioWrapper>
  );
};

const Feedback = () => {
  return (
    <BelowPieAd>
      <Title>Merhaba, ben Fon Adam 👋</Title>
      <Description>
        Boş vakitlerimde insanların daha rahat fonlarını takip edebilmeleri için
        bu siteyi geliştiriyorum.
        <br />
        <br />
        Eğer geliştirmemde bana destek olmak istiyorsanız:
        <ul>
          <li>
            <a
              href={`https://twitter.com/intent/tweet?text=Uğraşsız fon portföy takibi için sen de Fon Adam kullan! &url=https://fonadam.com`}
              target="_blank"
              rel="noreferrer"
            >
              Twitterda Fon Adam'ı Paylaş!
            </a>
          </li>
          <li>
            <a
              href="https://airtable.com/shrWAZQP8zeeuNOGL"
              target="_blank"
              rel="noreferrer"
            >
              Hata ile karşılaştım!
            </a>
          </li>
          <li>
            <a
              href="https://airtable.com/shrVPITYhm1dCd6sM"
              target="_blank"
              rel="noreferrer"
            >
              Şunu eklesen güzel olur!
            </a>
          </li>
        </ul>
      </Description>
    </BelowPieAd>
  );
};
