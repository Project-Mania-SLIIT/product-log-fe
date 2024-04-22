import { cn } from "@utils/className";

interface Props {
  message?: string;
  className?: string;
}

const FormErrorMessage = ({ message, className }: Props) => {
  if (!!message?.trim())
    return (
      <div className={cn("text-sm font-medium text-rose-500", className)}>
        {message}
      </div>
    );
  else return null;
};

export default FormErrorMessage;
