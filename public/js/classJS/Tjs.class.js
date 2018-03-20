$(document).ready(DOCUMENT_READY);

function DOCUMENT_READY(){

	$('#tjs-add-local-data__tab').click(function(e){
		$('#tjs-add-web-data__tab>button').removeClass('tjs-add-data__is-active'); //没起作用  ？？
		$(e.target).addClass('tjs-add-data__is-active');

		$('#tjs-add-web-data__tab-panel').addClass('hiddenEle');
		$('#tjs-add-local-data__tab-panel').removeClass('hiddenEle');
	});

	$('#tjs-add-web-data__tab').click(function(e){
		$('#tjs-add-local-data__tab>button').removeClass('tjs-add-data__is-active'); //没起作用  ？？
		$(e.target).addClass('tjs-add-data__is-active');

		$('#tjs-add-local-data__tab-panel').addClass('hiddenEle');
		$('#tjs-add-web-data__tab-panel').removeClass('hiddenEle');
	});
}


/**
* desc-Tjs插件中对象，包含各种当前数据与视图, ---->入口类
*      author-www.zhiwenli.com
* at-2017-7-14 15:38:16
*/
var TjsMain = {
	cesiumViewer: null,
	sidePanel: $('.tjs-standard-user-interface__sidePanel'),
	datasetContainer: new Array(), //存储当前已加载的所有数据集
	init: function(_cesiumViewer){
		this.cesiumViewer = _cesiumViewer;

		$(document).ready(function(){
			TjsMain.initTjsAllViews();

			$('#tjs-side-panel-adddata').click(function(){
				ExplorePanel.show();
			});
		});

		this.show();
	},

	//初始化其它所有类
	initTjsAllViews: function(){
		ExplorePanel.init();
		TjsDataset.init();
		TjsAddLocalData.init();
		TjsAddWebData.init();
		TjsDataLoad.init(0);
	},

	show: function(){
		$(this.sidePanel).show();
	},

	hide: function(){
		ExplorePanel.hide();
		$(this.sidePanel).hide();
	},

	getDatasetById: function(id){
		var ds = false;
		for (var i = 0; i < TjsMain.datasetContainer.length; i++) {
			if(TjsMain.datasetContainer[i].id == id){
				ds = TjsMain.datasetContainer[i];
				break;
			}
		}
		console.log(id , ds);
		return ds;
	},

	addDataset: function(tds){
		TjsMain.datasetContainer.push(tds);
		TjsDataset.updateDatasetCount();
	},

	deleteDatasetById: function(id){
		for (var i = 0; i < TjsMain.datasetContainer.length; i++) {
			if(TjsMain.datasetContainer[i].id == id){
				ds = TjsMain.datasetContainer[i];
				TjsMain.datasetContainer.splice(i, 1); //移除自定位置起的指定个数元素
				break;
			}
		}
		TjsDataset.updateDatasetCount();
	},

	
}



