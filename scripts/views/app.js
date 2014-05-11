/*global define*/
define([
	'backbone',
	'underscore',
	'models/image',
	'collections/filters',
	'views/filters',
	'views/canvas',
	'text!templates/main.html'
], function (Backbone, _, Img, Filters, FiltersView, CanvasView, template) {
	'use strict';

	console.log("Filters", Filters);

	var AppView = Backbone.View.extend({

		el: 'body',

		template: _.template(template),

		initialize: function () {
			this.image = new Img({url: 'data/image1.jpg'});
			Filters.fetch({reset: true});
		},

		render: function () {
			this.$el.html(this.template());

			var image = new CanvasView( { model: this.image });
			this.$('#container').append(image.render().el);
			// image.drawOriginal();

			var filters = new FiltersView({ collection: Filters });
			this.$('#container').append(filters.render().el);
			filters.makeSortable();

			return this;
		},
	});

	return AppView;
});