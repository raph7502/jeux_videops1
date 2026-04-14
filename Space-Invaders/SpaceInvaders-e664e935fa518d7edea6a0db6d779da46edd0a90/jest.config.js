module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'js'],
    testPathIgnorePatterns: ['/node_modules/', '/test/'],
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },
};