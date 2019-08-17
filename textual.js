document.getElementById('input').focus();

document.getElementsByTagName("body")[0].addEventListener("click", function(){
  document.getElementById('input').focus();
});

const Textual = {
  appendOutput: (input, output) => {
    const prmpt = "$ ";
    var pre = document.createElement("pre");;
    var textNode = document.createTextNode(prmpt + input + '\n');
    pre.appendChild(textNode);
    document.getElementById('output').appendChild(pre);
    pre = document.createElement("pre");
    pre.innerHTML = output;
    document.getElementById('output').appendChild(pre);
  },
  link: (url, text) => {
    if (!text) {
      return (text) => {
        return `<a href="${url}" target="_blank">${text}</a>`;
      };
    }
    return `<a href="${url}" target="_blank">${text}</a>`;
  },
  color: (color, text) => {
    if (!text) {
      return (text) => {
        return `<span style="color:${color}">${text}</span>`;
      };
    }
    return `<span style="color:${color}">${text}</span>`;
  },
  replace: (text, changes) => {
    let response = text;
    Object.keys(changes).forEach(key => {
      response = response.replace(key, changes[key](key));
    });
    return response;
  }
};

const homeText = Textual.replace(`
...My name is Tautvilas, welcome to my textual home site!...
...Type HELP for the list of available commands.............\n`,
{
  commands: Textual.color('orange'),
  Tautvilas: Textual.link('http://www.tautvilas.lt'),
});

function processInput(input, output) {
  if (input === 'home') {
    Textual.appendOutput(input, homeText);
  } else {
    Textual.appendOutput(input, 'Command not found\n');
  }
}

document.getElementById('input').addEventListener('keypress', function (e) {
  var key = e.which || e.keyCode;
  if (key === 13) { // 13 is enter
    processInput(e.srcElement.value);
    e.srcElement.value = '';
    document.getElementById('window').scrollTo(0, document.getElementById("window").scrollHeight);
  }
});
