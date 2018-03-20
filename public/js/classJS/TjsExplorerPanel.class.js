
/**
* desc-explorer panel窗口类
* author-www.zhiwenli.com
* at-2017-7-15 17:21:24
*/
var ExplorePanel = {
	explorePanelID: '#tjs-explorer-panel',
	modelCfgDiv: '#tjs-mdoel-cfg',
	init: function(){
		$('#tjs-explore-panel-done').click(function(){
			ExplorePanel.hide();
			// $('#tjs-explorer-panel').fadeOut('fast');
		});

		$('#tablist--data-catalog>button').click(function(e){
			$('#tablist--my-data>button').removeClass('tjs-tabs__btn--selected');
			$(e.target).addClass('tjs-tabs__btn--selected');

			$('#panel--my-data').hide();
			$('#panel--data-catalog').show();
		});

		$('#tablist--my-data>button').click(function(e){
			$('#tablist--data-catalog>button').removeClass('tjs-tabs__btn--selected');
			$(e.target).addClass('tjs-tabs__btn--selected');

			$('#panel--data-catalog').hide();
			$('#panel--my-data').show();
		});

	},

	show: function(){
		$(this.explorePanelID).show();
	},

	hide: function(){
		$(this.explorePanelID).fadeOut('fast');
	},

	showModelCfgDiv: function(){
		$(this.modelCfgDiv).fadeIn();
	},

	hideModelCfgDiv: function(){
		$(this.modelCfgDiv).fadeOut();
	}
}

function getImgURL(node) {
    var imgURL = "";
    try{
        var file = null;
        if(node.files && node.files[0]){
            file = node.files[0];
        }else if(node.files && node.files.item(0)) {
            file = node.files.item(0);
        }     
        //Firefox 因安全性问题已无法直接通过input[file].value 获取完整的文件路径  
        try{
            //Firefox7.0   
            imgURL =  file.getAsDataURL();    
            //alert("//Firefox7.0"+imgRUL);                           
        }catch(e){  
            //Firefox8.0以上                                
            imgRUL = window.URL.createObjectURL(file);  
            //alert("//Firefox8.0以上"+imgRUL);  
        }  
     }catch(e){      //这里不知道怎么处理了，如果是遨游的话会报这个异常                   
        //支持html5的浏览器,比如高版本的firefox、chrome、ie10  
        if (node.files && node.files[0]) {                            
            var reader = new FileReader();   
            reader.onload = function (e) {                                        
                imgURL = e.target.result;    
            };  
            reader.readAsDataURL(node.files[0]);   
        }    
     }  
    //imgurl = imgURL;  
    return imgURL;  
}





