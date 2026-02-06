export const isValidName = (name: string) => {
  const regex = /^[A-Za-z ]+$/;
  return regex.test(name);
};

export const isValidEmail = (email: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};
