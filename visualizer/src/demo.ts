// docs: import("../../docs/operations/write-old/101-set-prop.md"),
// docs: import("../../docs/operations/write-old/103-set-prop-obj.md"),
// docs: import("../../docs/operations/write-old/121-push.md"),
// docs: import("../../docs/operations/write-old/104-merge-prop-obj.md"),
// docs: import("../../docs/operations/write-old/102-set-prop-existing.md"),
// docs: import("../../docs/operations/write-old/110-delete.md"),
// docs: import("../../docs/operations/write-old/105-set-prop-with-index.md"),
// docs: import("../../docs/operations/write-old/120-increment.md"),

export const demo = [
  {
    title: "Data model",
    examples: [
      {
        title: "Mental Model",
        docs: import("../../docs/data-model/readme.md"),
        final: true,
      },
    ],
  },
  {
    title: "Write property and create document",
    examples: [
      {
        title: "Create object at path",
        docs: import("../../docs/operations/write/100-create-obj.md"),
        code: `({ op: "create", path: "/things/", value: { a: 1, b:2 } })`,
        final: true,
      },
      {
        title: "Set property via id",
        docs: import("../../docs/operations/write/101-set-prop.md"),
        code: `({ op: "set", id: "<uuid>", prop: "b", value: "hi" })`,
        final: true,
      },
      {
        title: "Set multiple propertis via id",
        docs: import("../../docs/operations/write/103-set-prop-obj.md"),
        code: `({ op: "set", id: "<uuid>", value: { obj: "boo", v: "foo" } })`,
        final: true,
      },
    ],
  },
  {
    title: "Delete field or document or sub-tree",
    examples: [
      {
        docs: import("../../docs/operations/write/110-delete.md"),
        code: `({ op: "set", path: "/things/foo", prop: "text", value: null })`,
        final: true,
      },
      {
        docs: import("../../docs/operations/write/101-set-prop.md"),
        code: `({ op: "set", path: "/things/foo", value: null })`,
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
        code: `({ op: "query", path: "/things/<uuid>", prop: "text" })`,
      },
      {
        docs: import("../../docs/operations/read/001-query.md"),
        code: `({ op: "query", path: "/things/<uuid>" })`,
        comment:
          "If id is used the item must exist! Optionally all objects without a path, will be written to /_uncategorized/*]",
      },
      {
        docs: import("../../docs/operations/read/001-query.md"),
        code: `({ op: "query", path: "/things" })`,
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
        code: `({ op: "subscribe", path: "/things/<uuid>", prop: "text" })`,
      },
      {
        docs: import("../../docs/operations/write/101-set-prop.md"),
        code: `({ op: "subscribe", path: "/things/<uuid>" })`,
      },
      {
        docs: import("../../docs/operations/write/101-set-prop.md"),
        code: `({ op: "subscribe", path: "/things" })`,
      },
      {
        docs: import("../../docs/operations/write/101-set-prop.md"),
        code: `({ op: "subscribe", path: "/path" })`,
      },
    ],
  },
  {
    title: "Replace folder with file and vice versa",
    examples: [
      {
        title: "Override existing property with conflicting path",
        docs: import("../../docs/operations/write/102-set-prop-existing.md"),
        code: [
          `({ op: "set", path: "/things/foo/text", prop: "text", value: "hello" })`,
          `({ op: "set", path: "/things/foo", prop: "text", value: "hello" })`,
        ].join("\n"),
      },
      {
        docs: import("../../docs/operations/write/101-set-prop.md"),
        code: `({ op: "set", path: "/things/foo", prop: "text", value: "boo" })`,
      },
      {
        docs: import("../../docs/operations/write/101-set-prop.md"),
        code: `({ op: "set", path: "/things", prop: "text", value: "boo" })`,
      },
      {
        docs: import("../../docs/operations/write/101-set-prop.md"),
        code: `({ op: "set", path: "/things/foo", prop: "text", value: "boo" })`,
      },
    ],
  },
  {
    title: "Optional syntactic sugar:",
    examples: [
      {
        docs: import("../../docs/operations/write/101-set-prop.md"),
        code: `({ op: "create", path: "/things/<uuid>", value: { ... } })`,
      },
      {
        docs: import("../../docs/operations/write/101-set-prop.md"),
        code: `({ op: "create", id: "<uuid>", value: { ... } })`,
      },
      {
        docs: import("../../docs/operations/write/101-set-prop.md"),
        code: `({ op: "update", path: "/things/<uuid>", prop: "text", value: "boo" })`,
      },
      {
        docs: import("../../docs/operations/write/101-set-prop.md"),
        code: `({ op: "update", id: "<uuid>", prop: "text", value: "boo" })`,
      },
      {
        docs: import("../../docs/operations/write/101-set-prop.md"),
        code: `({ op: "update", path: "/things/<uuid>:text", value: "boo" })`,
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
        code: `({ op: "query", path: "/things/<uuid>:text" })`,
      },
    ],
  },
  {
    title: "Edge cases",
    examples: [
      {
        title: "Creating an empty document does nothing",
        // docs: import("../../docs/operations/write/103-set-prop-obj.md"),
        code: `({ op: "create", path: "/things/", value: {} })`,
      },
    ],
  },
  {
    title: "Discussions",
    examples: [
      {
        title: "Indexing",
        docs: import("../../docs/discussion/indexing.md"),
      },
      {
        title: "UUIDs",
        docs: import("../../docs/discussion/uuid.md"),
        final: false,
      },
      {
        title: "Log",
        docs: import("../../docs/discussion/log.md"),
      },
      {
        title: "Real-time",
        docs: import("../../docs/discussion/real-time.md"),
      },
      {
        title: "Special fields",
        docs: import("../../docs/discussion/special-fields.md"),
      },
      {
        title: "Storing parents",
        docs: import("../../docs/discussion/storing-parents.md"),
      },
    ],
  },
];

export const initialCode = demo[1].examples[0].code;
