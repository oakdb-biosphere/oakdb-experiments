```js
[
  { op: "set", path: "/baz/<uuid>/text", value: "boo" },
  { op: "set", path: "/baz/<uuid>", value: { obj: "boo", v: "foo" } },
  { op: "set", path: "/f/a", value: "boo" },
  { op: "set", path: "/f/a", value: null },
  { op: "set", path: "/baz/d670460/text", value: "boo" },
  { op: "delete", path: "/baz/d670460" },
  { op: "query", path: "/baz/<uuid>/v" },
  { op: "query", path: "/foo", depth: 0 },
  { op: "query", path: "/foo", depth: n },
  { op: "query", path: "/people/", key: "/eyes/color", value: "blue" },
  { op: "query", path: "/people/", key: "/stats/IQ", from: 100, to: 150 },
  { op: "query", path: "/people/", key: "/hobbies/*", value: "knitting" },
  { op: "query", path: "/people/", key: "/friends/*/name", value: "pedro" },
  { op: "query", path: "/people/", key: "/friends/*/name", value: "pedro" },
  { op: "query", path: "/articles/", key: "/authors/*/name", value: "pedro" },
  { op: "query", path: "/authors/<uuid>", join: ["author"] },
  { op: "query", path: "/people/<uuid>", join: ["friend", "posts"] },
  { op: "query", path: "/people/", key: "/hobbies", value: "*ball" },
  { op: "query", path: "/foo/", offset: 20, limit: 10 },
  // { op: "setSortKey", path: "/articles", key: "createdAt" },
  {
    op: "setIndex",
    path: "/articles",
    key: ["createdAt"],
    unique: false,
    reverse: false,
  }, // Example: Lookup "\*@gmail.com"
];
```
