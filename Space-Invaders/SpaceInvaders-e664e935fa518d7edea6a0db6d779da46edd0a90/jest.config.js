module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'js'],
    testPathIgnorePatterns: ['/node_modules/', '/test/'],
    setupFiles: ['./jest.setup.js'],
    transform: {
        '^.+\\.ts$': ['ts-jest', {tsconfig: 'tsconfig.test.json'}],
    },
};