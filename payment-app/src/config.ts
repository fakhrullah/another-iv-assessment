import dotenv from 'dotenv';

dotenv.config();

export interface ConfigModel {
  PORT: number,
  ORDER_APP_URL: string
}

const config: ConfigModel = {
  PORT: parseInt(process.env.PORT ?? '4040'),
  ORDER_APP_URL: process.env.ORDER_APP_URL ?? 'http://localhost:4000',
};

export default config;
