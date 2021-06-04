import { Col, Row } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import MainContainerStyles, {
  Logo,
  Title,
  SubTitle,
  StyledButton,
  LandingHero,
} from './styles';
const MainContainer = () => {
  return (
    <MainContainerStyles>
      <Row>
        <Col lg={12} xs={24} sm={24} className="row-col">
          <Logo src="/images/logo-large.png" />
          <Title>Uğraşsız Fon Portföy Takibi</Title>
          <Title>Tamamen ücretsiz.</Title>
          <SubTitle>
            Fon Adam'ın temiz arayüzü sayesinde fonlarınızın durumunu gündelik
            kontrol edin.
          </SubTitle>
          <Link to="/signup">
            <StyledButton>Portföyünü Oluştur</StyledButton>
          </Link>
        </Col>
        <Col lg={12} xs={24} sm={24}>
          <LandingHero src="/images/landing-hero.png" />
        </Col>
      </Row>
    </MainContainerStyles>
  );
};

export default MainContainer;
