function defined(obj){
    if(typeof obj == "undefined"){
        return false;
    }
    return true;
}

//cartesian to degree
function cartesian2degree(cartesian){
  var cartographicPositions = viewer.scene.globe.ellipsoid.cartesianToCartographic(cartesian);
  var _longitude = cartographicPositions.longitude * lzwVar.DEGREES_PER_RADIAN;
  var _latitude = cartographicPositions.latitude * lzwVar.DEGREES_PER_RADIAN;
  var _height = cartographicPositions.height;

  return {
    longitude : _longitude,
    latitude : _latitude,
    height : _height
  }
}

//相机进入地下
function lzw_cameraHorizontalPosition(cameraHeight, groundHeight){
    if(!defined(groundHeight)){
        groundHeight = 0;
    }

    //console.log("->", cameraHeight - groundHeight);
    if(cameraHeight - groundHeight < 0){
        //underground
        //ImageryLayerBrightnessChanged(0.70);
        lzwFun.showUndergroundIcon(false);
        viewer.scene.skyAtmosphere.show = false;
        viewer.scene.fog.enabled = false;
    }else{
        //overground
        //ImageryLayerBrightnessChanged(1.0);
        lzwFun.showUndergroundIcon(true);
        viewer.scene.fog.enabled = true;
        if(viewer.imageryLayers.get(0).alpha > 0.9){
            viewer.scene.skyAtmosphere.show = true;
        }
    }
}

function lzw_getCameraAndGroundAltitude(){
    var position = viewer.camera.position
    var cartographic = viewer.scene.globe.ellipsoid.cartesianToCartographic(position);

    var cameraH = cartographic.height;
    var groundH = viewer.scene.globe.getHeight(cartographic);

    var result = {
        camera : cameraH,
        ground : groundH
    }

    return result;
}

//根据瓦片级别获取瓦片边界经纬度范围
function lzw_getBoundary(level, x, y){
	var west, east, north, south;

	var tileXDegreeWidith = 360 / Math.pow(2, level + 1);
	var tileYDegreeWidith = 180 / Math.pow(2, level);

	west = x * tileXDegreeWidith - 180;
	east = (x + 1) * tileXDegreeWidith - 180;

	north = 90 - (y * tileYDegreeWidith);
	south = 90 - ((y + 1) * tileYDegreeWidith);

	var boundary = new Array();
	boundary['west'] = west;
	boundary['east'] = east;
	boundary['north'] = north;
	boundary['south'] = south;

	return boundary;
}

//判断当前tile是否为目标tile或其子tile
function lzw_childTileOrSelf(tile, TILE){
    if(tile.level < TILE.level){
        return false;
    }

    var BOUNDARY = lzw_getBoundary(TILE.level, TILE.x, TILE.y);
    var boundary = lzw_getBoundary(tile.level, tile.x, tile.y);

    var flag = boundary['west'] >= BOUNDARY['west'] &&
                boundary['east'] <= BOUNDARY['east'] &&
                boundary['south'] >= BOUNDARY['south'] &&
                boundary['north'] <= BOUNDARY['north'];
    //console.log(boundary, flag);
    return flag;
}

//判断当前tile是否为一组目标tile当中的一个或其子tile
function lzw_tileFilter(quadtreeTile, TILEs){

    for (var i = TILEs.length - 1; i >= 0; i--) {
        if(lzw_childTileOrSelf(quadtreeTile, TILEs[i])){
            return true;
        }
    }
    return false;
}

//判断tile是否完全位于目标范围内
function lzw_tileIsInBoundary(quadtreeTile){
	
    if(quadtreeTile.level<14){
        //return false;
    }

	var BOUNDARY = new Array();
	BOUNDARY['west'] = 106.4;
	BOUNDARY['east'] = 107.0;
	BOUNDARY['north'] = 29.7;
	BOUNDARY['south'] = 29.3;

	var boundary = lzw_getBoundary(quadtreeTile.level, quadtreeTile.x, quadtreeTile.y);
	//console.log(quadtreeTile.level, quadtreeTile.x, quadtreeTile.y);

	var flag = boundary['west'] > BOUNDARY['west'] &&
				boundary['east'] < BOUNDARY['east'] &&
				boundary['south'] > BOUNDARY['south'] &&
				boundary['north'] < BOUNDARY['north'];
	//console.log(boundary, flag);
	return flag;
}

//过滤tile数组, 清除超出目标范围的tile
function lzw_isRender(tilesToRenderArr){

	var filterArr = new Array();

	var numRender = tilesToRenderArr.length;
	console.log(numRender);

    for(var i = 0; i < numRender; i++){
        if(lzw_tileIsInBoundary(tilesToRenderArr[i]) && tilesToRenderArr[i].renderable){
        	filterArr.push(tilesToRenderArr[i]);
        }
    }
    //console.log(filterArr);
    return filterArr;
}

//设置地形拉伸比例
function terrainExaggerationChanged(val){
    val = parseFloat(val);
    lzwVar.terrainExaggeration = val;
}


