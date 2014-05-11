/*global define*/
define([
	'backbone',
	'models/image'
], function (Backbone, image) {
	'use strict';

	var FiltersCollection = Backbone.Collection.extend({
		model: image,
		url: '/filters.json'
	});

	return new FiltersCollection();
});