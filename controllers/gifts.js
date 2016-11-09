/**
 * GET /
 * Gifts page.
 */
exports.index = (req, res) => {
  res.render('gifts', {
    title: 'Gifts'
  });
};