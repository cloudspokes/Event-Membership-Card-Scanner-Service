
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Event Membership Card Scanner Service' })
};