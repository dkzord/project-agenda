exports.paginaInicial = (req, resp) => {
  resp.render('index', {
    titulo: 'Titulo da página <span style="color: red"> COR VERMELHA </span>',
    numeros: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  });
  return;
}

exports.trataPost = (req, resp) => {
  resp.send(req.body);
  return;
}