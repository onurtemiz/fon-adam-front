import React from 'react';
import '@fontsource/roboto';
import '@fontsource/roboto/900.css';
import '@fontsource/roboto/700.css';
import { ThemeProvider } from 'styled-components/macro';
import { light } from './utils/styles/theme';
import Normalize from './utils/styles/normalize';
import 'antd/dist/antd.css';
import GlobalStyle from './utils/styles/globalStyles';
import mixpanel from 'mixpanel-browser';

import {
  MainContainer,
  HomeDetail,
  PortfolioDetail,
  LoginDetail,
  SignupDetail,
  PortfoliosDetail,
  ForgotPasswordDetail,
  PrivacyDetail,
  TermsDetail,
} from './components/containers';
import { Route, Switch } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { Spin } from 'antd';
import AccountDetail from './components/containers/AccountDetail';
import FundAnalysisDetail from './components/containers/FundAnalysisDetail';
import { Loading } from '@components';
import { ContentWrapper } from '@containers';

mixpanel.init(process.env.REACT_APP_MIXPANEL_TRACKER);

function App() {
  const { initialLoad } = useAuth();
  const themeMode = light;

  if (!initialLoad) {
    return (
      <ContentWrapper>
        <Loading />
      </ContentWrapper>
    );
  }

  return (
    <ThemeProvider theme={themeMode}>
      <Normalize />
      <GlobalStyle />

      <Switch>
        <Route path="/login" component={LoginDetail} />
        <Route path="/signup" component={SignupDetail} />
        <Route path="/forgot-password" component={ForgotPasswordDetail} />
        <Route path="/" component={MainContainerSwitch} />
      </Switch>
    </ThemeProvider>
  );
}

const MainContainerSwitch = () => {
  return (
    <MainContainer>
      <Switch>
        <Route path="/portfolios/:portfolioId" component={PortfolioDetail} />
        <Route path="/portfolios/" component={PortfoliosDetail} />
        <Route path="/analysis/" component={FundAnalysisDetail} />

        <Route path="/account" component={AccountDetail} />
        <Route path="/privacy" component={PrivacyDetail} />
        <Route path="/terms" component={TermsDetail} />

        <Route path="/" component={HomeDetail} />
      </Switch>
    </MainContainer>
  );
};

export default App;
