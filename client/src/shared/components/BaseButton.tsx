import styled from "@emotion/styled";
import type { ComponentPropsWithRef } from "react";

type BaseButtonProps = ComponentPropsWithRef<"button">;

const BaseButton = ({
  children,
  type = "button",
  disabled = false,
}: BaseButtonProps) => {
  return (
    <Button type={type} disabled={disabled}>
      {children}
    </Button>
  );
};

export default BaseButton;

const Button = styled.button`
  width: 100%;
  height: 64px;
  border: none;
  background-color: black;
  font-weight: 700;
  font-size: 16px;
  color: white;
  cursor: pointer;

  &:disabled {
    background-color: #bebebe;
    opacity: 1;
    cursor: not-allowed;
  }
`;
