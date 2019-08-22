const homeText = Termpage.replace(`
...My name is Tautvilas, welcome to my termpage!...
...Type HELP for the list of available commands....\n\n`,
{
  HELP: Termpage.color('orange'),
  Tautvilas: Termpage.link('http://www.tautvilas.lt'),
});

function processInput(input='') {
  input = input.toLowerCase().trim();
  const commands = ['home', 'help', 'image'];
  if (input === "help") {
    return {text: "Available commands are `home`, `help` and `image`", commands: commands};
  } else if (input === 'home') {
    return {text: homeText, commands: commands};
  } else if (input === 'image') {
    return {text: '<img width="200" height="200" src="https://i.imgur.com/RDsb26sb.jpg" alt="me"/>', commands: commands};
  } else {
    return {text: 'Command not found\n', commands: commands};
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
    if (input === 'home') {
      return 'This terminal demonstrates async commands that have 50% chance of failing';
    }
    let resolveP;
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.5) {
          resolve({
            text: 'async request was successfull'
          });
        } else {
          reject()
        }
      }, 500);
    });
    return promise;
  },
  {
    initialCommand: 'home',
    prompt: Termpage.color('green', 'type_anything:') + ':',
    autoFocus: false
  }
);

