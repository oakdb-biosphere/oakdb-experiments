const e={},t=`<h2>Unique global ids</h2>
<p>The <code>&lt;uuid&gt;</code> can be used as a key for efficient lookup without the need of creating a secondary index. The most important consideration when designing a data base layout is that, <code>&lt;uuid&gt;</code> must be globally unique. By default OakDB will use &quot;Push IDs&quot;, but other uses cases are supported as well:</p>
<ol>
<li>
<p><code>&lt;uuid&gt;</code> is an id from an external system (for example a userId): If the id is guaranteed to be unique, it can be used directly. If not, it needs to be prefixed: <code>uuid := uid-&lt;userId&gt;</code></p>
</li>
<li>
<p><code>&lt;uuid&gt;</code> is a composed index (for example the document describes the relationship between two users, like a chat). <code>uuid := &lt;userId&gt;-&lt;friendId&gt;</code></p>
</li>
<li>
<p><code>&lt;uuid&gt;</code> is used as an static index key (for example the <code>createdAt</code> timestamp, which would allow for sorting/filtering by date - assuming <code>createdAt</code> never changes): To ensure the id is unique it can be prefixed by its content type: <code>uuid := article-&lt;createdAt&gt;</code></p>
</li>
<li>
<p><code>&lt;uuid&gt;</code> is path specific (for example modeling the interaction between two users in a groups, which are organized in a tree). <code>uuid := &lt;path&gt;-&lt;userId&gt;-&lt;friendId&gt;</code></p>
</li>
<li>
<p><code>&lt;uuid&gt;</code> is an array index: <code>uuid := hash(&lt;path&gt;)-&lt;arrayIndex&gt;</code></p>
</li>
</ol>
<p>The characters <code>/</code> and <code>:</code> are not allowed in the uuid.</p>
`;export{e as attributes,t as html};
