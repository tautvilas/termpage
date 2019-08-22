# Termpage
Termpage allows you to create neat functional webpages that behave like a terminal

![Image of Yaktocat](https://raw.githubusercontent.com/tautvilas/termpage/master/img/termpage2.png?token=AAH646Q6XF6EIHNJ5J6BRVK5L3TMU)

# Why Termpage?
I wanted to build an effective web interface to my raspberry pi home server without thinking too much about ux. Then I had an idea about building this terminal interface library that would enable people to bootstrap similar websites.

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

# Styling
