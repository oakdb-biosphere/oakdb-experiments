const o={},t=`<h2>Setting prop on existing data</h2>
<p>Previous State:</p>
<pre><code class="language-js">{
  k: &quot;oak&quot;,
}
</code></pre>
<p>Command:</p>
<pre><code class="language-js">{ op: &quot;set&quot;, path: &quot;/k/foo&quot;, value: &quot;bar&quot; }
</code></pre>
<p>Must always issue a <code>DEL /&lt;subpath&gt;</code> operation before issuing a <code>PUT /&lt;subpath&gt;/&lt;prop&gt;</code>.</p>
<p>Key-Value store:</p>
<pre><code class="language-cs">[DEL] (&quot;/k&quot;, &quot;oak&quot;)
[PUT] (&quot;/k/foo&quot;, &quot;bar&quot;)
</code></pre>
<p>New State:</p>
<pre><code class="language-js">{
  k: { foo: &quot;bar&quot; },
}
</code></pre>
<p>Discussion:</p>
<p>It could be possible that two conflicting keys exist that both need to be deleted when overwriting a value, e.g.:</p>
<pre><code class="language-cs">(&quot;/k&quot;, &quot;oak&quot;)
(&quot;/k/foo&quot;, &quot;bar&quot;)
(&quot;/k/foo/qux&quot;, &quot;baz&quot;)
</code></pre>
<p>However, this state should never happen since writing <code>/k/foo</code> should have deleted <code>/k</code> first.</p>
`;export{o as attributes,t as html};
