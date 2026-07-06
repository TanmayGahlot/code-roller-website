// Basic Terminal Typing Animation
const cursor = document.getElementById('typing-cursor');
const phrases = [
  "coderoller status",
  "coderoller sync --force",
  "coderoller config set theme dark",
  "coderoller invoice generate --month=Oct"
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeTerminal() {
  if (!cursor) return;
  
  const currentPhrase = phrases[phraseIndex];
  
  if (isDeleting) {
    cursor.previousSibling.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
  } else {
    if(!cursor.previousSibling || cursor.previousSibling.nodeType !== 3) {
      cursor.parentElement.insertBefore(document.createTextNode(''), cursor);
    }
    cursor.previousSibling.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
  }
  
  let typingSpeed = isDeleting ? 30 : 100;
  
  if (!isDeleting && charIndex === currentPhrase.length) {
    typingSpeed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    typingSpeed = 500;
  }
  
  setTimeout(typeTerminal, typingSpeed);
}

// Start typing
setTimeout(typeTerminal, 1000);

// Glitch Button Effect
const glitchBtn = document.getElementById('glitch-btn');
if (glitchBtn) {
  glitchBtn.addEventListener('mouseover', function() {
    this.glitchInterval = setInterval(() => {
      this.style.transform = `translate(${Math.random()*4-2}px, ${Math.random()*4-2}px)`;
      this.style.backgroundColor = Math.random() > 0.5 ? '#111827' : '#030712';
    }, 50);
  });
  
  glitchBtn.addEventListener('mouseout', function() {
    clearInterval(this.glitchInterval);
    this.style.transform = 'translate(0px, 0px)';
    this.style.backgroundColor = '#111827';
  });
}
