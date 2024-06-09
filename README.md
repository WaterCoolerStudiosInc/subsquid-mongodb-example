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

# 3. Start the app and db via docker (make sure docker is running first)
sqd up

# The app/database can be reset via
sqd down

```

- The database can be accessed locally from `http://localhost:8081/db/aleph-indexer/`, after running sqd process
