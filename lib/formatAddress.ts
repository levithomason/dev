export const formatAddress = (address?: string | null | undefined) => {
  if (!address) return "";

  const first5 = address.substring(0, 5);
  const last5 = address.substring(address.length - 6, address.length - 1);

  return `${first5}...${last5}`;
};
