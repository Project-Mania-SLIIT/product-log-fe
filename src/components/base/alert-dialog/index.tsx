"use client";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialog as Root,
} from "@components/base/alert-dialog/Primitives";
import Button from "../Button";

interface Props {
  open: boolean;
  title: string;
  description: string;
  cancelText?: string;
  actionText?: string;
  onAction: () => void;
  onCancel: () => void;
  actionInProgress?: boolean;
  actionDisabled?: boolean;
  icon?: React.ReactNode;
}

const AlertDialog = (props: Props) => {
  const {
    open,
    icon,
    title,
    onAction,
    onCancel,
    description,
    cancelText = "Cancel",
    actionText = "Confirm",
    actionInProgress = false,
    actionDisabled = false,
  } = props;

  const handleOpenChange = (open: boolean) => {
    if (!open) onCancel();
  };

  const handleActionClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onAction && onAction();
  };

  const handleCancelClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onCancel && onCancel();
  };

  return (
    <Root open={open} onOpenChange={handleOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader className="flex flex-col items-center space-y-1">
          {icon}
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription className="max-h-96 overflow-y-auto">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-2 flex items-center sm:justify-center">
          <AlertDialogCancel onClick={handleCancelClick}>
            {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction
            asChild
            onClick={handleActionClick}
            disabled={actionInProgress || actionDisabled}
          >
            <Button showSpinner={actionInProgress}>{actionText}</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </Root>
  );
};

export default AlertDialog;
