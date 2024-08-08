import { DollarSign } from "lucide-react";
import useFormContext from "../hooks/useFormContext";

const Step3 = () => {
  const { formData, handleChange } = useFormContext();
  return (
    <>
      <div className="form-control gap-3">
        <label className="label cursor-pointer justify-normal rounded-md border border-Light-gray p-4 transition-all hover:bg-sky-50 has-[:checked]:border-purplish-blue has-[:checked]:bg-sky-50">
          <input
            type="checkbox"
            className="checkbox"
            name="online-service"
            checked={formData.addOns["online-service"]}
            onChange={handleChange}
          />
          <div className="flex-grow pl-4">
            <h3 className="font-medium">Online Service</h3>
            <h4 className="text-dimgray">Access to multiplayer games.</h4>
          </div>
          <h5 className="flex items-center text-purplish-blue">
            +<DollarSign size={14} />
            {formData.isYearlyPlan ? "10/yr" : "1/mo"}
          </h5>
        </label>
        <label className="label cursor-pointer justify-normal rounded-md border border-Light-gray p-4 transition-all hover:bg-sky-50 has-[:checked]:border-purplish-blue has-[:checked]:bg-sky-50">
          <input
            type="checkbox"
            className="checkbox"
            name="larger-storage"
            checked={formData.addOns["larger-storage"]}
            onChange={handleChange}
          />
          <div className="flex-grow pl-4">
            <h3 className="font-medium">Lager Storage</h3>
            <h4 className="text-dimgray">Extra 1TB of cloud save.</h4>
          </div>
          <h5 className="flex items-center text-purplish-blue">
            +<DollarSign size={14} />
            {formData.isYearlyPlan ? "20/yr" : "2/mo"}
          </h5>
        </label>
        <label className="label cursor-pointer justify-normal rounded-md border border-Light-gray p-4 transition-all hover:bg-sky-50 has-[:checked]:border-purplish-blue has-[:checked]:bg-sky-50">
          <input
            type="checkbox"
            className="checkbox"
            name="customizable-profile"
            checked={formData.addOns["customizable-profile"]}
            onChange={handleChange}
          />
          <div className="flex-grow pl-4">
            <h3 className="font-medium">Customizable Profile</h3>
            <h4 className="text-dimgray">Custom theme of your profile.</h4>
          </div>
          <h5 className="flex items-center text-purplish-blue">
            +<DollarSign size={14} />
            {formData.isYearlyPlan ? "20/yr" : "2/mo"}
          </h5>
        </label>
      </div>
    </>
  );
};
export default Step3;
