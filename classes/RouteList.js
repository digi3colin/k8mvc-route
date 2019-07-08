const K8 = require('k8mvc');

class RouteList{
  static add(path, controller, action='index', method='get', weight=5){
    RouteList.routes[weight] = RouteList.routes[weight] || [];

    RouteList.routes[weight].push({
      path: path,
      controller : controller,
      action : action,
      method : method
    });
  }

  static crud(partialPath, controller, weight=5){
    RouteList.add(`/admin/${partialPath}`, controller, 'index', 'get', weight);
    RouteList.add(`/admin/${partialPath}/new`, controller, 'create', 'get', weight);
    RouteList.add(`/admin/${partialPath}/:id`, controller, 'read', 'get', weight);
    RouteList.add(`/admin/${partialPath}/:id`, controller, 'update', 'post', weight);
    RouteList.add(`/admin/${partialPath}/delete/:id`, controller, 'delete', 'get', weight);
  }

  static stub(path, message){
    RouteList.routes[0] = RouteList.routes[0] || [];
    RouteList.routes[0].push({
      path: path,
      message : message
    })
  }

  static createRoute(app){
    RouteList.routes.flat().forEach(x => {
      if (!x) return;
      if (x.message){
        app.get(x.path, async () => x.message);
        return;
      }

      const callback = async(request, reply) => {
        const {resolveRoute} = K8.require('helper/HelperRoute');
        request.params.action = x.action;
        request.params.controller = x.controller;
        return await resolveRoute(K8.require(x.controller), request, reply);
      };

      if(x.method === 'post'){
        app.post(x.path, callback);
      }else{
        app.get(x.path, callback);
      }

    });
  }
}

RouteList.routes = [];

if (!Array.prototype.flat) {
  Array.prototype.flat = function(depth) {
    const flattend = [];
    (function flat(array, depth) {
      for (let el of array) {
        if (Array.isArray(el) && depth > 0) {
          flat(el, depth - 1);
        } else {
          flattend.push(el);
        }
      }
    })(this, Math.floor(depth) || 1);
    return flattend;
  };
}

module.exports = RouteList;