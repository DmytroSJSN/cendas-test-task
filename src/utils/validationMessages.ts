const pluralize = (value: number, one: string, many: string) =>
  value === 1 ? one : many;

export const minMessage = (label: string, value: number, unit = "character") =>
  `${label} must be at least ${value} ${pluralize(value, unit, `${unit}s`)}`;

export const maxMessage = (label: string, value: number, unit = "character") =>
  `${label} must be at most ${value} ${pluralize(value, unit, `${unit}s`)}`;
