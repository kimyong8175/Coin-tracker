import styled from "styled-components";

const Container = styled.div`
  padding: 0px 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Header = styled.header`
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const CoinsList = styled.ul``;
const Coin = styled.li`
  background-color: white;
  color: ${(props) => props.theme.textColor};
  padding: 20px;
  border-radius: 20px;
  margin-bottom: 15px;
  width: 50vw;
  display: flex;
  align-items: center;

  a {
    display: flex;
    align-items: center;
  }

  &:hover {
    a {
      display: flex;
      align-items: center;
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
  font-weight: 600;
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Img = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

export { Container, CoinsList, Coin, Img, Loader, Title, Header };
