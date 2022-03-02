# Supported operations

The following tables list all supported read and write operations. All read operations can either be a one time query or a continuous subscription. When a subscription is initiated a query is always performed and returned upon initialization.

###

## Write Operations

<table>
  <tr>
    <td><strong>Operation</strong></td>
    <td><strong>Description</strong></td>
    <td><strong>Runtime</strong></td>
  </tr>
  <tr>
   <td>Set property</td>
   <td>Insert or replace (upsert) existing entry in key. Setting a property to null is equivalent to deleting it.
<p>
<code>{op: "set", path: "/baz/&lt;uuid>/text",</code>
<p>
<code>value: "boo"}</code>
   </td>
   <td>O(1)</td>
  </tr>
  <tr>
   <td>Create new node /
<p>
Append to list
   </td>
   <td>Insert all properties by translating value to paths and prepending it with “path”:
<p>
<code>{op: "set", path: "/baz/&lt;uuid>",</code>
<p>
<code>value: { obj: "boo", v: "foo" }}</code>
   </td>
   <td>O(k)</td>
  </tr>
  <tr>
   <td>Delete node by id
   </td>
   <td>Scan from `/foo/bar` to `/foo/bar + 0xF8FF`
<p>
and delete
   </td>
   <td>O(k)</td>
  </tr>
  <tr>
   <td>Delete node by path including children
   </td>
   <td>Scan from `/foo/bar` to `/foo/bar + 0xF8F0` and delete
   </td>
   <td>O(k)</td>
  </tr>
  <tr>
   <td>Move node to new parent
   </td>
   <td>Transactional operation consisting of a read, write and delete.
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>Order nodes
   </td>
   <td>Fractional indexing based on a special `_order` meta property.
   </td>
   <td>O(1)</td>
  </tr>
  <tr>
   <td>Undoing or redoing an action
   </td>
   <td>Every operation in this list can be inverted into an operation that reverts a previous operation. For each operation pushed to the commit log an inverse operation is generated as well.
<p>
Pushed to commit log:
<p>
<code>{op: "set", path: "/f/a", value: "boo"}</code>
<p>
Pushed to undo stack (assumes prop was unset before):
<p>
<code>{op: "set", path: "/f/a", value: null}</code>
   </td>
   <td>Client
   </td>
  </tr>
  <tr>
   <td>Performing transaction
   </td>
   <td>TBD: Look into ACID
   </td>
   <td>
   </td>
  </tr>
</table>

k = size of dataset, n = size of dataset

## Read Operations

<table>
  <tr>
   <td><strong>Operation</strong>
   </td>
   <td><strong>Description</strong>
   </td>
   <td><strong>Runtime</strong>
   </td>
  </tr>
  <tr>
   <td>Read object including all children / Key (path) equality
   </td>
   <td>Scan from `/foo/bar` to `/foo/bar + 0xF8FF`
<p>
<code>{op: "query", path: "/baz/&lt;uuid>/v"}</code>
   </td>
   <td>O(k)</td>
  </tr>
  <tr>
   <td><del>Read object without children</del>
   </td>
   <td>Scan from `/foo/bar` to `/foo/bar + 0xF8F0`
<p>
The path separator `/` (0x2F) internally translates to a high code point (0xF8F0), therefore object properties always appear before children.
<p>
<code>{op: "query", path: "/foo", depth: 0}</code>
   </td>
   <td>O(k)</td>
  </tr>
  <tr>
   <td>Read object n levels deep
   </td>
   <td>Scan from `/foo/bar` to `/foo/bar + 0xF8FF`
<p>
Once path separator is found,
<p>
start binary search to find the next object.
<p>
<code>{op: "query", path: "/foo", depth: n}</code>
   </td>
   <td>O(k *
<p>
log(k))</td>
  </tr>
  <tr>
   <td>Filter query / subscription
   </td>
   <td><strong>Requires secondary key index</strong>
<p>
Find all items in an object or array that match a given (nested) key.
<p>
<code>{op: "query", path: "/people/",  \
key: "/eyes/color", value: "blue"}</code>
   </td>
   <td>O(l)</td>
  </tr>
  <tr>
   <td>gt(e)/lt(e) query / subscriptions
   </td>
   <td><strong>Requires secondary key index</strong>
