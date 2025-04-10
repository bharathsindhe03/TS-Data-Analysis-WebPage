export const validateRegexPassword = (password) => {
  let errors = [1, 2, 3, 4, 5];
  if (password.length < 8) errors = errors.filter((e) => e !== 1);
  if (!/[A-Z]/.test(password)) errors = errors.filter((e) => e !== 2);
  if (!/[a-z]/.test(password)) errors = errors.filter((e) => e !== 3);
  if (!/[0-9]/.test(password)) errors = errors.filter((e) => e !== 4);
  if (!/[^a-zA-Z0-9]/.test(password)) errors = errors.filter((e) => e !== 5);

  if (errors.length === 5) {
    return { isValid: true, errorMessage: errors };
  } else {
    return {
      isValid: false,
      errorMessage: errors,
    };
  }
};
