/*global require*/
'use strict';

// Require.js allows us to configure shortcut alias
require.config({
	paths: {
		jquery: '../vendor/jquery/dist/jquery',
		underscore: '../vendor/lodash/dist/lodash',
		backbone: '../vendor/exoskeleton/exoskeleton',
		templates: '../templates',
		text: '../vendor/requirejs-text/text'
	}
});

require([
	'backbone',
	'views/app'
], function (Backbone, AppView) {
	var app = new AppView();
	app.render();
});