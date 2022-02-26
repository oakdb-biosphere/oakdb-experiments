const o={},t=`<h2>Setting an object as prop</h2>
<p>Command:</p>
<pre><code class="language-js">{ op: &quot;set&quot;, path: &quot;/k&quot;, value: { a: &quot;oak&quot;, b: &quot;cool&quot; } }
</code></pre>
<p>Operations:</p>
<pre><code class="language-cs">[DELRANGE] (&quot;/k&quot;, &quot;/k~&quot;)
[PUT] (&quot;/k/a&quot;, &quot;oak&quot;)
[PUT] (&quot;/k/b&quot;, &quot;cool&quot;)
</code></pre>
<p>Key-Value store:</p>
<pre><code class="language-cs">(&quot;/k/a&quot;, &quot;oak&quot;)
(&quot;/k/b&quot;, &quot;cool&quot;)
</code></pre>
<p>New State:</p>
<pre><code class="language-js">{
  k: { a: &quot;oak&quot;, b: &quot;cool&quot; },
}
</code></pre>
`;export{o as attributes,t as html};
