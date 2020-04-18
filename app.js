const MORSE_CODE = {
  '.-': 'A',
  '-...': 'B',
  '-.-.': 'C',
  '-..': 'D',
  '.': 'E',
  '..-.': 'F',
  '--.': 'G',
  '....': 'H',
  '..': 'I',
  '.---': 'J',
  '-.-': 'K',
  '.-..': 'L',
  '--': 'M',
  '-.': 'N',
  '---': 'O',
  '.--.': 'P',
  '--.-': 'Q',
  '.-.': 'R',
  '...': 'S',
  '-': 'T',
  '..-': 'U',
  '...-': 'V',
  '.--': 'W',
  '-..-': 'X',
  '-.--': 'Y',
  '--..': 'Z',
  '-----': '0',
  '.----': '1',
  '..---': '2',
  '...--': '3',
  '....-': '4',
  '.....': '5',
  '-....': '6',
  '--...': '7',
  '---..': '8',
  '----.': '9',
  '.-.-.-': '.',
  '--..--': ',',
  '..--..': '?',
  '.----.': '\'',
  '-.-.--': '!',
  '-..-.': '/',
  '-.--.': '(',
  '-.--.-': ')',
  '.-...': '&',
  '---...': ':',
  '-.-.-.': ';',
  '-...-': '=',
  '.-.-.': '+',
  '-....-': '-',
  '..--.-': '_',
  '.-..-.': '"',
  '...-..-': '$',
  '.--.-.': '@',
  '...---...': 'SOS' };

const swap = (json) =>{
  var ret = {};
  for(var key in json){
    ret[json[key]] = key;
  }
  return ret;
}

const ALPHABET_CODE = swap(MORSE_CODE);
ALPHABET_CODE[' '] = '/';

const decodeMorse = (morseCode) => {
  let arr = morseCode.split(" / ");
  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i].split(" ");
    for (let j = 0; j < arr[i].length; j++) {
      arr[i][j] = MORSE_CODE[arr[i][j]];
    }
    arr[i] = arr[i].join("");
  }
  return arr.join(" ").trim();
}

const encodeMorse = (sentence) => {
  let output = sentence
    .split('')
    .map(function(e){
        return ALPHABET_CODE[e.toUpperCase()] || ''})
    .join(' ')
    .replace(/ +/g, ' ');
  return output;
}

const translateMorse = () => {
  let text = document.getElementById("input-morse").value;
  let result = "";
  if (text.match(/[^.-/\W]/gi)) {
    result = encodeMorse(text);
  }
  else {
    result = decodeMorse(text);
  }
  if (!result) {
    document.getElementById("output").textContent = "Error! The input contains invalid or grammatically flawed Morse code.";
    document.getElementById("output").style =
      `
      color: white;
      background-color: #FF4D3D;
      font-family: monospace;
      font-size: 1.2em;
      `
  }
  else {
    document.getElementById("output").style =
      `
      color: black;
      background-color: #4BFF49;
      font-family: "Verdana", serif;
      font-size: 1em;
      `
    document.getElementById("output").textContent = result;
  }
}
document.getElementById("input-morse")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.activeElement.blur();
        document.getElementById("translate-btn").click();
    }
});


const addDot = () => {
  document.getElementById("input-morse").value += ".";
}
const addDash = () => {
  document.getElementById("input-morse").value += "-";
}
const letterSpace = () => {
  document.getElementById("input-morse").value += " ";
}
const wordSpace = () => {
  document.getElementById("input-morse").value += " / ";
}
const deleteOne = () => {
  let text = document.getElementById("input-morse");
  text.value = text.value.slice(0,text.value.length-1);
}
const deleteAll = () => {
  document.getElementById("input-morse").value = "";
}
const copyToClipboard = str => {
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
};
const copyClip = () => {
  let output = document.getElementById("output");
  let str = output.textContent;
  copyToClipboard(str);
  output.textContent = "Copied to Clipboard!";
  output.style.fontFamily = "monospace";
  output.style.fontSize = "1.2em";
  deleteAll();
}
async function paste() {
  let input = document.getElementById("input-morse");
  const text = await navigator.clipboard.readText();
  input.value = text;
}

//easter egg
const hooray = () => {
  window.alert("Yay! You found an easter egg. :\)");
}
