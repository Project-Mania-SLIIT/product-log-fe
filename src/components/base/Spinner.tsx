import { cn } from "@utils/className";
import { CgSpinner as SpinIcon } from "react-icons/cg";

interface Props {
  showSpinner?: boolean;
  className?: string;
}

const Spinner = ({ className, showSpinner = true }: Props) => {
  if (!showSpinner) return null;
  return <SpinIcon className={cn("animate-spin text-base", className)} />;
};

export default Spinner;
