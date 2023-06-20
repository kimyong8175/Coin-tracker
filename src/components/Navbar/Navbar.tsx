import styled from "styled-components";
import { useSetRecoilState } from "recoil";
import { isDarkAtom } from "atoms";
import { AiFillDollarCircle } from "react-icons/ai";
import { MdDarkMode } from "react-icons/md";
import { Link } from "react-router-dom";

const Nav = styled.nav`
  font-size: 18px;
  position: sticky;
  top: 0;
  height: 70px;
  background-color: transparent;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.15);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 75%;
`;

const IconContainer = styled(Link)`
  width: 60%;
  display: flex;
  justify-content: left;
  align-items: center;
`;

const Menu = styled.ul`
  width: 40%;
  display: flex;
  justify-content: right;
  align-items: center;
  text-align: center;
`;

export default function Navbar() {
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((prev) => !prev);
  return (
    <Nav>
      <NavContainer>
        <IconContainer to="/">
          <AiFillDollarCircle />
          <p>Coin Tracker</p>
        </IconContainer>
        <Menu>
          <MdDarkMode style={{ cursor: "pointer" }} onClick={toggleDarkAtom} />
        </Menu>
      </NavContainer>
    </Nav>
  );
}
