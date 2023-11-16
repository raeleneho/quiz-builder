// import React from "react";

import { Flex } from "@chakra-ui/react";

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
    <Flex>
      {label && <label>{label}</label>}
      <textarea
        name="example"
        id="example"
        value=""
        placeholder={placeholder}
      ></textarea>
    </Flex>
  );
};
