const Textual = {
  appendInput: (input) => {
    const prmpt = "$ ";
    const pre = document.createElement("pre");;
    const textNode = document.createTextNode(prmpt + input + '\n');
    pre.appendChild(textNode);
    document.getElementById('output').appendChild(pre);
  },
  appendOutput: (output) => {
    const pre = document.createElement("pre");
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
  },
  init: ($winElement, processInput, initialPath) => {
    const $output = document.createElement("div");
    $output.id = "output";
    $winElement.appendChild($output);

    const $prompt = document.createElement("span");
    $prompt.className = "prompt";
    $prompt.innerHTML = "$&nbsp;";

    const $input = document.createElement("input");
    $input.id = "input";
    $input.setAttribute("type", "text");

    const $p = document.createElement("p");
    $p.className = "input";

    $p.appendChild($prompt);
    $p.appendChild($input);
    $winElement.appendChild($p);

    Textual._processInput = processInput;
    if (initialPath) {
      const output = Textual._processInput(initialPath);
      Textual.appendOutput(output);
    }

    $input.addEventListener('keypress', function (e) {
      var key = e.which || e.keyCode;
      if (key === 13) { // 13 is enter
        const input = e.srcElement.value;
        const output = input ? Textual._processInput(input) : '';
        Textual.appendInput(input);
        Textual.appendOutput(output);
        e.srcElement.value = '';
        $winElement.scrollTo(0, $winElement.scrollHeight);
      }
    });

    $input.focus();
    $winElement.addEventListener("click", function(){
      $input.focus();
    });
  }
};

