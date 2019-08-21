const Textual = {
  appendInput: ($output, input) => {
    const prmpt = "$ ";
    const pre = document.createElement("pre");;
    const textNode = document.createTextNode(prmpt + input + '\n');
    pre.appendChild(textNode);
    pre.className = 'termpage-block';
    $output.appendChild(pre);
  },
  appendOutput: ($output, output) => {
    const pre = document.createElement("pre");
    pre.innerHTML = output;
    pre.className = 'termpage-block';
    $output.appendChild(pre);
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
    $winElement.appendChild($output);
    Textual._$output = $output;

    const $prompt = document.createElement("span");
    $prompt.className = "termpage-prompt";
    $prompt.innerHTML = "$&nbsp;";

    const $input = document.createElement("input");
    $input.setAttribute("type", "text");
    $input.className = "termpage-input";

    const $p = document.createElement("p");
    $p.className = "termpage-block";

    $p.appendChild($prompt);
    $p.appendChild($input);
    $winElement.appendChild($p);

    Textual._processInput = processInput;
    if (initialPath) {
      const output = Textual._processInput(initialPath);
      Textual.appendInput($output, initialPath);
      Textual.appendOutput($output, output);
    }

    $input.addEventListener('keypress', function (e) {
      var key = e.which || e.keyCode;
      if (key === 13) { // 13 is enter
        const input = e.srcElement.value;
        const output = input ? Textual._processInput(input) : '';
        Textual.appendInput($output, input);
        Textual.appendOutput($output, output);
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

