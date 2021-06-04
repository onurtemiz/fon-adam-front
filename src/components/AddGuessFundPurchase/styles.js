import styled from 'styled-components/macro';
import { Input } from '@common';

export default styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: flex-end;

  margin-bottom: 15px;

  & > div {
    margin-right: 15px;
  }

  .action-icon {
    max-width: 30px;
    max-width: 30px;
    background-color: ${(p) => p.theme.metaColor200};
    border-radius: 5px;
    padding: 5px;
    cursor: pointer;
    margin-right: 10px;
  }

  .action-icon:hover {
    background-color: ${(p) => p.theme.metaColor300};
  }
`;

export const PiecesPicker = styled(Input)`
  max-width: 120px;
  height: 42px;

  &,
  &:hover,
  &:active,
  &:focus {
    border-bottom: 2px solid ${(p) => p.theme.metaColor200};
    color: ${(p) => p.theme.metaColor600};
  }

  padding: 0px !important;
  border-radius: 0px !important;
  font-size: 1rem;

  margin-right: 15px;
`;

export const CostPicker = styled(Input)`
  max-width: 120px;
  height: 42px;

  &,
  &:hover,
  &:active,
  &:focus {
    border-bottom: 2px solid ${(p) => p.theme.metaColor200};
    color: ${(p) => p.theme.metaColor600};
  }

  padding: 0px !important;
  border-radius: 0px !important;
  font-size: 1rem;
  margin-right: 15px;
`;
