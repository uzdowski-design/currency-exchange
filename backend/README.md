# CURRENCY EXCHANGE BACKEND

## Description

NestJs with TypeScript very simple aplication for providing cached currency exchange rate.

## API Endpoints

**GET** `http://localhost:4000/exchange-rate` - get current EUR to PLN exchange rate and cache it for 60sec.

**POST** `http://localhost:4000/transaction`- create transaction (exchange EUR to PLN at current, cached rate).

**GET** `http://localhost:4000/transaction`- get a list of all transactions

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
