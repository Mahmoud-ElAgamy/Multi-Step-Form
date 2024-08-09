import {
  ChangeEvent,
  createContext,
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react";

// Utils
import {
  validateName,
  validateEmail,
  validatePhone,
  validatePlan,
} from "../validation/validationFunctions";
import calculatePlanAndTotalCost from "../utils/calculatePlanAndTotalCost";

// Framer Motion Library
import { motion, AnimatePresence } from "framer-motion";

// Types
import {
  FormContextProps,
  FormContextType,
  FormData,
  Refs,
  FieldVisibility,
  FieldErrors,
} from "../types/formData";

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
