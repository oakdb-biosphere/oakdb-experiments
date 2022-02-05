## Server-side atomic increment

Previous State:

```js
{
  k: { v: 10 },
}
```

Command:

```js
{ op: "inc", path: "/k/v", value: 1 }
```

Operations:

```cs
[PUT] ("k/v", [[GET] ("/k/v") + value])
```

Key-Value store:

```cs
("/k/v", 11)
```

New State:

```js
{
  k: { v: 11 },
}
```
