import axios from "axios";

const BASE_URL = "https://shopping-back-end.minhtriet.dev/api"
const TOKEN = "eyJhbGciOiJIUzUxMiJ9eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE2OTI3MTA1MzEsImV4cCI6MTY5Mjc5NjkzMX0r_S0dZb2asxL1l3NeMarHB7XWClMNmzzRRJ7H3-489IR3JlyWc2AUPIUvUTkc8gHIpTGjTk6AqxWXxAE96WWHQ"

export const publicRequest = axios.create({
  baseURL: BASE_URL
})

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bear ${TOKEN}` }
})
