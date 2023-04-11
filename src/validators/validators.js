import RuleValidator from "./RuleValidator";

export const OneLetterValidator = new RuleValidator(
  /[A-Za-z]+/, // for german language a RegEx with umlauts can be used: /[A-Za-zÄäÖöÜüß]+/
  "Has at least one letter"
);

export const OneUpperCaseValidator = new RuleValidator(
  (v) => v.toUpperCase() !== v,
  "Has at least one lower letter"
);

export const OneLowerCaseValidator = new RuleValidator(
  (v) => v.toLowerCase() !== v,
  "Has at least one lower letter"
);

export const UpperAndLowerValidator = new RuleValidator(
  [OneLowerCaseValidator, OneUpperCaseValidator],
  "Has at least one lower and one upper case letter"
);

export const OneNumberValidator = new RuleValidator(
  /\d/,
  "Has at least one number"
);

export const SpecialSymbolValidator = new RuleValidator(
  /[$%^& _\-+*()@!]/,
  "Has at least one special character"
);

export const getLongerThanValidator = (n) =>
  new RuleValidator((v) => v.length > n, `Has length > ${n}`);
