Continue From [step by step implementation](./step-by-step-implementation)

### 2.4 Build Order App micro-service


- [ ] Build Order App micro-service
  - [x] Tech stack decision
  - [x] Connect to database - use postgresql
  - [x] Create order
  - [x] Get all order
  - [x] Get an order
  - [x] Update an order status
  - [ ] Trigger payment after order created

#### Tech stack

I am going to use tech that easiest for me to make thing works first.

- Fastify - Because I think Express is too old & fastify is best performance nodejs backend. I tried fastify, but I use Express a lot more. For simple backend, I dont think using fastify will slow me down.
- Setup to use typescript

- Create all routes for API
  1. Create an order - POST /orders
  2. Cancel an order - PUT /orders - body: {status: cancel}
  3. Check order status - GET /orders/:id/ - an order do not contain too much data, sending all detail is good.
    But let say, we want to get only status no other detail. Using graphQL is better.
    In real life, this going to be bigger: what if we want multiple orders but only on totalPrice & status?
    The solution is to send body with more data: {filter: [status, totalPrice], ids: [wed32e3, 3wd322e, 3ww3e3] }.
    For the case, proper documentation should be created before implementation.
  4. Fetch all - GET /orders
  5. Fetch one by id - GET /orders/:id
- Here I will only create routes for 1,2,4,5 - order status can be get from fetch an order
- To demo how I manage files for better management code, here I create folders to group things.
  But, if my real workflow is I will not create folders untill I have too many files or things will be easier if group in folder.

- Use linter - airbnb typescript style - because strict is better for mentainance

- Order model can be same with the frontend (order-portal). But here, I purposely use slightly different model,
  to demo, how frontend can deal when send data is not as expected.
  
  See [data-structure](./step-by-step-implementation.md#22-data-structure) for data detail

- Add openapi for HTTP API documentation
- Using VSCode OpenAPI extension to easily view OpenAPI documentation
- Assume request to Order App is coming through API Gateway. API gateway will take user request & check auth & then modify it by extending with `token` in format `{ userId: 'example-user-id' }`

- Add database to store data. Will use postgresql.
- I want to use knexjs to make it easier to build query. But I think I gonna need to read more on how to implement it.
- ~~The problem with Typescript is not many JavaScript library creator spend time to make their package working good with typescript.~~
- ~~This is the part I hate with typescript, you need to find how to use it with typescript, but with JavaScript any typescript can work.~~
- ~~But of course, type is good for long-term project. Code readability.~~
- ~~So, I am going to use fastify-postgres & write postgres query for query to database.~~
- Somehow I can make it work by refering to this repo: https://github.com/dixonsatit/fastify-typescript/blob/master/src/index.ts
- And also, add type as I think how it should be done. Not confidence.
- I struggle to get connection to postgresql database. Then I notice from Knexjs documentation, I did not install `pg` package.
- So, successfully setup connection to database.

> Refer `.env` file for postgres database setup
> Use environment `POSTGRESQL_CONNECTION_STRING` to connect to database

```
POSTGRESQL_CONNECTION_STRING='postgres://<username>:<password>@<db-host>/<database>'
```

- Having hard time to implement mock knex with Fastify.
- Cannot mocking database mean cannot test http routes that use `fastify.knex`.
- So, testing integration for CRUD is not possible. Will try again later if I have more times.

- Create free postgresql database at [ElephatSQL](https://www.elephantsql.com/)
- Connect to postgresql
- Add knex migration
- Use `knexjs` for query builder because I think it more easier & safer compare to raw SQL

- Add migrations & seeders
- Migration must be run to postgresql ONLY because the function `uuid` is only for postgresql
- Order Status seed must be run as it is default status.
- But for the demo, run all seeders so that we will have some samples to work with.
- `knex migrate:latest`
- `knex seed:run`

- having hard time to setup for database here
- Because, as a small company, I focus on building thing faster, then refactor later. So, I usually use headless CMS (StrapiJS) or
  backend as a service, BAAS (Parse-server)
- Those handle database connection & has ORM.

#### Get all orders

- GET /orders - get all orders, auth-token in header MUST contain user_id
- When you query from database, the data will always return in rows. But, I want it to become Object that contains certain key with array of data.
- Here, the query leftJoin order_detail will return array of order_detail `order_detail`
- I want it to become `order{..., itemDetail[], }`
- To do this, I have to map the data. And think of algorithm to loop the data and do the grouping.
- If, I do that, it gonna take a lot of time.
- So, I query 2 times, `order` & `order_detail`. Then, group `order_detail` with same `order.id`

- Fix query created_at, updated_at key overwrite when use `join()`

#### Get an order

- GET /orders/:id - return an order

#### Create new order

- POST /orders
- Lot of manual coding. Examples:
  - Mapping received data into data that model that can be insert in postgres,
  - In real life, those MUST be refactor with an standardize functions or library (if there is one)
  - Only after refactor finish, code can be considered as complete (Definition of DONE)

#### Update order

- PUT /orders/:id/status
- Update status ONLY



#### Trigger payment

- When Order is created - POST /orders
- Send request to payment service at the backend - So, do not wait for respond
- Payment service received request
- Payment service send response to update Order status - PUT /orders/:id/status

- One more thing: nearly missed this requirement: 
  > After X amount of seconds confirmed orders should automatically be moved to the delivered state.
- In GET /orders/:id/status - if confirmed - use setTimeout X seconds change to delivered

#### Code quality

- Should refactor
- A lot code should be re-usable
- But NOT going to do here, because time not allowed
- This gonna be more beautiful if using event-sourcing (RabbitMQ, Google pub-sub) which adding more new things to learn
- 