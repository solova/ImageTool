/*global define*/
define([
	'backbone',
	'underscore'
], function (Backbone, _, template) {
	'use strict';

	var CanvasView = Backbone.View.extend({

		// Instead of generating a new element, bind to the existing skeleton of
		// the App already present in the HTML.
		id: "image",
		tagName: "canvas",

		events:{
			'click': 'foo'
		},

		foo: function(){
			var that = this;
			var worker = new Worker('/filters/mosaic.js');

			worker.postMessage({
	            imagedata: this.originalData, 
	            width: this.canvas.width,
	            height: this.canvas.height,
	            radius: 10
	        });
	            
	        worker.onmessage = function(event) 
	        {
	            if (event.data.status == 'done')
	            {
	                that.ctx.putImageData(event.data.imagedata,0,0); 
	            }
	            else
	            {
	                console.log(event.data.progress + '%');
	            }
	        }

		},

		initialize: function () {
			
			// this.collection.fetch();
			this.listenTo(this.model, 'all', this.render);
			window.CANVAS = this;
			return this;
		},

		render: function () {
			if (this.model.get('loaded')){
				if (!this.canvas) {
					this.canvas = document.getElementById(this.id);
					this.ctx = this.canvas.getContext("2d");

				}
				var img = this.model.get('rawImage');
				this.canvas.width = img.width
				this.canvas.height = img.height;
			    this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
			    this.ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, img.width, img.height);
			    this.originalData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
			}

			return this;
		},
	});

	return CanvasView;
});