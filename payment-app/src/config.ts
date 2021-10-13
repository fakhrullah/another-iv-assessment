import dotenv from 'dotenv';

dotenv.config();

export interface ConfigModel {
  PORT: number,
}

const config: ConfigModel = {
  PORT: parseInt(process.env.PORT ?? '4040'),
};

export default config;
