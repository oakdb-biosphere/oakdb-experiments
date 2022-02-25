## Special fields and field values

OakDB defines a set of special fields:

`<uuid>` Globally unique id based on hash(path + random bits + counter)
`<ref>` Reference tuple (path, uuid), start with magic byte \U+FF2F
`<refMany>` List of reference tuples (path, uuid)
`<time>` Server time (leader only)

```json
{
  articles: {
    "Id": { title: "foo", author: <ref>/authors/id:<pointer>,<pointer> }
  }
}
```

## Schema and meta fields

OakDB uses the following special properties:

`_type`: Defines a type for schema validation
`_order`: OakDB supports floating point array indices for fractional indexing.

OakDB assumes the following path schema:

```
/type/<uuid>/subtype/<uuid>
```
