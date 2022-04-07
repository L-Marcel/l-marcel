import axios from "axios";

export const api = axios.create({
  headers: {
    "Authorization": "Bearer " + process.env.GITHUB_PERSONAL_ACCESS_TOKEN
  }
});