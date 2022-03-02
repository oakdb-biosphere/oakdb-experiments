const e={},t=`<h2>Special fields and field values</h2>
<p>OakDB defines a set of special fields:</p>
<p><code>&lt;uuid&gt;</code> Globally unique id based on hash(path + random bits + counter)
<code>&lt;ref&gt;</code> Reference tuple (path, uuid), start with magic byte \\U+FF2F
<code>&lt;refMany&gt;</code> List of reference tuples (path, uuid)
<code>&lt;time&gt;</code> Server time (leader only)</p>
<pre><code class="language-json">{
  articles: {
    &quot;Id&quot;: { title: &quot;foo&quot;, author: &lt;ref&gt;/authors/id:&lt;pointer&gt;,&lt;pointer&gt; }
  }
}
</code></pre>
<h2>Schema and meta fields</h2>
<p>OakDB uses the following special properties:</p>
<p><code>_type</code>: Defines a type for schema validation
<code>_order</code>: OakDB supports floating point array indices for fractional indexing.
<code>_meta</code>: Meta data about folders</p>
<p>OakDB assumes the following path schema:</p>
<pre><code>/type/&lt;uuid&gt;/subtype/&lt;uuid&gt;
</code></pre>
<p><code>_title</code> or <code>_alias</code>: Can be used for path queries as a substitute for the path key</p>
`;export{e as attributes,t as html};
