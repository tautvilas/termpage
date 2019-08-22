# Termpage
Termpage allows you to create neat functional webpages that behave like a terminal

![](https://i.imgur.com/wqaqeNB.png)

# Why Termpage?
I wanted to build an effective web interface for my raspberry pi home server without thinking too much about design or ux.

# Example usage
Just drop this code in your index.html to start using termpage
```html
<!doctype html>
<html>
  <head>
    <title>termpage@home</title>
    <script src="https://cdn.jsdelivr.net/npm/termpage@0.1.0/dist/termpage.min.js" type="text/javascript"></script>
  </style>
  </head>
  <body>
    <div class="termpage-window" style="position:absolute;top:0;bottom:0;left:0;right:0" id="window"></div>
    <script>
      Termpage.init(document.getElementById('window'), (command) => {
        command = command.toLowerCase().trim();
        if (command === 'home') {
          return "Welcome to termpage";
        } else {
          return 'Command not found';
        }
      }, {
        initialCommand: 'home'
      });
    </script>
  </body>
</html>
```
You can check more complicated usage samples in the [examples folder](https://github.com/tautvilas/termpage/tree/master/example)

# API documentation

### Termpage.init

`Termpage.init(domElement, commandParser, options)`

```javascript
commandParser = (input) => {
  return response;
}
```

`input` is user input command string

`response` can be either string or object `{text: responseText, commands: ['menuCommand1', 'menuCommand']}`

List of available optional options:

```javascript
  {
    prompt: '$',
    initialCommand: 'home',
    autoFocus: true
  },
```

Responses can be returned as **promises** for async commands.

### Termpage.replace, Termpage.link and Termpage.color

`Termpage.replace` together with `Termpage.link` and `Termpage.color` helpers can be used to format terminal output without losing monospace alignment between lines.

This code would format Cell1 as a html link and Cell2 as span with color
```javascript
Termpage.replace(
`
------------------
| Cell1 | Cell2 |
------------------
`, {Cell1: Termpage.link('http://home.tautvilas.lt'), Cell2: termpage.color('red')})
```

# Styling

These default Termpage styles can be freely customized by overriding them with your own css file

```css
.termpage-window {
  background-color: black;
  border: 2px solid #888;
  padding-top: 5px;
}

.termpage-window * {
  font-family: "Courier New", Courier, monospace;
  font-size: 16px;
  color: #ddd;
}

.termpage-input {
  background-color: #222;
  color: #ddd;
  caret-color: white;
}

.termpage-block, .termpage-input {
  line-height: 20px;
}

.termpage-block {
  padding-left: 5px;
  padding-right: 5px;
}

.termpage-window a {
  background-color: #888;
  text-decoration: none;
  cursor:pointer;
}
.termpage-window a:hover {
  background-color: #333;
}

.termpage-menu {
  background-color: #888;
}

.termpage-menu li:hover {
  background-color: #666;
  cursor: pointer;
}
```
