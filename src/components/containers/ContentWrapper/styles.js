import styled from 'styled-components/macro';

export default styled.div`
  padding: 30px 15px;
  width: 100%;
  display: flex;
  min-height: calc(100vh - 101px);

  @media (max-width: 992px) {
    min-height: calc(100vh - 185px);
  }
`;
