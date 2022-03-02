## Unique global ids

The `<uuid>` can be used as a key for efficient lookup without the need of creating a secondary index. The most important consideration when designing a data base layout is that, `<uuid>` must be globally unique. By default OakDB will use "Push IDs", but other uses cases are supported as well:

1. `<uuid>` is an id from an external system (for example a userId): If the id is guaranteed to be unique, it can be used directly. If not, it needs to be prefixed: `uuid := uid-<userId>`

2. `<uuid>` is a composed index (for example the document describes the relationship between two users, like a chat). `uuid := <userId>-<friendId>`

3. `<uuid>` is used as an static index key (for example the `createdAt` timestamp, which would allow for sorting/filtering by date - assuming `createdAt` never changes): To ensure the id is unique it can be prefixed by its content type: `uuid := article-<createdAt>`

4. `<uuid>` is path specific (for example modeling the interaction between two users in a groups, which are organized in a tree). `uuid := <path>-<userId>-<friendId>`

5. `<uuid>` is an array index: `uuid := hash(<path>)-<arrayIndex>`

The characters `/` and `:` are not allowed in the uuid.
