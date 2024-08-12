import { DollarSign } from "lucide-react";
import useFormContext from "../hooks/useFormContext";

const Step4 = () => {
  const { formData, setCurrentStep, calculatePlanAndTotalCost } =
    useFormContext();
  const { planPrice, totalCost, selectedAddOns } =
    calculatePlanAndTotalCost(formData);

  const selectedAddOnsJSX = selectedAddOns?.length ? (
    selectedAddOns.map((addOn) => (
      <div
        key={addOn.name}
        className="picked-add-on flex w-[140px] flex-shrink-0 flex-col items-center justify-center rounded-md border border-[#ddd] bg-[#f2f2f2] p-2"
      >
        <h2>{addOn.name.replace("-", " ")} </h2>
        <span className="flex items-center justify-center normal-case text-purplish-blue">
          +<DollarSign size={16} />
          {addOn.price}
          {formData.isYearlyPlan ? "/yr" : "/mo"}
        </span>
      </div>
    ))
  ) : (
    <p className="w-60 text-center text-sm normal-case">
      No add-ons picked. <br /> Explore our options to enhance your plan!
    </p>
  );
  return (
    <ul className="rounded-md bg-gray-100 p-2 shadow-md *:flex-wrap">
      <li className="flex items-center justify-between rounded-md p-4 font-medium shadow-sm">
        <div>
          <h2 className="text-lg font-semibold text-Cool-gray">
            Selected Plan:
          </h2>
          <div className="tooltip" data-tip="Change selected plan">
            <button
              type="button"
              className="btn btn-link btn-sm p-0"
              onClick={() => setCurrentStep(2)}
            >
              Change
            </button>
          </div>
        </div>
        <div className="mx-auto rounded-md border border-[#ddd] bg-[#f2f2f2] p-2 shadow md:mx-0">
          <span className="capitalize text-marine-blue">
            {formData.plan} {formData.isYearlyPlan ? "(Yearly)" : "(Monthly)"}
          </span>
          <h3 className="flex items-center justify-center text-purplish-blue">
            <DollarSign size={16} />
            {planPrice}/{formData.isYearlyPlan ? "yr" : "mo"}
          </h3>
        </div>
      </li>
      <li className="flex items-center justify-between rounded-md p-4 font-medium capitalize shadow-sm">
        <div className="mb-2 lg:mb-0">
          <h2 className="text-lg font-semibold text-Cool-gray">
            Picked Add-ons:
          </h2>
          <div
            className="tooltip"
            data-tip={`${selectedAddOns?.length ? "Change picked" : "Pick"}  add-ons`}
          >
            <button
              type="button"
              className="btn btn-link btn-sm p-0"
              onClick={() => setCurrentStep(3)}
            >
              {selectedAddOns?.length ? "Change" : "Pick"}
            </button>
          </div>
        </div>
        <div
          className={`picked-add-ons flex ${selectedAddOns.length && "w-[140px] shadow"} gap-5 overflow-x-scroll rounded-md text-center`}
        >
          {selectedAddOnsJSX}
        </div>
      </li>
      <li className="flex items-center justify-between rounded-md border-t border-slate-300 bg-slate-100 p-3 font-medium capitalize">
        <h2 className="text-lg font-semibold normal-case text-Cool-gray">
          Total (per {formData.isYearlyPlan ? "year" : "month"}):
        </h2>
        <h3 className="mx-auto flex items-center rounded-md border border-[#ddd] bg-[#f2f2f2] p-2 text-lg normal-case text-purplish-blue shadow md:mx-0">
          +<DollarSign size={16} />
          {totalCost}/{formData.isYearlyPlan ? "yr" : "mo"}
        </h3>
      </li>
    </ul>
  );
};

export default Step4;
