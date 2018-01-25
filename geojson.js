/* eslint-disable no-unused-vars */
var GeoJSON = function () {
	'use strict';

	var json = {
		type: 'FeatureCollection',
		features: []
	};

	this.addPoint = function (point) {
		json.features.push(point.get());
	};
    
	this.addPoints = function (points) {
        var nPoints = points.length,
            i;
        for (i = 0; i < nPoints; i += 1) {
            this.addPoint(points[i]);
        }
	};
	
	this.addRadius = function (Radius) {
		json.features.push(Radius.get());
	};
	
	this.generate = function () {
        return json;
	};
};

var Point = function (latlng) {
	'use strict';
	this.latlng = latlng;
	this.data   = {icon: '',
                   title: ''};
    
	this.get = function () {
        var item = {
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: this.latlng
                },
                properties: this.data
            };
        return item;
	};
};

var Radius = function (latlng, radiusKm, points) {
	'use strict';
    if (points === undefined) {
        points = 128;
    }

    this.coords = {
        latitude:  latlng[1],
        longitude: latlng[0]
    };

    var km = radiusKm,
        ret = [],
        distanceX = km / (111.320 * Math.cos(this.coords.latitude * Math.PI / 180)),
        distanceY = km / 110.574,
        theta,
        x,
        y,
        i;
    for (i = 0; i < points; i += 1) {
        theta = ((i / points) * (2 * Math.PI));
        x = distanceX * Math.cos(theta);
        y = distanceY * Math.sin(theta);
        ret.push([this.coords.longitude + x, this.coords.latitude + y]);
    }
    ret.push(ret[0]);

    this.get = function () {
        var item = {
            "type": "Feature",
            "geometry": {
                "type": "Polygon",
                "coordinates": [ret]
            }
        };
        return item;
    };
};