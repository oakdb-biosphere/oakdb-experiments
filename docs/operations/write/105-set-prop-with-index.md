## Setting prop with index

Initial State:

```js
{
  articles: {
    id1: { year: 2022, t: "oak" },
    id2: { year: 2022, t: "cool" },
    id3: { year: 2021, t: "much" },
    id4: { year: 2023, t: "greatness" },
  },
}
```

Command:

```js
{ op: "setIndex", path: "/articles", key: "year" }
{ op: "set", path: "/articles/id1/year", value: 2024 }
```

Create index record in index meta table:

```cs
[PUT] ("/articles", "year", reverse=false, unique=false)
```

Operations:

```cs
[GET] ("/articles/id1/year") => PREVIOUS_YEAR
[DEL] ("/articles/id1")
[PUT] ("/articles/id1/year", 2024)
```

Key-Value store:

```cs
("/articles/id1/year", 2024)
("/articles/id1/t", "oak")
("/articles/id2/year", 2022)
("/articles/id2/t", "cool")
("/articles/id3/year", 2021)
("/articles/id3/t", "much")
("/articles/id4/year", 2023)
("/articles/id4/t", "greatness")
```

Index Before:

```cs
("/articles/2022", ["id1","id2"])
("/articles/2021", ["id3"])
("/articles/2023", ["id4"])
```

Operations:

- Iterate over `/articles/$PREVIOUS_YEAR`
- Find `id1` in linked list
- Delete `id1` from linked list
- Create new index entry: `[APPEND] ("/articles/$value", "id1")`

All necessary inforamation can be derived from the index meta table and the operation.

Index After:

```cs
("/articles/2024", "id1")
("/articles/2022", "id2")
("/articles/2021", "id3")
("/articles/2023", "id4")
```

Discussion:

- For a unique index, the index table will only contain one entry per key. A B-Tree seems to be the most appropriate data structure for this.

- For a non-unique index, the index table will contain multiple entries per key. A combination of a B-Tree and a linked list seems to be the most appropriate data structure for this.

- If the linked list is sorted, meaning it is replaced with a self-balancing binary search tree, the additional lookup time for finding a single entry will be reduced to O(log n).

- The reason hash maps are not suitable is that they result in random memory accesses rather than loading "pages" of data into memory.

- A common "trick" for non-unqiue indexes is to use a hidden second auto-incrementing key that guarantees uniqueness.
