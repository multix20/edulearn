export const ValidationUtils = {
  isRequired: (value) => value && value.trim() !== '',
  isEmail: (value) => /\S+@\S+\.\S+/.test(value),
  // ...otros métodos
};