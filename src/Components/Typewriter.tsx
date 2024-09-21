import { useState, useEffect } from "react";

const Typewriter = () => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  const [speed, setSpeed] = useState(150); // Speed of typing/backspacing

  const words = ["Write. Inspire. Share", "One blog at a time"]; // Replace with your words

  // useEffect to handle typing/backspacing effect
  useEffect(() => {
    let timeout:any;

    if (!isDeleting && charIndex < words[currentWordIndex].length) {
      // Typing
      timeout = setTimeout(() => {
        setDisplayedText(
          (prev) => prev + words[currentWordIndex].charAt(charIndex)
        );
        setCharIndex(charIndex + 1);
      }, speed);
    } else if (isDeleting && charIndex > 0) {
      // Backspacing
      timeout = setTimeout(() => {
        setDisplayedText((prev) => prev.slice(0, -1));
        setCharIndex(charIndex - 1);
      }, speed);
    } else if (charIndex === words[currentWordIndex].length) {
      // Word is fully typed, start deleting
      timeout = setTimeout(() => {
        setIsDeleting(true);
        setSpeed(170); // Backspacing speed
      }, 700); // Pause before starting to delete
    } else if (isDeleting && charIndex === 0) {
      // Finished deleting, move to the next word
      setIsDeleting(false);
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
      setSpeed(150); // Reset speed to typing speed
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, currentWordIndex, speed, words]);

  return (
    <div id="spanbar">
      <span id="typing-text" className="mb-5 text-2xl font-KodeMono">{displayedText}</span>
      <span id="cursor" style={{ borderRight: "2px solid black", marginLeft: "5px", animation: "blink 0.7s infinite" }}>
        &#8203;
      </span>
      <style>
        {`
        @keyframes blink {
          0% { opacity: 1; }
          50% { opacity: 0; }
          100% { opacity: 1; }
        }
        `}
      </style>
    </div>
  );
};

export default Typewriter;