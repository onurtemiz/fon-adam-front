import styled from 'styled-components/macro';
import { Input } from 'antd';
import { Select } from '@common';
export default styled.div`
  margin-bottom: 15px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 992px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const PortfolioTitle = styled.h1`
  font-weight: bold;
  margin-right: 20px;
  font-size: clamp(1rem, 2vw + 1rem, 3rem);
  color: ${(p) => p.theme.metaColor600};
`;

export const PortfolioHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-grow: 1;
  width: 100%;

  &:hover {
    .util-icon {
      visibility: visible;
    }
  }

  & > svg {
    margin-right: 10px;
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

  .util-icon {
    visibility: hidden;
    min-width: 30px;
    max-width: 30px;
    background-color: ${(p) => p.theme.metaColor200};
    border-radius: 5px;
    padding: 5px;
    cursor: pointer;
    margin-right: 10px;
  }

  .util-icon:hover,
  .action-icon:hover {
    background-color: ${(p) => p.theme.metaColor300};
  }

  .visibility-icon {
    padding-right: 5px;
    padding-left: 5px;

    margin-bottom: -8px;
    padding-bottom: 9px;
    border-bottom: 2px solid ${(p) => p.theme.metaColor300};
    color: ${(p) => p.theme.metaColor500};

    @media (max-width: 992px) {
      padding-bottom: 10px;
    }
  }
`;

export const StyledInput = styled(Input)`
  margin-right: 15px;

  &,
  &:hover,
  &:active,
  &:focus {
    border-bottom: 3px solid ${(p) => p.theme.metaColor200};
    color: ${(p) => p.theme.metaColor600};
  }

  &:hover {
    border-bottom: 3px solid ${(p) => p.theme.primaryColor500};
  }

  padding: 0px;

  font-size: clamp(1rem, 2vw + 1rem, 3rem);
  font-weight: bold;
`;

export const HeaderStatisticsWrapper = styled.div`
  display: flex;
  align-items: center;

  & > div {
    margin-right: 15px;
  }

  & > div:last-child {
    margin-right: 0px;
  }

  @media (max-width: 992px) {
    margin-top: 15px;
    flex-wrap: wrap;
    & > div {
      margin-right: 0px;
      margin-bottom: 15px;
    }
  }
`;

export const StyledSelect = styled(Select)`
  width: 125px;
`;
