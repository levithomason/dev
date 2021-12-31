export const formatAddress = (address?: string | null | undefined) => {
  if (!address) return "";

  const first5 = address.substring(0, 5);
  const last5 = address.substring(address.length - 6, address.length - 1);

  return `${first5}...${last5}`;
};  

const formatterUSD = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});  

const formatterUSDNoCents = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});  

export const formatUSD = (val: any) => {
  if (typeof val !== "number") return "$0.00";
  return formatterUSD.format(val);
};
export const formatUSDNoCents = (val: any) => {
  if (typeof val !== "number") return "$0";
  return formatterUSDNoCents.format(val);
};
