import styled from 'styled-components/macro';

export default styled.div`
  display: flex;
  min-width: 240px;

  justify-content: space-between;
  align-items: center;

  padding: 1rem;
  box-shadow: 0 20px 27px 0 ${(p) => p.theme.metaColor100};
  border: 1px solid ${(p) => p.theme.metaColor200};
  background-color: ${(p) => p.theme.metaColor100};
  border-radius: 1rem;
`;

export const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;

  margin-right: 10px;
`;

export const Title = styled.span`
  font-size: 0.875rem;
  line-height: 1.5;
  color: ${(p) => p.theme.metaColor600};

  word-wrap: break-word;
  white-space: pre-line;
`;

export const Value = styled.span`
  font-weight: bold;
  font-size: 1.25rem;
  font-size: 1.375;
  color: ${(p) => p.theme.metaColor600};
  word-wrap: break-word;
  white-space: pre-line;
`;

export const GradientWrapper = styled.div`
  background-color: ${(p) =>
    p.type === 'primary'
      ? p.theme.primaryColor500
      : p.type === 'secondary'
      ? p.theme.secondaryColor500
      : p.theme.thirdColor500};
  border-radius: 0.5rem;

  display: flex;
  align-items: center;
  justify-content: center;

  min-width: 48px;
  max-width: 48px;
  height: 48px;

  .static-icon {
    width: 24px;
    color: white;
  }
`;

export const ValueWrapper = styled.div`
  display: flex;

  align-items: center;
`;

export const Trend = styled.span`
  color: ${(p) => (p.increasing ? p.theme.profitColor : p.theme.lossColor)};

  margin-left: 10px;
  font-weight: bold;
  font-size: 12px;
`;
