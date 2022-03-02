https://stackoverflow.com/questions/1648217/what-does-a-b-tree-index-on-more-than-1-column-look-like

Question: How to handle combined queries on 2 indices?

```sql
SELECT * FROM `users` WHERE `name` = 'John' AND `age` = '30'
```

> This type of index is called, unsurprisingly, a "hash index." Most databases support them but they're generally not the default type. Why?. Hashes can deal with equality but not inequality.
