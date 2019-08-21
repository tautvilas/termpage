const Termpage = {
  defaultOptions: {
    prompt: '$',
    initialCommand: false,
    autoFocus: true
  },
  appendInput: ($output, input, options, $winElement) => {
    if ($winElement.lastChild && $winElement.lastChild.tagName === 'UL') {
      $winElement.lastChild.remove();
    }
    const prmpt = options.prompt + '&nbsp';
    const pre = document.createElement("pre");;
    const encodedInput = input.replace(/[\u00A0-\u9999<>\&]/gim, function(i) {
      return '&#'+i.charCodeAt(0)+';';
    });
    pre.innerHTML = prmpt + encodedInput + '\n';
    pre.className = 'termpage-block';
    $output.appendChild(pre);
  },
  appendOutput: (output, $output, $winElement) => {
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
    $output.appendChild(pre);
    if (commands.length) {
      const $commands = document.createElement('ul');
      $commands.className = 'termpage-menu termpage-block';
      commands.forEach(command => {
        const $command = document.createElement('li');
        $command.innerHTML = command + '&nbsp;';
        $commands.appendChild($command);
      });
      $winElement.appendChild($commands);
    }
    $winElement.scrollTo(0, $winElement.scrollHeight);
  },
  processInput: ($winElement, $input, $output, output, options) => {
    if (output && output.then) {
      const pre = document.createElement("pre");
      pre.innerHTML = '.';
      pre.className = 'termpage-loader termpage-block';
      $output.appendChild(pre);
      $input.setAttribute('style', 'display:none');
      $winElement.scrollTo(0, $winElement.scrollHeight);
      output.then((out) => {
        pre.remove();
        $input.setAttribute('style', 'display:flex');
        Termpage.appendOutput(out, $output, $winElement);
      });
      output.catch(() => {
        pre.remove();
        $input.setAttribute('style', 'display:flex');
        Termpage.appendOutput(Termpage.color('red', 'command resolution failed'), $output, $winElement);
      });
    } else {
      Termpage.appendOutput(output, $output, $winElement);
    }
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

    if (options.initialCommand) {
      const output = processInput(options.initialCommand);
      Termpage.appendInput($output, options.initialCommand, options, $winElement);
      Termpage.processInput($winElement, $inputBlock, $output, output, options);
    }

    $input.addEventListener('keypress', function (e) {
      var key = e.which || e.keyCode;
      if (key === 13) { // 13 is enter
        const input = e.srcElement.value;
        const output = input ? processInput(input) : '';
        Termpage.appendInput($output, input, options, $winElement);
        Termpage.processInput($winElement, $inputBlock, $output, output, options);
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

