/* eslint-disable no-unused-vars */
/* eslint-env browser*/
var Map = function (container) {
	'use strict';

	this.data = {
		'started': false,
		'loaded': false,
		'loader': function () {},
        'info': null
	};
    this.map = null;
	this.container = container;
	
	this.setContainer = function (container) {
		this.container = container;
	};

	this.addScript = function (url) {
		var script = document.createElement('script');
		script.setAttribute('src', url);
		script.setAttribute('defer', '');
		script.setAttribute('async', '');
		document.head.appendChild(script);
	};

	this.setLoader = function (loadInfo) {
		this.data.loader = loadInfo;
		if (this.data.started) {
			this.data.loader();
			this.data.loaded = true;
		}
	};
};