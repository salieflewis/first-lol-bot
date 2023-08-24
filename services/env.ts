import { config } from 'dotenv';
import { objectKeys } from '../utils';

config();

interface Env {
  ALCHEMY_KEY: string;
}

const env: Env = {
  ALCHEMY_KEY: process.env.ALCHEMY_KEY as string,
};

objectKeys(env).forEach((key) => {
  if (!env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
});

export default env;
