import styled from 'styled-components/macro';
import { Button } from '@common';
export default styled.div`
  display: flex;
  width: 100%;
  justify-content: center;

  @media (max-width: 992px) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
`;

export const Hero = styled.img`
  width: 100%;
  max-width: 350px;
  object-fit: contain;
`;

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 100%;
  max-width: 500px;

  margin-right: 30px;

  @media (max-width: 992px) {
    margin-right: 0px;
    max-width: 450px;
  }
`;

export const Title = styled.h1`
  font-size: clamp(1.8rem, 2vw + 1rem, 2.8rem);
  font-weight: bold;
  display: block;
`;
export const SubTitle = styled.p`
  font-size: clamp(0.875rem, 2vw + 0.875rem, 1.25rem);
`;

export const StyledButton = styled(Button)`
  align-self: flex-start;
`;
