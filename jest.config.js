module.exports = {
  roots: [
    "./src/js/",
    "./src/test/",
  ],
  moduleFileExtensions: [
    "js",
    "html",
    "htm",
    "css",
  ],
  coverageReporters: [
    "json-summary",
  ],
  coverageProvider: "v8",
  reporters: ["default"],
  clearMocks: true,
  transform: {
    "^.+\\.js$": "babel-jest",
  },
  testEnvironment: "jest-environment-jsdom",
};
