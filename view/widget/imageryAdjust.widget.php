
<div id="imageryAdjustContainer" hidden class="sideBar_opts_expand">

	<div id="alphaContainer" class="label_bg imageryAdjust_options">
		<span class="imageryAdjust_opt_title">不透明度: </span>
		<div>
			<input type="range" id="alphaContainer_input" min="0" max="1" value="1.0" step="0.01" oninput="ImageryLayerAlphaChanged(this.value); $('#alphaContainer_tag').text(this.value);">
		</div>
		<span id="alphaContainer_tag" class="imageryAdjust_opt_val" title="单击手动输入" onclick="clickToInput(this, 'alphaContainer_input', ImageryLayerAlphaChanged);">1.0</span>
	</div>

	<div id="brightnessContainer" class="label_bg imageryAdjust_options">
		<span class="imageryAdjust_opt_title">亮度: </span>
		<div>
			<input type="range" id="brightnessContainer_input" min="0" max="3" value="1" step="0.01" oninput="ImageryLayerBrightnessChanged(this.value); $('#brightnessContainer_tag').text(this.value);">
		</div>
		<span id="brightnessContainer_tag" class="imageryAdjust_opt_val" title="单击手动输入" onclick="clickToInput(this, 'brightnessContainer_input', ImageryLayerBrightnessChanged);">1.0</span>
	</div>

	<div id="contrastContainer" class="label_bg imageryAdjust_options">
		<span class="imageryAdjust_opt_title">对比度: </span>
		<div>
			<input type="range" id="contrastContainer_input" min="0" max="3" value="1" step="0.01" oninput="ImageryLayerContrastChanged(this.value); $('#contrastContainer_tag').text(this.value);">
		</div>
		<span id="contrastContainer_tag" class="imageryAdjust_opt_val" title="单击手动输入" onclick="clickToInput(this, 'contrastContainer_input', ImageryLayerContrastChanged);">1.0</span>
	</div>

	<div id="saturationContainer" class="label_bg imageryAdjust_options">
		<span class="imageryAdjust_opt_title">饱和度: </span>
		<div>
			<input type="range" id="saturationContainer_input" min="0" max="3" value="1" step="0.01" oninput="ImageryLayerSaturationChanged(this.value); $('#saturationContainer_tag').text(this.value);">
		</div>
		<span id="saturationContainer_tag" class="imageryAdjust_opt_val" title="单击手动输入" onclick="clickToInput(this, 'saturationContainer_input', ImageryLayerSaturationChanged);">1.0</span>
	</div>

	<div id="hueContainer" class="label_bg imageryAdjust_options">
		<span class="imageryAdjust_opt_title">色相: </span>
		<div>
			<input type="range" id="hueContainer_input" min="0" max="360" value="0" step="1" oninput="ImageryLayerHueChanged(this.value); $('#hueContainer_tag').text(this.value);">
		</div>
		<span id="hueContainer_tag" class="imageryAdjust_opt_val" title="单击手动输入" onclick="clickToInput(this, 'hueContainer_input', ImageryLayerHueChanged);">0.0</span>
	</div>

	<div id="terrainExaggerationContainer" class="label_bg imageryAdjust_options">
		<span class="imageryAdjust_opt_title">拉伸: </span>
		<div>
			<input type="range" id="terrainExaggerationContainer_input" min="-10" max="10" value="1" step="0.1" oninput="terrainExaggerationChanged(this.value); $('#terrainExaggerationContainer_tag').text(this.value);">
		</div>
		<sapn id="terrainExaggerationContainer_tag" class="imageryAdjust_opt_val" title="单击手动输入" onclick="clickToInput(this, 'terrainExaggerationContainer_input', terrainExaggerationChanged);">1.0</sapn>
	</div>

	<div>
		<button class="sideBar_btn imageryAdjust_options" onclick="imageryAdjustToDefault();">
			恢复默认设置
		</button>
	</div>

	<!-- <div id="coordinateContainer" class="label_bg">
		<div>
		  <small>
		  	<span>location </span>
  			<span id="latitude">00.000000</span>
			<span id="longitude">000.000000</span>
			<span id="altitude">0.00</span>
  			<br>
  			<div hidden>
  				<span>x:</span><span id="x">0</span>
  				<span> y:</span><span id="y">0</span>
  				<span> z:</span><span id="z">0</span>
  			</div>
  		  </small>
		</div>
	</div> -->
	
</div>