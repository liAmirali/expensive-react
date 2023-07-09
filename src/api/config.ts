import axios from "axios";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export const swrGlobalConfig = {
  refreshInterval: 3000,
  fetcher: fetcher,
};
