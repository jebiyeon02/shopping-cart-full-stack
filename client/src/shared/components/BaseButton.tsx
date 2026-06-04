import styled from "@emotion/styled";
import type { ComponentPropsWithRef } from "react";

type BaseButtonProps = ComponentPropsWithRef<"button">;

const BaseButton = ({ children, type = "button" }: BaseButtonProps) => {
  return <Button type={type}>{children}</Button>;
};

export default BaseButton;

const Button = styled.button`
  width: 100%;
  height: 64px;
  background-color: black;
  font-weight: 700;
  font-size: 16px;
  color: white;
  cursor: pointer;
`;
