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
import { fetchCoinInfo, fetchCoinTickers } from "../api";
import {
  Container,
  Header,
  Loader,
  Overview,
  Button,
  Title,
  OverviewItem,
  Description,
  Tab,
  Tabs,
} from "../styles/coinStyles";

import Chart from "./Chart";
// import Price from "./Price";

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

interface RouterState {
  name: string;
}

function Coin() {
  const { coinId } = useParams() as { coinId: string };
  const location = useLocation();
  const name = location.state as RouterState;

  // const location = useLocation<{name: string}>();
  // const priceMatch = useMatch(`:${coinId}/price`);
  const chartMatch = useMatch(`:${coinId}/chart`);
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
            {/* <Tab isActive={priceMatch !== null}>
              <Link to={`/price`}>Price</Link>
            </Tab> */}
          </Tabs>

          <Routes>
            {/* <Route path={`/price`} element={<Price />} /> */}
            <Route
              path={`/${coinId}/chart`}
              element={<Chart coinId={coinId} />}
            />
          </Routes>
        </>
      )}
    </Container>
  );
}

export default Coin;
