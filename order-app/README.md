# Order App

A micro-service that handle orders.

## How to run locally

1. Clone the git repository. `git clone git@github.com:fakhrullah/another-iv-assessment.git`
2. Move into Order App dir. `mv another-iv-assessment/order-app`
3. Install packages. `npm install`
4. Run the app with environments.
   
   Development - to prevent any cors error.

    ```console
    POSTGRESQL_CONNECTION_STRING='postgres://<username>:<password>@<db-host>/<database>' npm run dev
    ```

    Production - not ready yet - recommend use docker
    ```
    npm run build
    
    POSTGRESQL_CONNECTION_STRING='postgres://<username>:<password>@<db-host>/<database>' npm start
    ```

## How to run with docker

# Running tests

Run test with command:

```console
npm run test
```
