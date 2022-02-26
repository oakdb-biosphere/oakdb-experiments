const o={},e=`<h2>Setting a single prop</h2>
<p>Command:</p>
<pre><code class="language-js">{ op: &quot;set&quot;, path: &quot;/k&quot;, value: &quot;oak&quot; }
</code></pre>
<p>Operations:</p>
<pre><code class="language-cs">[DEL] (&quot;/&quot;)
[PUT] (&quot;/k&quot;, &quot;oak&quot;)
</code></pre>
<p>Key-Value store:</p>
<pre><code class="language-cs">(&quot;/k&quot;, &quot;oak&quot;)
</code></pre>
<p>New State:</p>
<pre><code class="language-js">{
  k: &quot;oak&quot;,
}
</code></pre>
<p>Discussion:</p>
<ul>
<li><code>DEL &quot;/&quot;</code> is necessary to guarantee data consistency.</li>
</ul>
`;export{o as attributes,e as html};
