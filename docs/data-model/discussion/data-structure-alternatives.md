## Data structure 1

```js
{ db: "oak", prop: { foo: "bar" }, arr: ["A","B"] }
```

### Primary Index

```
("/db", "oak")
("/prop/foo", "bar")
("/arr/0", "A")
("/arr/1", "B")
```

## Data structure 2

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

### Secondary Index

```json
("<path>/<indexKey>", <id>)

("/articles/2022-01-22-11-59", 4)
("/articles/2022-01-23-05-36", 3)
("/articles/2022-01-22-03-32", 6)
```

### Relational Index

```json
("/articles/5", "/author/5")
("/articles/5", "/author/5")
("/articles/3", "/author/5")
```

```json
("/:_type", "collection")
("/:name", "root")
("/children:0:_id", 2)
("/children:1:_id", 3)
("/children:2:_id", 4)
("/children:3:_id", 5)
("/test:3:_id", "abc")
```
