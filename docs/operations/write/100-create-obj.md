## Creating a new node

Creates a new node `value` under a given `path`.

**Operation**

```js
{ op: "create", path: "/things/", value: { a: 1 } }
```

**Description**

1. Generate new `uuid` where `uuid := hash(path + autoincrement)`
2. Write `value` to OPVMap
3. Write mapping from `path` to `uuid` BiMap - Auto increments avoids collisions.
4. Return new `id`

<!-- createObject({ id: `__uuid__`, createdAt: `__timestamp__`, ...}) -->
