import { cn } from "@/lib/utils";
import { Icons } from "../icons";

interface FormErrorProps {
  message?: string;
  className?: string;
}

export const FormError = ({ message, className }: FormErrorProps) => {
  if (!message) {
    return null;
  }

  return (
    <div
      className={cn(
        "bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive",
        className
      )}
    >
      <Icons.Warning />
      <p>{message}</p>
    </div>
  );
};
