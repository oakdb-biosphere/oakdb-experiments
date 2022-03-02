const e={},t=`<h1>Mental Model</h1>
<p>OakDB is a NoSQL document oriented database which organizes documents in a tree.
Think of it as a tree of documents similar to a file system, where each file is a key-value store.</p>
<p><img src="../img/fs.png" alt=""></p>
<p>Similar to a file system, a file and folder with the same name can not exist at the same location in OakDB. All of the data in OakDB can be represented as JSON, but not all of JSON can be represented in OakDBs data model.</p>
<p>For example, the following JSON is not valid in OakDB:</p>
<pre><code class="language-js">{
  a: 1,
  b: {
    documentName: &quot;hello&quot;
  }
}
</code></pre>
<p>and needs to be restructed to:</p>
<pre><code class="language-js">{
  root: {
    a: 1,
  },
  b: {
    sub: {
      documentName: &quot;hello&quot;
    }
  }
}
</code></pre>
<p>equivalent to:</p>
<pre><code class="language-bash">mkdir b
cat &quot;{ a: 1 }&quot; &gt; root
cat &quot;{ documentName: 'hello' }&quot; &gt; b/sub
</code></pre>
<p>OakDB does not require you to &quot;create a folder&quot;. Paths are automatically created as needed.</p>
<p>While technically the data structure above could be represented as:</p>
<pre><code class="language-bash">mkdir b
cat '&quot;1&quot;' &gt; a
cat '&quot;hello&quot;' &gt; b/documentName
</code></pre>
<p>OakDB requires each document to be representable as a key-value map, which wouldn't be the case if document contain a single value.</p>
<p>Also, this only applies to the entire data structure. Within a document node, all JSON is valid. So wrapping the entire document into a single root node would work:</p>
<pre><code class="language-js">{
  root: {
    a: 1,
    b: {
      documentName: &quot;hello&quot;
    }
  }
}
</code></pre>
<pre><code class="language-bash">cat &quot;{ a: 1, b: { documentName: 'hello' } }&quot; &gt; root
</code></pre>
<p>While this might seem like a limitation, you'll see that most data will map very nicely to this data structure.</p>
<h1>OakDB Data Model</h1>
<p>OakDB supports two different ways to represent data. The first is a simple key-value data model. The second is a tree-like data model. Combined all data in OakDB can be modeled as a ~JSON-compatible~ tree.</p>
<p>Every document in OakDB is a tree of objects, similar to the HTML DOM. There is a single root object that represents the entire document. Underneath the root object are page objects, and underneath each page object is a hierarchy of objects representing the contents of the page. This tree is is presented in the layers panel on the left-hand side of the Figma editor.</p>
<p>Each object has an ID and a collection of properties with values. One way to think about this is by picturing the document as a two-level map: <code>Map&lt;ObjectID, Map&lt;Property, Value&gt;&gt;</code>. Another way to think about this is a database with rows that store (ObjectID, Property, Value) tuples.</p>
<p>For example the following JSON document:</p>
<pre><code class="language-json">{
  &quot;book&quot;: {
    &quot;444&quot;: {
      &quot;language&quot;: &quot;C&quot;,
      &quot;edition&quot;: &quot;First&quot;,
      &quot;author&quot;: &quot;Dennis Ritchie&quot;
    },
    &quot;555&quot;: {
      &quot;language&quot;: &quot;C++&quot;,
      &quot;edition&quot;: &quot;Second&quot;,
      &quot;author&quot;: &quot;Bjarne Stroustrup&quot;
    }
  }
}
</code></pre>
<p>will be represented as (OPV-Map):</p>
<pre><code>((444, language), &quot;C&quot;)
((444, edition), &quot;First&quot;)
((444, author), &quot;Dennis Ritchie&quot;)
((555, language), &quot;C++&quot;)
((555, edition), &quot;Second&quot;)
((555, author), &quot;Bjarne Stroustrup&quot;)
</code></pre>
<p>Additionally OakDB is tracking all objects in a bijective map (BiMap):</p>
<pre><code>(\`/book/\`, 444)
(\`/book/\`, 555)
</code></pre>
<pre><code>(444, \`/book/\`)
(555, \`/book/\`)
</code></pre>
<p>Every time a change is made, that change needs to be applied to both the Object-Property-Value map (OPVMap) and the bijective map (BiMap). Object IDs are globally unqiue 120 bit hashes. See <code>poc-pushid</code>.</p>
<h2>Limitations</h2>
<p>There are some limitations to this approach. For example it can not represent all possible json data. For example, single value objects can not be represented.</p>
<pre><code>{
  &quot;book&quot;: {
    &quot;444&quot;: &quot;hello&quot;,
    &quot;555&quot;: &quot;world&quot;
  }
}
</code></pre>
<p>Not all objects have to be uuid-to-object-maps. A string-to-any-map is possible, it just doesn't support all queries.</p>
<h2>???</h2>
<pre><code>{ op: &quot;set&quot;, id: 444, prop: 'language', value: 'Rust' }
{ op: &quot;set&quot;, path: '/books/444/language', value: 'Rust' }
</code></pre>
<h1>FAQ</h1>
<h3>How do I store meta-data about a folder?</h3>
<p>If you want to store meta-data about a folder, the convetion is to create a document with the following naming convetion <code>&lt;folder name&gt;/.meta</code>. Example:</p>
<pre><code class="language-json">{
  &quot;book&quot;: {
    &quot;.meta&quot;: {
      &quot;createdAt&quot;: 15918273098
    },
    &quot;555&quot;: {
      &quot;language&quot;: &quot;C++&quot;,
      &quot;edition&quot;: &quot;Second&quot;,
      &quot;author&quot;: &quot;Bjarne Stroustrup&quot;
    }
  }
}
</code></pre>
<p>OakDB will ignore the <code>.meta</code> document, when running queries on <code>/book</code>.</p>
<h3>Since OakDB uses a data-model similar to a file-sytem, can I export the data to a file-system?</h3>
<p>Yes, just run <code>oakdb export --out &lt;path&gt;</code> and the data will be exported to the file-system. Paths will be mapped to folders and documents to <code>.json</code> files.
If you want to create a single file you can run <code>oakdb export --out &lt;path&gt; --archive</code> insted, which will create a single large JSON dump.</p>
<h3>Why this data model?</h3>
<ul>
<li>Filesystems</li>
<li>CMS</li>
<li>Figma</li>
<li>DOM / XML</li>
</ul>
<h3>Why not have a <code>children</code> field?</h3>
<h3>Nested documents</h3>
<p>/type/<uuid>/subtype/<uuid></p>
`;export{e as attributes,t as html};
