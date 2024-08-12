export const validateName = (name: string): string => {
  if (!name.trim()) return "Please enter your name.";
  if (name.length < 3) return "Name must be at least 3 characters.";
  return "";
};

export const validateEmail = (email: string): string => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.trim()) return "Please provide your email address.";
  if (!emailRegex.test(email.trim()))
    return "Please enter a valid email address.";
  return "";
};

export const validatePhone = (phone: string): string => {
  const phoneRegex = /^\+\d{1,4}(\s?\d{1,4}){1,4}$/;
  if (!phone.trim()) return "Please provide your phone number.";
  if (!phoneRegex.test(phone.trim()))
    return "Enter a valid phone number (at least 10 digits starts with +).";
  return "";
};

export const validatePlan = (plan: string) => {
  return plan ? "" : "Please select a plan.";
};
