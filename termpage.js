const Termpage = {

  defaultOptions: {
    prompt: '$',
    initialCommand: false,
    autoFocus: true
  },

  _appendInput: (input, options, dom) => {
    if (dom.$winElement.lastChild && dom.$winElement.lastChild.tagName === 'UL') {
      dom.$winElement.lastChild.remove();
    }
    const prmpt = options.prompt + '&nbsp';
    const pre = document.createElement("pre");;
    const encodedInput = input.replace(/[\u00A0-\u9999<>\&]/gim, function(i) {
      return '&#'+i.charCodeAt(0)+';';
    });
    pre.innerHTML = prmpt + encodedInput + '\n';
    pre.className = 'termpage-block';
    dom.$output.appendChild(pre);
  },

  _appendOutput: (output, options, dom) => {
    let outputText = "undefined";
    let commands = [];
    if (typeof(output) === "string") {
      outputText = output;
    } else if (typeof(output) === "object") {
      outputText = output.text;
      commands = output.commands || [];
    }
    const pre = document.createElement("pre");
    pre.innerHTML = outputText;
    pre.className = 'termpage-block';
    dom.$output.appendChild(pre);
    if (commands.length) {
      const $commands = document.createElement('ul');
      $commands.className = 'termpage-menu termpage-block';
      commands.forEach(command => {
        const $command = document.createElement('li');
        $command.innerHTML = command + '&nbsp;';
        $commands.appendChild($command);
        $command.addEventListener('click', () => {
          Termpage._appendInput($command.innerText, options, dom);
          const out = options.processInput($command.innerText);
          Termpage._processInput(out, options, dom);
        });
      });
      dom.$winElement.appendChild($commands);
    }
    dom.$winElement.scrollTo(0, dom.$winElement.scrollHeight);
    dom.$input.focus();
  },

  _processInput: (output, options, dom) => {
    if (output && output.then) {
      const pre = document.createElement("pre");
      pre.innerHTML = '.';
      pre.className = 'termpage-loader termpage-block';
      dom.$output.appendChild(pre);
      dom.$inputBlock.setAttribute('style', 'display:none');
      dom.$winElement.scrollTo(0, dom.$winElement.scrollHeight);
      output.then((out) => {
        pre.remove();
        dom.$inputBlock.setAttribute('style', 'display:flex');
        Termpage._appendOutput(out, options, dom);
      });
      output.catch(() => {
        pre.remove();
        dom.$inputBlock.setAttribute('style', 'display:flex');
        Termpage._appendOutput(Termpage.color('red', 'command resolution failed'), options, dom);
      });
    } else {
      Termpage._appendOutput(output, options, dom);
    }
  },

  link: (url, text) => {
    const res = (t) => `<a href="${url}" target="_blank">${t}</a>`;
    if (!text) {
      return (text) => {
        return res(text);
      };
    }
    return res(text);
  },

  color: (color, text) => {
    const res = (t) => `<span style="color:${color}">${t}</span>`;
    if (!text) {
      return (text) => {
        return res(text);
      };
    }
    return res(text);
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

    const prompt = options.prompt || Termpage.defaultOptions.prompt;
    const $prompt = document.createElement("span");
    $prompt.className = "termpage-prompt";
    $prompt.innerHTML = prompt + "&nbsp;";

    const $input = document.createElement("input");
    $input.setAttribute("type", "text");
    $input.className = "termpage-input";

    const $inputBlock = document.createElement("p");
    $inputBlock.className = "termpage-block termpage-input-block";

    $inputBlock.appendChild($prompt);
    $inputBlock.appendChild($input);
    $winElement.appendChild($inputBlock);

    const dom = {
      $inputBlock,
      $input,
      $winElement,
      $output
    }

    options.processInput = processInput;

    if (options.initialCommand) {
      const output = processInput(options.initialCommand);
      Termpage._appendInput(options.initialCommand, options, dom);
      Termpage._processInput(output, options, dom);
    }

    $input.addEventListener('keypress', function (e) {
      var key = e.which || e.keyCode;
      if (key === 13) { // 13 is enter
        const input = e.srcElement.value;
        const output = input ? processInput(input) : '';
        Termpage._appendInput(input, options, dom);
        Termpage._processInput(output, options, dom);
        $input.value = '';
      }
    });

    if (options.autoFocus) {
      $input.focus();
    }
    $winElement.addEventListener("click", function(){
      const sel = getSelection().toString();
      if(!sel){
        $input.focus();
      }
    });
  }
};

