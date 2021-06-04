import React from 'react';
import ChartMenuStyles, {
  FundCode,
  StyledMenu,
  StyledMenuItem,
} from './styles';

const ChartMenu = ({ title, selectedSpan, setSelectedSpan }) => {
  return (
    <ChartMenuStyles>
      {/* {title && <FundCode>{title}</FundCode>} */}
      <div style={{ width: '100%' }}>
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
      </div>
    </ChartMenuStyles>
  );
};

export default ChartMenu;
