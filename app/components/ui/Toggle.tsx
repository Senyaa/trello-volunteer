"use client";

import React, { FC } from "react";

interface ToggleProps {
  name: string;
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}

const Toggle: FC<ToggleProps> = ({ name, label, checked, onChange }) => {
  return (
    <>
      <label className="autoSaverSwitch relative inline-flex cursor-pointer select-none items-center justify-between">
        <span className="mr-2">{label}</span>
        <input
          type="checkbox"
          name={name}
          className="sr-only"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span
          className={`slider mr-3 flex h-[26px] w-[50px] items-center rounded-full p-1 duration-200 ${
            checked ? "bg-green-800" : "bg-neutral-700"
          }`}
        >
          <span
            className={`dot h-[18px] w-[18px] rounded-full bg-white duration-200 ${
              checked ? "translate-x-6" : ""
            }`}
          ></span>
        </span>
      </label>
    </>
  );
};

export default Toggle;
