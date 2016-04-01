angular.module('captionApp', [])

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
});