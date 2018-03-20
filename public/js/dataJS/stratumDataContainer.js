
//添加地球内部地层
function loadStratum(){
    var collection = new Array();

	var NDH = {
        name : "内地核",
        show : false,
        rectangle : {
            coordinates : Cesium.Rectangle.fromDegrees(-180.0, -89.99, 180.0, 89.99),
            material : Cesium.Color.ORANGERED.withAlpha(1.0),
            height : -6356750,
            extrudedHeight : -5000000
        }
    };
    NDH = viewer.entities.add(NDH);
    collection.push(NDH);

    var WDH = {
        name : "外地核",
        show : false,
        rectangle : {
            coordinates : Cesium.Rectangle.fromDegrees(-170.0, -89.99, 170.0, 89.99),
            material : Cesium.Color.ORANGE.withAlpha(1.0),
            height : -5000000,
            extrudedHeight : -2900000
        }
    };
    WDH = viewer.entities.add(WDH);
    collection.push(WDH);

    var XDM = {
        name : "下地幔",
        show : false,
        rectangle : {
            coordinates : Cesium.Rectangle.fromDegrees(-160.0, -89.99, 160.0, 89.99),
            material : Cesium.Color.GOLDENROD.withAlpha(1.0),
            height : -2900000,
            extrudedHeight : -1000000
        }
    };
    XDM = viewer.entities.add(XDM);
    collection.push(XDM);

    var SDM = {
        name : "上地幔",
        show : false,
        rectangle : {
            coordinates : Cesium.Rectangle.fromDegrees(-150.0, -89.99, 150.0, 89.99),
            material : Cesium.Color.GOLD.withAlpha(1.0),
            height : -1000000,
            extrudedHeight : -50000
        }
    };
    SDM = viewer.entities.add(SDM);
    collection.push(SDM);

    var DQ = {
        name : "地壳",
        show : false,
        rectangle : {
            coordinates : Cesium.Rectangle.fromDegrees(-140.0, -89.99, 140.0, 89.99),
            material : Cesium.Color.YELLOW.withAlpha(1.0),
            height : -50000,
            extrudedHeight : -47000
        }
    };
    DQ = viewer.entities.add(DQ);
    collection.push(DQ);

    return collection;
}