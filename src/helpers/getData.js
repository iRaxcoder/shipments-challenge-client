const BASE_URL =
  "https://shipments-challenge-server.vercel.app/shipments-administration-api";
export const getDataFromUrl = async (query) => {
  const url = BASE_URL + query;

  const resp = await fetch(url);

  if (resp.status !== 200) {
    return -1;
  }

  const data = await resp.json();

  return data;
};
