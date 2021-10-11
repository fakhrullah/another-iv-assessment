Continue From [step by step implementation](./step-by-step-implementation)

### 2.4 Build Order App micro-service


- [ ] Build Order App micro-service
  - [x] Tech stack decision
  - [x] Connect to database - use postgresql
  - [ ] Create order
  - [ ] Get all order
  - [ ] Get an order
  - [ ] Update an order status

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