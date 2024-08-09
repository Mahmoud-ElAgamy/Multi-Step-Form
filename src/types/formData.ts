import { ChangeEvent } from "react";

import { motion, AnimatePresence } from "framer-motion";

// Types
export type FormData = {
  name: string;
  email: string;
  phone: string;
  plan: "arcade" | "advanced" | "pro" | "";
  isYearlyPlan: boolean;
  addOns: {
    [key: string]: boolean;
  };
};

export type AddOnsPrices = {
  [key: string]: number;
};

export type FieldErrors = {
  [key: string]: string;
};

export type FieldVisibility = {
  [key: string]: boolean;
};

export type FormContextType = {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  errors: FieldErrors;
  setErrors: React.Dispatch<React.SetStateAction<FieldErrors>>;
  tooltipVisibility: FieldVisibility;
  setTooltipVisibility: React.Dispatch<React.SetStateAction<FieldVisibility>>;
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  calculatePlanAndTotalCost: (formData: FormData) => PlanPriceDetails;
  handleNextStep: () => void;
  handlePrevStep: () => void;
  handleValidate: () => boolean;
  handleSubmit: () => void;
  refs: Refs;
  motion: typeof motion;
  AnimatePresence: typeof AnimatePresence;
};

export type Refs = Record<string, React.RefObject<HTMLInputElement>>;

export type FormContextProps = {
  children: JSX.Element;
};

export type PlanPriceDetails = {
  planPrice: number;
  totalCost: number;
  selectedAddOns: {
    name: string;
    price: number;
  }[];
};

export type TogglePriceProps = {
  isYearlyPlan: boolean;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
};