<p>
Find all items in an object or array that are between two values for a given (nested) key. From and to are both optional, but not at the same time.
<p>
<code>{op: "query", path: "/people/",  \
key: "/stats/IQ", from: 100, to: 150}</code>
   </td>
   <td>O(l)</td>
  </tr>
  <tr>
   <td>Contains query / subscription
   </td>
   <td>Assuming “hobbies” is an array, find all items in an object or array that contain a given value under
<p>
a given nested key.
<p>
<code>{op: "query", path: "/people/",  \
key: "/hobbies/*", value: "knitting"}</code>
   </td>
   <td>O(l)</td>
  </tr>
  <tr>
   <td>Neste keys with wildcards
<p>
PROBABLY NOT
   </td>
   <td><strong>Requires secondary key index</strong>
<p>
Finds all items in an object or array that contain
<p>
a given value under a given nested key.
<p>
<code>{op: "query", path: "/people/",  \
key: "/friends/*/name", value: "pedro"}</code>
   </td>
   <td>O(l)</td>
  </tr>
  <tr>
   <td>Relation based query
<p>
PROBABLY NOT
   </td>
   <td><strong>Requires relational index</strong>
<p>
Look up items via their relationship with other items: Assumes friends is stored under /people and /people/&lt;uuid>/friends is a ref field:
<p>
<code>{op: "query", path: "/people/",  \
key: "/friends/*/name", value: "pedro"}</code>
<p>
Example: Get all articles of author
<p>
<code>{op: "query", path: "/articles/",  \
key: "/authors/*/name", value: "pedro"}</code>
<p>
Example: Get all authors of article
<p>
<code>{op: "query", path: "/authors/&lt;uuid>",  \
join: ["author"]}</code>
   </td>
   <td>O(l)</td>
  </tr>
  <tr>
   <td>Joins references
   </td>
   <td>Return object at path and resolve refs. Can be
<p>
combined with `depth`, `key`, and `value`.
<p>
<code>{op: "query", path: "/people/&lt;uuid>",  \
join: ["friend", "posts"]}</code>
<p>
&lt;ref> fields are resolved automatically as specified by the `join` field via O(k) lookup:
<p>
<code>{name: "kip",</code>
<p>
<code> posts: [</code>
<p>
<code>   &lt;ref>(articles,d670460),</code>
<p>
<code>   &lt;ref>(articles,a8ee621) ],</code>
<p>
<code> friend: &lt;ref>(people,234118)}</code>
   </td>
   <td>O(l+k)</td>
  </tr>
  <tr>
   <td>Wildcard search string
   </td>
   <td><strong>Requires secondary key index</strong>
<p>
Wildcards are allowed at the end or beginning of a value.
<p>
Scan from `/people/hobbies:llab` to `/people/hobbies:llab + 0xF8FF` (reverse index)
<p>
<code>{op: "query", path: "/people/",  \
key: "/hobbies", value: "*ball"}</code>
   </td>
   <td>O(l)</td>
  </tr>
  <tr>
   <td>Limit and offset query / subscription
<p>
TODO: Compare to cursor
   </td>
   <td>Limits or offsets returned results. Also, supports negative limits  (= last n items).
<p>
<del>by counting instances of `/foo/(.+)`.</del>
<p>
Optimization: Hash table with fixed length hashes allows calculating increments based on offset.
<p>
<code>{op: "query", path: "/foo/",  \
offset: 20, limit: 10}</code>
   </td>
   <td>O(l)
<p>
O(l*o)</td>
  </tr>
  <tr>
   <td>Search
   </td>
   <td>Find items within the entire tree structure. Full text search is initially not supported and must be implemented via 3rd party services.
   </td>
   <td>-
   </td>
  </tr>
</table>

The \uf8ff character used in the query above is a very high code point in the Unicode range. Because it is after most regular characters in Unicode, the query matches all values that start with a b.

---

{ foo: { bar: { id: “1”, color: “red”, children: “test” } }

{ foo: { bar: { id: “1”, color: “red”, children: [‘a’,’b’,’c’ } }

/foo/bar:id

/foo/bar:color

DELETE /foo/bar/children = “test”

PUT /foo/bar/children:0 = ‘a’

PUT /foo/bar/children:1 = ‘b’

PUT /foo/bar/children:2 = ‘c’

/foo/baz

/author/:articleId1 = author1

/author/:articleId1 = author2
