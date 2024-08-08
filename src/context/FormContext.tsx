import {
  ChangeEvent,
  createContext,
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react";

import {
  validateName,
  validateEmail,
  validatePhone,
  validatePlan,
} from "../validation/validationFunctions";

import { motion, AnimatePresence } from "framer-motion";

// Types
type FormData = {
  name: string;
  email: string;
  phone: string;
  plan: "arcade" | "advanced" | "pro" | "";
  isYearlyPlan: boolean;
  addOns: {
    [key: string]: boolean;
  };
};

type AddOnsPrices = {
  [key: string]: number;
};

type FieldErrors = {
  name: string;
  email: string;
  phone: string;
  plan: string;
};

type FieldVisibility = {
  name: boolean;
  email: boolean;
  phone: boolean;
  plan: boolean;
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

type Refs = Record<string, React.RefObject<HTMLInputElement>>;

type FormContextProps = {
  children: JSX.Element;
};

type PlanPriceDetails = {
  planPrice: number;
  totalCost: number;
  selectedAddOns: {
    name: string;
    price: number;
  }[];
};

const FormContext = createContext<FormContextType | null>(null);

export const FormProvider = ({ children }: FormContextProps) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    plan: "",
    isYearlyPlan: false,
    addOns: {
      "online-service": false,
      "larger-storage": false,
      "customizable-profile": false,
    },
  });

  const [errors, setErrors] = useState<FieldErrors>({
    name: "",
    email: "",
    phone: "",
    plan: "",
  });

  const [tooltipVisibility, setTooltipVisibility] = useState<FieldVisibility>({
    name: false,
    email: false,
    phone: false,
    plan: false,
  });

  const [currentStep, setCurrentStep] = useState(1);

  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);

  const refs: Refs = useMemo(() => {
    return {
      name: nameInputRef,
      email: emailInputRef,
      phone: phoneInputRef,
    };
  }, []);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, type, value, checked } = e.target;
      if (name in formData.addOns) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          addOns: {
            ...prevFormData.addOns,
            [name]: checked,
          },
        }));
      } else {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: type === "checkbox" ? checked : value,
        }));
      }
    },
    [formData.addOns],
  );

  const validateFields = useCallback(() => {
    const newErrors = {
      name: validateName(formData.name),
      email: validateEmail(formData.email),
      phone: validatePhone(formData.phone),
      plan: currentStep === 2 ? validatePlan(formData.plan) : "",
    };

    const firstErrorField = Object.keys(newErrors).find(
      (key) => newErrors[key as keyof typeof newErrors],
    );

    return { newErrors, firstErrorField };
  }, [currentStep, formData]);

  const handleValidate = useCallback(() => {
    const { newErrors, firstErrorField } = validateFields();
    setErrors(newErrors);

    if (firstErrorField) {
      setTooltipVisibility((prev) => ({ ...prev, [firstErrorField]: true }));
      refs[firstErrorField]?.current?.focus();
      return false;
    }

    setTooltipVisibility({
      name: false,
      email: false,
      phone: false,
      plan: false,
    });
    return true;
  }, [validateFields, refs]);

  const handleNextStep = useCallback(() => {
    if (handleValidate()) setCurrentStep(currentStep + 1);
  }, [currentStep, handleValidate]);

  const handlePrevStep = useCallback(() => {
    setCurrentStep(currentStep - 1);
  }, [currentStep]);

  const handleSubmit = useCallback(() => {
    setCurrentStep(currentStep + 1);
  }, [currentStep]);

  const calculatePlanAndTotalCost = useCallback(
    (formData: FormData): PlanPriceDetails => {
      const basePrice =
        formData.plan === "arcade" ? 9 : formData.plan === "advanced" ? 12 : 15;
      const planPrice = formData.isYearlyPlan ? basePrice * 10 : basePrice;

      const addOnsPrices: AddOnsPrices = {
        "online-service": 1,
        "larger-storage": 2,
        "customizable-profile": 2,
      };

      const selectedAddOns = Object.entries(formData.addOns)
        .filter(([key, isChecked]) => isChecked && key in addOnsPrices)
        .map(([key]) => ({
          name: key,
          price: addOnsPrices[key] * (formData.isYearlyPlan ? 10 : 1),
        }));

      const addOnsTotal = selectedAddOns.reduce(
        (total, addOn) => total + addOn.price,
        0,
      );

      const totalCost = planPrice + addOnsTotal;

      return { planPrice, totalCost, selectedAddOns };
    },
    [],
  );

  const contextValue = useMemo(
    () => ({
      formData,
      setFormData,
      errors,
      setErrors,
      tooltipVisibility,
      setTooltipVisibility,
      currentStep,
      setCurrentStep,
      handleChange,
      calculatePlanAndTotalCost,
      handlePrevStep,
      handleNextStep,
      handleValidate,
      handleSubmit,
      refs,
      motion,
      AnimatePresence,
    }),
    [
      formData,
      errors,
      tooltipVisibility,
      currentStep,
      calculatePlanAndTotalCost,
      handleChange,
      handleNextStep,
      handlePrevStep,
      handleValidate,
      handleSubmit,
      refs,
    ],
  );

  return (
    <FormContext.Provider value={contextValue}>{children}</FormContext.Provider>
  );
};
export default FormContext;
