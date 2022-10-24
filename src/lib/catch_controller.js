const catchController =  (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).then(data => res.sendJson({data})).catch((err) => next(err));
};

export default catchController;