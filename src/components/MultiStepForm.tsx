import { lazy, Suspense, memo } from "react";

import useFormContext from "../hooks/useFormContext";

// Custom Components
const Step1 = lazy(() => import("./Step1"));
const Step2 = lazy(() => import("./Step2"));
const Step3 = lazy(() => import("./Step3"));
const Step4 = lazy(() => import("./Step4"));
import NavigationControls from "./ui/NavigationControls";
const ConfirmingMsg = lazy(() => import("./ConfirmingMsg"));

// Data
import stepData from "../data/stepData";

const MultiStepForm = memo(() => {
  const { currentStep, motion, AnimatePresence } = useFormContext();

  const { title, subTitle } = stepData[currentStep - 1] || {};

  const stepToDisplay: Record<number, JSX.Element> = {
    1: <Step1 />,
    2: <Step2 />,
    3: <Step3 />,
    4: <Step4 />,
    5: <ConfirmingMsg />,
  };

  return (
    <AnimatePresence mode="wait">
      <Suspense
        fallback={
          <div className="grid h-full place-content-center">
            <h2>
              <span className="loading loading-spinner text-neutral"></span>
            </h2>
          </div>
        }
      >
        <motion.form
          key={currentStep}
          className="flex h-full flex-col"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
        >
          {currentStep < 5 && (
            <>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-marine-blue">{title}</h2>
                <h3 className="text-dimgray">{subTitle}</h3>
              </div>
            </>
          )}
          {stepToDisplay[currentStep]}
          {currentStep < 5 && <NavigationControls />}
        </motion.form>
      </Suspense>
    </AnimatePresence>
  );
});
export default MultiStepForm;
