import styled from 'styled-components/macro';

export default styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  padding-top: 15px;

  .drawer-icon {
    width: 30px;
    color: #090909;
    cursor: pointer;

    @media (min-width: 992px) {
      display: none;
    }
  }
`;

export const HeaderWrapper = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;

  /* max-width: 1140px; */
  width: 100%;
  padding: 0px 15px;

  position: relative;
`;

export const AppText = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  letter-spacing: 0.9;

  color: ${({ theme, type }) =>
    type === 'primary' ? theme.primaryColor600 : theme.secondaryColor600};
`;

export const BrandWrapper = styled.div`
  margin-right: 30px;
  display: flex;
`;

export const LeftSide = styled.div`
  display: flex;
  align-items: center;
`;

export const DesktopWrapper = styled.div`
  @media (max-width: 992px) {
    display: none;
  }
`;
