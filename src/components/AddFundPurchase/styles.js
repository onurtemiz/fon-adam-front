import styled from 'styled-components/macro';

export default styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: flex-end;

  margin-bottom: 15px;

  & > div {
    margin-right: 15px;
  }

  .action-icon {
    max-width: 30px;
    max-width: 30px;
    background-color: ${(p) => p.theme.metaColor200};
    border-radius: 5px;
    padding: 5px;
    cursor: pointer;
    margin-right: 10px;
  }

  .action-icon:hover {
    background-color: ${(p) => p.theme.metaColor300};
  }
`;
