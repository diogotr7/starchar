import antfu from '@antfu/eslint-config'

export default antfu({
  rules: {
    'no-console': 'off',
    'style/max-len': ['off'],
  },
  yaml: false,
})
