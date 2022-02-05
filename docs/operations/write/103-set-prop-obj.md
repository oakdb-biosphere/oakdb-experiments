## Setting an object as prop

Command:

```js
{ op: "set", path: "/k", value: { a: "oak", b: "cool" } }
```

Operations:

```cs
[DELRANGE] ("/k", "/k~")
[PUT] ("/k/a", "oak")
[PUT] ("/k/b", "cool")
```

Key-Value store:

```cs
("/k/a", "oak")
("/k/b", "cool")
```

New State:

```js
{
  k: { a: "oak", b: "cool" },
}
```
