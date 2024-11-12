module.exports = {

    testEnvironment: "jsdom",
 
     transform: {
 
       '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
       ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": "jest-transform-stub"
      
     },

     "moduleNameMapper": {
      "^.+.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": "jest-transform-stub"
    },
 
     setupFilesAfterEnv: ['@testing-library/jest-dom', './src/setupTests.js'],
 
   };