export const isEasterEggUser = (name: string): boolean => {
  const easterEggUsers = ["makeedamnsuree"];
  const lowerName = name.toLowerCase();
  return easterEggUsers.some((user) => lowerName.includes(user));
};