//设置影像对比度
function ImageryLayerContrastChanged(val){
    val = parseFloat(val);
    viewer.imageryLayers.get(0).contrast = val;
}

//设置影像亮度
function ImageryLayerBrightnessChanged(val){
	val = parseFloat(val);
	viewer.imageryLayers.get(0).brightness = val;
}

//设置影像透明度
function ImageryLayerAlphaChanged(val){
    val = parseFloat(val);
    viewer.imageryLayers.get(0).alpha = val;

    if (val > 0.9) {
        viewer.scene.skyAtmosphere.show = true;
        viewer.scene.fog.enabled = true;
    }else{
        viewer.scene.skyAtmosphere.show = false;
        viewer.scene.fog.enabled = false;
    }
}

//设置影像色相
function ImageryLayerHueChanged(val){
    val = parseFloat(val);
    val /= lzwVar.DEGREES_PER_RADIAN; //degree to radius
    viewer.imageryLayers.get(0).hue = val;
}

//设置影像饱和度
function ImageryLayerSaturationChanged(val){
    val = parseFloat(val);
    viewer.imageryLayers.get(0).saturation = val;
}

function clickToInput(element, linkedID, callback){
    var oldhtml = element.innerHTML;
    var newobj = document.createElement('input');
    //创建新的input元素
    newobj.type = 'text';
    newobj.setAttribute('class', 'sideBar_clikeInput');
    //为新增元素添加类型
    newobj.onblur = function(){
        //当触发时判断新增元素值是否为空，为空则不修改，并返回原有值 
        element.innerHTML = this.value ? this.value : oldhtml;
        if(this.value){
            element.innerHTML = this.value;
            this.value = parseFloat(this.value);
            $("#"+linkedID).val(this.value);
            callback(this.value);
        }else{
            element.innerHTML = oldhtml;            
        }
    }
    element.innerHTML = '';
    element.appendChild(newobj);
    newobj.focus();
}


function imageryAdjustToDefault(){
    $("#"+"alphaContainer"+"_tag").text("0.9");
    $("#"+"alphaContainer"+"_input").val(0.9);
    ImageryLayerAlphaChanged(0.9);

    $("#"+"brightnessContainer"+"_tag").text("1.0");
    $("#"+"brightnessContainer"+"_input").val(1.0);
    ImageryLayerBrightnessChanged(1.0);

    $("#"+"contrastContainer"+"_tag").text("1.0");
    $("#"+"contrastContainer"+"_input").val(1.0);
    ImageryLayerContrastChanged(1.0);

    $("#"+"saturationContainer"+"_tag").text("1.0");
    $("#"+"saturationContainer"+"_input").val(1.0);
    ImageryLayerSaturationChanged(1.0);

    $("#"+"hueContainer"+"_tag").text("0.0");
    $("#"+"hueContainer"+"_input").val(0.0);
    ImageryLayerHueChanged(0.0);

    $("#"+"terrainExaggerationContainer"+"_tag").text("1.0");
    $("#"+"terrainExaggerationContainer"+"_input").val(1.0);
    terrainExaggerationChanged(1.0);
}

//选项点击事件
function sideBarClicked(name){
    console.log(name);

    var jqueryDom = undefined;

    switch(name){
        case 'search':
            jqueryDom = $("#searchContainer");
            break;
        case 'imageryAdjust':
            jqueryDom = $("#imageryAdjustContainer");
            break;
        case 'modelManage':
            jqueryDom = $("#modelManageContainer");
            break;
        case 'imageryTerrain':
            jqueryDom = $("#imageryTerrainContainer");
            break;
        case 'measure':
            if($('#measureBox').is(':visible')){
                measureBoxHide();
            }else{
                hideAllSideBarPop();
                measureBoxShow();
            }
            break;
        case 'locationNavi':
            jqueryDom = $("#locationNaviContainer");
            break;
        case 'sysConfig':
            jqueryDom = $("#sysConfigContainer");
            break;
        case 'about':
            jqueryDom = $("#aboutContianer");
            break;
        default:
            throw 'No widget container named ' + name;
    }

    if (!defined(jqueryDom)) {
        //throw 'div xxx-Container is not find.';
        return;
    }
    
    hideAllSideBarPop();
    if(jqueryDom.is(':visible')){
        jqueryDom.fadeOut();
    }else{
        jqueryDom.fadeIn("fast");
    }
}

//隐藏所有sideBar弹出窗口
function hideAllSideBarPop(){
    $('#searchContainer').fadeOut("fast");
    $('#imageryAdjustContainer').fadeOut("fast");
    $('#modelManageContainer').fadeOut("fast");
    $('#imageryTerrainContainer').fadeOut("fast");
    $('#locationNaviContainer').fadeOut("fast");
    $('#sysConfigContainer').fadeOut("fast");
    $('#aboutContainer').fadeOut("fast");

    if($('#measureBox').is(':visible')){
        measureBoxHide();
    }
}

