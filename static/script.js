const typingText = document.querySelector(".typing-text p"),
inpField = document.querySelector(".wrapper .input-field"),
mistakeTag =document.querySelector('.mistakes span b'),
timeTag = document.querySelector('.time span b'),
wpmTag =document.querySelector('.wpm span b'),
cpmTag = document.querySelector('.cpm span b'),
tryAgainbtn = document.querySelector('button');


const toggleMode = document.getElementById("toggle-mode");
const spanElements = toggleMode.getElementsByTagName("span");
var bodyElement = document.body;


toggleMode.addEventListener("click", function() {
  for (let i = 0; i < spanElements.length; i++) {
    spanElements[i].classList.toggle("active");
  }
  bodyElement.classList.toggle("change-mode");
});

let timer,
maxTime = 60,
timeLeft = maxTime,
charIndex = mistakes = isTyping = 0;


function randomParagraph() {
    typingText.innerHTML = "";
    fetch('https://gist.githubusercontent.com/gaurav4601/e066b2405ce7bf54e65fab203d0cc6cc/raw/2b401f9cc1588109583ff6c6535ce27247a2313f/sample%2520para') // Replace with the actual API endpoint
      .then(response => response.json())
      .then(data => {
        let paragraphs = data.paragraphs; // Assuming the API response contains an array of paragraphs
        let randIndex = Math.floor(Math.random() * paragraphs.length);
        paragraphs[randIndex].split("").forEach(span => {
          let spanTag = `<span>${span}</span>`;
          typingText.innerHTML += spanTag;
        });
      })
      .catch(error => {
        console.error('Error:', error);
        typingText.textContent = "Failed to load paragraph. Please try again.";
      });
  
    document.addEventListener("keydown", () => {
      inpField.focus();
    });
    typingText.addEventListener("click", () => {
      inpField.focus();
    });
  }
  

randomParagraph() 

function InitTyping() {
    const characters = typingText.querySelectorAll("span");
    let typeChar = inpField.value;
    
    if (charIndex < characters.length - 1 && timeLeft > 0) {
      // Timer
      if (!isTyping) {
        timer = setInterval(initTimer, 1000);
        isTyping = true;
      }
      
      // Backspace functionality
      if (typeChar.split("")[charIndex] == null) {
        if (mistakes > 0) {
          mistakes--;
        }
        
        charIndex = charIndex - 1;
        characters[charIndex].classList.remove("correct", "incorrect");
      } else {
        if (characters[charIndex].innerText === typeChar.split("")[charIndex]) {
          characters[charIndex].classList.add("correct");
        } else {
          // Mistake addition
          mistakes++;
          characters[charIndex].classList.add("incorrect");
        }
        
        charIndex = charIndex + 1;
      }
      
      characters.forEach((span) => span.classList.remove("active"));
      characters[charIndex].classList.add("active");
      
      let wpm = Math.round(((charIndex - mistakes) / 5) / ((maxTime - timeLeft) / 60));
      wpm = wpm < 0 || wpm === Infinity ? 0 : wpm;
      
      mistakeTag.innerText = mistakes;
      cpmTag.innerText = charIndex - mistakes;
      wpmTag.innerText = wpm;
    } else {
        inpField.value = ''
        clearInterval(timer);
    }
  }
  


function initTimer(){
    if(timeLeft > 0){
        timeLeft--;
        timeTag.classList.remove('less');
        timeTag.innerText = timeLeft;
        if (timeLeft > 0 && timeLeft <15){
            timeTag.classList.add('less')
        }

    } else {
        clearInterval(timer)
    }
}

function reset() {
    randomParagraph();
    timeLeft = maxTime;
    charIndex = mistakes = isTyping = 0;
    mistakeTag.innerText = 0;
    wpm.innerText = 0;
    cpm.innerText = 0;

}

inpField.addEventListener("input",InitTyping);
tryAgainbtn.addEventListener("click",reset)