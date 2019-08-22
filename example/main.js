const homeText = Termpage.replace(`
...My name is Tautvilas, welcome to my termpage!...
...Type HELP for the list of available commands....\n\n`,
{
  commands: Termpage.color('orange'),
  Tautvilas: Termpage.link('http://www.tautvilas.lt'),
});

function processInput(input='') {
  input = input.toLowerCase().trim();
  if (input === "help") {
    return "Available commands are `home`, `help` and `image`";
  } else if (input === 'home') {
    return homeText;
  } else if (input === 'image') {
    return '<img width="200" height="200" src="https://i.imgur.com/RDsb26sb.jpg" alt="me"/>';
  } else {
    return 'Command not found\n';
  }
}

Termpage.init(
  document.getElementById('window1'),
  processInput,
  {
    initialCommand: window.location.hash.substr(1) || 'home'
  }
);

Termpage.init(
  document.getElementById('window2'),
  (input) => {
    let resolveP;
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.5) {
          resolve({
            text: input + " " + input,
            commands: ['Home', 'About', Termpage.color('yellow', 'Help')]
          });
        } else {
          reject()
        }
      }, 500);
    });
    return promise;
  },
  {
    initialCommand: 'Async promise example',
    prompt: Termpage.color('green', 'tautvilas@termpge') + ':',
    autoFocus: false
  }
);

