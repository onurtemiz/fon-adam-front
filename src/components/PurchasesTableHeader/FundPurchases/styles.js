import styled from 'styled-components/macro';
import { Button } from '@common';

export const StyledButton = styled(Button)`
  font-weight: bold;
  border-radius: 0.5rem;
  padding: 17px 20px;
  font-size: 1rem;
`;

export const ButtonWrapper = styled.div`
  display: flex;

  & > * {
    margin-right: 10px;
  }
  & > *:last-child {
    margin-right: 0px;
  }
`;

export const FundPurchasesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;
`;
