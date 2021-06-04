import { Spin } from 'antd';
import { ContentWrapper } from '@containers';
import React from 'react';
import LoadingStyles, { Logo } from './styles';

const Loading = () => {
  return (
    <LoadingStyles>
      <Logo src="/images/logo-small.png" />
      <Spin size="large" />
    </LoadingStyles>
  );
};

export default Loading;
