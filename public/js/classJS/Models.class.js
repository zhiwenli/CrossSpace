
MODEL = {
	Models : function(){
		this._models = new Array();
		this._pickhandler = undefined;

		this.show = function(modelName){
			this.flyTo(modelName);

			var model = this._models[modelName];
			if(model instanceof Cesium.Entity){
				//Entity
				model.show = true;	
			}else if(model instanceof DRILL.DrillCollection || model instanceof ENTITY_GROUP.EntityGroup){ 
				//DrillCollection
				this._models[modelName].show();	
			}else if(model instanceof Cesium.Cesium3DTileset){
				//Cesium 3d tielset
				model.show = true;
			}else{
				console.warn(model);
				throw "异常的模型类别";
			}
			
		};

		this.hide = function(modelName, destory){
			var model = this._models[modelName];

			if (defined(destory) && destory) {
				//remove
				if(model instanceof Cesium.Entity){
					//Entity
					viewer.entities.remove(model);
				}else if(model instanceof DRILL.DrillCollection || model instanceof ENTITY_GROUP.EntityGroup){ 
					//DrillCollection
					this._models[modelName].hide(true);	
				}else if(model instanceof Cesium.Cesium3DTileset){
					//Cesium 3d tielset
					model.destroy();
				}else{
					console.warn(model);
					throw "异常的模型类别";
				}
				this._models[modelName] = undefined;
			}else{
				//hide
				if(model instanceof Cesium.Entity){
					//Entity
					model.show = false;	
				}else if(model instanceof DRILL.DrillCollection || model instanceof ENTITY_GROUP.EntityGroup){ 
					//DrillCollection
					this._models[modelName].hide();	
				}else if(model instanceof Cesium.Cesium3DTileset){
					//Cesium 3d tielset
					model.show = false;
				}else{
					console.warn(model);
					throw "异常的模型类别";
				}
			}
		};

		this.showAll = function(){
			for (it in this._models){
				this.show(it);
			}
		};

		this.hideAll = function(destory){
			if (defined(destory) && destory) {
				for (it in this._models){
					this.hide(it, true);
				}
			}else{
				for (it in this._models){
					this.hide(it);
				}
			}
		};

		this.setPickhandler = function(){

		    if(!defined(this._pickhandler)){
		    	//设置钻孔模型点击事件
		    	this._pickhandler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
		    	this._pickhandler.setInputAction(MODEL.leftClick, Cesium.ScreenSpaceEventType.LEFT_CLICK);
			}

		}

		this.loadModels = function(){

			this.setPickhandler(); //模型点击事件, 与测量控件的点击事件相互影响(测量关闭后会清除点击事件监听)

			var balloon = viewer.entities.add({
		        name : "balloon",
		        position : Cesium.Cartesian3.fromDegrees(118.095211, 29.592207, 600.0),
		        model : {
		            uri : './data/models/CesiumBalloon/CesiumBalloon.glb',
		            maximumScale : 20,
		            scale : 10
		        },
		        show : true
		    });
			this._models['balloon'] = balloon;

		    //添加地球结构
		    var stratumArr = loadStratum();
		    var stratum = new ENTITY_GROUP.EntityGroup();
		    stratum.addEntities(stratumArr);
		    this._models['stratum'] = stratum;

		    //添加地层数据3D tiles
		    var litho = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
		      url : '/data/permanent/3DTiles/lithoAt0/',
		      debugShowStatistics : true,
		      show : false
		    }));
		    this._models['litho'] = litho;

		    //添加钻孔数据3D tiles
		    var dirll_3dt = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
		      url : './data/3Dtiles/dirll/',
		      debugShowStatistics : true,
		      show : false
		    }));
		    this._models['dirll_3dt'] = dirll_3dt;

		    //添加钻孔数据entities
	    	var drillCollection = new DRILL.DrillCollection();
	      	drillCollection.loadByDrillCfgCollection(drillCfgCollection);
		    this._models["dirll_en"] = drillCollection;

		    //上海城市建筑模型
		    var shanghai_3dt = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
		      url : '/data/permanent/3DTiles/shanghaiModel/',
		      debugShowStatistics : true,
		      show : true
		    }));
		    this._models['shanghai_3dt'] = shanghai_3dt;

		    //上海纽约建筑模型
		    var newYork_3dt = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
		      url : '/data/permanent/3DTiles/newYorkModel/',
		      debugShowStatistics : true,
		      show : false
		    }));
		    this._models['newYork_3dt'] = newYork_3dt;
		};

		this.flyTo = function(modelName){

			var shanghai = {
				destination : new Cesium.Cartesian3(-2852279.595433616, 4655416.531814058, 3287735.7173380144),
			    orientation : {
			        direction : new Cesium.Cartesian3(0.25550735830918003, -0.8055006443254467, 0.5346818697516822),
        			up : new Cesium.Cartesian3(-0.37428524393012097, 0.42750209432967207, 0.8228927727960151)
			    }
			}

			var newYork = {
			    destination : new Cesium.Cartesian3(1333325.308665123, -4656337.826189664, 4137606.901249969),
			    orientation : {
			        direction : new Cesium.Cartesian3(0.3114187921226763, 0.9154071606716898, 0.2550452236444518),
        			up : new Cesium.Cartesian3(0.38471719042921737, -0.36686468706491704, 0.8469964490911457)
			    }
			};

			var stratum = {
			    destination : new Cesium.Cartesian3(-24095859.577414796, -724040.7136816267, 2830740.3617228246),
			    orientation : {
			        direction : new Cesium.Cartesian3(0.99263677938112, 0.029827092902026505, -0.11739918546945488),
        			up : new Cesium.Cartesian3(0.1177649538746092, -0.010811345151752019, 0.9929826435819112)
			    }
			}

			var dirll_en = {
				destination : new Cesium.Cartesian3(-2610548.5239653345, 4898149.958035054, 3132893.745630698),
			    orientation : {
			        direction : new Cesium.Cartesian3(-0.7037829860010087, 0.24580312785376837, -0.6665360687560788),
        			up : new Cesium.Cartesian3(-0.3078143587222468, 0.740079912176739, 0.5979398332247841)
			    }
			}

			var dirll_3dt = {
				destination : new Cesium.Cartesian3(-2847208.4978457713, 4656902.971538942, 3288192.583574298),
				orientation : {
			        direction : new Cesium.Cartesian3(-0.4956146903450168, -0.428746045082224, 0.7553429072550855),
        			up : new Cesium.Cartesian3(-0.3134053190378514, 0.8993568173877957, 0.30485147369969834)
			    }
			}

			var litho = {
				destination : new Cesium.Cartesian3(-2451605.6916034473, 4896671.994100785, 2166957.7750467034),
				orientation : {
			        direction : new Cesium.Cartesian3(-0.08983806087437568, 0.05328114750993874, 0.9945301615025842),
        			up : new Cesium.Cartesian3(-0.4205024316573642, 0.9031708927598794, -0.08637154300790502)
			    }
			}

			switch(modelName){
				case 'stratum':
					$('#alphaContainer_input').val(0.55);
					$('#alphaContainer_tag').text(0.55);
					viewer.imageryLayers.get(0).alpha = 0.55;
					viewer.camera.flyTo(stratum);
					break;
				case 'dirll_en':
					viewer.camera.flyTo(dirll_en);
					break;
				case 'dirll_3dt':
					viewer.camera.flyTo(dirll_3dt);
					break;
				case 'shanghai_3dt':
					viewer.camera.flyTo(shanghai);
					break;
				case 'newYork_3dt':
					viewer.camera.flyTo(newYork);
					break;
				case 'litho':
					viewer.camera.flyTo(litho);
					break;
				default:
					console.warn(modelName);
			}

			
		}
	},
    
    leftClick : function(movement) {
      var infobox = new Cesium.Entity('Title to put in the infobox');
      var pickingEnabled = true;
      if (!pickingEnabled) {
        return;
      }

      var feature = viewer.scene.pick(movement.position);
      //var feature = current.feature;
      if (Cesium.defined(feature)&&!Cesium.defined(feature.id)) {
        var str = '';
        viewer.entities.remove(infobox);
        var propertyNames = feature.getPropertyNames();   
            var length = propertyNames.length;
            for (var i = 0; i < length; ++i) {
                var name = propertyNames[i];
                var value = feature.getProperty(name);
                console.log('  ' + name + ': ' + value);
          if(name=='Color'){
            str=str+'<tr><th style="width:120px;font-weight:bold;color:#'+value+'">'+name+'</th><th style="font-weight:normal;color:#'+value.slice(0,6)+'">'+value+'</th></tr>';
            continue;
          }
          str=str+'<tr><th style="width:120px;font-weight:bold;">'+name+'</th><th style="font-weight:normal;">'+value+'</th></tr>'
            }
        
        /*弹出信息框代码*/
        var title1 = feature.getProperty('BoreholeName');
        var title2 = feature.getProperty('name');
        var title3 = feature.getProperty('id');
        infobox.name = title1 ? title1 : ((title2 != '') ? title2 : title3);
        infobox.description = {
          getValue : function() {
            return '<table style="text-align:left">'+str+'</table>';
          }
        };
        var entity = viewer.entities.add(infobox);
        viewer.selectedEntity = infobox;
      }
    }

}