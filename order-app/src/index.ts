import dotenv from 'dotenv';
import build from './app';

dotenv.config();

const app = build({});

app.listen(4000, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
