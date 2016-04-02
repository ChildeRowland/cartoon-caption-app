angular.module('captionApp', ['ui.bootstrap'])

.controller('MainController', function ($http) {
	var self = this;
	self.images;

	self.working = "Cartoon Caption Contest";

	$http({
		method: 'GET',
		url: '/images'
	}).then(function onSuccess(doc) {
		console.log(doc);
		self.images = doc.data.message;
	}, function onError(error) {
		console.log(error);
	});

	self.add = function (string, id) {

		$http({
			method: 'POST',
			url: '/images/' + id + '/captions',
			data: { "text" : string }
		}).then(function onSuccess(success) {
			console.log("NICE");
		}, function onError(error) {
			console.log('STINKER');
		});

	};

});