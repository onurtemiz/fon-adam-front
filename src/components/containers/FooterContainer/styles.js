import styled from 'styled-components/macro';

export default styled.footer`
  height: 50px;
  width: 100%;
  background-color: ${(p) => p.theme.metaColor100};

  @media (max-width: 992px) {
    height: 170px;
    padding-top: 10px;
  }
`;

export const FooterWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
  padding: 0px 15px;

  align-items: center;
  justify-content: space-between;

  @media (max-width: 992px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const LeftSide = styled.div`
  @media (max-width: 992px) {
    display: flex;
    flex-direction: column;
  }
`;
export const RightSide = styled.ul`
  list-style: none;
  padding-inline-start: 0px;
  margin-block-start: 0px;
  margin-block-end: 0px;
  display: flex;

  & > li {
    margin-right: 15px;
  }

  @media (max-width: 992px) {
    flex-direction: column;

    & > li {
      margin-top: 10px;
      margin-right: 0px;
    }
  }
`;

export const FooterItem = styled.li`
  font-size: 12px;
  cursor: pointer;

  a,
  & {
    color: ${({ theme }) => theme.metaColor500};

    &:hover {
      color: ${({ theme }) => theme.metaColor600};
    }
  }

  @media (max-width: 992px) {
    font-size: 14px;
  }
`;

export const Copyright = styled.span`
  color: ${({ theme }) => theme.metaColor500};
`;

export const Contact = styled.span`
  margin-left: 10px;
  color: ${({ theme }) => theme.metaColor500};

  a {
    color: ${({ theme }) => theme.metaColor500};
    letter-spacing: 0.3px;
  }

  @media (max-width: 992px) {
    margin-left: 0px;
    margin-top: 10px;
  }
`;
