'use strict';

const register = async app => {
  const expressApp = app.getHttpAdapter().getInstance();
  await require('@brendonjohn/react-ssr-core/lib/register')(expressApp);
};

module.exports = register;
module.exports.default = register;
