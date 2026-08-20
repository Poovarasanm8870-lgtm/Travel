// Email validation
export const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

// Phone validation (10 digits)
export const isValidPhone = (phone) => {
  const re = /^[0-9]{10}$/;
  return re.test(String(phone).replace(/[\s\-\+\(\)]/g, ''));
};

// Password strength calculator (0 to 4 score)
export const getPasswordStrength = (password) => {
  if (!password) return { score: 0, label: 'None', color: 'bg-slate-200 dark:bg-slate-700' };
  
  let score = 0;
  if (password.length >= 6) score += 1;
  if (password.length >= 10) score += 1;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score += 1;
  if (/[0-9]/.test(password) || /[^A-Za-z0-9]/.test(password)) score += 1;

  switch (score) {
    case 1:
      return { score: 25, label: 'Weak', color: 'bg-red-500' };
    case 2:
      return { score: 50, label: 'Fair', color: 'bg-amber-500' };
    case 3:
      return { score: 75, label: 'Good', color: 'bg-emerald-500' };
    case 4:
      return { score: 100, label: 'Strong', color: 'bg-brand-500' };
    default:
      return { score: 0, label: 'Very Weak', color: 'bg-red-400' };
  }
};
