/**
 * GET /
 * Events page.
 */
exports.index = (req, res) => {
  res.render('events', {
    title: 'Events'
  });
};