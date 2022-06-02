import ServerApi from "./app/ServerApi";
import dotenv from "dotenv";

dotenv.config();

const server = new ServerApi(Number.parseInt(process.env.SERVER_PORT ?? '8523'));
