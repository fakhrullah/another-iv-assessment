import { FastifyCorsOptions } from 'fastify-cors';

export const corsOptions = (): FastifyCorsOptions => ({
  origin: (origin, cb) => {
    // Allow is env development
    if (process.env.NODE_ENV === 'development') {
      cb(null, true);
      return;
    }

    // Allow localhost
    if (/localhost/.test(origin)) {
      cb(null, true);
      return;
    }

    cb(new Error('Not allowed'), false);
  },
});

export const postgresDatabaseOptions = () => ({
  client: 'pg',
  connection: process.env.POSTGRESQL_CONNECTION_STRING,
  pool: { min: 0, max: 2 },
  searchPath: ['knex', 'public'],
});
