const o={},e=`<h2>Deleting a prop or subtree</h2>
<p>Delete a property from on object. If the last property is deleted, the object is removed.</p>
<p><strong>Operation</strong></p>
<pre><code class="language-js">{ op: &quot;set&quot;, id: &quot;&lt;uuid&gt;&quot;, prop: &quot;a&quot;, value: null }

</code></pre>
<p><strong>Description</strong></p>
<p>Previous State:</p>
<pre><code class="language-js">{
  k: { a: &quot;oak&quot;, b: &quot;cool&quot; },
}
</code></pre>
<p>Command:</p>
<pre><code class="language-js">{ op: &quot;delete&quot;, path: &quot;/k/a&quot; }
// is syntactic sugar for
{ op: &quot;set&quot;, path: &quot;/k/a&quot;, value: null }
</code></pre>
<p>Operations:</p>
<pre><code class="language-cs">[DELRANGE] (&quot;/k/a&quot;, &quot;/k/a~&quot;)
</code></pre>
<p>Key-Value store:</p>
<pre><code class="language-cs">(&quot;/k/b&quot;, &quot;cool&quot;)
</code></pre>
<p>New State:</p>
<pre><code class="language-js">{
  k: { b: &quot;cool&quot; },
}
</code></pre>
`;export{o as attributes,e as html};
