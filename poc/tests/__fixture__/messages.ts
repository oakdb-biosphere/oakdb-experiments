export default [
  // Write property and create document
  { op: "set", path: "/path/to/docs/<uuid>", prop: "text", value: "boo" },
  { op: "set", path: "/path/to/docs/<uuid>", value: { obj: "boo", v: "foo" } },
  { op: "set", id: "<uuid>", prop: "text", value: "boo" },
  { op: "set", id: "<uuid>", value: { obj: "boo", v: "foo" } },

  // If id is used the item must exist! Optionally all objects without a path, will be written to /_uncategorized/*

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
  {
    op: "create",
    path: "/path/to/docs/<uuid>",
    value: {
      /*...*/
    },
  },
  {
    op: "create",
    id: "<uuid>",
    value: {
      /*...*/
    },
  },
  { op: "update", path: "/path/to/docs/<uuid>", prop: "text", value: "boo" },
  { op: "update", id: "<uuid>", prop: "text", value: "boo" },
  { op: "update", path: "/path/to/docs/<uuid>:text", value: "boo" },
  { op: "update", id: "<uuid>:text", value: "boo" },
  { op: "delete", path: "/path/to" },
  { op: "query", path: "/path/to/docs/<uuid>:text" },
];
