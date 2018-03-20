//lzW config, custom globe var
var lzwVar = {
  lzwCount: 0,
  fun: lzwFun,
  clip:{
      enable : false, //true-> using clip
      TILEs : [{
        "level": 13,
        "x": 13566,
        "y": 2749
      }],
      outerClip : false //true-> clip outer imagery, false-> clip inner imagery
  },
  viewerEllipsoidGap : 0, //视球半径增量 //观察地心时需要将该值设置为接近地球半径-6356752
  atmosphereEllipsoidGap : 0, //大气层球增量
  DEGREES_PER_RADIAN : 180.0 / 3.1415926536, //常量
  terrainExaggeration : 1,
  FILE_SERVER_PATH: './controll/SaveFile.class.php' //临时文件存储
};


//set base url
var CESIUM_BASE_URL = "./CesiumUnminified_1.40/";

//get all usable imageries and terrain server
var imageryViewModels = getImageryViews();
var terrainModels = getTerrainModels();

//custom globe vars
var x = 6378137.0;
var y = 6378137.0;
var z = 6356752.3142451793;
var gap = lzwVar.viewerEllipsoidGap;
var ellipsoid = new Cesium.Ellipsoid(x-gap, y-gap, z-gap);
var viewerGlobe =  new Cesium.Globe(ellipsoid);

//create viewer
var viewer = new Cesium.Viewer('cesiumContainer', {
  orderIndependentTranslucency : false,
  globe : viewerGlobe,
	terrainExaggeration : 1.0,
  imageryProviderViewModels: imageryViewModels,
  selectedImageryProviderViewModel: imageryViewModels[12],
  terrainProviderViewModels: terrainModels,
  selectedTerrainProviderViewModel : terrainModels[6],
  shadows : true,
  terrainShadows : Cesium.ShadowMode.ENABLED,
  //skyAtmosphere : false,
  fog : true,

  vrButton : true
});

//init
viewer.scene.globe.baseColor = new Cesium.Color(1.0, 1.0, 1.0, 0.0);
viewer.scene.globe.depthTestAgainstTerrain = true; //false 不隐藏
Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(106.3, 29.76, 106.9, 29.35); //设置HOME键视角

viewer.scene.pickTranslucentDepth  = true; //允许拾取半透明实体

//加载注记图层
viewer.scene.imageryLayers.add(g_imageryLabelCn);
viewer.scene.imageryLayers.add(g_imageryLabelEn);

//viewer.imageryLayers.removeAll(true);
viewer.imageryLayers.get(0).alpha = 1.0;

lzwVar.clip.enable = true;
lzwVar.clip.outerClip = false;

viewer.camera.setView({
  destination  : new Cesium.Cartesian3(-2607952.485875882, 4906654.166946294, 3126326.8412681143),
  orientation : {
        heading : 0.8777563267650077,
        pitch : -0.45919691793695927,
        roll : 0.002469990718473092
    },
});

//初始化Tjs
TjsMain.init(viewer);

//add mapWidget
var myWidget=new mapWidget(viewer, viewer.scene, viewer.scene.globe.ellipsoid, "pc");
myWidget.showScalebar();
myWidget.doCompass();
myWidget.doNavi();
var g_graticule = myWidget.drawGraticule();
myWidget.movePick();

//add custom widget
var lzWidget = new lzwFun.LZWidget(viewer);
//lzWidget.coordinateLabel();
//lzWidget.compassIcon(35, 10);
lzWidget.pitchIcon(282, 26);
lzWidget.undergroundIcon(320, 26);


//add model
var g_models = new MODEL.Models();
g_models.loadModels();
// g_models.showAll();


//控件状态初始化
$(document).ready(function(){
  $($('#model_dirll_en').next()[0]).trigger('click');
  $($('#model_stratum').next()[0]).trigger('click');
  $($('#model_newYork_3dt').next()[0]).trigger('click');

  $($('#sysCfg_graticule').next()[0]).trigger('click');
  $($('#sysCfg_annotation_en').next()[0]).trigger('click');
  $($('#sysCfg_time').next()[0]).trigger('click');
  $($('#sysCfg_shadow').next()[0]).trigger('click');
});



//Add Cesium Inspector
//viewer.extend(Cesium.viewerCesiumInspectorMixin);
