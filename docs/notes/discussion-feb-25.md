# Discussions Feb 25

- Open it up to the Channel?
- TCP/IP Socket vs. WebSocket
- Field syntax

```json
{
  "book": {
    "_meta": {
      "createdAt": 15918273098
    },
    "555": {
      "language": "C++",
      "edition": "Second",
      "author": "Bjarne Stroustrup"
    }
  }
}
```

vs.

NOPE:

```json
{
  "book": {
    "createdAt": 15918273098,
    "_children": {
      "555": {
        "language": "C++",
        "edition": "Second",
        "author": "Bjarne Stroustrup"
      }
    }
  }
}
```
