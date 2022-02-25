# MVP

- Written in Rust
- Returns JSON and supports tree-like data model
- In-memory
- OpLog is written to disk
- Uses JSON over WebSocket as protocol
- Has subscription table but not optimization for query parameters (limit, offset, sort, etc.)
- Has create and set operation at path
- Has delete operation at path
- Has get item at path with depth
- Has query list of items at path
- Has a simple JS client
- Admin-only authentication via API Key in `/_api/0: { key: "AHKJSGDKJSGKJGDSJ" }`
- Runs with a single command: `brew install oakdb && oakdb --port=9563`

## Maybe

- Joins
- Plugins / middleware
- User claims `{ "write": ['/a/', '/b/'] }`
- `_user` table

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
