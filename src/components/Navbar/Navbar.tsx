import styled from "styled-components";
import { useSetRecoilState } from "recoil";
import { isDarkAtom } from "atoms";
import { AiFillDollarCircle } from "react-icons/ai";
import { Link } from "react-router-dom";

const Nav = styled.nav`
  font-size: 18px;
  position: sticky;
  top: 0;
  /* z-index: 999; */
  height: 70px;
  background-color: transparent;
  /* box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.5); */
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.15);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const MenuContainer = styled.ul`
  width: 80%;
`;

const Menu = styled.ul`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
`;

export default function Navbar() {
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((prev) => !prev);
  return (
    <Nav>
      <MenuContainer>
        <Menu>
          <AiFillDollarCircle />
          Coin Tracker
        </Menu>
      </MenuContainer>
    </Nav>
  );
}
