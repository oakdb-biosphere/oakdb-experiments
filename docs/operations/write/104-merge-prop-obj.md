## Setting an object as prop

Previous State:

```js
{
  k: { a: "oak", b: "cool" },
}
```

Command:

```js
{ op: "merge", path: "/k", value: { c: "much", d: "greatness" } }
```

Operations:

Same as set, but without `DELRANGE`:

```cs
[DEL] ("/k")
[PUT] ("/k/c", "much")
[DEL] ("/k") // uncessary could be removed by optimizer
[PUT] ("/k/d", "greatness")
```

Key-Value store:

```cs
("/k/a", "oak")
("/k/b", "cool")
("/k/c", "much")
("/k/d", "greatness")
```

New State:

```js
{
  k: { a: "oak", b: "cool", c: "much", d: "greatness" },
}
```
