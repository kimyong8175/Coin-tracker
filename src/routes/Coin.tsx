// import React, { useState } from "react";
import React from "react";
import { useQuery } from "react-query";
import {
  Routes,
  Route,
  useLocation,
  useParams,
  Link,
  useMatch,
} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import { fetchCoinInfo, fetchCoinTickers } from "../api";

import Chart from "./Chart";
import Price from "./Price";

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

const Button = styled.button`
  background-color: rgba(0, 0, 0, 0.5);
  color: ${(props) => props.theme.textColor};
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.textColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Overview = styled.div`
  width: 40vw;
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  width: 40vw;
  margin: 20px 0px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
  width: 40vw;
`;

const Tab = styled.span<{ isActive: boolean }>`
  width: 100%;
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;

interface RouteParams {
  coinId: string;
}

interface RouteState {
  name: string;
}

// interface Itag {
//   id: string;
//   name: string;
//   coin_counter: number;
//   ico_counter: number;
// }

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  // tags: Itag[];
  // team: object;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

function Coin() {
  const { coinId } = useParams() as { coinId: string };
  const location = useLocation();
  const { name } = location.state;
  // const { state } = useLocation<{name: string}>();
  const priceMatch = useMatch("/:coinid/price");
  const chartMatch = useMatch("/:coinid/chart");
  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
    ["info", coinId],
    () => fetchCoinInfo(coinId),
    {
      refetchInterval: 1000,
    }
  );
  const { isLoading: tickersLoding, data: tickersData } = useQuery<PriceData>(
    ["ticker", coinId],
    () => fetchCoinTickers(coinId),
    {
      refetchInterval: 5000,
    }
  );

  const loading = infoLoading || tickersLoding;

  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <Container>
      <Helmet>
        <title>{name ? name : loading ? "Loading..." : infoData?.name}</title>
      </Helmet>
      <Header>
        <Title>{name ? name : loading ? "Loading..." : infoData?.name}</Title>
        <Button onClick={handleGoBack}>Go Back</Button>
      </Header>

      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price:</span>
              <span>{tickersData?.quotes.USD.price.toFixed(3)}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{tickersData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{tickersData?.max_supply}</span>
            </OverviewItem>
          </Overview>

          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
          </Tabs>

          <Routes>
            <Route path={`/:coinId/price`} element={<Price />} />
            <Route
              path={`/:coinId/chart`}
              element={<Chart coinId={coinId} />}
            />
          </Routes>
        </>
      )}
    </Container>
  );
}

export default Coin;
