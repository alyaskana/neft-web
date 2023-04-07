import { ButtonHTMLAttributes, FC } from "react";
import cn from "classnames";
import { Link } from "react-router-dom";

import s from "./Button.module.scss";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: string;
  style?: "big" | "fullWidth";
};

const ButtomItem: FC<ButtonProps> = ({
  children,
  href,
  style = "fullWidth",
  ...props
}) => {
  return (
    <button
      {...props}
      className={cn(s.button, {
        [s.big]: style === "big",
      })}
    >
      {children}
    </button>
  );
};
export const Button: FC<ButtonProps> = ({ children, href, ...props }) => {
  if (href) {
    return (
      <Link to={href} className={s.link}>
        <ButtomItem {...props}>{children}</ButtomItem>
      </Link>
    );
  } else {
    return <ButtomItem {...props}>{children}</ButtomItem>;
  }
};
