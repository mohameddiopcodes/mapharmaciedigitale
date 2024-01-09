import axios from "axios";

export default function fetchUser(user: Record<string, any>) {
  return axios.post("/api/user", user);
}
