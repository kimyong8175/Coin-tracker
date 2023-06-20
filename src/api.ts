const BASE_URL = `https://api.coinpaprika.com/v1/`;

export const fetchCoins = async () => {
  return await (await fetch(`${BASE_URL}coins`)).json();
};

export const fetchCoinInfo = async (coinId: string) => {
  return await (await fetch(`${BASE_URL}coins/${coinId}`)).json();
};

export const fetchCoinTickers = async (coinId: string) => {
  return await (await fetch(`${BASE_URL}tickers/${coinId}`)).json();
};

export const fetchCoinHistory = async (coinId: string) => {
  return await (
    await fetch(`https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`)
  ).json();
};
