import type { Config } from 'jest';

const config: Config = {
  rootDir: 'src',
  clearMocks: true,
  coverageProvider: 'v8',
  transform: {
    '^.+\\.ts?$': [
      '@swc/jest',
      {
        jsc: {
          target: 'es2021',
        },
      },
    ],
  },
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
};

export default config;
