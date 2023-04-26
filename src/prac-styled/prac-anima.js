import styled, { keyframes } from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vh;
  height: 100vh;
`;

const rotation = keyframes`
  0% {
    transform: rotate(0deg);
    border-radius: 0px;
  }
  50% {
    transform: rotate(360deg); 
    border-radius: 100px;
  }
  100% {
    transform: rotate(0deg);
    border-radius: 0px;
  }
`;

const Box = styled.div`
  background-color: ${(props) => props.bgColor};
  width: 200px;
  height: 200px;
  /* animation: ${rotation} 2s linear infinite; */
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    font-size: 50px;
    &:hover {
      font-size: 100px;
    }
    &:active {
      opacity: 0;
    }
  }
`;

const PracAnima = () => {
  return (
    <>
      <Wrapper>
        <Box bgColor="tomato">
          <span>😘</span>
        </Box>
        <Box bgColor="blue">
          <span>😘</span>
        </Box>
      </Wrapper>
    </>
  );
};

export default PracAnima;
