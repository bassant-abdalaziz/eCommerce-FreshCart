import React, { useState, useEffect } from "react";

const ScrollBtn = () => {
  const [showButton, setShowButton] = useState(false);

  // Add an event listener to track scrolling
  useEffect(() => {
    const handleScroll = () => {
      // Check if the user has scrolled to the bottom
      const isAtBottom =
        window.innerHeight + window.scrollY >= document.body.scrollHeight;

      // Toggle the visibility of the button
      setShowButton(isAtBottom);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      // Clean up the event listener when the component unmounts
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Scroll to the top when the button is clicked
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      className={`scroll-to-top ${showButton ? "show" : ""}`}
      onClick={scrollToTop}
    >
      <i className="fa-solid fa-arrow-up fa-lg"></i>
    </button>
  );
};

export default ScrollBtn;
