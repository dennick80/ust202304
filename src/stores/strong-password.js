import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { RULE } from "@/domain/password/rules";
import * as Validators from "@/validators/validators";
import { StrengthOption } from "@/domain/password/strength-options";

const RuleValidator = {
  [RULE.OneLetter]: Validators.OneLetterValidator,
  [RULE.UpperAndLower]: Validators.UpperAndLowerValidator,
  [RULE.OneNumber]: Validators.OneNumberValidator,
  [RULE.SpecialSymbol]: Validators.SpecialSymbolValidator,
  [RULE.LongerThan4]: Validators.getLongerThanValidator(4),
  [RULE.LongerThan8]: Validators.getLongerThanValidator(8),
  [RULE.LongerThan12]: Validators.getLongerThanValidator(12),
};

const StrengthOptionMinPassedRulesCount = {
  [StrengthOption.Weak]: 0,
  [StrengthOption.Strong]: 5,
};

export const useStrongPasswordStore = defineStore("strong_password", () => {
  const password = ref("");

  const validation = computed(() =>
    Object.entries(RuleValidator).reduce(
      (acc, [rule, validator]) => ({
        ...acc,
        [rule]: {
          hint: validator.hint,
          isValid: validator.isValid(password.value),
        },
      }),
      {}
    )
  );

  const strength = computed(() => {
    const passedRulesCount = Object.values(validation.value).filter(
      ({ isValid }) => isValid
    ).length;

    const [option] =
      Object.entries(StrengthOptionMinPassedRulesCount)
        .sort((a, b) => b[1] - a[1] )
        .find(([, minCount]) => minCount <= passedRulesCount) || [];

    console.log(
      passedRulesCount,
      Object.entries(StrengthOptionMinPassedRulesCount).sort(
        ([, minCountA], [, minCountB]) => minCountB - minCountA
      )
    );
    return option;
  });

  return {
    password,
    validation,
    strength,
  };
});
