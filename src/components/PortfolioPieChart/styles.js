import styled from 'styled-components/macro';

export default styled.div`
  background-color: #fafbfc00;
  border-radius: 1rem;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  padding: 0px 10px 10px 10px;

  max-width: 450px;
  height: 384px;

  @media (max-width: 992px) {
    max-width: 992px;
    height: unset;
  }
`;
