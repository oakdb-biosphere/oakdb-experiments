## Setting prop on existing data

**Assumptions**

`k1` (string) is overwritten with an object.

Current state is

```js
{ root: { k1: "bar", } }
```

Desired state:

```js
{ root: { k1: { "k2": "bar" } } }
```

Internal:

```cs
// OPVMap
(("root", "k1"), "bar") -> (("k1", "k2"), "bar")
// BiMap
("/", "root")           -> ("/root", "k1")
```

**Operation**

```js
{ op: "set", path: "/root/k1", value: { "k2": "bar" } }
{ op: "set", path: "/root/k1:k2", value: "bar" }
{ op: "set", uuid: "root", prop: "k1", value: { "k2": "bar" }}
// { op: "set", uuid: "root", prop: "k1/k2", value: "bar" }
```

**Description**

1. If operation is using `path`, get object uuid from BiMap lookup:

```cs
[GET] (("/root/k1"))
[GET] (("/root"))
```

2. Write to OPVMap:

```cs
[DEL] (("root", "k1"))
[PUT] (("k1", "k2"), "bar")
```

3. Write to BiMap:

```cs
[DEL:LEFT] (("/"))
[DEL:RIGHT] (("root"))
[PUT] (("/root"), "k1")
```

Must always issue a `DEL /<subpath>` operation before issuing a `PUT /<subpath>/<prop>`.

<!--

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

-->
