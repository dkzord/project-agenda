exports.middlewareGlobal = (req, resp, next) => {
  resp.locals.errors = req.flash('errors');
  resp.locals.success = req.flash('success');
  next();
}

exports.outroMiddleware = (req, resp, next) => {
  next();
}

exports.checkCsrfError = (err, req, resp, next) => {
  if (err) {
    return resp.render('404');
  }
  next();
}

exports.csrfMiddleware = (req, resp, next) => {
  resp.locals.csrfToken = req.csrfToken();
  next();
}