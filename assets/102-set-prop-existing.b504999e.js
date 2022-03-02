const o={},t=`<h2>Setting prop on existing data</h2>
<p><strong>Assumptions</strong></p>
<p><code>k1</code> (string) is overwritten with an object.</p>
<p>Current state is</p>
<pre><code class="language-js">{ root: { k1: &quot;bar&quot;, } }
</code></pre>
<p>Desired state:</p>
<pre><code class="language-js">{ root: { k1: { &quot;k2&quot;: &quot;bar&quot; } } }
</code></pre>
<p>Internal:</p>
<pre><code class="language-cs">// OPVMap
((&quot;root&quot;, &quot;k1&quot;), &quot;bar&quot;) -&gt; ((&quot;k1&quot;, &quot;k2&quot;), &quot;bar&quot;)
// BiMap
(&quot;/&quot;, &quot;root&quot;)           -&gt; (&quot;/root&quot;, &quot;k1&quot;)
</code></pre>
<p><strong>Operation</strong></p>
<pre><code class="language-js">{ op: &quot;set&quot;, path: &quot;/root/k1&quot;, value: { &quot;k2&quot;: &quot;bar&quot; } }
{ op: &quot;set&quot;, path: &quot;/root/k1:k2&quot;, value: &quot;bar&quot; }
{ op: &quot;set&quot;, uuid: &quot;root&quot;, prop: &quot;k1&quot;, value: { &quot;k2&quot;: &quot;bar&quot; }}
// { op: &quot;set&quot;, uuid: &quot;root&quot;, prop: &quot;k1/k2&quot;, value: &quot;bar&quot; }
</code></pre>
<p><strong>Description</strong></p>
<ol>
<li>If operation is using <code>path</code>, get object uuid from BiMap lookup:</li>
</ol>
<pre><code class="language-cs">[GET] ((&quot;/root/k1&quot;))
[GET] ((&quot;/root&quot;))
</code></pre>
<ol start="2">
<li>Write to OPVMap:</li>
</ol>
<pre><code class="language-cs">[DEL] ((&quot;root&quot;, &quot;k1&quot;))
[PUT] ((&quot;k1&quot;, &quot;k2&quot;), &quot;bar&quot;)
</code></pre>
<ol start="3">
<li>Write to BiMap:</li>
</ol>
<pre><code class="language-cs">[DEL:LEFT] ((&quot;/&quot;))
[DEL:RIGHT] ((&quot;root&quot;))
[PUT] ((&quot;/root&quot;), &quot;k1&quot;)
</code></pre>
<p>Must always issue a <code>DEL /&lt;subpath&gt;</code> operation before issuing a <code>PUT /&lt;subpath&gt;/&lt;prop&gt;</code>.</p>
<!--

Key-Value store:

\`\`\`cs
[DEL] ("/k", "bar")
[PUT] ("/k/foo", "bar")
\`\`\`

Discussion:

It could be possible that two conflicting keys exist that both need to be deleted when overwriting a value, e.g.:

\`\`\`cs
("/k", "bar")
("/k/foo", "bar")
("/k/foo/qux", "baz")
\`\`\`

However, this state should never happen since writing \`/k/foo\` should have deleted \`/k\` first.

-->
`;export{o as attributes,t as html};
