import styled, { css } from 'styled-components/macro';

export default styled.ul`
  display: flex;

  & > li {
    margin-right: 15px;
  }

  @media (max-width: 992px) {
    flex-direction: column;
  }
`;

export const HeaderItem = styled.li`
  font-size: 1.25rem;
  font-weight: bold;

  &:hover a {
    color: ${(p) => p.theme.primaryColor500};
  }
  position: relative;

  margin-right: ${(p) => p.after && '35px'} !important;

  ${(p) => {
    return (
      p.after &&
      css`
        &:after {
          content: '${(p) => p.after}';
          background-color: ${(p) => p.theme.primaryColor500};
          color: #fff;
          padding: 3px 7px;
          border-radius: 0.25rem;
          font-size: 0.5rem;
          position: absolute;
          top: -5px;
          right: -25px;
          line-height: 1;

          @media (max-width: 992px) {
            right: 25px;
          }
        }
      `
    );
  }}
`;
