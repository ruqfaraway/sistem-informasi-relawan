export const ValidateEmail = (email: string): boolean => {
 const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 return emailPattern.test(email.trim().toLowerCase());
};