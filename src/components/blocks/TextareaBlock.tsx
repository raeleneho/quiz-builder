// import React from "react";

interface TextareaBlockProps {
  label: string;
  placeholder: string;

  field: string;
}

export const TextareaBlock = ({
  label,
  placeholder,
}: TextareaBlockProps): JSX.Element => {
  return (
    <div className="textarea">
      <label htmlFor="example">{label}</label>
      <textarea
        name="example"
        id="example"
        value=""
        placeholder={placeholder}
      ></textarea>
    </div>
  );
};
