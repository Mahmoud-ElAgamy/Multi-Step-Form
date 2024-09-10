import useFormContext from "../hooks/useFormContext";

// Custom Components
import Tooltip from "./ui/Tooltip";

// Data
import stepData from "../data/stepData";

// Types
import { FormDataKeys } from "../types/stepData";

const Step1 = () => {
  const {
    formData,
    handleChange,
    errors,
    tooltipVisibility,
    setTooltipVisibility,
    refs,
    currentStep,
  } = useFormContext();

  const { fields } = stepData[currentStep - 1];

  return (
    <>
      {fields?.map(({ type, name, label, placeholder }) => (
        <div key={name} className="relative mb-4">
          <label
            htmlFor={name}
            className="mb-2 flex w-fit cursor-pointer items-center gap-1 text-sm"
          >
            {label.text} <label.icon size={16} />:
            <span className="text-Strawberry-red" title="Required">
              *
            </span>
          </label>
          <input
            ref={refs[name]}
            id={name}
            className="w-full rounded-lg border border-slate-300 p-2 tracking-wide caret-purplish-blue shadow-sm outline-none transition focus:border-purplish-blue/40 focus:ring focus:ring-purplish-blue/10 focus:ring-opacity-50"
            placeholder={placeholder}
            type={type}
            name={name}
            value={formData[name as FormDataKeys]}
            autoFocus={name === "name" && true}
            onChange={handleChange}
            dir="auto"
          />
          {errors[name] && (
            <Tooltip
              message={errors[name]}
              isVisible={tooltipVisibility[name]}
              hideTooltip={() =>
                setTooltipVisibility({
                  ...tooltipVisibility,
                  [name]: false,
                })
              }
            />
          )}
        </div>
      ))}
    </>
  );
};
export default Step1;
