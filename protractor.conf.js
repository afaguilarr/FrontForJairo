exports.config = {
  // set to "custom" instead of cucumber.
  framework: 'custom',
 
  // path relative to the current config file
  frameworkPath: require.resolve('protractor-cucumber-framework'),
 
  // require feature files
  specs: [
   
  ],
 
  cucumberOpts: {
    // require step definitions
    require: [
  
    ]
  }
};
