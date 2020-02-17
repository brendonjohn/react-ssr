'use strict';

const register = async app => {
  await require('@brendonjohn/react-ssr-core/lib/register')(app);
};

module.exports = register;
module.exports.default = register;
