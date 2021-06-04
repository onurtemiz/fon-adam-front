import styled from 'styled-components/macro';
import { Select } from 'antd';

export default styled(Select)`
  border-bottom: 2px solid ${(p) => p.theme.metaColor300};

  color: ${(p) => p.theme.metaColor500};

  .ant-select-selector {
    padding: 0px !important ;
  }
`;
