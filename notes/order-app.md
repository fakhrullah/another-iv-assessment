Continue From [step by step implementation](./step-by-step-implementation)

### 2.4 Build Order App micro-service


- [ ] Build Order App micro-service
  - [ ] Tech stack decision

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
- 
