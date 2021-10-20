
const speak = (msg) => {
    const sp = new SpeechSynthesisUtterance(msg);
    speechSynthesis.speak(sp);
}

export default speak;