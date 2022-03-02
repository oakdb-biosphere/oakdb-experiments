## Deleting a prop or subtree

Delete a property from on object. If the last property is deleted, the object is removed.

**Operation**

```js
{ op: "set", id: "<uuid>", prop: "a", value: null }

```

**Description**

Previous State:

```js
{
  k: { a: "oak", b: "cool" },
}
```

Command:

```js
{ op: "delete", path: "/k/a" }
// is syntactic sugar for
{ op: "set", path: "/k/a", value: null }
```

Operations:

```cs
[DELRANGE] ("/k/a", "/k/a~")
```

Key-Value store:

```cs
("/k/b", "cool")
```

New State:

```js
{
  k: { b: "cool" },
}
```
