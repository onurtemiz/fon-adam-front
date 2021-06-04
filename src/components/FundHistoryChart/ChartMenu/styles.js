import styled from 'styled-components/macro';
import { Menu } from 'antd';
const MenuItem = Menu.Item;

export default styled.div`
  display: flex;
  align-items: center;
`;

export const FundCode = styled.span`
  display: inline-block;
  margin-right: 5px;
  font-size: 1.5rem;
  font-weight: bold;

  color: ${({ theme }) => theme.primaryColor600};

  user-select: none;
`;

export const StyledMenu = styled(Menu)`
  line-height: 1.5;

  border-bottom: none !important;

  margin-bottom: 15px;
  margin-top: 15px;

  .ant-menu-item:hover,
  .ant-menu-submenu:hover,
  .ant-menu-item-active,
  .ant-menu-submenu-active,
  .ant-menu-item-open,
  .ant-menu-submenu-open,
  .ant-menu-item-selected,
  .ant-menu-submenu-selected {
    color: ${(p) => p.theme.primaryColor500} !important;
    border-bottom-color: ${(p) => p.theme.primaryColor500} !important;
    font-weight: bold !important;
  }
`;

export const StyledMenuItem = styled(MenuItem)`
  margin: 0px !important;
  margin-right: 15px !important;
  padding: 0px !important;
`;
