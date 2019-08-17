document.getElementById('input').focus();

document.getElementsByTagName("body")[0].addEventListener("click", function(){
  document.getElementById('input').focus();
});

const Textual = {
  appendOutput: (output) => {
    const prmpt = "$ ";
    var pre = document.createElement("pre");;
    var textNode = document.createTextNode(prmpt + output + '\n');
    pre.appendChild(textNode);
    document.getElementById('output').appendChild(pre);
  }
};

function processInput(input) {
  Textual.appendOutput(input);
}

document.getElementById('input').addEventListener('keypress', function (e) {
  var key = e.which || e.keyCode;
  if (key === 13) { // 13 is enter
    processInput(e.srcElement.value);
    e.srcElement.value = '';
    document.getElementById('window').scrollTo(0, document.getElementById("window").scrollHeight);
  }
});
