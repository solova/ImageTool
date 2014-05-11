/*global define*/
define([
	'jquery',
	'backbone',
], function ($, Backbone) {
	'use strict';

	var ImageModel = Backbone.Model.extend({
		initialize: function(){
			this.listenTo(this, 'change:url', this.setRaw);
			if (this.get('url')){
				this.setRaw();
			}
			return this;
		},
		defaults: {
			url: '',
			loaded: false
		},
		setRaw: function(){
			var that = this;
			this.set('loaded', false);

			var img = new Image();
			img.src = this.get('url');
			if (img.complete) {
				console.log('complete');
			    this.set('loaded', true);
			}
			else {
			    img.onload = function(){
			    	that.set('loaded', true);
			    }
			}
			this.set('rawImage', img);
			return this;
		}
	});

	return ImageModel;
});