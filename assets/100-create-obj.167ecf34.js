const e={},o=`<h2>Creating a new node</h2>
<p>Creates a new node <code>value</code> under a given <code>path</code>.</p>
<p><strong>Operation</strong></p>
<pre><code class="language-js">{ op: &quot;create&quot;, path: &quot;/things/&quot;, value: { a: 1 } }
</code></pre>
<p><strong>Description</strong></p>
<ol>
<li>Generate new <code>uuid</code> where <code>uuid := hash(path + autoincrement)</code></li>
<li>Write <code>value</code> to OPVMap</li>
<li>Write mapping from <code>path</code> to <code>uuid</code> BiMap - Auto increments avoids collisions.</li>
<li>Return new <code>id</code></li>
</ol>
<!-- createObject({ id: \`__uuid__\`, createdAt: \`__timestamp__\`, ...}) -->
`;export{e as attributes,o as html};
