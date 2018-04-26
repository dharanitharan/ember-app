/* eslint-env node */
'use strict';

module.exports = function (deployTarget) {
  let ENV = {
    build: {
      environment: deployTarget
    },
    'revision-data': {
      type: 'git-commit'
    },
    'pipeline': {
      activateOnDeploy: true
    }
  };

  if (deployTarget === 'digital01') {
    ENV.build.environment = 'development';
    ENV['s3'].bucket = 'digital01.dharanitharan.ember.app';
    ENV['s3-index'].bucket = 'digital01.dharanitharan.ember.app';
  }

  if (deployTarget === 'digital02') {
    ENV.build.environment = 'development';
    ENV['s3'].bucket = 'digital02.dharanitharan.ember.app';
    ENV['s3-index'].bucket = 'digital02.dharanitharan.ember.app';
  }

  if (deployTarget === 'uat') {
    ENV.build.environment = 'development';
    ENV['s3'].bucket = 'uat.dharanitharan.ember.app';
    ENV['s3-index'].bucket = 'uat.dharanitharan.ember.app';
  }

  if (deployTarget === 'staging') {
    ENV.build.environment = 'development';
    ENV['s3'].bucket = 'staging.dharanitharan.ember.app';
    ENV['s3-index'].bucket = 'staging.dharanitharan.ember.app';
  }

  if (deployTarget === 'production') {
    ENV.build.environment = 'production';
    ENV['s3'].bucket = 'dharanitharan.ember.app';
    ENV['s3-index'].bucket = 'dharanitharan.ember.app';
  }

  // Note: if you need to build some configuration asynchronously, you can return
  // a promise that resolves with the ENV object instead of returning the
  // ENV object synchronously.
  return ENV;
};
