import styled from 'styled-components';

export const Board = styled.div`
  display: flex;
  flex-direction: column;
  width: 320px;
  height: 320px;

  .square {
    display: inline-block;
    width: 40px;
    height: 40px;
  }

  .white {
    background-color: #f0d9b5;
  }

  .black {
    background-color: #b58863;
  }
`;
