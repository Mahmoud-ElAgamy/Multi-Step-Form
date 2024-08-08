import { Mail, Smartphone, UserPen } from "lucide-react";
import useFormContext from "../hooks/useFormContext";

import Tooltip from "../components/Tooltip";

const Step1 = () => {
  const {
    formData,
    handleChange,
    errors,
    tooltipVisibility,
    setTooltipVisibility,
    refs,
  } = useFormContext();
  return (
    <>
      <div className="relative mb-4">
        <label
          className="mb-2 flex w-fit cursor-pointer items-center gap-1 text-sm"
          htmlFor="name"
        >
          Name <UserPen size={14} />:
          <span className="text-Strawberry-red" title="Required">
            *
          </span>
        </label>
        <input
          ref={refs.name}
          id="name"
          type="text"
          placeholder="e.g. Stephen King"
          className="w-full rounded-lg border border-slate-300 p-2 tracking-wide caret-purplish-blue shadow-sm outline-none transition focus:border-purplish-blue/40 focus:ring focus:ring-purplish-blue/10 focus:ring-opacity-50 lg:p-3"
          name="name"
          value={formData.name}
          onChange={handleChange}
          autoFocus
        />
        {errors.name && (
          <Tooltip
            message={errors.name}
            isVisible={tooltipVisibility.name}
            hideTooltip={() =>
              setTooltipVisibility({ ...tooltipVisibility, name: false })
            }
          />
        )}
      </div>
      <div className="relative mb-4">
        <label
          className="mb-2 flex w-fit cursor-pointer items-center gap-1 text-sm"
          htmlFor="email"
        >
          Email Address <Mail size={14} />:
          <span className="text-Strawberry-red" title="Required">
            *
          </span>
        </label>
        <input
          ref={refs.email}
          id="email"
          type="text"
          placeholder="e.g. stephenking@lorem.com"
          className="w-full rounded-lg border border-slate-300 p-2 tracking-wide caret-purplish-blue shadow-sm outline-none transition focus:border-purplish-blue/40 focus:ring focus:ring-purplish-blue/10 focus:ring-opacity-50 lg:p-3"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && (
          <Tooltip
            message={errors.email}
            isVisible={tooltipVisibility.email}
            hideTooltip={() =>
              setTooltipVisibility({ ...tooltipVisibility, email: false })
            }
          />
        )}
      </div>
      <div className="relative">
        <label
          className="mb-2 flex w-fit cursor-pointer items-center gap-1 text-sm"
          htmlFor="phone"
        >
          Phone Number <Smartphone size={14} />:
          <span className="text-Strawberry-red" title="Required">
            *
          </span>
        </label>
        <input
          ref={refs.phone}
          id="phone"
          type="tel"
          placeholder="e.g. 1234567890"
          className="w-full rounded-lg border border-slate-300 p-2 tracking-wide caret-purplish-blue shadow-sm outline-none transition focus:border-purplish-blue/40 focus:ring focus:ring-purplish-blue/10 focus:ring-opacity-50 lg:p-3"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
        {errors.phone && (
          <Tooltip
            message={errors.phone}
            isVisible={tooltipVisibility.phone}
            hideTooltip={() =>
              setTooltipVisibility({ ...tooltipVisibility, phone: false })
            }
          />
        )}
      </div>
    </>
  );
};
export default Step1;
