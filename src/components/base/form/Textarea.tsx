import { cn } from "@utils/className";
import * as React from "react";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        name={props.name || props.id}
        className={cn(
          "focus-visible:ring-ring flex min-h-[60px] w-full rounded-md bg-bgSecondary px-3 py-2 text-sm shadow-sm placeholder:text-textSecondary/70 focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);

Textarea.displayName = "Textarea";

export default Textarea;
