DRILL = {
	//class
	/*
	position = [lat, lng, altitude]
	subsections = [
		{
			material : Cesium.Color(),
			height : 99
		},
		...
	]
	*/
	Drill : function(viewer, position, subsections, name, radius){
		if(!defined(viewer)){
			throw "viewer is required.";
		}
		this._viewer = viewer

		if(!defined(position) || position.length < 3){
			throw "lat, lng, altitude is required.";
		}
		this._lat = position[0];
		this._lng = position[1];
		this._altitudeOffset = position[2];

		if(!defined(subsections)){
			throw "subsections is required.";
		}
		this._subsections = subsections;

		this._name = defined(name) ? name : 'Drill-';

		this._drill = new Array(); //entities list

		//uniform
		this._c_radius = defined(radius) ? radius : 10; //drill radius
		this._c_alpha = 0.6; //drill transprecent
		this._c_outline = false; //enable show entity outline
		this._c_outlineColor = Cesium.Color.DARK_GREEN; //outlineColor

		this.init = function(){
			this.load();
			// this.show();
		};

		this.load = function(){

			var offsetH = 0;
			for (var i = 0; i < this._subsections.length; i++) {

				var subsectionConfig = this._subsections[i];
				subsectionConfig.material.alpha = this._c_alpha;
				var altitude = this._altitudeOffset - offsetH - subsectionConfig.height / 2;

				var subsection = viewer.entities.add({
				    name : this._name + "_" + i,
				    position: Cesium.Cartesian3.fromDegrees(this._lng, this._lat, altitude),
				    cylinder : {
				        length : subsectionConfig.height,
				        topRadius : this._c_radius,
				        bottomRadius : this._c_radius,
				        material : subsectionConfig.material,
				        outline : this._c_outline,
        				outlineColor : this._c_outlineColor
				    },
				    show : false
				});
				this._drill.push(subsection);
				offsetH += subsectionConfig.height;
			}

		};

		this.show = function(){
			for (var i = 0; i < this._drill.length; i++) {
				var subsection = this._drill[i];
				subsection.show = true;
			}
		};

		this.hide = function(destroy){
			for (var i = 0; i < this._drill.length; i++) {
				var subsection = this._drill[i];
				if (defined(destroy) && destroy) {
					this.viewer.entities.remove(subsection);
				}else{
					subsection.show = false;
				}
			}
		};

		this.init();
	},

	//Drill对象的集合
	DrillCollection : function(DrillArray){
		this._drillArray = new Array();

		this.loadByDrillCfgCollection = function(drillCfgCollection){
		    for (var i = 0; i < drillCfgCollection.length; i++) {
		      	var dirll_en = new DRILL.Drill(viewer, drillCfgCollection[i].position, drillCfgCollection[i].drillCfg, "Drill"+i, 5);
		      	this._drillArray.push(dirll_en);
		    }
		};

		this.hide = function(destroy){
			if(defined(destroy) && destroy){
				for (var i = 0; i < this._drillArray.length; i++) {
					this._drillArray[i].hide(true);
				}

			}else{
				for (var i = 0; i < this._drillArray.length; i++) {
					this._drillArray[i].hide();
				}
			}
		};

		this.show = function(){
			for (var i = 0; i < this._drillArray.length; i++) {
				this._drillArray[i].show();
			}
		};
	}

	//static function
}