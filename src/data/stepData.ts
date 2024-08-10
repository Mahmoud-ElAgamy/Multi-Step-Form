import { Mail, Smartphone, UserPen } from "lucide-react";
import { arcadeSVG, advancedSVG, proSVG } from "./planIcons";

const stepData = [
  {
    title: "Personal Info",
    subTitle: "Please provide your name, email, and phone number.",
    fields: [
      {
        name: "name",
        label: {
          text: "Name",
          icon: UserPen,
        },
        type: "text",
        placeholder: "e.g. Stephen King",
      },
      {
        name: "email",
        label: {
          text: "Email Address",
          icon: Mail,
        },
        type: "email",
        placeholder: "e.g. stephenking@example.com",
      },
      {
        name: "phone",
        label: {
          text: "Phone Number",
          icon: Smartphone,
        },
        type: "tel",
        placeholder: "e.g. +1 234 567 890",
      },
    ],
  },

  {
    title: "Select Your Plan",
    subTitle: "You have the option of monthly or yearly billing.",
    plans: [
      { name: "arcade", monthlyPrice: 9, yearlyPrice: 90, icon: arcadeSVG },
      {
        name: "advanced",
        monthlyPrice: 12,
        yearlyPrice: 120,
        icon: advancedSVG,
      },
      { name: "pro", monthlyPrice: 15, yearlyPrice: 150, icon: proSVG },
    ],
  },

  {
    title: "Pick Add-Ons",
    subTitle: "Enhance your gaming experience with add-ons.",
    addOns: [
      {
        name: "online-service",
        title: "Online Service",
        description: "Access to multiplayer games.",
        yearlyPrice: "10/yr",
        monthlyPrice: "1/mo",
      },
      {
        name: "larger-storage",
        title: "Larger Storage",
        description: "Extra 1TB of cloud save.",
        yearlyPrice: "20/yr",
        monthlyPrice: "2/mo",
      },
      {
        name: "customizable-profile",
        title: "Customizable Profile",
        description: "Custom theme of your profile.",
        yearlyPrice: "20/yr",
        monthlyPrice: "2/mo",
      },
    ],
  },

  {
    title: "Finishing up",
    subTitle: "Double-check everything looks OK before confirming.",
  },
];

export default stepData;
