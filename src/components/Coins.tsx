import { Link, useOutletContext } from "react-router-dom";
import { useQuery } from "react-query";
import { Helmet } from "react-helmet";
import { fetchCoins } from "api";
import {
  Container,
  CoinsList,
  Coin,
  Img,
  Loader,
  Title,
  Header,
} from "../styles/coinsStyles";

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

interface IToggleProps {
  themeToggler: () => void;
}

function Coins() {
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);
  const { themeToggler }: IToggleProps = useOutletContext();

  return (
    <Container>
      <Helmet>
        <title>Coin</title>
      </Helmet>
      <Header>
        <Title>Coin</Title>
        <button onClick={themeToggler}>Toggle Dark Mode</button>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinsList>
          {/* state: { name: coin.name }, */}
          {data?.slice(0, 50).map((coin) => (
            <Coin key={coin.id}>
              <Link to={`${coin.id}`} state={{ name: coin.name }}>
                <Img
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLocaleLowerCase()}`}
                  alt={coin.name}
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}

export default Coins;
