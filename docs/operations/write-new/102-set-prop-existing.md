## Setting prop on existing data

**Assumptions**

Current state is

```js
{ k: "bar", }
{ k: { "<uuid>": "bar" } }
```

`k` (string) is overwritten with an object.

```cs
// OPVMap
(("<uuid>", "k"), "bar")
// BiMap
("/k", "<uuid>")
```

**Operation**

```js
{ op: "set", path: "/k/foo", value: "bar" }
{ op: "set", path: "/k:foo", value: "bar" }
```

```js
{ op: "set", uuid: "3596a30bd69384624c11", prop: 'foo', value: "bar" }
```

**Description**

1. If operation is using `path`, get object uuid from BiMap lookup:

```cs
[GET] (("/k"))
[GET] (("/k/foo"))
```

2. Write to OPVMap:

```cs
[PUT] (("3596a30bd69384624c11", "type"), "oak")
```

Previous State:

New State:

```js
{ k: { foo: "bar" }, }
```

Must always issue a `DEL /<subpath>` operation before issuing a `PUT /<subpath>/<prop>`.

---

Key-Value store:

```cs
[DEL] ("/k", "bar")
[PUT] ("/k/foo", "bar")
```

Discussion:

It could be possible that two conflicting keys exist that both need to be deleted when overwriting a value, e.g.:

```cs
("/k", "bar")
("/k/foo", "bar")
("/k/foo/qux", "baz")
```

However, this state should never happen since writing `/k/foo` should have deleted `/k` first.
