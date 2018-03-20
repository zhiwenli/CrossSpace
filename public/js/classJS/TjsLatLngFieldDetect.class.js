var LatLngFieldDetect = {
	latIndex: -1,
	lngIndex: -1,

	detect: function(data){
		this.headrowDetect(data[0]);
		if (latIndex != -1 && lngIndex != -1) {
			return new Array(latIndex, lngIndex);
		}

		this.valueDetect(data);
		if (latIndex != -1 && lngIndex != -1) {
			return new Array(latIndex, lngIndex);
		}

		return new array(-1, -1);
	},

	//根据首行描述识别经纬度所在列
	headrowDetect: function(headRow){
		var latKeyWords = new Array('纬度', 'lat', 'Lat', 'LAT', 'x', 'X');
		var lngKeyWords = new Array('经度', 'long', 'Long', 'LONG', 'y', 'Y');

		for (var i = 0; i < headRow.length; i++) {
			if(this.strContains(headRow[i], latKeyWords)){
				latIndex = i;
			}
			if(this.strContains(headRow[i], lngKeyWords)) {
				lngIndex = i;
			}
		}
	},

	//根据数据内容识别经纬度所在列
	valueDetect: function(data){
		//...
	},

	strContains: function(string, targetStringArr){
		var flag = -1;
		for (var i = 0; i < targetStringArr.length; i++) {
			var index = string.indexOf(targetStringArr[i]);
			flag = index > flag ? index : flag;
		}

		if(flag == -1){
			return false;
		}else{
			return true;
		}
	},
}