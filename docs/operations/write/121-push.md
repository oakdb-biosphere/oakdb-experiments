## Server-side atomic push

Previous State:

```js
{
  k: { v: ["A"] },
}
```

Command:

```js
{ op: "push", path: "/k/v", value: ["B"] }
```

Operations:

```cs
[SCAN] ("/k/v/[0-9]*") => last item => LAST_INDEX
[PUT] ("k/v/$LAST_INDEX", "B")
```

Key-Value store:

```cs
("/k/v/0", "A")
("/k/v/1", "B")
```

New State:

```js
{
  k: { v: ["A", "B"] },
}
```

Discussion:

- Is there an efficent operation to get the latest index from than scanning all subkeys?
