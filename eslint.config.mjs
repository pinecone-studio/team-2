// import nx from '@nx/eslint-plugin';

// export default [
//   ...nx.configs['flat/base'],
//   ...nx.configs['flat/typescript'],
//   ...nx.configs['flat/javascript'],
//   {
//     ignores: ['**/dist', '**/out-tsc'],
//   },
//   {
//     files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
//     rules: {
//       '@nx/enforce-module-boundaries': [
//         'error',
//         {
//           enforceBuildableLibDependency: true,
//           allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?[jt]s$'],
//           depConstraints: [
//             {
//               sourceTag: '*',
//               onlyDependOnLibsWithTags: ['*'],
//             },
//           ],
//         },
//       ],
//     },
//   },
//   {
//     files: [
//       '**/*.ts',
//       '**/*.tsx',
//       '**/*.cts',
//       '**/*.mts',
//       '**/*.js',
//       '**/*.jsx',
//       '**/*.cjs',
//       '**/*.mjs',
//     ],
//     // Override or add rules here
//     rules: {},
//   },
// ];

import nx from '@nx/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import unicorn from 'eslint-plugin-unicorn';
import promise from 'eslint-plugin-promise';
import importPlugin from 'eslint-plugin-import';
import noSecrets from 'eslint-plugin-no-secrets';
import jsonParser from 'jsonc-eslint-parser';

export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],

  {
    ignores: [
      '.next/**/*',
      'node_modules',
      'dist',
      '.cache',
      '**/components/ui/**/*',
      '*.config.js',
      '*.config.ts',
      '*.config.cjs',
      '*.config.mjs',
      'next.config.js',
      'postcss.config.js',
      'tailwind.config.js',
      'jest.config.ts',
      'cypress.config.js',
      'rollup.config.cjs',
      '**/*.d.ts',
      '**/cypress/**/*',
      '**/dist',
      '**/out-tsc',
    ],
  },

  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],

    languageOptions: {
      parser: tsParser,
    },

    plugins: {
      '@nx': nx,
      '@typescript-eslint': tsPlugin,
      unicorn,
      promise,
      import: importPlugin,
      'no-secrets': noSecrets,
    },

    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: [],
          depConstraints: [
            {
              sourceTag: '*',
              onlyDependOnLibsWithTags: ['*'],
            },
          ],
        },
      ],

      '@typescript-eslint/no-explicit-any': 'error',

      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          vars: 'all',
          args: 'after-used',
          argsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],

      '@typescript-eslint/consistent-type-imports': 'error',

      'no-magic-numbers': [
        'off',
        {
          ignoreArrayIndexes: true,
          enforceConst: true,
          detectObjects: false,
        },
      ],

      camelcase: ['error', { properties: 'always' }],

      'no-secrets/no-secrets': 'error',

      'max-lines': ['error', { max: 250 }],

      'max-nested-callbacks': ['error', 3],

      'max-depth': ['error', 4],

      complexity: ['error', { max: 5 }],
    },
  },

  {
    files: [
      '**/_components/**/*.{ts,tsx,js,jsx}',
      '**/_features/**/*.{ts,tsx,js,jsx}',
    ],
    rules: {
      'import/no-default-export': 'error',
    },
  },

  {
    files: ['*.jsx', '*.tsx'],
    rules: {
      '@nx/workspace/jsx-no-inline-function': 'error',
      '@nx/workspace/jsx-no-inline-types': 'error',
      'unicorn/prefer-module': 'off',
      'unicorn/filename-case': ['error', { case: 'pascalCase' }],
    },
  },

  {
    files: [
      '*.js',
      '*.ts',
      '**/pages/**/*.tsx',
      '**/pages/**/*.jsx',
      '**/app/**/page.tsx',
      '**/app/**/layout.tsx',
      '**/app/**/template.tsx',
      '**/app/**/loading.tsx',
      '**/app/**/error.tsx',
      '**/app/**/global-error.tsx',
      '**/app/**/not-found.tsx',
      'mdx-components.tsx',
    ],
    rules: {
      'unicorn/prefer-module': 'off',
      'unicorn/filename-case': ['error', { case: 'kebabCase' }],
    },
  },

  {
    files: ['use[A-Z]*.js', 'use[A-Z]*.ts'],
    rules: {
      'unicorn/prefer-module': 'off',
      'unicorn/filename-case': ['error', { case: 'camelCase' }],
    },
  },

  {
    files: ['*.native.tsx'],
    rules: {
      'unicorn/filename-case': 'off',
    },
  },

  {
    files: ['*.cy.ts', '*.cy.tsx', '*.spec.ts', '*.spec.tsx'],
    rules: {
      'unicorn/filename-case': 'off',
      'max-lines': 'off',
      complexity: 'off',
    },
  },

  {
    files: ['libs/shadcn/**/*.{ts,tsx}'],
    rules: {
      'unicorn/filename-case': 'off',
      '@nx/enforce-module-boundaries': 'off',
      complexity: 'off',
      'max-lines': 'off',
      camelcase: 'off',
    },
  },

  {
    files: ['*.json'],
    languageOptions: {
      parser: jsonParser,
    },
  },
];
