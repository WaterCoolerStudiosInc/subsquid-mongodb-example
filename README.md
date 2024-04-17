# Kintsu indexer

This indexer uses subsquid as a basis,

For more details, inspect [Squid SDK docs](https://docs.subsquid.io/), including the [dedicated page on Ink! support](https://docs.subsquid.io/substrate-indexing/wasm-support) and the [Ink! indexing tutorial](https://docs.subsquid.io/tutorials/create-a-wasm-processing-squid/).

Dependencies: Node.js v16 or newer, Git, Docker.

## Quickstart local development

```bash
# 0. Install @subsquid/cli a.k.a. the sqd command globally
npm i -g @subsquid/cli

# 1. Install dependencies
npm install

# 3. Start the mongo db via docker (make sure docker is running first)
sqd up

# 4. Build and run the project
sqd process

# 5. Build and run the graphql server
cd graphql
npm run build
npm run dev

```

- The database can be accessed locally from `http://localhost:8081/db/aleph-indexer/`, after running sqd process

- GraphQl explorer can be accessed locally from `http://localhost:3001/graphql` once thats running. Running a query will quickly tell you if things are working properly

## Development guide

When changing the variables stored to the database within main.ts, we must also change the corresponding model within graphql/models and the type definition within graphql/type-defs, that correspond with the correct collection. When adding a new collection, we must add a : resolver, type-def, and model within the graphql substructure. Ideally we should auto generate all of this somehow,

## Notes

- Subsquid gateways for aleph zero can be found at:
  https://v2.archive.subsquid.io/network/aleph-zero
  https://v2.archive.subsquid.io/network/aleph-zero-testnet
