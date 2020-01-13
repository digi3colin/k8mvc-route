const resolve = async(Controller, request, reply) => {
  //import controller
  const c = new Controller(request, reply);
  await c.execute();
  return (typeof c.output === 'string') ? c.output : JSON.stringify(c.output);
};

module.exports = {
  resolveRoute : resolve
};