/**
* desc-添加本地数据，使用前需init
* author-www.zhiwenli.com
* at-2017-7-13 23:28:05
*/
var TjsAddLocalData = {
	dataTypeListID: '#tjs-select-local-data-type ul',
	init: function(){
		$('#tjs-select-local-data-type').click(function(e){
			if ($(TjsAddLocalData.dataTypeListID).hasClass('tjs-dropdown__is-open')) {
				TjsAddLocalData.hideDataTypeList();
			}else{
				TjsAddLocalData.showDataTypeList();
			}
		});

		$('#tjs-select-local-data-type>ul>li>button').click(function(e){
			var strType = $(e.target).text();
			TjsAddLocalData.setDataType(strType);
		});

		$('.tjs-file-input__input').change(function(e){
			var files = $('.tjs-file-input__input').prop('files');
			if(files.length == 0){console.log( 'No file selected!'); return;}

			var form = new FormData();
			form.append('userfile', files[0]);
			HttpForm.sendPostFormObj(form, lzwVar.FILE_SERVER_PATH, function(result){
				console.log('file url: ', result);
				console.assert(result['status'][0] != 'false', "No Correct File Path");
				TjsAddLocalData.loadByType(result['content'], result['status'][1]);
			});
		});

	},

	showDataTypeList: function(){
		$("#tjs-add-local-data-div").hide();

		var width = $('#tjs-select-local-data-type').width();
		$(TjsAddLocalData.dataTypeListID).width(width);
		$(TjsAddLocalData.dataTypeListID).addClass('tjs-dropdown__is-open');
	},

	hideDataTypeList: function(){
		$(TjsAddLocalData.dataTypeListID).removeClass('tjs-dropdown__is-open');
		$("#tjs-add-local-data-div").show();
	},

	setDataType: function(strType){
		$('#tjs-select-local-data-type>button').text(strType);
	},

	//根据表格第一行确定表格中经纬度所在列列号
	confirmLatLng: function(data){
		//······用户选择、、根据列名称 数值范围自动识别经纬度
		var latlngIndex = LatLngFieldDetect.detect(data);
		if (latlngIndex[0] == -1 || latlngIndex[1] == -1) {
			console.warn('经纬度检测失败');
			return false;
		}else{
			console.warn('检测到纬度列号：', latlngIndex[0], '，经度列号：', latlngIndex[1]);
			return latlngIndex;
		}
	},

	//文件数据
	loadByType: function(content, type){
		if (type == 'FilePath') {
			//文件
			TjsAddLocalData.loadByFileFormat(content['fileUrl']); //filepath
		}else if(type == 'ObjectArray'){
			//表
			TjsAddLocalData.loadObjectArray(content); //martrix
		}else{
			console.warn('Unknow response type: ', type);
		}
		ExplorePanel.hide(); //加载后关闭
	},

	//加载表格数据
	loadObjectArray: function(content){
		var data = content['data'];
		var fileUrl = content['fileUrl'];
		//尝试加载所有行，并自动过滤错误数据
		var latLngIndex = TjsAddLocalData.confirmLatLng(data);
		var latIndex = latLngIndex[0];
		var lngIndex = latLngIndex[1];

		var lat, lng, index;
		var objectArray = new Array();
		for (var i = 0; i < data.length; i++) {
			lat = Number(data[i][latIndex]); //lat
			lng = Number(data[i][lngIndex]); //lng

			if (isNaN(lat) || isNaN(lng)) {
				console.log('非数值类型');
			}else if(lat < -90 || lat > 90){
				console.log('纬度超限');
			}else if(lng < -180 || lng > 180){
				console.log('经度超限');
			}else{
				//console.log(lat, lng);
				var pointObject = PointObject();
				pointObject.id = index++;
				pointObject.lat = lat;
				pointObject.lng = lng;
				objectArray.push(pointObject);
			}
		}

		TjsObjOprt.load(objectArray, fileUrl, TjsMain.cesiumViewer);
	},

	//根据文件类型使用cesium对象加载相应的文件数据
	loadByFileFormat: function(filePath){
		var tmpArr = filePath.split('.');
		var suffix = tmpArr[tmpArr.length-1].toUpperCase();

		ExplorePanel.hideModelCfgDiv();
		
		switch(suffix){
			case 'CZML':
				TjsCZMLOprt.load(filePath, TjsMain.cesiumViewer);
				break;
			case 'GEOJSON':
				TjsGeoJSONOprt.load(filePath, TjsMain.cesiumViewer);
				break;
			case 'TOPOJSON':
				TjsGeoJSONOprt.load(filePath, TjsMain.cesiumViewer);
				break;
			case 'KML':
				TjsKmlOprt.load(filePath, TjsMain.cesiumViewer);
				break;
			case 'KMZ':
				TjsKmlOprt.load(filePath, TjsMain.cesiumViewer);
				break;
			case 'GLTF' || 'GLB':
				//model
				ExplorePanel.showModelCfgDiv();
				//save url

				//TjsAddLocalData.loadEntityModel(filePath);
				break;
			default:
				console.error('The format ' + suffix + ' can not recongnize!');
		}
		
	},

	//加载模型 active by #tjs-mdoel-cfg
	loadEntityModel: function(filePath){
		
		var position = {
			lng: 0,
			lat: 0,
			alt: 0
		};
		var scale;
		var name;

		var heading = Cesium.Math.toRadians(0);
    	var pitch = 0;
    	var roll = 0;
    	var hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
    	var orientation = Cesium.Transforms.headingPitchRollQuaternion(position, hpr);

		TjsModelOprt.load(filePath, TjsMain.cesiumViewer, position, orientation, scale, name);
	}

}




/**
* desc-添加网络数据，使用前需init
* author-www.zhiwenli.com
* at-2017-7-13 23:29:27
*/
var TjsAddWebData = {
	dataTypeListID: '#tjs-select-web-data-type ul',
	init: function(){
		$('#tjs-select-web-data-type').click(function(e){
			if ($(TjsAddWebData.dataTypeListID).hasClass('tjs-dropdown__is-open')) {
				TjsAddWebData.hideDataTypeList();
			}else{
				TjsAddWebData.showDataTypeList();
			}
		});

		$('#tjs-select-web-data-type>ul>li>button').click(function(e){
			var strType = $(e.target).text();
			TjsAddWebData.setDataType(strType);
		});

		$('.tjs-add-data__url-input__btn').click(function(e){
			var url = $('#tjs-web-data-url-ipt').val();
			console.log('==>>>', $('.tjs-add-data__url-input__text-box'), url, url.length);
			if(url.length > 0){
				TjsAddWebData.loadServerByType(url);
			}
		});
	},

	showDataTypeList: function(){
		$("#tjs-add-web-data-div").hide();

		var width = $('#tjs-select-web-data-type').width();
		$(TjsAddWebData.dataTypeListID).width(width);
		$(TjsAddWebData.dataTypeListID).addClass('tjs-dropdown__is-open');
	},

	hideDataTypeList: function(){
		$(TjsAddWebData.dataTypeListID).removeClass('tjs-dropdown__is-open');
		$("#tjs-add-web-data-div").show();
	},

	setDataType: function(strType){
		$('#tjs-select-web-data-type>button').text(strType);
	},

	//网络服务
	loadServerByType: function(url){
		//检测server类型
		TjsArcGISServer.load(url, TjsMain.cesiumViewer);
		ExplorePanel.hide(); //加载后关闭
	},
}




/**
* desc-向cesium视图中加载数据，使用前需init传入viewer
* author-www.zhiwenli.com
* at-2017-7-14 11:51:50
*/
var TjsDataLoad = {
	viewer: null,
	init: function(_viewer){
		this.viewer = _viewer;
	},

	load: function(source, type){
		//检查数据合法性
		TjsDataLoad.dataDetect();

		//添加数据
		TjsDataLoad.loadData();


	},

	dataDetect: function(source, type){

	},

	loadData: function(){

	},
}

