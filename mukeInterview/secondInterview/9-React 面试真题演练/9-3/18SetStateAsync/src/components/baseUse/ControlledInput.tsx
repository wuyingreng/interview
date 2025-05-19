
export const ControlledInput = ({ label, text, handleChange }: { label: string; text?: string; handleChange: React.ChangeEventHandler<HTMLInputElement> }) => {
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