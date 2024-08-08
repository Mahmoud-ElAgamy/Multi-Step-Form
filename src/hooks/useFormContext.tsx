import { useContext } from "react";
import FormContext from "../context/FormContext";

// Types
import { FormContextType } from "../context/FormContext";

const useFormContext: () => FormContextType = () => {
  const context = useContext(FormContext);

  if (!context) {
    throw new Error("useFormContext must be used within a FormContextProvider");
  }

  return context;
};

export default useFormContext;
