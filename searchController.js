var Search = require('./models/search');

module.exports.getLatest = function(req, res) {
	Search.find({}, function(err, searches){
		if (err) throw err;
		if (searches) {
			res.json(searches);
		} else {
			res.json({error: "Couldn't find lastest searches ;("});
		}
	})
}