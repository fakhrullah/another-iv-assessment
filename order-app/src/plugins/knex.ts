import fp from 'fastify-plugin';
import knex from 'knex';

async function dbConnector(fastify: any, options: any, next: any) {
  try {
    const db = knex(options);
    fastify.decorate('knex', db);
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = fp(dbConnector);
