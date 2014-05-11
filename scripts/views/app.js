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

		// Instead of generating a new element, bind to the existing skeleton of
		// the App already present in the HTML.
		el: 'body',

		// Compile our stats template
		template: _.template(template),

		initialize: function () {
			// this.allCheckbox = this.$('#toggle-all')[0];
			// this.$input = this.$('#new-todo');
			// this.$footer = this.$('#footer');
			// this.$main = this.$('#main');

			// this.listenTo(Todos, 'add', this.addOne);
			// this.listenTo(Todos, 'reset', this.addAll);
			// this.listenTo(Todos, 'change:completed', this.filterOne);
			// this.listenTo(Todos, 'filter', this.filterAll);
			// this.listenTo(Todos, 'all', this.render);

			// Todos.fetch({reset:true});
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