//模型显隐，依赖全局模型对象Models
function modelChked(val){
    var id = $(val).attr('id');
    id = id.substr(6);

    if(!defined(g_models)){
        throw '全局模型对象未定义';
        return;
    }

    if($(val).is(':checked')){
        g_models.show(id);
    }else{
        g_models.hide(id);
    }
}

//设置选项
function optionChked(val){
    var id = $(val).attr('id');
    id = id.substr(7);

    var flag;
    if($(val).is(':checked')){
        flag = true;
    }else{
        flag = false;
    }

    console.log(id);

    switch(id){
        case 'shadow':
            viewer.shadows = flag; //???
            break;
        case 'atomsphere':
            viewer.scene.skyAtmosphere.show = flag;
            break;
        case 'fog':
            viewer.scene.fog.enabled = flag;
            break;
        case 'sky':
            viewer.scene.skyBox.show = flag;
            break;
        case 'sun':
            viewer.scene.sun.show = flag;
            break;
        case 'graticule':
            g_graticule.setVisible(flag);
            break;
        case 'annotation_cn':
            g_imageryLabelCn.show = flag;
            break;
        case 'annotation_en':
            g_imageryLabelEn.show = flag;
            break;
        case 'plottingScale':
            if(flag){
                $("#scaleContainer").show();
                $("#scaletext").show();
            }else{
                $("#scaleContainer").hide();
                $("#scaletext").hide();
            }
            break;
        case 'navigation':
            if(flag){
                $("#compass").show();
                $(".navigation-controls").show();
                $("#pitchContainer").show();
                $("#undergroundContainer").show();
            }else{
                $("#compass").hide();
                $(".navigation-controls").hide();
                $("#pitchContainer").hide();
                $("#undergroundContainer").hide();
            }
            break;
        case 'coordinate':
            if(flag){
                $(".cesium-toolbar2").show();
            }else{
                $(".cesium-toolbar2").hide();
            }
            break;
        case 'time':
            if(flag){
                $(".cesium-viewer-animationContainer").show();
                $(".cesium-viewer-timelineContainer").show();

                //关闭布局冲突的坐标和比例尺控件
                if($('#sysCfg_plottingScale').is(':checked'))
                    $($('#sysCfg_plottingScale').next()[0]).trigger('click');
                if($('#sysCfg_coordinate').is(':checked'))
                    $($('#sysCfg_coordinate').next()[0]).trigger('click');
            }else{
                $(".cesium-viewer-animationContainer").hide();
                $(".cesium-viewer-timelineContainer").hide();
            }
            break;
        case 'fxaa':
            viewer.scene.fxaa = flag;
            break;
        default:
            throw '不存在的设置类型';
            break;
    }
}

//设置面板重置为默认值
function sysConfigToDefault(){
    var flag;

    flag = $("#sysCfg_shadow").is(':checked');
    if (flag) {
        $($('#sysCfg_shadow').next()[0]).trigger('click');
    }

    flag = $("#sysCfg_atomsphere").is(':checked');
    if (!flag) {
        $($('#sysCfg_atomsphere').next()[0]).trigger('click');
    }

    flag = $("#sysCfg_fog").is(':checked');
    if (!flag) {
        $($('#sysCfg_fog').next()[0]).trigger('click');
    }

    flag = $("#sysCfg_sky").is(':checked');
    if (!flag) {
        $($('#sysCfg_sky').next()[0]).trigger('click');
    }

    flag = $("#sysCfg_sun").is(':checked');
    if (!flag) {
        $($('#sysCfg_sun').next()[0]).trigger('click');
    }

    flag = $("#sysCfg_graticule").is(':checked');
    if (flag) {
        $($('#sysCfg_graticule').next()[0]).trigger('click');
    }

    flag = $("#sysCfg_annotation_cn").is(':checked');
    if (!flag) {
        $($('#sysCfg_annotation_cn').next()[0]).trigger('click');
    }

    flag = $("#sysCfg_annotation_en").is(':checked');
    if (flag) {
        $($('#sysCfg_annotation_en').next()[0]).trigger('click');
    }

    flag = $("#sysCfg_plottingScale").is(':checked');
    if (!flag) {
        $($('#sysCfg_plottingScale').next()[0]).trigger('click');
    }

    flag = $("#sysCfg_navigation").is(':checked');
    if (!flag) {
        $($('#sysCfg_navigation').next()[0]).trigger('click');
    }

    flag = $("#sysCfg_coordinate").is(':checked');
    if (!flag) {
        $($('#sysCfg_coordinate').next()[0]).trigger('click');
    }

    flag = $("#sysCfg_time").is(':checked');
    if (flag) {
        $($('#sysCfg_time').next()[0]).trigger('click');
    }

    flag = $("#sysCfg_fxaa").is(':checked');
    if (!flag) {
        $($('#sysCfg_fxaa').next()[0]).trigger('click');
    }
}