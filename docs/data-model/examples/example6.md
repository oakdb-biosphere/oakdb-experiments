# Data Model

## Example Menu

```json
{
  "_type": ["collection"],
  "children": [
    {
      "_type": ["menu"], // do we need this type?
      "_id": "UUID",
      "title": "Hello Monsinéur Wüstenfeld",
      "keywords": [
        {
          "_type": ["tag"],
          // "_path": "/menu/keywords/1"
          "id": "tag",
          "label": "Tag"
        },
        { "_type": ["tag"], "id": "tag", "label": "Tag" }
      ],
      "children": [
        {
          "_type": ["lang", "collection"],
          "lang": "en",
          "order": 1,
          "children": [],
          "keywords": []
        },
        { "_type": ["lang"], "lang": "de", "order": 2 },
        {
          "_type": ["collection"],
          "_id": "ID",
          "lang": "cz",
          "children": [
            { "_type": ["menuitem"], "title": "A", "_id": "a" },
            { "_type": ["menuitem"], "title": "B" },
            { "_type": ["menuitem"], "title": "C" }
          ]
        }
      ]
    }
  ]
}
```

<!-- - `path: "/💩"` -->
<!-- - `path: "/children[0]/children[2]/menu[0]" -> "A"` -->
<!-- - `path: "/menu/cz/a"` -->
<!-- - `path: "/Hello Monsinéur Wüsenfeld/children$2/UUID" -> "A"` -->

- `path: "/Hello Monsinéur Wüsenfeld/UUID/UUID" -> "A"`

```json
{
  "_type": "collection",
  "children": [
    {
      "title": "A"
    }
  ],
  "keywords": [
    {
      "title": "A"
    }
  ],
  "A": []
}
```

- path: `"/A" -> "/$children/A"`
- path: `"/$children/A"`
- path: `"/$keywords/A"`

// TODO !
