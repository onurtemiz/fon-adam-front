import styled from 'styled-components/macro';

export default styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 350px;
  min-height: 80px;

  padding: 10px 20px;

  border: 1px solid ${(p) => p.theme.metaColor};
  border-radius: 5px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

  cursor: pointer;

  transition: 150ms;
  transform: translateY(0px);
  &:hover {
    background-color: #f0fdfa;

    transform: translateY(-5px);
  }
`;

export const Title = styled.h3`
  font-size: 1.25rem;
  font-weight: bold;
  color: ${(p) => p.theme.primaryColor600};
`;

export const StatisticsWrapper = styled.div`
  display: flex;
  width: 100%;

  margin-top: 10px;

  & > div {
    margin-right: 15px;
  }
`;
