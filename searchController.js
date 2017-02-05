var Search = require('./models/search');
var request = require('request');

var getImages = function(query) {
	var params = "q=" + query;
	
}

var filterSearchFields = function(searchResult) {
	return searchResult.value.map((image) => {
		var newImage = {
			url: image.contentUrl,
			snippet: image.name,
			thumbnail: image.thumbnailUrl,
			context: image.hostPageDisplayUrl
		};
		return newImage;
	})
}

module.exports.getLatest = function(req, res) {
	Search.find({}, function(err, searches){
		if (err) throw err;
		if (searches) {
			var result = searches.reverse().map((search) => {
				return { term: search.term, when: search.when }
			})
			res.json(result);
		} else {
			res.json({error: "Couldn't find lastest searches ;("});
		}
	})
}

module.exports.runSearch = function(req, res) {
	var query = req.params.query;
	var params = "q=" + query;
	var url = "https://api.cognitive.microsoft.com/bing/v5.0/images/search?" + params;
	var options = {
		url: url,
		headers: {
			'Ocp-Apim-Subscription-Key': process.env.SUBSCRIPTION_KEY
		}
	};
	request(options, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			try {
		      var parsedData = JSON.parse(body);
		    } catch (e) {
		      console.log(e.message);
		    }
			var search = new Search({term: query});
			search.save(function(err, search){
				if (err) throw err;
				var finalData = filterSearchFields(parsedData);
				res.json(finalData);
			});
		} else {
			console.log(response);
		}
	});
}