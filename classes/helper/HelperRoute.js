const K8 = require('k8mvc');
const fs = require('fs');

const guardRegisterd = (hostname, reply) =>{
  //guard site registered.
  if(!fs.existsSync(`${K8.EXE_PATH}/../sites/${hostname}`)){
    reply.code(404);
    return true;
  }
  return false;
};

const resolve = async(Controller, request, reply) => {
  const hostname = request.hostname.split(':')[0];

  if(guardRegisterd(hostname, reply))return `404 / store not registered`;

  //setup ORM
  const HelperDB = K8.require('helper/HelperDB');
  const ORM      = K8.require('ORM');
  ORM.setDB(HelperDB.getConnection(hostname));

  //import controller
  const c = new Controller(request, reply);
  await c.execute();

  return c.output;
};

module.exports = {
  resolveRoute : resolve
};