/**
* desc-表示数据集列表容器，同时其create又可创建多个数据集
* author-www.zhiwenli.com
* at-2017-7-14 11:51:50
*/
var TjsDataset = {
	datasetViewContainerID: '.ui-sortable',

	init: function(){
		$('.tjs-workbench__remove-button').click(function(){
			TjsDataset.removeALL();
		});
	},
	
	create: function(_data, _dataType, _name){
		var ds = {};
		ds.dataType = _dataType;
		ds.data = _data;
		ds.fileName = _name;
		ds.id = ds.fileName;
		ds.view = $('#tjs-ui-sortable-item-tmpl').clone(false);

		ds.init = function(){

			console.log(this.dataType);
			if(this.dataType == "ImageryLayer"){
				var zoomToLabel = $(this.view).find('.tjs-zoom-to')[0];
				$(zoomToLabel).addClass("inactive");

			}else if(this.dataType == "DataSource"){
				var zoomToLabel = $(this.view).find('.tjs-opacity-section__opacity')[0];
				var rangeLabel = $(this.view).find('.rangeslider__handle')[0];
				$(zoomToLabel).addClass("inactive");
				$(rangeLabel).css('background', '#ffffff88');

			}else{
				console.assert('未识别的数据类型');
			}



			//释放后重新添加，针对所有数据卡有效
			$('.tjs-remove-data').off("click");
			$('.tjs-remove-data').on("click", function(e){
				var tds = TjsDataset.getDsByEvent(e);
				console.assert(tds, '未找到目标数据集');
				tds.removeDs();
			});

			$('.tjs-zoom-to').off("click");
			$('.tjs-zoom-to').on("click", function(e){
				var tds = TjsDataset.getDsByEvent(e);
				console.assert(tds, '未找到目标数据集');
				tds.flyToCesiumView();
			});

			$('.tjs-workbench-item__btn-visibility').off("click");
			$('.tjs-workbench-item__btn-visibility').on("click", function(e){
				var tds = TjsDataset.getDsByEvent(e);
				console.log(tds);
				console.assert(tds, '未找到目标数据集');
				tds.visibleToggle();
			});

			var bar = $(this.view).find('.rangeslider__handle')[0];
			$(bar).on({
			    mousedown: function(e){
			    	var range = $($(ds.view).find('.rangeslider-horizontal')[0]).width() - $(this).width();
			    	var barStart = parseInt($(bar).css('left'));
			    	var pointerStart = e.pageX;
	                $(document).on('mousemove.drag', function(e){
	                	var offset = e.pageX - pointerStart;
	                	var barLeft = barStart + offset;
	                	barLeft = barLeft < 0 ? 0 : barLeft;
	                	barLeft = barLeft > range ? range : barLeft;

	                	ds.onOpacityChange(barLeft, range);
	                });
	            }
			});

			$(document).on({
				mouseup: function(e){
			   		$(document).off('mousemove.drag');
			   	}
			});

		};

		ds.addDs = function(){
			var titleDiv = $(this.view).find('.tjs-workbench-item__draggable');
			$(titleDiv).attr('title', this.fileName);
			var title = titleDiv[0];
			$(title).html(this.fileName);
			$(this.view).removeClass('hiddenEle');
			$(this.view).attr('id', this.id);
			$(TjsDataset.datasetViewContainerID).append(this.view);
		};

		ds.removeDs = function(){
			switch(this.dataType){
				case 'DataSource':
					TjsMain.cesiumViewer.dataSources.remove(this.data, true); //移除cesium datasource对象
					break;
				case 'ImageryLayer':
					TjsMain.cesiumViewer.imageryLayers.remove(this.data, true); //移除cesium imageryLayers对象
					break;
			}

			$(this.view).remove(); //移除视图
			TjsMain.deleteDatasetById(ds.id); //从仓库中移除当前对象
			console.log('Removed', ds.id);
		};

		ds.flyToCesiumView = function(){
			switch(this.dataType){
				case 'DataSource':
					TjsMain.cesiumViewer.flyTo(this.data);
					break;
				case 'ImageryLayer':
					//飞行至影像范围内
					console.log(this.data.rectangle);
					// TjsMain.cesiumViewer.flyTo(this.data);
					break;
				default:
					break;
			}
		};

		ds.visibleToggle = function(){
			var visibleBtn = $(this.view).find('.tjs-workbench-item-visibility')[0];
			if ($(visibleBtn).is(':hidden')) {
				console.log('show'); //失去监听对象
				$(visibleBtn).show();
				this.showData();
			}else{
				console.log('hide');
				$(visibleBtn).hide();
				this.hideData();
			}
		};

		ds.onOpacityChange = function(offset, range){
			switch(this.dataType){
				case '':
					break;
				case '':
					break;
				default:
					break;
			}

			$($(this.view).find('.rangeslider__handle')[0]).css('left', offset);
        	$($(this.view).find('.rangeslider__fill')[0]).width(offset);
        	$($(this.view).find('label')[0]).text("透明度：" + parseInt(offset*100/range) + "%");
        	this.data.alpha = offset/range; //调解透明度无效----》一些DataSource无法设置透明度
		};

		ds.showData = function(){
			switch(this.dataType){
				case 'DataSource':
					this.data.show = true;
					break;
				case 'ImageryLayer':
					this.data.show = true;
					break;
				default:
					console.error('错误的数据类型');
			}
		};

		ds.hideData = function(){
			switch(this.dataType){
				case 'DataSource':
					this.data.show = false;
					break;
				case 'ImageryLayer':
					
					this.data.show = false;
					break;
				default:
					console.error('错误的数据类型');
			}
		};

		ds.flyToCesiumView();
		ds.addDs();
		ds.init();

		return ds;
	},

	removeALL: function(){
		var flag = true;
		while(flag){
			var tds = TjsMain.datasetContainer.pop();
			if(tds == undefined) break;
			tds.removeDs();
		}
	},

	getFileName: function(url){
		var strArr = url.split('/');
		var urlFileName = strArr[strArr.length-1];

		return urlFileName.substring(11);
	},

	getDsByEvent: function(event){
		var view = $(event.target).parents('.ui-sortable-item');
		var id = $(view).attr('id');
		var tds = TjsMain.getDatasetById(id);
		return tds;
	},

	updateDatasetCount: function(){
		var num = TjsMain.datasetContainer.length;
		var numLabel = $("#tjs-badge-bar__label-badge"); //$(TjsMain.sidePanel).find('.tjs-badge-bar__label-badge')[0];
		$(numLabel).html('['+num+']');
		if (num == 0) {TjsDataset.noDataset();}
		else{TjsDataset.hasDataset();}
	},

	hasDataset: function(){
		$('.tjs-side-panel__workbenchEmpty').hide();
		$('.tjs-badge-bar__header').addClass('tjs-_base__sm-show').removeClass('tjs-_base__sm-hide');
	},

	noDataset: function(){
		$('.tjs-side-panel__workbenchEmpty').show();
		$('.tjs-badge-bar__header').addClass('tjs-_base__sm-hide').removeClass('tjs-_base__sm-show');
	},
}



/*
http://180.168.169.146:6080/arcgis/rest/services/shland_2000_anno/MapServer
*/