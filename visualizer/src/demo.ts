// ../docs/operations/write-old/101-set-prop.md
// ../docs/operations/write-old/103-set-prop-obj.md
// ../docs/operations/write-old/121-push.md
// ../docs/operations/write-old/104-merge-prop-obj.md
// ../docs/operations/write-old/102-set-prop-existing.md
// ../docs/operations/write-old/110-delete.md
// ../docs/operations/write-old/105-set-prop-with-index.md
// ../docs/operations/write-old/120-increment.md

export const demo = [
  {
    title: "Write property and create document",
    examples: [
      {
        docs: import("../../docs/operations/write/101-set-prop.md"),
        code: `({ op: "set", path: "/path/to/docs/<uuid>", prop: "text1", value: "boo1" })`,
      },
      {
        docs: import("../../docs/operations/write/102-set-prop-existing.md"),
        code: `({ op: "set", path: "/path/to/docs/<uuid>", prop: "text2", value: "boo2" })`,
      },
      {
        docs: import("../../docs/operations/write/103-set-prop-obj.md"),
        code: `({ op: "set", path: "/path/to/docs/<uuid>", value: { obj: "boo", v: "foo" } })`,
      },
      {
        docs: import("../../docs/operations/write/101-set-prop.md"),
        code: `({ op: "set", id: "<uuid>", prop: "text", value: "boo" })`,
      },
      {
        docs: import("../../docs/operations/write/101-set-prop.md"),
        code: `({ op: "set", id: "<uuid>", value: { obj: "boo", v: "foo" } })`,
      },
      {
        docs: import("../../docs/operations/write/101-set-prop.md"),
        code: `({ op: "query", path: "/path/to/docs/<uuid>" })`,
        comment:
          "If id is used the item must exist! Optionally all objects without a path, will be written to /_uncategorized/*]",
      },
    ],
  },
  {
    title: "Replace folder with file and vice versa",
    examples: [
      {
        docs: import("../../docs/operations/write/101-set-prop.md"),
        code: `({ op: "set", path: "/path/to/docs/foo", prop: "text", value: "boo" })`,
      },
      {
        docs: import("../../docs/operations/write/101-set-prop.md"),
        code: `({ op: "set", path: "/path/to/docs", prop: "text", value: "boo" })`,
      },
      {
        docs: import("../../docs/operations/write/101-set-prop.md"),
        code: `({ op: "set", path: "/path/to/docs/foo", prop: "text", value: "boo" })`,
      },
    ],
  },
  {
    title: "Delete field or document or sub-tree",
    examples: [
      {
        docs: import("../../docs/operations/write/101-set-prop.md"),
        code: `({ op: "set", path: "/path/to/docs/foo", prop: "text", value: null })`,
      },
      {
        docs: import("../../docs/operations/write/101-set-prop.md"),
        code: `({ op: "set", path: "/path/to/docs/foo", value: null })`,
      },
      {
        docs: import("../../docs/operations/write/101-set-prop.md"),
        code: `({ op: "set", path: "/path/to", value: null })`,
      },
    ],
  },
  {
    title: "Basic queries of field, documents or sub-trees",
    examples: [
      {
        docs: import("../../docs/operations/read/001-query.md"),
        code: `({ op: "query", path: "/path/to/docs/<uuid>", prop: "text" })`,
      },
      {
        docs: import("../../docs/operations/read/001-query.md"),
        code: `({ op: "query", path: "/path/to/docs/<uuid>" })`,
      },
      {
        docs: import("../../docs/operations/read/001-query.md"),
        code: `({ op: "query", path: "/path/to/docs" })`,
      },
      {
        docs: import("../../docs/operations/read/001-query.md"),
        code: `({ op: "query", path: "/path" })`,
      },
    ],
  },
  {
    title: "Basic subscribtion of field, documents or sub-trees",
    examples: [
      {
        docs: import("../../docs/operations/write/101-set-prop.md"),
        code: `({ op: "subscribe", path: "/path/to/docs/<uuid>", prop: "text" })`,
      },
      {
        docs: import("../../docs/operations/write/101-set-prop.md"),
        code: `({ op: "subscribe", path: "/path/to/docs/<uuid>" })`,
      },
      {
        docs: import("../../docs/operations/write/101-set-prop.md"),
        code: `({ op: "subscribe", path: "/path/to/docs" })`,
      },
      {
        docs: import("../../docs/operations/write/101-set-prop.md"),
        code: `({ op: "subscribe", path: "/path" })`,
      },
    ],
  },
  {
    title: "Optional syntactic sugar:",
    examples: [
      {
        docs: import("../../docs/operations/write/101-set-prop.md"),
        code: `({ op: "create", path: "/path/to/docs/<uuid>", value: { ... } })`,
      },
      {
        docs: import("../../docs/operations/write/101-set-prop.md"),
        code: `({ op: "create", id: "<uuid>", value: { ... } })`,
      },
      {
        docs: import("../../docs/operations/write/101-set-prop.md"),
        code: `({ op: "update", path: "/path/to/docs/<uuid>", prop: "text", value: "boo" })`,
      },
      {
        docs: import("../../docs/operations/write/101-set-prop.md"),
        code: `({ op: "update", id: "<uuid>", prop: "text", value: "boo" })`,
      },
      {
        docs: import("../../docs/operations/write/101-set-prop.md"),
        code: `({ op: "update", path: "/path/to/docs/<uuid>:text", value: "boo" })`,
      },
      {
        docs: import("../../docs/operations/write/101-set-prop.md"),
        code: `({ op: "update", id: "<uuid>:text", value: "boo" })`,
      },
      {
        docs: import("../../docs/operations/write/101-set-prop.md"),
        code: `({ op: "delete", path: "/path/to" })`,
      },
      {
        docs: import("../../docs/operations/write/101-set-prop.md"),
        code: `({ op: "query", path: "/path/to/docs/<uuid>:text" })`,
      },
    ],
  },
];

export const initialCode = demo[0].examples[0].code;
