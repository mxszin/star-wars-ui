import type { Config } from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  transform: {
    '^.+\\.(j|t)sx?$': 'ts-jest',
  },
};
export default config;
