ENTITY_GROUP = {

	EntityGroup : function(){
		this._entitiesArray = new Array();

		this.addEntity = function(entity){
			this._entitiesArray.push(entity);
		};

		this.addEntities = function(entitiesArr){
			for (var i = 0; i < entitiesArr.length; i++) {
				this.addEntity(entitiesArr[i]);
			}
		}

		this.show = function(){
			for (var i = 0; i < this._entitiesArray.length; i++) {
				var entity = this._entitiesArray[i];
				entity.show = true;
			}
		};

		this.hide = function(destroy){
			for (var i = 0; i < this._entitiesArray.length; i++) {
				var entity = this._entitiesArray[i];
				if (defined(destroy) && destroy) {
					this.viewer.entities.remove(entity);
				}else{
					entity.show = false;
				}
			}
		};

	},


	//static function
}