import styled from "styled-components";
const Father = styled.div`
  display: flex;
`;

const Btn = styled.button`
  background-color: tomato;
  color: white;
  border: 0;
  border-radius: 15px;
  width: 100px;
  height: 100px;
`;

const PracBtn = () => {
  return (
    <>
      <Father as="header">
        <Btn>Log in</Btn>
        <Btn as="a" href="/login">
          Log in
        </Btn>
      </Father>
    </>
  );
};

export default PracBtn;
