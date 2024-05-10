import antfu from '@antfu/eslint-config'

export default antfu({
  rules: {
    'no-console': 'off',
    'style/max-len': ['off'],
    'style/max-statements-per-line': ['off'],
  },
  yaml: false,
})
