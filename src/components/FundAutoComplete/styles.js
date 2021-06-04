import { AutoComplete } from 'antd';
import styled from 'styled-components/macro';

export const StyledAutoComplete = styled(AutoComplete)`
  margin-right: 15px;

  max-width: 200px;

  &,
  &:hover,
  &:active,
  &:focus {
    border-bottom: 2px solid ${(p) => p.theme.metaColor200};
    color: ${(p) => p.theme.metaColor600};
  }
  .ant-select-selector {
    padding: 0px !important;
  }

  .ant-select-selection-search {
    left: 0px !important;
  }

  font-size: 1rem;
`;
