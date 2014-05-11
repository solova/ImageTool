/*global define*/
define([
	'jquery',
	'backbone',
	'underscore',
	'Sortable',
	'text!templates/filter.html'
], function ($, Backbone, _, Sortable, template) {
	'use strict';

	var FiltersView = Backbone.View.extend({

		// Instead of generating a new element, bind to the existing skeleton of
		// the App already present in the HTML.
		id: "filters",
		tagName: "ul",

		template: _.template(template),
		templateSubmit: '<button>Apply Filters</button>',
		templateStatus: _.template('<%= name %> - <%= value %>%'),

		events: {
			'input input': 'changeValue',
			'click button': 'go'
		},

		go: function() {
			var that = this;
			this.status.show();
			var notappl = true;
			this.collection.forEach(function(model){
				if (notappl && model.get('value') != 0){
					console.log(model.get('name'));
					notappl = false;
					var worker = new Worker(model.get('file'));

					worker.postMessage({
			            imagedata: CANVAS.originalData, 
			            width: CANVAS.canvas.width,
			            height: CANVAS.canvas.height,
			            radius: parseInt(model.get('value'))
			        });

			        console.log({width: CANVAS.canvas.width,
			            height: CANVAS.canvas.height,
			            radius: model.get('value')});
			            
			        worker.onmessage = function(event) 
			        {
			            if (event.data.status == 'done')
			            {
			                CANVAS.ctx.putImageData(event.data.imagedata,0,0); 
							that.status.hide();
			            }
			            else
			            {
			            	that.status.html(that.templateStatus({name:model.get('name'), value: event.data.progress}));
			            }
			        }
				}
			}, this);
		},

		changeValue: function(event) {
			var el = event.target;
			var id = $(el).closest('li').data('id');
			this.collection.get(id).set('value', el.value);
			$(el).closest('li').find('.value').text(el.value);
		},

		initialize: function () {
			
			this.collection.fetch();
			this.listenTo(this.collection, 'sync', this.render);

			window.CC = this.collection;

		},

		makeSortable: function() {
			new Sortable(this.el);
		},

		render: function () {
			this.$el.empty();
			if (!this.collection.isEmpty()){
				this.collection.forEach(function(model){
					this.$el.append(this.template(model.toJSON()))	
				}, this);
				this.$el.append(this.templateSubmit);
				this.status = $("<div>").addClass("status");
				this.$el.append(this.status);
				this.status.hide();
			}
			
			return this;
		},
	});

	return FiltersView;
});