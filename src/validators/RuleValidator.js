export default class RuleValidator {
  /**
   * @param {Function|RegExp|RuleValidator|Array<Function|RegExp|RuleValidator>} test
   * @param {String} hint
   */
  constructor(test, hint) {
    this.test = test;
    this.hint = hint;
  }

  isValid(value) {
    if (typeof value !== "string") {
      return false;
    }
    if (typeof this.test === "function") {
      return this.test(value);
    }
    if (this.test instanceof RegExp) {
      return this.test.test(value);
    }
    if (this.test instanceof RuleValidator) {
      return this.test.test(value);
    }
    if (Array.isArray(this.test)) {
      return this.test.every((rule) =>
        new RuleValidator(rule, this.hint).isValid(value)
      );
    }

    return false;
  }
}
