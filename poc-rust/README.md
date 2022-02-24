# Rust PoCs

```bash
cargo build
cargo run --bin bimap
cargo run --bin quickjs
cargo run --bin commitlog
cargo run --bin cli -- --name foo
```

WASM:

- https://github.com/wasmerio/wasmer
- https://docs.wasmer.io/integrations/rust/setup
- https://github.com/wasmerio/wasmer/blob/master/examples/wasi.rs

## WS Server

```bash
# Terminal 1:
cargo r --bin ws

# Terminal 2:
brew install websocat
curl -X POST 'http://localhost:8000/register' -H 'Content-Type: application/json' -d '{ "user_id": 1 }'
websocat ws://127.0.0.1:8000/ws/81494a5bc1e0455dbcd3b8221474851f

# Terminal 3:
curl -X POST 'http://localhost:8000/publish' \
    -H 'Content-Type: application/json' \
    -d '{"user_id": 1, "topic": "cats", "message": "are awesome"}'
```
