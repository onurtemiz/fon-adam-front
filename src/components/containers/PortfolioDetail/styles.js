import styled from 'styled-components/macro';

export const PortfolioWrapper = styled.div`
  width: 100%;
  max-width: 1440px;
`;

export const BelowPieAd = styled.div`
  border-radius: 5px;
  background-color: #fafbfc00;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  padding: 15px;

  width: 100%;
  max-width: 450px;
`;

export const Title = styled.h3`
  font-weight: 700;
  color: ${(p) => p.theme.metaColor600};
  font-size: 2rem;
`;

export const Description = styled.p`
  color: ${(p) => p.theme.metaColor500};

  ul {
    margin-top: 0.5rem;
    font-weight: bold;
    font-size: 1.25rem;
    line-height: 1.5;

    li {
      cursor: pointer;
      margin-top: 0.25rem;
    }

    & > li:nth-child(2) a {
      color: ${(p) => p.theme.thirdColor600};
    }
    & > li:nth-child(3) a {
      color: ${(p) => p.theme.primaryColor600};
    }
  }
`;
