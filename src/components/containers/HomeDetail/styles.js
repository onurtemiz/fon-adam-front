import styled from 'styled-components/macro';
import { RainbowButton } from '@components';

export default styled.div`
  width: 100%;

  padding: 50px 60px;

  .row-col {
    max-width: 650px;

    @media (max-width: 992px) {
      max-width: 992px;
      width: 100%;
    }
  }

  @media (max-width: 992px) {
    padding: 10px 0px;
  }
`;

export const Logo = styled.img`
  width: 100%;
  max-width: 550px;
`;

export const Title = styled.h1`
  margin-top: 10px;
  font-weight: bold;
  font-size: clamp(1.5rem, 2vw + 1rem, 3rem);
  color: ${(p) => p.theme.primaryColor600};
  line-height: 1.3;
`;

export const SubTitle = styled.p`
  margin-top: 20px;
  font-size: clamp(0.875rem, 1vw + 0.875rem, 1.5rem);
  color: ${(p) => p.theme.secondaryColor600};
  font-weight: bold;
  letter-spacing: 0.5px;
`;

export const StyledButton = styled(RainbowButton)`
  font-weight: bold;
  height: 50px;
  border-radius: 0.5rem;
  letter-spacing: 0.5px;
  padding: 10px 30px;
`;

export const LandingHero = styled.img`
  width: 100%;

  @media (max-width: 992px) {
    margin-top: 15px;
  }
`;
