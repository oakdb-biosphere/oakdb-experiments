## Data structure

```js
{
  k: "oak",
  obj: {
    foo: "bar",
    qux: "baz",
  },
  winners: {
    id1: { year: "2021", name: "John" },
    id2: { year: "2022", name: "Jane" },
    id3: { year: "2022", name: "Jack" },
  },
  arr: ["A","B","C"],
}
```

### Primary Index

`(<path>, <value>)`

```cs
("/k", "oak")
("/obj/foo", "bar")
("/obj/qux", "baz")
("/obj/sub/quux", "quuz")
("/winners/id1/year", "2021")
("/winners/id1/name", "John")
("/winners/id2/year", "2022")
("/winners/id2/name", "Jane")
("/winners/id3/year", "2022")
("/winners/id3/name", "Jack")
("/arr/0", "A")
("/arr/1", "B");
("/arr/2", "B");
```

### Secondary Index

`(<path>/<indexedValue>, <id>)`

```cs
("/winners/2021", "id1")
("/winners/2022", "id2")
("/winners/2022", "id3")
```
