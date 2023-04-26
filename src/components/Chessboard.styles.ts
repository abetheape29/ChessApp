import styled from 'styled-components';

export const Board = styled.div`
  display: flex;
  flex-direction: column;
  width: 480px; /* Update the board width */
  height: 480px; /* Update the board height */

  & > div {
    display: flex;
  }

  .square {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px; /* Update the square width */
    height: 60px; /* Update the square height */
  }

  .white {
    background-color: #f0d9b5;
  }

  .black {
    background-color: #b58863;
  }

  img {
    width: 100%;
    height: 100%;
  }
`;

export const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-image: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
  padding: 20px;
  box-sizing: border-box;
`;

export const Title = styled.h1`
  font-size: 2rem;
  color: #444;
  margin-bottom: 20px;
`;
