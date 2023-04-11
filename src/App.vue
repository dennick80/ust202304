<script setup>
import { RULE } from "@/domain/password/rules";
import { StrengthOptionLabel } from "@/domain/password/strength-options";
import { useStrongPasswordStore } from "@/stores/strong-password.js";

const rules = Object.values(RULE);
const passwordStore = useStrongPasswordStore();
</script>

<template>
  <div>
    <input data-test="password-field" v-model="passwordStore.password" />

    <ul>
      <li
        v-for="rule in rules"
        :key="rule"
        :data-test-rule-indicator="rule"
        class="password-hint__rule"
        :class="
          'password-hint__rule--' +
          (passwordStore.validation[rule].isValid ? 'pass' : 'fail')
        "
      >
        {{ passwordStore.validation[rule].hint }}
      </li>
    </ul>

    <span data-test="validation-summary">{{
      StrengthOptionLabel[passwordStore.strength] || ""
    }}</span>
  </div>
</template>

<style scoped lang="scss">
.password-hint {
  &__rule {
    &--pass {
      text-decoration: line-through;
    }
  }
}
</style>
