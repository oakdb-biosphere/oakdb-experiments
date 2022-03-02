const o={},e=`<h2>Setting a single prop</h2>
<p><strong>Operation</strong></p>
<pre><code class="language-js">{ op: &quot;set&quot;, path: &quot;/a/b&quot;, prop: &quot;field&quot;, value: &quot;oak&quot; }
</code></pre>
<p>or</p>
<pre><code class="language-js">{ op: &quot;set&quot;, uuid: &quot;3596a30bd69384624c11&quot;, prop: 'field', value: &quot;oak&quot; }
</code></pre>
<p><strong>Description</strong></p>
<ol>
<li>If operation is using <code>path</code>, get object uuid from BiMap lookup:</li>
</ol>
<pre><code class="language-cs">[GET] ((&quot;/a/b&quot;))
[GET] ((&quot;/a/b/field&quot;))
</code></pre>
<p>Lookup full path and basepath - we don't know if <code>field</code> is a property or part of the path.</p>
<ol start="2">
<li>Write to OPVMap:</li>
</ol>
<pre><code class="language-cs">[PUT] ((&quot;3596a30bd69384624c11&quot;, &quot;field&quot;), &quot;oak&quot;)
</code></pre>
<ol start="3">
<li>No write to BiMap needed</li>
</ol>
<p><strong>New State:</strong></p>
<pre><code class="language-js">{
  a: {
    b: {
      field: &quot;oak&quot;;
    }
  }
}
</code></pre>
<h1>Discussion</h1>
<p><strong>Discussion on paths:</strong></p>
<p>If the path had a special syntax where path and property are easily distinguishable,
we could skip one lookup in the OPVMap.</p>
<pre><code class="language-js">{ op: &quot;set&quot;, path: &quot;/a/b:field&quot;, value: &quot;oak&quot; }
</code></pre>
<p><strong>Discussion on values:</strong></p>
<p>OakDB requires each document to be representable as a key-value map, so receiving a single value <code>&quot;oak&quot;</code>, would tell us, that <code>field</code> can not be a document, but has to be a property:</p>
<pre><code class="language-js">{ op: &quot;set&quot;, path: &quot;/a/b/field&quot;, value: &quot;oak&quot; }
{ op: &quot;set&quot;, path: &quot;/a/b&quot;, value: { field: &quot;oak&quot; } }
</code></pre>
<p>However, the inverse it NOT true. If we receive an object, we do not know if <code>field</code> is a property or a document.</p>
`;export{o as attributes,e as html};
