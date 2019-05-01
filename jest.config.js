module.exports = {
    transform: {
        "^.+\\.tsx?$": "ts-jest",
        "^.+\\.vue$": "vue-jest",
        "^.+\\.js$": "babel-jest"
    },
    testRegex: "(/__tests__/.*|(\\.|/)jest)\\.(jsx?|tsx?)$",
    moduleFileExtensions: [
        "ts",
        "js",
        "vue"
    ],
    transformIgnorePatterns: [
        "<rootDir>/node_modules/(?!vue)"
    ],
    moduleNameMapper: {
        "^vue$": "vue/dist/vue.esm.js",
        "@/([^\\.]*)$": "<rootDir>/src/client/$1"
    }
};
