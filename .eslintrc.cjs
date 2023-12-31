module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
    'airbnb/hooks',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    'react/react-in-jsx-scope': 0,
    'no-void': 'off',
    "no-unsafe-assignment": "off",
    '@typescript-eslint/no-unsafe-assignment': 'off',
    "import/no-extraneous-dependencies": [
      "off",
      {"devDependencies": true}
    ],
    "import/no-unresolved": "off",
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: '0',
        tsx: '0',
      },
    ],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  ignorePatterns: ['.eslintrc.cjs', 'vite.config.ts', 'tailwind.config.js', 'postcss.config.js'],
};
