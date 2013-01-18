 var map;
 var i18n;
  var urlObject;
  var layer;
  var rangeLayer;
  var selectLayer;
  var geometryService;
  var symbol = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_SQUARE, 12, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([247, 0, 171, 0.9]), 2), new dojo.Color([247, 0, 171, 0.5]));
 
 function initMap() {
   //get the localization strings
   i18n = dojo.i18n.getLocalization("esriTemplate", "template");
   
   geometryService = new esri.tasks.GeometryService("http://tasks.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer");
   
    esri.config.defaults.geometryService = new esri.tasks.GeometryService(configOptions.geometryserviceurl);
   if (!configOptions.sharingurl) {
     configOptions.sharingurl = location.protocol + '//' + location.host + "/sharing/content/items";
   }
   esri.arcgis.utils.arcgisUrl = configOptions.sharingurl;

   if (!configOptions.proxyurl) {
     configOptions.proxyurl = location.protocol + '//' + location.host + "/sharing/proxy";
   }

   esri.config.defaults.io.proxyUrl = configOptions.proxyurl;
   esri.config.defaults.io.alwaysUseProxy = false;
  
    urlObject = esri.urlToObject(document.location.href);
   urlObject.query = urlObject.query || {};

   //is an appid specified - if so read json from there
   if (configOptions.appid || (urlObject.query && urlObject.query.appid)) {
     var appid = configOptions.appid || urlObject.query.appid;
     var requestHandle = esri.request({
       url: configOptions.sharingurl + "/" + appid + "/data",
       content: {
         f: "json"
       },
       callbackParamName: "callback",
       load: function (response) {
         //set config options
         if (response.values.title) {
           configOptions.title = response.values.title;
         }
        
         if (response.values.webmap) {
           configOptions.webmap = response.values.webmap;
         }
         if(response.values.owner){
          configOptions.owner = response.values.owner;
         }
         createApp();
       },
       error: function (response) {
         alert("Unable to create map: ", dojo.toJson(error.message));
       }
     });

   } else {
     createApp();
   }
 }
 
  function createApp() {
	
	 if (urlObject.query.webmap) {
     configOptions.webmap = urlObject.query.webmap;
   }
   if (urlObject.query.title) {
     configOptions.title = urlObject.query.title;
   }
  
   if (urlObject.query.bingMapsKey) {
     configOptions.bingMapsKey = urlObject.query.bingMapsKey;
   }
   if(urlObject.query.owner){
    configOptions.owner = urlObject.query.owner;
   }
	
	//display the webmap from arcgis.com
   var mapDeferred = esri.arcgis.utils.createMap(configOptions.webmap, "map", {
     mapOptions: {
       slider: false,
       sliderStyle:'small',
       nav: false,
       showAttribution:false,
       wrapAround180: true
     },
     ignorePopups: false,
     bingMapsKey: ""
   });
   
   mapDeferred.addCallback(function (response) {
   map = response.map;

var layerDefinition = {
     "geometryType": "esriGeometryPolygon",
     "drawingInfo": {
       "renderer": {
         "type": "simple",
         "symbol": {
           "type": "esriPMS",
           "url": "images/pin_red.png",
           "contentType": "image/png",
           "width": 15,
           "height": 15
         }
       }
     },
	 "fields": [{
       "name": "radius",
       "type": "esriFieldTypeDouble",
       "alias": "Radius"
     }, {
      "name": "angle",
       "type": "esriFieldTypeDouble",
       "alias": "Angle"
     }, {
      "name": "id",
       "type": "esriFieldTypeDouble",
       "alias": "Id"
     }, {
       "name": "start",
       "type": "esriFieldTypeDouble",
       "alias": "Start"
     }]
};

   var featureCollection = {
     layerDefinition: layerDefinition,
     featureSet: null
   };
 
   var infoTemplate = new esri.InfoTemplate("Attributes", "${*}");
   layer = new esri.layers.FeatureLayer(featureCollection, {
	 mode: esri.layers.FeatureLayer.MODE_ONDEMAND,
	 infoTemplate: infoTemplate,
	 id: 'layer'
   });
   rangeLayer = new esri.layers.FeatureLayer(featureCollection, {
	 mode: esri.layers.FeatureLayer.MODE_ONDEMAND,
	 infoTemplate: infoTemplate,
	 id: 'range'
   });
   selectLayer = new esri.layers.FeatureLayer(featureCollection, {
	 mode: esri.layers.FeatureLayer.MODE_ONDEMAND,
	 infoTemplate: infoTemplate,
	 id: 'range'
   });

   map.addLayer(layer);
   plotData();
	
	toolbar = new esri.toolbars.Draw(map);
    dojo.connect(toolbar,"onDrawEnd",select);
	
	tb = new esri.toolbars.Draw(map);
    dojo.connect(tb,"onDrawEnd",selectRange);
	
	dojo.connect(map, "onClick", single);	 
	 
	if (urlObject.query.extent) {
       map.setExtent(new esri.geometry.Extent(dojo.fromJson(urlObject.query.extent)));
       var extentHandler = dojo.connect(map, 'onExtentChange', function () {
         dojo.disconnect(extentHandler);
       });
     }
 
 var itemInfo = response.itemInfo;
     document.title = configOptions.title || response.itemInfo.item.title;
    	 
    if (map.loaded) {
       initUI();
     } else {
       dojo.connect(map, "onLoad", function () {
         initUI();
       });
     }
     //resize the map when the browser resizes
     dojo.connect(dijit.byId('map'), 'resize', map, map.resize);
   });
	
   
   mapDeferred.addErrback(function (error) {
     alert("Unable to create map: ", dojo.toJson(error.message));
   });
   
 }
 
 function select(geometry){
   toolbar.deactivate();
        //select the points within the extent
        var query = new esri.tasks.Query();
        query.geometry = geometry;
        layer.selectFeatures(query,esri.layers.FeatureLayer.SELECTION_NEW);
		  var graphics = layer.getSelectedFeatures();
		
		var q = new esri.tasks.Query();
        q.geometry = esri.graphicsExtent(graphics);
        rangeLayer.selectFeatures(q,esri.layers.FeatureLayer.SELECTION_NEW);
		var ranges = rangeLayer.getSelectedFeatures();
		
		if(esri.graphicsExtent(graphics) == null)
			 ranges = rangeLayer.graphics;
		
		var num = ranges.length;
		
		  for (var i = 0;i<graphics.length;i++){
			var graphic = graphics[i];
			for (var j=0;j<num;j++){
			  var range = ranges[j];
			if(graphic.attributes.id == range.attributes.id){
				graphic.setSymbol(symbol);
				range.show();
				break;
			}
			}
		  }
        
 }
   
 function activateTb(){
   tb.activate(esri.toolbars.Draw.EXTENT);
 }
 
 function selectRange(extent){
    tb.deactivate();
  var query = new esri.tasks.Query();
        query.geometry = extent;
        rangeLayer.selectFeatures(query,esri.layers.FeatureLayer.SELECTION_NEW)
		var ranges = rangeLayer.getSelectedFeatures();
		
	  var q = new esri.tasks.Query();
        q.geometry = esri.graphicsExtent(ranges);
        layer.selectFeatures(q,esri.layers.FeatureLayer.SELECTION_NEW);
		
		  var graphics = layer.getSelectedFeatures();
		  for (var i = 0;i<graphics.length;i++){
			var graphic = graphics[i];
			for (var j=0;j<ranges.length;j++){
			  var range = ranges[j];
			if(graphic.attributes.id == range.attributes.id){
				graphic.setSymbol(symbol);
				range.show();
			}
			}
		  }
	  
    }
 
  function findPointsInExtent(geo) {	  
    var query = new esri.tasks.Query();
        query.geometry = geo.getExtent();
        rangeLayer.selectFeatures(query,esri.layers.FeatureLayer.SELECTION_NEW);
		  var ranges = rangeLayer.getSelectedFeatures();
		  
	var q = new esri.tasks.Query();
        q.geometry = esri.graphicsExtent(ranges);
        layer.selectFeatures(q,esri.layers.FeatureLayer.SELECTION_NEW);
		
	   var graphics = layer.getSelectedFeatures();
		for (var j=0;j<ranges.length;j++){
			  var range = ranges[j];	   
	   for (var i = 0;i<graphics.length;i++){
			var graphic = graphics[i];	
			if(graphic.attributes.id == range.attributes.id){
			  if (graphic.attributes.start != null){
				for (var a=0;a<460;a++){
		 				 if (geo.contains(range.geometry.getPoint(0,a))){
				graphic.setSymbol(symbol);
				range.show();
				break;
		  }
			}
			  }else{
				for (var b=0;b<360;b++){
		 				if (geo.contains(range.geometry.getPoint(0,b)) || geo.contains(graphic.geometry)){
				graphic.setSymbol(symbol);
				range.show();
				break;
			}
				}
		  }
			}
			  }
			}
		  }
  

 function showRange(position, graphic){
   if (graphic.attributes.start == null){
   circle(position, graphic.attributes.radius, graphic.attributes.id, true);
  }
  else
	cone(position, graphic.attributes.radius, graphic.attributes.angle, graphic.attributes.start, graphic.attributes.id, true);
 }
 
 function activateToolbar(){
   toolbar.activate(esri.toolbars.Draw.EXTENT);
	}

