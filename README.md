# WASM squid template (FireSquid edition)

This is a squid template for indexing Ink!-based contracts, supported e.g. by the Astar and Shibuya network.
This template indexes a sample ERC-20 Ink!-based smart contract token transfers over the [Shibuya network](https://docs.astar.network/docs/quickstart/endpoints) and serves them via graphql API.

For more details, inspect [Squid SDK docs](https://docs.subsquid.io/), including the [dedicated page on Ink! support](https://docs.subsquid.io/substrate-indexing/wasm-support) and the [Ink! indexing tutorial](https://docs.subsquid.io/tutorials/create-a-wasm-processing-squid/).

Dependencies: Node.js v16 or newer, Git, Docker.

## Quickstart

```bash
# 0. Install @subsquid/cli a.k.a. the sqd command globally
npm i -g @subsquid/cli

# 1. Retrieve the template
sqd init my_squid_name -t frontier-evm
cd my_squid_name

# 2. Install dependencies
npm ci

# 3. Start a Postgres database container and detach
sqd up

# 4. Build the project
sqd build

# 5. Start both the squid processor and the GraphQL server
sqd run .
```

A GraphiQL playground will be available at [localhost:4350/graphql](http://localhost:4350/graphql).

You can also start squid services one by one:

```bash
sqd process
sqd serve
```

## Dev flow

### 1. Define database schema

Start development by defining the schema of the target database via `schema.graphql`.
Schema definition consists of regular graphql type declarations annotated with custom directives.
Full description of `schema.graphql` dialect is available [here](https://docs.subsquid.io/store/postgres/schema-file/).

### 2. Generate TypeORM classes

Mapping developers use TypeORM [EntityManager](https://typeorm.io/#/working-with-entity-manager)
to interact with target database during data processing. All necessary entity classes are
generated by the squid framework from `schema.graphql`. This is done by running `sqd codegen`
command.

### 3. Generate database migrations

All database changes are applied through migration files located at `db/migrations`.
`squid-typeorm-migration(1)` tool provides several commands to drive the process.

```bash
## drop create the database
sqd down
sqd up

## replace any old schemas with a new one made from the entities
sqd migration:generate
```

See [docs on database migrations](https://docs.subsquid.io/basics/db-migrations) for more details.

### 4. Import ABI contract and generate interfaces to decode events

It is necessary to import the respective ABI definition to decode WASM logs. For this template we used standard ERC20 interface, see [`abi/erc20.json`](abi/erc20.json).

To generate a type-safe facade class to decode EVM logs, use [`squid-ink-typegen(1)`](https://github.com/subsquid/squid-sdk/tree/master/substrate/ink-typegen):

```bash
npx squid-ink-typegen --abi abi/erc20.json --output src/abi/erc20.ts
npx squid-ink-typegen --abi abi/vault.json --output src/abi/vault.ts
```

## Project conventions

Squid tools assume a certain [project layout](https://docs.subsquid.io/basics/squid-structure):

- All compiled js files must reside in `lib` and all TypeScript sources in `src`.
  The layout of `lib` must reflect `src`.
- All TypeORM classes must be exported by `src/model/index.ts` (`lib/model` module).
- Database schema must be defined in `schema.graphql`.
- Database migrations must reside in `db/migrations` and must be plain js files.
- `sqd(1)` and `squid-*(1)` executables consult `.env` file for environment variables.

https://v2.archive.subsquid.io/network/aleph-zero │
https://v2.archive.subsquid.io/network/aleph-zero-testnet
