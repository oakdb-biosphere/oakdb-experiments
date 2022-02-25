# What are the rigth data structures for OakDB?

Key-Value

## Path-Value data representation

- Intuition: It seems like Firebase Realtime DB is based on a path-value representation. The reason is is probably the case, is because of the following property: If a key in a deeply nested structured is deleted, the entire structure is deleted. For example:

```s
{ a: { b: { c: { d: { e: "foo" } } } } }
```

If `/a/b/c/d/e` is deleted, then the entire structure is deleted.
This would only make sense, if the structure is represented as a key-value pair:

```cs
("/a/b/c/d/e", "foo")
```

- Range queries: It seems like a lexiographical sorted key-value store is well suited for range queries that could retrieve an object. A limitation of Firebase Realtime DB is that it will always query a node including all its children, which would make sense if the data is retrieved as a range scan from `START_KEY` to `START_KEY + 0xFFFF`

## ObjectId-Property-Value data reprensentation

> Every Figma document is a tree of objects, similar to the HTML DOM. There is a single root object that represents the entire document. Underneath the root object are page objects, and underneath each page object is a hierarchy of objects representing the contents of the page. This tree is is presented in the layers panel on the left-hand side of the Figma editor.

> Each object has an ID and a collection of properties with values. One way to think about this is by picturing the document as a two-level map: `Map<ObjectID, Map<Property, Value>>`. Another way to think about this is a database with rows that store (`ObjectID`, `Property`, `Value`) tuples. This means that adding new features to Figma usually just means adding new properties to objects.

> The approach we settled on was to represent the parent-child relationship by storing a link to the parent as a property on the child. That way object identity is preserved.

Source: https://www.figma.com/blog/how-figmas-multiplayer-technology-works/
