import React from "react";

interface DropdownProps {
  label?: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
  className?: string;
}

/**
 * Dropdown is a reusable select input that accepts list of options, current value, and a change handler.
 */
const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
  value,
  onChange,
  className = ""
}) => (
  <div className={`flex flex-col ${className}`}>
    {label && (
      <label className="mb-1 font-medium text-gray-700">
        {label}
      </label>
    )}
    <select
      className="border rounded px-2 py-1 focus:outline-none focus:ring transition"
      value={value}
      onChange={e => onChange(e.target.value)}
      aria-label={label}
    >
      {options.map(opt => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

export default Dropdown;
