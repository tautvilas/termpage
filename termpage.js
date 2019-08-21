const Termpage = {
  defaultOptions: {
    prompt: '$',
    initialCommand: false
  },
  appendInput: ($output, input, options) => {
    const prmpt = options.prompt + '&nbsp';
    const pre = document.createElement("pre");;
    pre.innerHTML = prmpt + input + '\n';
    pre.className = 'termpage-block';
    $output.appendChild(pre);
  },
  appendOutput: ($output, output, options) => {
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
  init: ($winElement, processInput, options = {}) => {
    options = Object.assign({}, Termpage.defaultOptions, options);
    const $output = document.createElement("div");
    $winElement.appendChild($output);
    Termpage._$output = $output;

    const prompt = options.prompt || Termpage.defaultOptions.prompt;
    const $prompt = document.createElement("span");
    $prompt.className = "termpage-prompt";
    $prompt.innerHTML = prompt + "&nbsp;";

    const $input = document.createElement("input");
    $input.setAttribute("type", "text");
    $input.className = "termpage-input";

    const $p = document.createElement("p");
    $p.className = "termpage-block";

    $p.appendChild($prompt);
    $p.appendChild($input);
    $winElement.appendChild($p);

    Termpage._processInput = processInput;
    if (options.initialCommand) {
      const output = Termpage._processInput(options.initialCommand);
      Termpage.appendInput($output, options.initialCommand, options);
      Termpage.appendOutput($output, output, options);
    }

    $input.addEventListener('keypress', function (e) {
      var key = e.which || e.keyCode;
      if (key === 13) { // 13 is enter
        const input = e.srcElement.value;
        const output = input ? Termpage._processInput(input) : '';
        Termpage.appendInput($output, input, options);
        Termpage.appendOutput($output, output, options);
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

