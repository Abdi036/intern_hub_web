import React from "react";

export default function Button({ text }: { text: string }) {
  return (
    <button className="bg-primary hover:bg-primary/90 text-white font-bold py-2 px-4 rounded cursor-pointer">
      {text}
    </button>
  );
}
