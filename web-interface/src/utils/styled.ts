export const blueTemplate = "rgba(13, 59, 102, ops)";
export const darkBlueTemplate = "rgba(31, 31, 65, ops)";
export const pinkTemplate = "rgba(212, 45, 111, ops)";
export const greenTemplate = "rgba(36, 175, 96, ops)";
export const orangeTemplate = "rgba(249, 87, 56, ops)";

export const withOpacity = (colorTemplate: string, opacity: number): string => {
  return colorTemplate.replace("ops", `${opacity}`);
};

export const colors = {
  blue: withOpacity(blueTemplate, 1),
  darkBlue: withOpacity(darkBlueTemplate, 1),
  lightBlue: withOpacity(blueTemplate, 0.07),
  fadedBlue: withOpacity(darkBlueTemplate, 0.85),
  pink: withOpacity(pinkTemplate, 1),
  fadedPink: withOpacity(pinkTemplate, 0.7),
  green: withOpacity(greenTemplate, 1),
  orange: withOpacity(orangeTemplate, 1),
};
