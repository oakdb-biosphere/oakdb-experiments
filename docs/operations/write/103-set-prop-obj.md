## Setting an object as prop

**Assumptions**

`k1` (object) is overwritten with a string.

Current state is

```js
{ root: { k1: { "k2": "bar", "k3": "foo" } } }
```

Desired state:

```js
{ root: { k1: "bar", } }
```

Internal:

```cs
// OPVMap
(("k1", "k2"), "bar"), (("k1", "k3"), "foo") -> (("root", "k1"), "bar")
// BiMap
("/root", "k1") -> ("/", "root")
```

**Operation**

```js
{ op: "set", path: "/root:k1", value: "bar" }
{ op: "set", uuid: "root", prop: "k1", value: "bar" }
```

**Description**

1. If operation is using `path`, get object uuid from BiMap lookup:

```cs
[GET] (("/root/k1"))
[GET] (("/root"))
```

2. Write to OPVMap:

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
