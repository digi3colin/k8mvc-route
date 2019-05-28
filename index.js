module.exports = {
  RouteList : require('./classes/RouteList'),
  HelperDB : require('./classes/helper/HelperDB'),
  HelperRoute : require('./classes/helper/HelperRoute'),
};

const K8 = require('k8mvc');
K8.nodePackages[require.resolve('./index').replace('/index.js', '')] = true;