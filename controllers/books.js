/**
 * GET /
 * Books page.
 */
exports.index = (req, res) => {
  res.render('books', {
    title: 'Books'
  });
};
