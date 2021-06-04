import styled from 'styled-components/macro';

export const ValueText = styled.span`
  font-size: 0.75rem;
  font-weight: bold;
`;

export default styled.div`
  display: flex;
  align-items: center;

  .arrow-icon {
    width: 24px;
    margin-right: 3px;
  }

  ${ValueText}, .arrow-icon {
    color: ${(p) =>
      p.value > 0
        ? p.theme.profitColor
        : p.value < 0
        ? p.theme.lossColor
        : p.theme.idleColor};
  }
`;

export const Title = styled.span`
  font-size: 0.75rem;
  font-weight: bold;
  color: #090909;

  display: block;
  margin-right: 5px;
`;
