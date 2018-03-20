<!DOCTYPE html>
<html lang="en">
<head>
  <!-- Use correct character set. -->
  <meta charset="utf-8">
  <!-- Tell IE to use the latest, best version. -->
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta http-equiv="author" content="www.zhiwenli.com">
  <!-- Make the application on mobile take up the full browser screen and disable user scaling. -->
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
  <title>SinoEarth</title>
  
  <!-- <script src="./CesiumUnminified_1.39/CesiumUnminified_Unmodified.js"></script> -->
  <script src="./CesiumUnminified_1.40/CesiumUnminified_1.40.js"></script>
  <!-- <script src="http://localhost:8081/CQViewer/CesiumUnminified_1.40/CesiumUnminified_1.40.js"></script> -->
  
  <!-- baseJS -->
  <script src="./public/js/baseJS/jquery.min.js"></script>
  <script src="/public/javascripts/externalJS/echarts.common.min.js"></script> <!-- for drawing.js -->

  <script src="./public/js/baseJS/mapWidget.js"></script>

  <!-- dataJS -->
  <script src="./public/js/dataJS/drillCfgCollection.js"></script>
  <script src="./public/js/dataJS/stratumDataContainer.js"></script>
  <script src="./public/js/dataJS/imageryConfContainer.js"></script>

  <!-- classJS -->
  <script src="./public/js/classJS/LZWidget.class.js"></script>
  <script src="./public/js/classJS/Models.class.js"></script>
  <script src="./public/js/classJS/Drill.class.js"></script>
  <script src="./public/js/classJS/EntityGroup.class.js"></script>

  <script src="./public/js/classJS/TjsExplorerPanel.class.js"></script>
  <script src="./public/js/classJS/TjsDataFormats.class.js"></script>
  <script src="./public/js/classJS/HttpForm.js"></script>
  <script src="./public/js/classJS/Tjs.class.js"></script>

  <!-- 15042819950601 -->
  
  <style>
      @import url(./CesiumUnminified_1.40/Widgets/widgets.css);
      @import url(./public/css/styles.css);
      @import url(./public/css/myWidget.css);
      @import url(/public/stylesheets/measureBoxStyle.css);
      @import url(./public/css/tjs.css);
  </style>
</head>
<body>

  <?php require "./view/panels.php"; ?>
  <div id="cesiumContainer"></div>

</body>

  <!-- controllJS -->
  <script src="./public/js/controlJS/functionProvider.js"></script>
  <script src="./public/js/controlJS/index.js"></script>

  <script src="./public/js/baseJS/drawing.js"></script> <!-- for measureBox. WARNING, unpackaged codes is dangrous-->
</html>