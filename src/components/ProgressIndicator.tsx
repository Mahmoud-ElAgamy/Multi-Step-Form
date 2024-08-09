import { useState, useEffect, memo } from "react";

// Utils
import debounce from "../utils/debounce";
import useFormContext from "../hooks/useFormContext";
import { Check } from "lucide-react";

const ProgressIndicator = memo(() => {
  const { currentStep } = useFormContext();

  const [isMediumAndLargeDevice, setIsMediumAndLargeDevice] = useState(
    window.innerWidth > 768,
  );

  const steps = [
    { id: 1, label: "Personal Info" },
    { id: 2, label: "Select Plan" },
    { id: 3, label: "Pick Add-Ons" },
    { id: 4, label: "Summary" },
  ];

  useEffect(() => {
    const handleResize = debounce(() => {
      setIsMediumAndLargeDevice(window.innerWidth > 768);
    }, 300);

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
      handleResize.cancel();
    };
  }, []);

  return (
    <aside
      className={`absolute left-0 top-0 z-[-1] h-36 w-full rounded-none bg-[url('/src/assets/images/bg-sidebar-mobile.svg')] bg-cover bg-no-repeat p-8 text-sm text-Light-gray lg:static lg:h-full lg:w-64 lg:rounded-md lg:bg-[url('/src/assets/images/bg-sidebar-desktop.svg')]`}
    >
      <ul className="flex flex-wrap items-center justify-center gap-6 *:tracking-wider lg:flex-col lg:items-start">
        {steps.map((step) => (
          <li key={step.id} className="flex items-center gap-3">
            <span
              className={`grid size-8 place-content-center rounded-full border border-slate-100 font-bold transition duration-500 ${currentStep === step.id ? "bg-Light-blue text-marine-blue" : "text-white"}`}
            >
              {currentStep > step.id ? (
                <Check className="text-green-400" />
              ) : (
                step.id
              )}
            </span>
            {isMediumAndLargeDevice && (
              <span className={`p-1 text-start font-bold uppercase`}>
                <span className="font-normal text-Cool-gray">
                  STEP {step.id}
                </span>
                <br />
                {step.label}
              </span>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
});
export default ProgressIndicator;
