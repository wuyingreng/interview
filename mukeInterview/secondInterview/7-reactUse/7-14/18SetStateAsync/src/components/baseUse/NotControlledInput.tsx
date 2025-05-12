import { useState } from "react";

export const NotControlledInput = ({ label }: { label: string }) => {
  const [text, setText] = useState('');

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setText(e.target.value);
  }

  return (
    <label>
      {label}
      <input
        value={text}
        onChange={handleChange}
      />
    </label>
  );
}