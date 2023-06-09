import ApexChart from "react-apexcharts";
import { useQuery } from "react-query";
import { fetchCoinHistory } from "api";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "atoms";

import { useCoinId } from "./Coin";

const Container = styled.div`
  height: auto;
  width: 40%;
`;

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

export default function Price() {
  const { coinId } = useCoinId();
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );
  const isDark = useRecoilValue(isDarkAtom);

  return (
    <Container>
      {isLoading ? (
        "loading"
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              data:
                data?.map((price) => {
                  return {
                    x: new Date(price.time_close).toUTCString(),
                    y: [price.open, price.high, price.low, price.close],
                  };
                }) ?? [],
            },
          ]}
          options={{
            theme: {
              mode: isDark ? "dark" : "light",
            },
            chart: {
              type: "candlestick",
              height: 350,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            xaxis: {
              axisBorder: { show: false },
              axisTicks: {
                show: false,
              },
              labels: {
                show: false,
              },
              type: "datetime",
              categories: data?.map((price) =>
                new Date(price.time_close).toUTCString()
              ),
            },
            yaxis: {
              show: false,
              tooltip: {
                enabled: true,
              },
            },
            colors: ["#0fbcf9"],
            grid: {
              show: false,
            },
            tooltip: {
              y: {
                formatter: (value) => `$ ${value.toFixed(3)}`,
              },
            },
          }}
        />
      )}
    </Container>
  );
}
