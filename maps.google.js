/* eslint-disable no-unused-vars */
/* eslint-env browser*/
/*global Map, google
*/

var GoogleMaps = function (container) {
    "use strict";
	Map.call(this, container);
	
	var version		= '3.29',
        callback	= 'map.start',
		key         = '',
		clientId    = '';
	this.types		= {hybrid: 'hybrid',
                       road: 'roadmap',
                       satellite: 'satellite',
                       terrain: 'terrain'};

	this.run = function () {
		var script = 'https://maps.google.com/maps/api/js?v=' + version + '&callback=' + callback + '&language=pt_br&libraries=geometry';
		if ((this.clientId !== undefined) && (this.clientId !== '')) {
			script += '&client=' + this.clientId;
		} else if ((this.key !== undefined) && (this.clientId !== '')) {
			script += '&key=' + this.key;
		}
		this.addScript(script);
	};

	this.start = function () {
		var container = document.getElementById(this.container);
		this.map = new google.maps.Map(container, {
			center: {lat: 0, lng: 0},
			zoom: 3
		});
		this.data.started = true;
		if (!this.data.loaded) {
			this.data.loader();
		}
	};

	this.addInfo = function (geojson) {
		var itens = this.map.data.addGeoJson(geojson),
            i = 0,
            length = itens.length,
            item,
            info,
            type,
            infowindow  = new google.maps.InfoWindow(),
            setStyle = function (item) {
                return item.f;
            };
		for (i = 0; i < length; i += 1) {
            item = itens[i];
            info = item.f;
            type = item.getGeometry().getType();
            if (type === 'Point') {
                if ((info.text === null) || (info.text === '')) {
                    info.text = info.title;
                } else if ((info.title === null) || (info.title === '')) {
                    info.title = info.text.replace(/(<([^>]+)>)/ig, '');
                }
                this.addOnClick(info);
            }
		}
        
        this.map.data.setStyle(function (feature) {
            return {icon: feature.getProperty('icon')};
        });
	
        this.map.data.addListener('click', function (event) {
            var type = event.feature.getGeometry().getType();
            if (type === 'Point') {
                infowindow.setContent(event.feature.getProperty("text"));
                infowindow.setPosition(event.feature.getGeometry().get());
                infowindow.setOptions({pixelOffset: new google.maps.Size(0, -30)});
                infowindow.open(this.map);
            }
        });
        
	};
  
	this.addOnClick = function (info) {
		var infowindow = new google.maps.InfoWindow({
			content: info.title
		});
	};
	this.setCenter = function (latlng, zoom) {
		this.map.setCenter(latlng);
		this.map.setZoom(zoom);
	};
	
	this.setType = function (type) {
		this.map.setMapTypeId(type);
	};
};