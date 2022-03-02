# All operations supported by OakDB

## Detailed explanation

- [**Write**](./write/index.md)
- [**Read**](./read/index.md)

See also:

- Explanation on [Unique global ids](../data-model/uuids.md).

## Summary

```js
[
  // ---------------------------------------------------------------------------
  // --- MVP
  // The MVP includes the basic functionality of OakDB.
  // ---------------------------------------------------------------------------

  // Write property and create document
  { op: "set", path: "/path/to/docs/<uuid>", prop: "text", value: "boo" },
  { op: "set", path: "/path/to/docs/<uuid>", value: { obj: "boo", v: "foo" } },
  { op: "set", id: "<uuid>", prop: "text", value: "boo" },
  { op: "set", id: "<uuid>", value: { obj: "boo", v: "foo" } },
  // If `id` is used the item must exist! Optionally all objects without a path, will be written to `/_uncategorized/*`

  // Replace folder with file and vice versa
  { op: "set", path: "/path/to/docs/foo", prop: "text", value: "boo" },
  { op: "set", path: "/path/to/docs", prop: "text", value: "boo" },
  { op: "set", path: "/path/to/docs/foo", prop: "text", value: "boo" },

  // Delete field or document or sub-tree
  { op: "set", path: "/path/to/docs/foo", prop: "text", value: null },
  { op: "set", path: "/path/to/docs/foo", value: null },
  { op: "set", path: "/path/to", value: null },

  // Basic queries of field, documents or sub-trees
  { op: "query", path: "/path/to/docs/<uuid>", prop: "text" },
  { op: "query", path: "/path/to/docs/<uuid>" },
  { op: "query", path: "/path/to/docs" },
  { op: "query", path: "/path" },

  // Basic subscribtion of field, documents or sub-trees
  { op: "subscribe", path: "/path/to/docs/<uuid>", prop: "text" },
  { op: "subscribe", path: "/path/to/docs/<uuid>" },
  { op: "subscribe", path: "/path/to/docs" },
  { op: "subscribe", path: "/path" },

  // Optional syntactic sugar:
  { op: "create", path: "/path/to/docs/<uuid>", value: { ... } },
  { op: "create", id: "<uuid>", value: { ... } },
  { op: "update", path: "/path/to/docs/<uuid>", prop: "text", value: "boo" },
  { op: "update", id: "<uuid>", prop: "text", value: "boo" },
  { op: "update", path: "/path/to/docs/<uuid>:text", value: "boo" },
  { op: "update", id: "<uuid>:text", value: "boo" },
  { op: "delete", path: "/path/to" },
  { op: "query", path: "/path/to/docs/<uuid>:text" },

  // ---------------------------------------------------------------------------
  // --- RC1
  // RC1 introduces joins and aggregations. Also, queries with depth.
  // ---------------------------------------------------------------------------

  // Queries with depth
  { op: "query", path: "/path/to/docs", depth: 0 },
  { op: "query", path: "/path/to/docs", depth: n },

  // Joins
  { op: "query", path: "/authors/<uuid>", join: ["author"] },
  { op: "query", path: "/people/<uuid>", join: ["friend", "posts"] },

  // Pagination (offset / limit)
  { op: "query", path: "/books/", offset: 20, limit: 10 },

  // ---------------------------------------------------------------------------
  // --- RC2
  // RC2 introduces indices.
  // ---------------------------------------------------------------------------

  // Path specific index
  {
    op: "index",
    path: "/articles",
    key: ["createdAt"], // or nested ["author/name"]
  },

  // Unique and reverse
  {
    op: "index",
    path: "/articles",
    key: ["createdAt"],
    unique: false,
    reverse: false, // Example: Lookup "\*@gmail.com"
  },

  // Global index
  {
    op: "index",
    key: ["_type"],
  },

  // Equality query
  { op: "query", path: "/people/", key: "eyes/color", value: "blue" },

  // Range query (can also be open ended by ommiting from/to)
  { op: "query", path: "/people/", key: "stats/IQ", from: 100, to: 150 },

  // Query with limit and offset
  {
    op: "query",
    path: "/people/",
    key: "stats/IQ",
    from: 100, to: 150,
    offset: 20, limit: 10
  },

  // 'Array include' query
  { op: "query", path: "/people/", key: "hobbies/*", value: "knitting" },

  // 'Array subfield' query
  { op: "query", path: "/people/", key: "friends/*/name", value: "pedro" },

  // 'Object subfield' query
  { op: "query", path: "/articles/", key: "authors/*/name", value: "pedro" },

  // String match query (* at the beggining requires reverse index)
  { op: "query", path: "/people/", key: "hobbies", value: "*ball" },

  // ---------------------------------------------------------------------------
  // RC3 introduces transactional moves and undo/redo
  // Also, at this point OakDB:
  // - introduces plugins and middleware for authentication.
  // - introduces replication and conflict resolution.
  // ---------------------------------------------------------------------------

];
```
