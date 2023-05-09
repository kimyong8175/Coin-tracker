import { fetchCoinHistory } from "api";
import React from "react";
import { useQuery } from "react-query";
import ApexChart from "react-apexcharts";
import styled from "styled-components";

const Container = styled.div`
  width: 40%;
`;

interface ChartProps {
  coinId: string;
}

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

function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );
  return (
    <Container>
      {isLoading ? (
        "loading..."
      ) : (
        <ApexChart
          type="line"
          series={[
            {
              name: "sales",
              data: data?.map((price) => price.close) ?? [],
            },
          ]}
          options={{
            theme: {
              mode: "dark",
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
            },
          }}
        />
      )}
    </Container>
  );
}

export default Chart;
