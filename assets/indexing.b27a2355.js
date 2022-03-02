const e={},t=`<p>https://stackoverflow.com/questions/1648217/what-does-a-b-tree-index-on-more-than-1-column-look-like</p>
<p>Question: How to handle combined queries on 2 indices?</p>
<pre><code class="language-sql">SELECT * FROM \`users\` WHERE \`name\` = 'John' AND \`age\` = '30'
</code></pre>
<blockquote>
<p>This type of index is called, unsurprisingly, a &quot;hash index.&quot; Most databases support them but they're generally not the default type. Why?. Hashes can deal with equality but not inequality.</p>
</blockquote>
`;export{e as attributes,t as html};
