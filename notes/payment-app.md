### 2.x Payment App


- [ ] Build Payment App micro-service
  - [ ] Tech stack decision
  - [ ] GET / - return nothing - but trigger /orders/:id/status - 'confirmed' or 'cancelled'


#### Tech stack

- Fastify because I familiar with on order-app
- No database will be used here - IRL: I will record everything
- No ESLint

#### Build docker

```
docker build -t payment_app_image .
```

```yaml
  payment_app:
    container_name: payment_app
    image: payment_app_image
    ports:
      - 4040:4040
    enviroment:
      NODE_ENV: 'development'
      ORDER_APP_URL: 'http://localhost:4000

```
