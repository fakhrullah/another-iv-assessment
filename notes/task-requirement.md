

# Task requirements

To build: 

1. Orders Application - a backend micro-service
2. Payments Application - backend micro-service
3. A small SPA using React for orders managements

## 1. Orders Application

1. A micro-service
2. Use NodeJS
3. Responsible for orders management
4. Each order - single state 
5. Order states
    - created
    - confirmed
    - delivered
    - cancelled
6. **After order was created Orders App should trigger Payments. App call to process a payment for the current order. ????**
    - If I were going to build this, I will let Order created with state 'waiting-payment'. Then, the Payment Application is will trigger the Order Application to update the state of order.
    - Payment is trigger by user action -> Payment App update order state in Order App
    - But, I am not going to change the requirement here. I assume this test, implementation connecting micro-service with micro-service.
7.  Assume that Orders already store an Auth information of the user, so include auth token (in any format)
8.  Should have endpoints to:
    -  Create an order
    -  cancel an order
    -  check order status

## 2. Payments Application

1. A micro-service
2. Use NodeJS
3. Responsible for payment processing
4. **Should** handle request from Order App to verify payment transaction - confirmed OR decline an order
5. Logic behind the payment processing - return random result to the Order App

## 3. A small SPA using React for orders managements

1. SPA using React
2. UI for orders management
3. Stories:
   * As a User, I should be able to see an orders list with corresponding data
   * As a User, I should be able to open order page with the detail information about the order
   * As a User, I should be able to cancel an order
   * As a User, I should be able to create an order
4. The frontend task is deeply depends on the Backend implementation. 
   - I do not agree with this.
   - As long as you get agreement on how data structured between frontend dev & backend dev, frontend dev can start development with depend on backend
5. Monitoring may be implemented with long polling
   - This is easier compare to using web socket
   - But long-polling will put a burden to the backend. But with Kubernetes autoscaling will prevent system down
6. Using **state machine** is **highly encouraged**
7. Using popular pub/sub libraries (**RxJS**) for data flow is **highly encouraged**

## General scenario for backend

1. Calling Orders App endpoint to create an Order
2. An order should be created in DB with the created state
3. Order App makes a call to Payment App with the order information & mocked auth details
4. Payment App processes an order (logic can be mocked) and returns random - 'confirmed' or 'declined'
5. Order App update order ased on the response from the Payment App
   1. declined => moves order to the cancelled state
   2. confirmed => moves order to the confirmed state
6. After X amount of seconds confirmed orders should automatically be moved to the delivered state.

## Expected end product

* Using NodeJS framework. (Bonus: use typescript framework based, eg: NestJS)
* Unit tests are written. (Bonus: integration test)
* Proof of cloud-deployable infrastructure (e.g. using Kubernetes Helm Chart, Configmap, Terraform, Cloudformation etc)
* Task should be completed with the all necessary practices in your opinion: code style, lint, test etc
* Feel free to use your creativity to accomplist the task

Next: [Step by step of implementation note](step-by-step-implementation.md)

