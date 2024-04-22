import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@utils/className";
import Spinner from "./Spinner";

export const buttonVariants = cva(
  "inline-flex items-center active:scale-[0.95] transition-all select-none justify-center text-sm whitespace-nowrap rounded-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-brand text-white",
        outline: "border border-brand text-brand bg-bgPrimary",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-6 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  showSpinner?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      showSpinner = false,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild || showSpinner ? Slot : "button";

    const withLoadingSpinner = () => {
      return (
        <button className="flex items-center justify-center gap-1.5">
          {props.children}
          <Spinner />
        </button>
      );
    };

    const children = showSpinner ? withLoadingSpinner() : props.children;

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
        children={children}
      />
    );
  },
);
Button.displayName = "Button";

export default Button;
