import styled from "styled-components";

const Father = styled.div`
  display: flex;
`;

const Box = styled.div`
  // use props
  background-color: ${(props) => props.bgColor};
  width: 100px;
  height: 100px;
`;

// Extend
const Circle = styled(Box)`
  border-radius: 50px;
`;

const Span = styled.span`
  color: white;
`;

function PracStyled() {
  return (
    <>
      <Father>
        <Box bgColor="teal">
          <Span>Hello</Span>
        </Box>
        <Circle bgColor="tomato" />
      </Father>
    </>
  );
}

export default PracStyled;
