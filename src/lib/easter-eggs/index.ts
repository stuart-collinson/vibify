export const isEasterEggUser = (name: string): boolean => {
  const easterEggUsers = ["julia", "makeedamnsuree"];
  const lowerName = name.toLowerCase();
  return easterEggUsers.some((user) => lowerName.includes(user));
};
