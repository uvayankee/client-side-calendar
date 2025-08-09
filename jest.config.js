export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./jest.setup.js'],
  moduleNameMapper: {
    // eslint-disable-next-line no-useless-escape
    '^(\.{1,2}/.*)\\.js$': '$1',
  },
};