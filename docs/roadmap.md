# MVP

- Written in Rust
- Returns JSON and supports tree-like data model
- In-memory
- OpLog is written to disk
- Uses JSON over (Web)Socket as protocol
- Has subscription table but not optimization for query parameters (limit, offset, sort, etc.)
- Has create and set operation at path
- Has delete operation at path
- Has get item at path with depth
- Has query list of items at path
- Has a simple JS client
- Admin-only authentication via API Key in `/_api/0: { key: "AHKJSGDKJSGKJGDSJ" }`
- Runs with a single command: `brew install oakdb && oakdb --port=9563`

## Not MVP

- Not a distributed DB
- Does not have multi-node replication
- Does not have secondary indices
- Does not have transactions
- Does not have a schema
- Does not expose OpLog
- No filtering or sorting
- No permissions and authentication
- No log compaction
- No WASM hot-swap

# RC1

- Joins
- Aggregations
- Queries with depth
- CLI tool for exports and imports

# RC2

- Introduces indices
- Filtering or sorting

# RC3

- Plugins and middleware for authentication.
- User claims `{ "write": ['/a/', '/b/'] }`
- `_user` table
- Special `_title` field and substitute path queries
- Schema and `_type`
- Transactional moves and undo/redo
- Fractional indexing

# RC4

- Distributed DB
- Exposed OpLog API
- Log compaction
- Replication and conflict resolution

# RC5

- Full text search
- Unikernel
- PaaS
