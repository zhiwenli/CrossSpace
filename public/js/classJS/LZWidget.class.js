lzwFun = {
	LZWidget : function(viewer) {

	    this._viewer = viewer;
	    this._cameraMoveEventHeading = undefined;
	    this._cameraMoveEventPitch = undefined;

	    //影像透明度控件
	    this.alphaSlider = function(top, left, initAlpha) {
	    	left = left == null ? 0 : left;
	    	top = top == null ? 0 : top;
	    	initAlpha = initAlpha == null ? 1.0 : initAlpha;

			var alphaContainerStr = 
				'<div id="alphaContainer" style="display: flex; position: absolute; top: ' + top + 'px; left: ' + left + 'px; z-index: 99; background-color: #888; box-shadow: 1px 1px 10px 2px #888;">\n\
	    			<div style="width: 65px; margin-top: 2px;">\n\
	      				<span style="color: white;">Opacity:</span>\n\
	    			</div>\n\
	    			<div>\n\
	        			<input type="range" min="0" max="1" value="' + initAlpha + '" step="0.01" oninput="ImageryLayerAlphaChanged(this.value)" style="vertical-align: middle;">\n\
	    			</div>\n\
	  			</div>';
	  		document.write(alphaContainerStr);
		};

		//光标位置控件
		this.coordinateLabel = function(){

	  		var handler = new Cesium.ScreenSpaceEventHandler(this._viewer.canvas);
	    	handler.setInputAction(
	        	function(click) {
		            var ray = viewer.camera.getPickRay(click.endPosition);
		            var position = viewer.scene.globe.pick(ray, viewer.scene);
		            if (Cesium.defined(position)) {
		                var positionCartographic = viewer.scene.globe.ellipsoid.cartesianToCartographic(position);
		                positionCartographic.height += lzwVar.viewerEllipsoidGap;
		                position = viewer.scene.globe.ellipsoid.cartographicToCartesian(positionCartographic);
		                $('#latitude').text((positionCartographic.latitude * lzwVar.DEGREES_PER_RADIAN).toFixed(6));
		                $('#longitude').text((positionCartographic.longitude * lzwVar.DEGREES_PER_RADIAN).toFixed(6));
		                $('#altitude').text(positionCartographic.height.toFixed(1));

		                $('#x').text((position.x).toFixed(2) );
		                $('#y').text((position.y).toFixed(2));
		                $('#z').text(position.z.toFixed(2));
		            }
	        	},
	        	Cesium.ScreenSpaceEventType.MOUSE_MOVE
	    	);
		};

		this.compassIcon = function(bottom, right){
			var commpassContainer = 
			'<div id="compassContainer" title="方向" style="display: flex; position: absolute; bottom: ' + bottom + 'px; right: ' + right + 'px; z-index: 99; cursor: pointer;" onclick="lzwFun.compassHoming();">\n\
        		<div id="compassContainer_r" style="color: white; height: 40px; width: 40px; transform:rotate(-45deg);">\n\
          			<svg t="1513755265993" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2098" xmlns:xlink="http://www.w3.org/1999/xlink">\n\
            			<path d="M434.688 568.302345L142.106483 519.273931 773.490759 229.517241 468.197517 845.364966z" fill="#ddd" p-id="2100" data-spm-anchor-id="a313x.7781069.0.i4" class="selected"></path>\n\
          			</svg>\n\
        		</div>\n\
      		</div>';
      		document.write(commpassContainer);
      		
      		this._cameraMoveEvent = viewer.camera.changed.addEventListener(function(percentage) {
      			lzwFun.syncCameraHeading();
    		});
		};

		this.pitchIcon = function(top, right){
			var pitchContainer = 
			'<div id="pitchContainer" title="俯仰角" style="display: flex; position: absolute; top: ' + top + 'px; right: ' + right + 'px; width: 40px; height: 40px; z-index: 99; cursor: pointer;" onclick="lzwFun.pitchHoming();">\n\
        		<div id="pitchContainer_r" style="color: white; height: 30px; width: 30px; text-align: center; margin: auto; transform:rotate(90deg);">\n\
          			<svg t="1513913736730" class="icon" style="" viewBox="0 0 1024 1024"><defs><style type="text/css"></style></defs><path d="M719.083 399.567c0 6.124-2.042 12.523-5.987 19.097-2.26 3.816-5.262 7.892-8.932 12.291-3.403 4.038-6.31 7.623-8.578 10.613-2.77 3.63-5.761 7.759-8.932 12.333l-0.135 0.182c-3.223 4.581-6.124 8.979-8.715 13.296-2.812 4.581-5.577 9.479-8.3 14.698-1.859 3.584-3.317 7.349-4.353 11.386-0.91 3.584-1.362 7.261-1.362 10.979 0 3.852 0.407 7.442 1.27 10.747 0.955 3.673 2.404 7.299 4.307 10.889h0.042c2.678 4.989 5.357 9.571 8.034 13.789 2.86 4.543 5.806 8.806 8.805 12.841l-0.042 0.042c2.591 3.36 5.486 6.99 8.757 10.889 2.404 2.86 4.946 5.626 7.666 8.343 3.63 3.63 6.532 6.844 8.715 9.663 5.173 6.58 7.759 13.296 7.759 20.141v88.052c0 14.155-4.669 29.259-14.021 45.313-4.081 6.99-8.578 13.702-13.567 20.229-4.946 6.439-10.39 12.747-16.333 18.875-6.080 6.259-12.473 11.977-19.229 17.149-6.756 5.173-13.887 9.846-21.276 13.967-7.892 4.354-15.74 7.666-23.589 9.933h-0.091c-8.483 2.494-16.654 3.771-24.495 3.771h-416.944c-9.028 0-17.917-0.858-26.628-2.542s-17.057-4.221-25.036-7.623v0c-7.849-3.36-15.199-7.299-22.045-11.844-7.17-4.81-13.613-10.115-19.417-15.877-5.852-5.852-11.158-12.389-15.923-19.596-4.581-6.896-8.528-14.425-11.882-22.548-3.36-8.122-5.852-16.517-7.532-25.222-1.674-8.805-2.494-17.647-2.494-26.628v-361.459c0-7.35 0.858-14.927 2.494-22.59 1.588-7.299 3.994-14.742 7.121-22.228 3.084-7.395 6.844-14.519 11.25-21.275 4.4-6.844 9.394-13.296 14.927-19.417l0.135-0.135c5.486-5.987 11.615-11.563 18.284-16.695 6.668-5.173 13.746-9.759 21.184-13.789 8.171-4.353 16.876-7.666 26.176-9.888 9.167-2.219 18.419-3.317 27.763-3.317v0.134l416.812-0.135c8.932 0 17.829 0.858 26.674 2.542 8.805 1.632 17.242 4.081 25.402 7.395h0.134c8.033 3.266 15.557 7.121 22.59 11.616 6.99 4.4 13.612 9.571 19.876 15.426 6.31 5.894 11.882 12.333 16.695 19.28 4.765 6.844 8.932 14.425 12.432 22.634v0c3.492 8.034 6.123 16.333 7.849 24.906 1.81 8.846 2.726 17.601 2.726 26.362v72.992zM664.15 397.476c1.088-1.27 1.995-2.356 2.726-3.317v-67.594c0-5.805-0.494-11.108-1.492-15.923-0.999-5.032-2.592-9.934-4.669-14.742l-0.091-0.182c-1.996-4.669-4.493-9.117-7.395-13.296-2.86-4.129-6.032-7.849-9.523-11.108-3.584-3.36-7.623-6.485-12.116-9.302-4.449-2.811-9.167-5.262-14.246-7.299v-0.042c-4.989-1.996-10.158-3.539-15.514-4.542-5.262-0.999-10.935-1.492-17.106-1.492v-0.091l-416.812 0.091c-5.852 0-11.108 0.588-15.739 1.675-4.581 1.087-9.070 2.86-13.518 5.218-5.083 2.77-9.799 5.762-14.061 9.070-4.129 3.173-8.034 6.756-11.659 10.702v0c-3.673 4.038-6.896 8.211-9.662 12.473-2.726 4.265-5.033 8.622-6.939 13.151-1.859 4.494-3.317 8.931-4.221 13.243-0.858 3.947-1.312 7.806-1.312 11.562v361.459c0 6.124 0.494 11.844 1.492 17.017 0.999 5.262 2.494 10.295 4.449 15.063 1.996 4.765 4.354 9.302 7.21 13.566 2.633 3.994 5.761 7.806 9.394 11.43 3.771 3.771 7.578 6.939 11.47 9.523 4.175 2.812 8.622 5.218 13.339 7.21h0.134c4.493 1.901 9.302 3.359 14.425 4.353 5.172 0.999 10.796 1.492 16.833 1.492h416.944c3.265 0 6.58-0.494 9.933-1.492v0c4.038-1.18 8.441-3.085 13.152-5.716 5.173-2.86 10.070-6.080 14.784-9.662 4.716-3.63 9.21-7.666 13.476-12.069 4.4-4.543 8.483-9.254 12.254-14.155 3.673-4.81 6.99-9.707 9.888-14.742 4.581-7.849 6.896-14.246 6.896-19.186v-79.797c-0.362-0.362-0.77-0.723-1.18-1.133-3.125-3.173-6.625-7.035-10.481-11.615-2.908-3.447-6.486-7.938-10.613-13.382l-0.182-0.182c-3.815-5.172-7.487-10.526-11.025-16.106-3.492-5.53-6.803-11.207-9.846-16.876v-0.091c-3.898-7.349-6.896-14.784-8.846-22.412-2.086-7.987-3.125-15.923-3.125-23.818 0-8.034 0.999-15.964 2.996-23.817 1.901-7.487 4.896-15.015 8.846-22.634 3.125-5.987 6.439-11.844 9.887-17.561 3.673-6.032 7.261-11.562 10.796-16.517h0.042c3.266-4.716 6.625-9.302 10.026-13.745 4.129-5.441 7.442-9.662 9.982-12.702z" p-id="5015" fill="#ddd"></path><path d="M991.221 309.070v383.378c0 8.482-1.179 16.784-3.538 24.811-2.356 8.075-5.941 15.604-10.662 22.5h-0.042c-5.806 8.528-13.197 14.966-22.142 19.367-8.578 4.221-18.007 6.31-28.31 6.31-4.542 0-9.523-0.77-15.015-2.356-4.353-1.312-8.89-3.040-13.518-5.306-3.719-1.81-7.666-3.852-11.844-6.172-4.038-2.26-8.033-4.669-12.018-7.261-2.86-1.81-6.259-4.081-10.577-6.99-3.771-2.542-7.17-4.946-10.209-7.121l-0.182-0.091c-3.317-2.45-6.259-4.669-8.89-6.803-3.125-2.542-5.626-4.629-7.349-6.401-3.719-3.173-8.257-7.349-13.612-12.473-5.577-5.402-12.254-12.018-19.917-19.781-7.666-7.759-15.426-16.195-23.362-25.223-7.578-8.622-15.333-18.007-23.31-28.125-7.938-10.071-15.47-20.229-22.451-30.576-7.442-10.934-13.967-21.369-19.641-31.252v-0.091c-6.625-11.705-11.705-23.093-15.152-34.16-3.673-11.882-5.486-23.226-5.486-34.114 0-10.935 1.949-22.548 5.894-34.882 3.719-11.47 9.029-23.31 15.964-35.474 6.485-11.293 13.701-22.634 21.686-34.019 7.531-10.702 16.009-21.728 25.402-33.028v-0.134c8.805-10.481 18.007-20.771 27.541-30.85 9.618-10.114 19.326-19.733 29.22-28.942h0.091c10.613-9.798 19.683-17.876 27.131-24.089 8.391-6.99 16.195-13.023 23.547-18.055l0.318-0.226c3.265-2.219 6.625-4.307 10.115-6.348h0.091c4.81-2.86 8.757-5.083 12.292-7.035l0.226-0.135c5.761-3.125 11.387-5.577 16.876-7.261 6.401-2.042 12.565-3.040 18.459-3.040 25.402 0 42.912 8.758 52.353 26.362 3.173 5.852 5.53 12.208 7.17 19.008h2.86v26.080zM939.009 692.44l-0.091-385.102c0-4.353-0.362-8.171-1.087-11.47-0.634-2.812-1.453-5.262-2.542-7.21-0.407-0.77-1.726 1.18-6.439 1.179-0.724 0-1.726 0.182-2.996 0.588-2.178 0.679-4.669 1.768-7.488 3.317v0c-5.127 2.812-8.891 4.946-10.978 6.171l0.042 0.042c-3.173 1.859-5.671 3.403-7.395 4.542-5.577 3.852-12.116 8.932-19.683 15.242-8.441 7.035-16.833 14.425-25.223 22.185l0.042 0.042c-9.21 8.578-18.191 17.468-26.946 26.674-8.441 8.932-16.876 18.419-25.265 28.438l-0.042-0.042c-7.892 9.436-15.469 19.367-22.734 29.711-6.844 9.759-13.197 19.733-19.009 29.942-5.356 9.302-9.254 17.78-11.705 25.499-2.179 6.803-3.266 13.151-3.266 18.961 0 5.941 0.999 12.208 3.085 18.781 2.26 7.395 5.806 15.286 10.613 23.728l0.042-0.042c5.761 10.070 11.52 19.417 17.328 27.987 6.31 9.254 13.067 18.459 20.229 27.54 7.071 8.891 14.291 17.6 21.686 26.034 7.035 8.033 14.155 15.692 21.322 22.999 7.17 7.261 13.476 13.518 18.914 18.736 5.032 4.853 9.21 8.666 12.524 11.47l1.632 1.406c0.999 0.999 2.086 1.995 3.317 2.954 1.86 1.492 4.221 3.266 7.035 5.356v0.042c3.125 2.26 6.080 4.307 8.806 6.171 2.314 1.541 5.672 3.771 9.759 6.401 2.996 1.949 5.987 3.719 8.979 5.401 2.86 1.588 5.894 3.173 9.167 4.764 2.26 1.088 4.081 1.81 5.401 2.219 0.27 0.091 0.45 0.135 0.494 0.135 2.541 0 4.4-0.27 5.441-0.82 0.679-0.318 1.362-0.955 1.996-1.901v-0.091c1.675-2.45 2.908-5.083 3.719-7.849 0.858-2.953 1.312-6.31 1.312-10.115z" p-id="5016" fill="#ddd"></path></svg>\n\
        		</div>\n\
      		</div>';
      		document.write(pitchContainer);

      		this._cameraMoveEventPitch = viewer.camera.changed.addEventListener(function(percentage) {
      			lzwFun.syncCameraPitch();
    		});
		};

		this.undergroundIcon = function(top, right){
			var overground = 
				'<svg width="30" height="30" xmlns="http://www.w3.org/2000/svg">\n\
				  <line stroke="#dddddd" stroke-linecap="undefined" stroke-linejoin="undefined" id="svg_1" y2="18.250034" x2="28.316227" y1="18.250034" x1="1.562855" stroke-width="1.5" fill="none"/>\n\
				  <line stroke-linecap="undefined" stroke-linejoin="undefined" id="svg_4" y2="21.312475" x2="4.312799" y1="18.562528" x1="5.81277" fill-opacity="null" stroke-width="1.5" stroke="#dddddd" fill="none"/>\n\
				  <line stroke-linecap="undefined" stroke-linejoin="undefined" id="svg_5" y2="21.312476" x2="8.062727" y1="18.562529" x1="9.562698" fill-opacity="null" stroke-width="1.5" stroke="#dddddd" fill="none"/>\n\
				  <line stroke-linecap="undefined" stroke-linejoin="undefined" id="svg_6" y2="21.312476" x2="12.06265" y1="18.562529" x1="13.562622" fill-opacity="null" stroke-width="1.5" stroke="#dddddd" fill="none"/>\n\
				  <line stroke-linecap="undefined" stroke-linejoin="undefined" id="svg_7" y2="21.312476" x2="16.312569" y1="18.562528" x1="17.81254" fill-opacity="null" stroke-width="1.5" stroke="#dddddd" fill="none"/>\n\
				  <line stroke-linecap="undefined" stroke-linejoin="undefined" id="svg_8" y2="21.312475" x2="20.312492" y1="18.562528" x1="21.812463" fill-opacity="null" stroke-width="1.5" stroke="#dddddd" fill="none"/>\n\
				  <line stroke-linecap="undefined" stroke-linejoin="undefined" id="svg_10" y2="21.312475" x2="24.437413" y1="18.562528" x1="25.937384" fill-opacity="null" stroke-width="1.5" stroke="#dddddd" fill="none"/>\n\
				  <path stroke="#dddddd" id="svg_11" d="m14.886033,6.904182c-3.493452,0 -6.249881,2.749769 -6.249881,2.749769s2.756429,2.750126 6.249881,2.750126c2.671708,0 6.249881,-2.750126 6.249881,-2.750126s-3.578173,-2.749769 -6.249881,-2.749769zm0,4.463295c-1.226366,0 -2.225421,-0.768894 -2.225421,-1.713526s0.999055,-1.713526 2.225421,-1.713526s2.225421,0.769251 2.225421,1.713526s-0.999055,1.713526 -2.225421,1.713526zm0,-2.713766c-0.717116,0 -1.299049,0.44772 -1.299049,1.00024c0,0.55252 0.58147,1.00024 1.299049,1.00024c0.717579,0 1.299049,-0.44772 1.299049,-1.00024c0,-0.552164 -0.58147,-1.00024 -1.299049,-1.00024z" fill-opacity="null" stroke-width="1.5" fill="none"/>\n\
				</svg>';

			var underground = 
				'<svg width="30" height="30" xmlns="http://www.w3.org/2000/svg">\n\
				  <line stroke="#dddddd" stroke-linecap="undefined" stroke-linejoin="undefined" id="svg_1" y2="9.625199" x2="28.316227" y1="9.625199" x1="1.562855" stroke-width="1.5" fill="none"/>\n\
				  <line stroke-linecap="undefined" stroke-linejoin="undefined" id="svg_4" y2="12.687641" x2="4.312799" y1="9.937694" x1="5.81277" fill-opacity="null" stroke-width="1.5" stroke="#dddddd" fill="none"/>\n\
				  <line stroke-linecap="undefined" stroke-linejoin="undefined" id="svg_5" y2="12.687642" x2="8.062727" y1="9.937694" x1="9.562698" fill-opacity="null" stroke-width="1.5" stroke="#dddddd" fill="none"/>\n\
				  <line stroke-linecap="undefined" stroke-linejoin="undefined" id="svg_6" y2="12.687641" x2="12.06265" y1="9.937694" x1="13.562622" fill-opacity="null" stroke-width="1.5" stroke="#dddddd" fill="none"/>\n\
				  <line stroke-linecap="undefined" stroke-linejoin="undefined" id="svg_7" y2="12.687641" x2="16.312569" y1="9.937694" x1="17.81254" fill-opacity="null" stroke-width="1.5" stroke="#dddddd" fill="none"/>\n\
				  <line stroke-linecap="undefined" stroke-linejoin="undefined" id="svg_8" y2="12.687641" x2="20.312492" y1="9.937694" x1="21.812463" fill-opacity="null" stroke-width="1.5" stroke="#dddddd" fill="none"/>\n\
				  <line stroke-linecap="undefined" stroke-linejoin="undefined" id="svg_10" y2="12.687641" x2="24.437413" y1="9.937693" x1="25.937384" fill-opacity="null" stroke-width="1.5" stroke="#dddddd" fill="none"/>\n\
				  <path stroke="#dddddd" id="svg_11" d="m14.886033,17.880344c-3.493452,0 -6.249881,2.749769 -6.249881,2.749769s2.756429,2.750126 6.249881,2.750126c2.671708,0 6.249881,-2.750126 6.249881,-2.750126s-3.578173,-2.749769 -6.249881,-2.749769zm0,4.463295c-1.226366,0 -2.225421,-0.768894 -2.225421,-1.713526s0.999055,-1.713526 2.225421,-1.713526s2.225421,0.769251 2.225421,1.713526s-0.999055,1.713526 -2.225421,1.713526zm0,-2.713766c-0.717116,0 -1.299049,0.44772 -1.299049,1.00024c0,0.55252 0.58147,1.00024 1.299049,1.00024c0.717579,0 1.299049,-0.44772 1.299049,-1.00024c0,-0.552164 -0.58147,-1.00024 -1.299049,-1.00024z" fill-opacity="null" stroke-width="1.5" fill="none"/>\n\
				</svg>';

			var undergroundContainer = 
			'<div id="undergroundContainer" title="水平翻转" style="position: absolute; top: ' + top + 'px; right: ' + right + 'px; width: 40px; height: 40px; z-index: 99; cursor: pointer;" onclick="lzwFun.groundHoming();">\n\
				<div id="undergroundContainer_under" style="display: none; color: white; height: 30px; width: 30px; text-align: center; margin: 5px;">\n\
					' + underground + '\n\
				</div>\n\
				<div id="undergroundContainer_over" style="display: flex; color: white; height: 30px; width: 30px; text-align: center; margin: 5px;">\n\
					' + overground + '\n\
				</div>\n\
			</div>';
			
			document.write(undergroundContainer);
		};

	},

	
	//相机位置回正heading
	compassHoming : function(){
		var position = viewer.camera.position;
		var pitch = viewer.camera.pitch;
		viewer.camera.flyTo({
			destination : position,
		    orientation: {
		        heading : Cesium.Math.toRadians(0),
		        pitch : pitch,
        		roll : 0
		    }
		});
	},

	pitchHoming : function(){
		var alt = lzw_getCameraAndGroundAltitude();
		var heightOffset = alt.camera - alt.ground;

		var degree = heightOffset > 0 ? -90 : 36;

		var position = viewer.camera.position;
		var heading = viewer.camera.heading;
		viewer.camera.flyTo({
			destination : position,
		    orientation: {
		        heading : heading,
		        pitch : Cesium.Math.toRadians(degree),
        		roll : 0
		    }
		});
	},

	//compass图标同步相机heading
	syncCameraHeading : function(){
		var svgOffsetDegree = -45;
      	var heading = viewer.camera.heading * lzwVar.DEGREES_PER_RADIAN + svgOffsetDegree;
      	$("#compassContainer_r").css("transform","rotate(" + heading + "deg)");
	},

	//pitch图标同步相机
	syncCameraPitch : function(){
      	var pitch = 360 - viewer.camera.pitch * lzwVar.DEGREES_PER_RADIAN;
      	$("#pitchContainer_r").css("transform","rotate(" + pitch + "deg)");
	},

	//地下指示图标显隐
	showUndergroundIcon : function(show){
		if (show) {
			$("#undergroundContainer_under").hide();
			$("#undergroundContainer_over").show();
		}else{
			$("#undergroundContainer_under").show();
			$("#undergroundContainer_over").hide();
		}
	},

	//返回地面
	groundHoming : function(){

		var position = viewer.camera.position;
		var heading = viewer.camera.heading;
		var pitch = viewer.camera.pitch;
		
		var positionCartographic = viewer.scene.globe.ellipsoid.cartesianToCartographic(position);
		var terrainHeight = viewer.scene.globe.getHeight(positionCartographic);
		if (!defined(terrainHeight)) {
			//return;
			terrainHeight = 0;
		}
		
		console.log(positionCartographic.height, terrainHeight);
		var undergroundHeight = terrainHeight - positionCartographic.height;
		
		positionCartographic.height += undergroundHeight * 2;
		position = viewer.scene.globe.ellipsoid.cartographicToCartesian(positionCartographic);

		pitch *= -1;
		
		viewer.camera.flyTo({
			destination : position,
		    orientation : {
		        heading : heading,
		        pitch : pitch,
        		roll : 0
		    },
		    duration : 1.5
		});
	},

}