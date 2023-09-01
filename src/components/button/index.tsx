import { forwardRef } from "react";

type ButtonProps = {
  children: React.ReactNode;
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children }, ref) => {
    return <button ref={ref}>{children}</button>;
  }
);

export { Button };
