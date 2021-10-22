export const formatAddress = (address: string | null | undefined): string => {
  if (!address) return "NO ADDRESS";
  const length = address.length;
  return address.substr(0, 6) + "..." + address.substr(length - 6, 6);
};