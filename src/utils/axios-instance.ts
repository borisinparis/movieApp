import axios from "axios"

export const axiosInstance = axios.create({
  baseURL: `https://api.themoviedb.org/3`,
  params: {
    api_key:"877ff59e9c1c2cdcec5fb423b387b410",
  },
});