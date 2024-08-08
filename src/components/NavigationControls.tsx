import { BadgeCheck, SkipForward, StepBack } from "lucide-react";
import useFormContext from "../hooks/useFormContext";

const NavigationControls = () => {
  const { handlePrevStep, handleNextStep, currentStep, handleSubmit } =
    useFormContext();

  return (
    <section
      className={`order-4 mt-6 flex items-center ${currentStep === 1 ? "justify-end" : "justify-between"}`}
    >
      <h2 className="sr-only">Navigation Controls</h2>

      {currentStep > 1 && currentStep < 5 && (
        <button
          type="button"
          className="btn flex items-center gap-1 border-slate-300 font-semibold tracking-wider text-slate-500 transition-all hover:text-marine-blue focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          onClick={handlePrevStep}
          title="Previous Step"
        >
          <StepBack size={18} /> Previous
        </button>
      )}
      {currentStep !== 5 && (
        <button
          type="button"
          className="btn bg-[#0F3462] font-bold tracking-wider text-white transition-all hover:bg-[#1A5276] focus:outline-none focus:ring-4 focus:ring-[#1A5276] focus:ring-opacity-50 active:bg-[#0D2A50]"
          onClick={currentStep === 4 ? handleSubmit : handleNextStep}
          title={currentStep === 4 ? "Confirm" : "Next Step"}
        >
          {currentStep === 4 ? (
            <>
              Confirm <BadgeCheck size={18} />
            </>
          ) : (
            <>
              Next <SkipForward size={18} />
            </>
          )}
        </button>
      )}
    </section>
  );
};
export default NavigationControls;
