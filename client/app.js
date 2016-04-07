angular.module('captionApp', ['ui.bootstrap'])

.factory('imageResource', function () {

})

.controller('MainController', function ($http) {
	var self = this;
	self.images;
	self.newCaption;
	self.idx = 0;

	self.working = "Cartoon Caption Contest";

	self.pageUp = function () {
		if ( self.idx < self.images.length - 1 ) {
			self.idx++
		} else {
			self.idx = 0;
		}
	};

	self.vote = function (index) {
		self.images[self.idx].captions[index].hasVoted = true;
	};

	self.getAll = function () {

		$http({
			method: 'GET',
			url: '/images'
		}).then(function onSuccess(doc) {
			//console.log(doc);
			self.images = doc.data.message;
		}, function onError(error) {
			console.log(error);
		});
	};

	self.add = function (id) {

		$http({
			method: 'POST',
			url: '/images/' + id + '/captions',
			data: { "text" : self.newCaption }
		}).then(function onSuccess(success) {
			console.log(success);
			self.newCaption = "";
			self.getAll();
			// get new captions
		}, function onError(error) {
			console.log(error);
		});
	};

	self.getAll();
});