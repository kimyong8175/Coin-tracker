import { useQuery } from "react-query";
import { fetchCoinHistory } from "api";
import ApexChart from "react-apexcharts";
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

function Chart() {
  const { coinId } = useCoinId();
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );
  const isDark = useRecoilValue(isDarkAtom);

  return (
    <Container>
      {isLoading ? (
        "loading..."
      ) : (
        <div>
          <ApexChart
            type="line"
            series={[
              {
                name: "price",
                data: data?.map((price) => price.close) ?? [],
              },
            ]}
            options={{
              theme: {
                mode: isDark ? "dark" : "light",
              },
              chart: {
                width: 500,
                height: 500,
                toolbar: {
                  show: false,
                },
                background: "transparent",
              },
              grid: {
                show: false,
              },
              stroke: {
                curve: "smooth",
                width: 4,
              },
              yaxis: { show: false },
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
              fill: {
                type: "gradient",
                gradient: { gradientToColors: ["#0be881"], stops: [0, 100] },
              },
              colors: ["#0fbcf9"],
              tooltip: {
                y: {
                  formatter: (value) => `$ ${value.toFixed(3)}`,
                },
              },
            }}
          />
        </div>
      )}
    </Container>
  );
}

export default Chart;
