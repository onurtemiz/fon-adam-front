import { Select } from 'antd';
import { usePortfolio } from 'components/containers/PortfolioDetail/PortfolioContext';
import React, { useState } from 'react';
import ChartMenuStyles, {
  StyledMenu,
  StyledMenuItem,
  StyledSelect,
  Wrapper,
  StyledButton,
} from './styles';
import mixpanel from 'mixpanel-browser';

const ChartMenu = ({
  selectedSpan,
  setSelectedSpan,
  setSelectedHistorySpan,
  selectedHistorySpan,
}) => {
  const { isComparison, setIsComparison, isComparisonLoading } = usePortfolio();

  const handleComparison = () => {
    mixpanel.track(`Comparison`);
    setIsComparison(!isComparison);
  };

  return (
    <ChartMenuStyles>
      <StyledMenu
        selectedKeys={[selectedSpan]}
        mode="horizontal"
        onClick={({ key }) => setSelectedSpan(key)}
      >
        <StyledMenuItem key="weekly">Haftalık</StyledMenuItem>
        <StyledMenuItem key="monthly">Aylık</StyledMenuItem>
        <StyledMenuItem key="threeMonth">3 Aylık</StyledMenuItem>
        <StyledMenuItem key="sixMonth">6 Aylık</StyledMenuItem>
        <StyledMenuItem key="tbd">Yılbaşından İtibaren</StyledMenuItem>
        <StyledMenuItem key="lastYear">Son 1 Yıl</StyledMenuItem>
        <StyledMenuItem key="lastThreeYear">Son 3 Yıl</StyledMenuItem>
        <StyledMenuItem key="lastFiveYear">Son 5 Yıl</StyledMenuItem>
        <StyledMenuItem key="allTime">Tümü</StyledMenuItem>
      </StyledMenu>

      <Wrapper>
        <StyledButton
          type={isComparison ? 'primary-border' : 'third-border'}
          isComparison={isComparison}
          onClick={() => handleComparison()}
          loading={isComparisonLoading}
        >
          {isComparison
            ? isComparisonLoading
              ? 'Yükleniyor'
              : 'Kapat'
            : 'Karşılaştır'}
        </StyledButton>
        <StyledSelect
          bordered={false}
          value={selectedHistorySpan}
          onChange={(e) => setSelectedHistorySpan(e)}
        >
          <Select.Option value="all">Toplam Para</Select.Option>
          <Select.Option value="gain">Net Kazanç</Select.Option>
        </StyledSelect>
      </Wrapper>
    </ChartMenuStyles>
  );
};

export default ChartMenu;
