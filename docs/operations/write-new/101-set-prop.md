## Setting a single prop

**Operation**

```js
{ op: "set", path: "/a/b/field", value: "oak" } // ???
```

```js
{ op: "set", uuid: "3596a30bd69384624c11", prop: 'field', value: "oak" }
```

**Description**

1. If operation is using `path`, get object uuid from BiMap lookup:

```cs
[GET] (("/a/b"))
[GET] (("/a/b/field"))
```

Lookup full path and basepath - we don't know if `field` is a property or part of the path.

2. Write to OPVMap:

```cs
[PUT] (("3596a30bd69384624c11", "field"), "oak")
```

3. No write to BiMap needed

**New State:**

```js
{
  a: {
    b: {
      field: "oak";
    }
  }
}
```

# Discussion

**Discussion on paths:**

If the path had a special syntax where path and property are easily distinguishable,
we could skip one lookup in the OPVMap.

```js
{ op: "set", path: "/a/b:field", value: "oak" }
```

**Discussion on values:**

OakDB requires each document to be representable as a key-value map, so receiving a single value `"oak"`, would tell us, that `field` can not be a document, but has to be a property:

```js
{ op: "set", path: "/a/b/field", value: "oak" }
{ op: "set", path: "/a/b", value: { field: "oak" } }
```
