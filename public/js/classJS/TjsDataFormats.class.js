
/**
* desc-CZML格式处理利器
* author-www.zhiwenli.com
* at-2017-7-14 15:38:32
*/
var TjsCZMLOprt = {
	load: function(url, viewer){
		Cesium.CzmlDataSource.load(url).then(function(dataSource){
	        viewer.dataSources.add(dataSource);
	        // viewer.zoomTo(dataSource);

	        var tds = TjsDataset.create(dataSource, 'DataSource', url);
	        TjsMain.addDataset(tds);
      });
	},

	unload: function(url, viewer){
		
	}
}



/**
* desc-GeoJSON格式处理利器
* author-www.zhiwenli.com
* at-2017-7-16 20:03:37
*/
var TjsGeoJSONOprt = {
	load: function(url, viewer){
		Cesium.GeoJsonDataSource.load(url).then(function(dataSource){
			viewer.dataSources.add(dataSource);
			// viewer.zoomTo(dataSource);

			var tds = TjsDataset.create(dataSource, 'DataSource', url);
			TjsMain.addDataset(tds);
		});

	},
}


/**
* desc-KML/KMZ格式处理利器
* author-www.zhiwenli.com
* at-2017-7-16 20:44:06
*/
var TjsKmlOprt = {
	load: function(url, viewer){
		var options = {
		    camera : viewer.scene.camera,
		    canvas : viewer.scene.canvas
		};

		Cesium.KmlDataSource.load(url, options).then(function(dataSource){
			viewer.dataSources.add(dataSource);
			// viewer.zoomTo(dataSource);

			var tds = TjsDataset.create(dataSource, 'DataSource', url);
			TjsMain.addDataset(tds);
		});

	},
}


/**
* desc-GPX格式处理利器(GPS通用数据格式)
* author-www.zhiwenli.com
* at-2017-7-16 20:44:06
*/
var TjsGpxOprt = {
	load: function(url, viewer){


	},

	gpx2czml: function(){

	},
}

/**
* desc-点对象，用于构建entity
* author-www.zhiwenli.com
* at-2017-10-27 10:18:27
*/
function PointObject(){
	var po = new Object();
	po.id = 0;
	po.name = '';
	po.lat = 0;
	po.lng = 0;
	po.altitude = 0;
	po.attrs = '';
	po.process = function(){};
	return po;
}

/**
* desc-对象格式处理器
* author-www.zhiwenli.com
* at-2017-10-25 16:36:07
*/
var TjsObjOprt = {
	load: function(pointObjectArray, fileUrl, viewer){
		var nds = new Cesium.CustomDataSource('custom dataSource'); //自定义DataSource用于分组管理entity

		//循环创建entity并加入自定义DataSource中
		for (var i = 0; i < pointObjectArray.length; i++) {
			var object = pointObjectArray[i];
			var entity = {
        		position : Cesium.Cartesian3.fromDegrees(object.lng, object.lat),
		        point : {
		            show : true, // default
		            color : Cesium.Color.SKYBLUE, // default: WHITE
		            pixelSize : 10, // default: 1
		            outlineColor : Cesium.Color.YELLOW, // default: BLACK
		            outlineWidth : 3 // default: 0
		        }
			};
			nds.entities.add(entity);
		}

		viewer.dataSources.add(nds);

		var tds = TjsDataset.create(nds, 'DataSource', fileUrl);
		TjsMain.addDataset(tds);

	}, //end of load

}

/**
* desc-三维模型格式处理器
* author-www.zhiwenli.com
* at-2018-1-24 09:48:12
*/
var TjsModelOprt = {
	load: function(url, viewer, position, orientation, scale, name){

		var entity = viewer.entities.add({
	        name : name,
	        position : Cesium.Cartesian3.fromDegrees(position.lng, position.lat, position.alt),
	        orientation : orientation,
	        model : {
	            uri : url,
	            scale : scale
	        },
	        show : true
	    });

	    var tds = TjsDataset.create(dataSource, 'EntityModel', url);
		TjsMain.addDataset(tds);

	}, //end of load
}



////////////////////////////////////////////////////////////////
//网络服务/文件处理
//server Example: http://180.168.169.146:6080/arcgis/rest/services/shland_2016_anno/MapServer
var TjsArcGISServer = {
	load: function(serverUrl, viewer){
		console.warn('loading: ', serverUrl);

		var newImageryLayerProvider = new Cesium.ArcGisMapServerImageryProvider({
		    url : serverUrl,
			enablePickFeatures : true
		})

		var newImageryLayer = viewer.imageryLayers.addImageryProvider(newImageryLayerProvider);

		var tds = TjsDataset.create(newImageryLayer, 'ImageryLayer', serverUrl);  //修改其它处TjsDataset.create调用参数列表
		TjsMain.addDataset(tds);
	},
}