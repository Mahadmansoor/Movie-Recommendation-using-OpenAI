import { config } from "dotenv";

function Api() {
  config();
  console.log(process.env.API_URL);
}
export default Api;