function single(){
var num;
var graphics = layer.getSelectedFeatures();
var q = new esri.tasks.Query();
        q.geometry = esri.graphicsExtent(graphics);
        rangeLayer.selectFeatures(q,esri.layers.FeatureLayer.SELECTION_NEW);
		var ranges = rangeLayer.getSelectedFeatures();
			var graphic = graphics[0];
			if(esri.graphicsExtent(graphics) == null)
			 ranges = rangeLayer.graphics;
			
			num = ranges.length;  
			for (var j=0;j<num;j++){
			  var range = ranges[j];
			if(graphic.attributes.id == range.attributes.id){
				graphic.setSymbol(symbol);
				range.show();
				break;
			}
			}
		  
}
 
 function initUI() {
   dojo.addClass(map.infoWindow.domNode, "chrome");
 }
 
 function plotData() {
  
  for (var i = 0;i<50;i++){
  var b = new esri.geometry.Point(180-Math.random()*360, 90-Math.random()*180, new esri.SpatialReference({ wkid: 4326 }));
  var point_b = new esri.geometry.geographicToWebMercator(b);
  attr = {"radius":10+Math.random()*90, "id":i};
  var graphic2 = new esri.Graphic(new esri.Graphic(point_b, null, attr, null));
  layer.applyEdits([graphic2], null, null);
  }
  
  for (var i = 0;i<50;i++){
  var c = new esri.geometry.Point(180-Math.random()*360, 90-Math.random()*180, new esri.SpatialReference({ wkid: 4326 }));
  var point_c = new esri.geometry.geographicToWebMercator(c);
  attr = {"radius":10+Math.random()*90,"angle":Math.random()*Math.PI*1.9, "start":Math.random()*Math.PI*2, "id":50+i};
  var graphic3 = new esri.Graphic(new esri.Graphic(point_c, null, attr, null));
  layer.applyEdits([graphic3], null, null);
  }
 
  map.addLayer(rangeLayer);
  var graphics = layer.graphics;
  var num = graphics.length;
  for (var i=0;i<num;i++)
	setRanges(graphics[i]);
 }
 
 function clearSelect(){
  var graphics = layer.graphics;
  for (var i = 0;i<graphics.length;i++)
	graphics[i].setSymbol(null);
  rangeLayer.clearSelection();
 }
 
 function clear(){
	graphics = rangeLayer.graphics;
	for (var i=0;i<graphics.length;i++)
	  graphics[i].hide();
   
    if (selectLayer.graphics.length > 0) {
     selectLayer.applyEdits(null, null, selectLayer.graphics);
   } 
   clearSelect();
 }
 
 function setRanges(graphic){
   if (graphic.attributes.start == null){
   circle(graphic.geometry, graphic.attributes.radius, graphic.attributes.id, false);
  }
  else
	cone(graphic.geometry, graphic.attributes.radius, graphic.attributes.angle, graphic.attributes.start, graphic.attributes.id, false);
 }
 
 function circle(center, radius, id, visibility){
  var attr = {"id":id};
  var line = new esri.geometry.Polygon(map.spatialReference);
  radius = (map.extent.getWidth() / map.width) * radius;
		var angle = 2*Math.PI;
		var subAngle = angle/360;
		var point;
		var points = [];
		for (var i=0;i<360;i++)
		{
		  point = [center.x - Math.sin(angle/2 - subAngle*i)*radius, center.y + Math.cos(angle/2 - subAngle*i)*radius];
		  
		  points.push(point);
		}
		points.push([center.x - Math.sin(angle/2 - subAngle*0)*radius, center.y + Math.cos(angle/2 - subAngle*0)*radius]);
		line.addRing(points);
		var graphic = new esri.Graphic(line, new esri.symbol.SimpleLineSymbol(), attr, null);
		
		if(visibility)
		graphic.show();
		else
		  graphic.hide();
	 
		rangeLayer.applyEdits([graphic], null, null);		
 }
 
 function cone(pos, radius, angle, start, id, visibility){
   //angle in radians
   //start is the offset of the top from north
	 var attr = {"id":id};
	 var line = new esri.geometry.Polygon(map.spatialReference);
        
        radius = (map.extent.getWidth() / map.width) * radius;
		var subAngle = angle/360;
		var point;
		var subRad = radius/50;
		var points = [];
		for (var i=0;i<360;i++)
		{
		  point = [pos.x - Math.sin(angle/2 - subAngle*i - start)*radius, pos.y + Math.cos(angle/2 - subAngle*i - start)*radius];
		  points.push(point);
		}
		for (var a=0;a<50;a++){
		  point = [pos.x - Math.sin(-angle/2 - start)*subRad*(50-a), pos.y + Math.cos(-angle/2 - start)*subRad*(50-a)];
		  points.push(point);
		}
		for (var b=0;b<50;b++){
		  point = [pos.x - Math.sin(angle/2 - start)*subRad*b, pos.y + Math.cos(angle/2 - start)*subRad*b];
		  points.push(point);
		}
		points.push([pos.x - Math.sin(angle/2 - start)*radius, pos.y + Math.cos(angle/2 - start)*radius]);
		line.addRing(points);
        
        var graphic = new esri.Graphic(line, new esri.symbol.SimpleLineSymbol(), attr, null);
		
		if(visibility)
		graphic.show();
		else
		  graphic.hide();
	 
		rangeLayer.applyEdits([graphic], null, null);
   }
   
   function addToMap(geometry) {
        tool.deactivate();
		map.addLayer(selectLayer);
		 var sym = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([0,0,0]), 2), new dojo.Color([255,255,0,0.25]));
          var graphic = new esri.Graphic(geometry, sym);
       selectLayer.applyEdits([graphic], null, null);
		 findPointsInExtent(geometry);
      }
   
   function polygon(){
	 tool = new esri.toolbars.Draw(map);
     dojo.connect(tool, "onDrawEnd", addToMap);
	 tool.activate(esri.toolbars.Draw.FREEHAND_POLYGON);
	 dojo.disconnect();
   }
 