import antfu from '@antfu/eslint-config'

export default antfu({
  rules: {
    'no-console': 'warn',
    'style/max-len': ['off'],
  },
  yaml: false,
})
