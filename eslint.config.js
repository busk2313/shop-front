import antfu from '@antfu/eslint-config'

export default antfu({
  rules: {
    /* JAVASCRIPT */
    'no-console': 'off',
    'eslint-comments/no-unlimited-disable': 'off',
    // 'semi': ['error', 'always'],
    // 'curly': ['error', 'all'],

    /* VUE */

    // Priority B: Strongly Recommended (Improving Readability)
    'vue/max-attributes-per-line': ['error', {
      singleline: 2,
    }],
    // Priority C: Recommended (Minimizing Arbitrary Choices and Cognitive Overhead)
    'vue/attributes-order': ['error', {
      alphabetical: true,
    }],
    'vue/block-order': ['error', {
      order: ['template', 'script', 'style'],
    }],
    'vue/component-name-in-template-casing': ['error', 'PascalCase', {
      registeredComponentsOnly: false,
    }],
  },
})
