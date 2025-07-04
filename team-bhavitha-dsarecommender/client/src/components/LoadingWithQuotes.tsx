import { useEffect, useState } from "react";

interface LoadingWithQuoteProps {
  quotes?: string[];
  intervalMs?: number;
}

const defaultQuotes = [
  "Why did the Python list break up with the array? Too much indexing drama!",
  "Recursion in Python: It's like calling yourself until you believe it.",
  "DSA in Python: When time complexity meets duck typing.",
  "Why do Python coders love trees? Because they always branch out.",
];

const LoadingWithQuote = ({ quotes = defaultQuotes, intervalMs = 3000 }: LoadingWithQuoteProps) => {
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, intervalMs);

    return () => clearInterval(interval);
  }, [quotes.length, intervalMs]);

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center bg-dark bg-opacity-75 text-white"
      style={{ zIndex: 1050 }}
    >
      <div className="spinner-border text-primary mb-4" role="status" style={{ width: "3rem", height: "3rem" }} />
      <p className="fst-italic text-info text-center px-3">{quotes[quoteIndex]}</p>
    </div>
  );
};

export default LoadingWithQuote;
