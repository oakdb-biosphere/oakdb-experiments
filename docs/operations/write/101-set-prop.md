## Setting a single prop

Command:

```js
{ op: "set", path: "/k", value: "oak" }
```

Operations:

```cs
[DEL] ("/")
[PUT] ("/k", "oak")
```

Key-Value store:

```cs
("/k", "oak")
```

New State:

```js
{
  k: "oak",
}
```

Discussion:

- `DEL "/"` is necessary to guarantee data consistency.
