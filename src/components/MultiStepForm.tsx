import { lazy, Suspense, memo } from "react";

import useFormContext from "../hooks/useFormContext";

// Custom Components
const Step1 = lazy(() => import("./Step1"));
const Step2 = lazy(() => import("./Step2"));
const Step3 = lazy(() => import("./Step3"));
const Step4 = lazy(() => import("./Step4"));
import NavigationControls from "./NavigationControls";
const ConfirmingMsg = lazy(() => import("./ConfirmingMsg"));

// Types
type StepTitleAndSubTitle = {
  [key: number]: {
    title: string;
    subTitle: string;
  };
};

const MultiStepForm = memo(() => {
  const { currentStep, motion, AnimatePresence } = useFormContext();

  const stepTitleAndSubTitle: StepTitleAndSubTitle = {
    1: {
      title: "Personal Info",
      subTitle: "Please provide your name, email address, and phone number.",
    },

    2: {
      title: "Select your plan",
      subTitle: "You have the option of monthly of yearly billing.",
    },

    3: {
      title: "Pick add-ons",
      subTitle: "Add-ons help enhance your gaming experience.",
    },
    4: {
      title: "Finishing up",
      subTitle: "Double check everything looks OK before confirming.",
    },
  };

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
                <h2 className="text-2xl font-bold text-marine-blue">
                  {stepTitleAndSubTitle[currentStep]?.title}
                </h2>
                <h3 className="text-dimgray">
                  {stepTitleAndSubTitle[currentStep]?.subTitle}
                </h3>
              </div>
              <NavigationControls />
            </>
          )}
          {stepToDisplay[currentStep]}
        </motion.form>
      </Suspense>
    </AnimatePresence>
  );
});
export default MultiStepForm;
