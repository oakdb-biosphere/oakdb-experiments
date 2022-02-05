## Setting prop on existing data

Previous State:

```js
{
  k: "oak",
}
```

Command:

```js
{ op: "set", path: "/k/foo", value: "bar" }
```

Must always issue a `DEL /<subpath>` operation before issuing a `PUT /<subpath>/<prop>`.

Key-Value store:

```cs
[DEL] ("/k", "oak")
[PUT] ("/k/foo", "bar")
```

New State:

```js
{
  k: { foo: "bar" },
}
```

Discussion:

It could be possible that two conflicting keys exist that both need to be deleted when overwriting a value, e.g.:

```cs
("/k", "oak")
("/k/foo", "bar")
("/k/foo/qux", "baz")
```

However, this state should never happen since writing `/k/foo` should have deleted `/k` first.
