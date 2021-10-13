import dotenv from 'dotenv';
import build from './app';
import { corsOptions, postgresDatabaseOptions } from './configs/fastify_plugin_configs';

dotenv.config();

const app = build({
  corsOptions: corsOptions(),
  knexOptions: postgresDatabaseOptions(),
});

app.listen(4000, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
