import React from "react";

interface ButtonProps {
  text: string;
  onClick?: () => void;
}

export default function Button({ text, onClick }: ButtonProps) {
  return (
    <button 
      onClick={onClick}
      className="bg-primary hover:bg-primary/90 text-white font-bold py-2 px-4 rounded cursor-pointer"
    >
      {text}
    </button>
  );
}
