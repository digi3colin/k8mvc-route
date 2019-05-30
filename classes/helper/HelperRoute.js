const resolve = async(Controller, request, reply) => {
  //import controller
  const c = new Controller(request, reply);
  await c.execute();
  return c.output;
};

module.exports = {
  resolveRoute : resolve
};

