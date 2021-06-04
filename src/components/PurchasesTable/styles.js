import styled from 'styled-components/macro';
import { Avatar, Table } from 'antd';

export default styled.div`
  margin-top: 30px;

  border-radius: 5px;
  background-color: #fafbfc00;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`;

export const StyledAvatar = styled(Avatar)`
  border-radius: 8px;

  background-color: ${(p) => p.color};

  width: 36px;
  height: 36px;
  line-height: 36px;

  position: absolute;
  left: 0px;

  margin-left: 16px;

  top: 50%;
  transform: translateY(-50%);
`;

export const StyledTable = styled(Table)`
  .ant-table-cell {
    padding: 10px;
  }

  .dropdown-icon {
    width: 25px;
    cursor: pointer;
  }

  @media (max-width: 992px) {
    max-width: 992px;
    width: 100%;
  }
`;

export const Strip = styled.div`
  background-color: ${(p) => p.color};

  position: absolute;
  top: 0px;
  left: 0;
  width: 4px;
  height: 56px;
  pointer-events: none;
`;

export const Name = styled.span`
  max-width: 250px;
  width: 100%;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1; /* number of lines to show */
  -webkit-box-orient: vertical;
`;
