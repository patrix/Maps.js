# Maps.js
*Javascript framework for maps API*

## How to use maps.js?

```html
<script src="geojson.js"></script>
<script src="maps.js"></script>
<script src="maps.google.js"></script>
<!--
Alternatives:
    <script src="maps.openstreetmap.js"></script>
    <script src="maps.mapbox.js"></script>
    <script src="maps.bing.js"></script>
    <script src="maps.here.js"></script>
-->
<script type="text/javascript">
    var geo = new GeoJSON();
    var latlng = [-109.276638, -27.125840];

    // Create a point
        var point  = new Point(latlng);
        point.data.title  = 'X Point';
        geo.addPoint(point);
    
    // Add a radius of 100 km
        var radius = new Radius(latlng, 100);
        geo.addRadius(radius);

    // Show using your favorite map API :)
        var map = new GoogleMaps('map');
        //var map = new OpenStreetMaps('map');
        //var map = new BingMaps('map');
        //var map = new MapboxMaps('map');
        //var map = new HereMaps('map');
        map.setLoader(function(){
            map.setCenter({lat: 0, lng: 0}, 2);
            map.addInfo(geo.generate());
        });
        map.run();
</script>
```
---

## Supporters:
* [UAPI](https://uapi.com.br/)
* [Patrick Kaminski](https://patrickkaminski.com/)
