export type FormDataKeys = "name" | "email" | "phone" | "plan";

export type TooltipProps = {
  message: string;
  isVisible: boolean;
  hideTooltip: () => void;
};
