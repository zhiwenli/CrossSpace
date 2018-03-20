
<div id="sysConfigContainer" hidden class="sideBar_opts_expand_ctr">
	
	<div id="sysConfig_header" class="sysConfig_header">
		<label class="sysConfig_headerTitle">设置</label>
		<button class="sideBar_btn sysConfig_headerReset" onclick="sysConfigToDefault();">
			恢复默认设置
		</button>
	</div>

	<div id="sysConfig_body" class="sysConfig_body scroll-bar">

		<div class="sysConfig_body_ctg">
			<label class="sysConfig_body_ctg_header">显示效果</label>
			<div class="sysConfig_body_ctg_li">
				<div id="sysCfg_x" class="label_bg sysConfig_options">
					<label class="sysConfig_options_header">阴影</label>
					<label class="sysConfig_options_desc">是否显示由太阳光照射产生的地形阴影</label>
					<div class="sysConfig_options_tag">
						<input class="tgl tgl-flip" id="sysCfg_shadow" type="checkbox" checked="true" onchange="optionChked(this);" />
					    <label class="tgl-btn" data-tg-off="关" data-tg-on="开" for="sysCfg_shadow"></label>
					</div>
				</div>

				<div id="sysCfg_x" class="label_bg sysConfig_options">
					<label class="sysConfig_options_header">大气层</label>
					<label class="sysConfig_options_desc">是否显示地球表层大气效果</label>
					<div class="sysConfig_options_tag">
						<input class="tgl tgl-flip" id="sysCfg_atomsphere" type="checkbox" checked="true" onchange="optionChked(this);" />
					    <label class="tgl-btn" data-tg-off="关" data-tg-on="开" for="sysCfg_atomsphere"></label>
					</div>
				</div>

				<div id="sysCfg_x" class="label_bg sysConfig_options">
					<label class="sysConfig_options_header">雾</label>
					<label class="sysConfig_options_desc">是否显示地平线朦雾效果</label>
					<div class="sysConfig_options_tag">
						<input class="tgl tgl-flip" id="sysCfg_fog" type="checkbox" checked="true" onchange="optionChked(this);" />
					    <label class="tgl-btn" data-tg-off="关" data-tg-on="开" for="sysCfg_fog"></label>
					</div>
				</div>

				<div id="sysCfg_x" class="label_bg sysConfig_options">
					<label class="sysConfig_options_header">星空</label>
					<label class="sysConfig_options_desc">是否显示背景星空</label>
					<div class="sysConfig_options_tag">
						<input class="tgl tgl-flip" id="sysCfg_sky" type="checkbox" checked="true" onchange="optionChked(this);" />
					    <label class="tgl-btn" data-tg-off="关" data-tg-on="开" for="sysCfg_sky"></label>
					</div>
				</div>

				<div id="sysCfg_x" class="label_bg sysConfig_options">
					<label class="sysConfig_options_header">太阳</label>
					<label class="sysConfig_options_desc">是否显示太阳</label>
					<div class="sysConfig_options_tag">
						<input class="tgl tgl-flip" id="sysCfg_sun" type="checkbox" checked="true" onchange="optionChked(this);" />
					    <label class="tgl-btn" data-tg-off="关" data-tg-on="开" for="sysCfg_sun"></label>
					</div>
				</div>
			</div>

		</div>

		<div class="sysConfig_body_ctg">
			<label class="sysConfig_body_ctg_header">参考标记</label>
			<div class="sysConfig_body_ctg_li">
				<div id="sysCfg_x" class="label_bg sysConfig_options">
					<label class="sysConfig_options_header">经纬网</label>
					<label class="sysConfig_options_desc">是否在地球表面附加经纬网</label>
					<div class="sysConfig_options_tag">
						<input class="tgl tgl-flip" id="sysCfg_graticule" type="checkbox" checked="true" onchange="optionChked(this);" />
					    <label class="tgl-btn" data-tg-off="关" data-tg-on="开" for="sysCfg_graticule"></label>
					</div>
				</div>
				<div id="sysCfg_x" class="label_bg sysConfig_options">
					<label class="sysConfig_options_header">注记(中文)</label>
					<label class="sysConfig_options_desc">是否需要中文地图注记，以标记地名</label>
					<div class="sysConfig_options_tag">
						<input class="tgl tgl-flip" id="sysCfg_annotation_cn" type="checkbox" checked="true" onchange="optionChked(this);" />
					    <label class="tgl-btn" data-tg-off="关" data-tg-on="开" for="sysCfg_annotation_cn"></label>
					</div>
				</div>
				<div id="sysCfg_x" class="label_bg sysConfig_options">
					<label class="sysConfig_options_header">注记(英文)</label>
					<label class="sysConfig_options_desc">是否需要英文地图注记，以标记地名</label>
					<div class="sysConfig_options_tag">
						<input class="tgl tgl-flip" id="sysCfg_annotation_en" type="checkbox" checked="true" onchange="optionChked(this);" />
					    <label class="tgl-btn" data-tg-off="关" data-tg-on="开" for="sysCfg_annotation_en"></label>
					</div>
				</div>
			</div>
		</div>

		<!-- 控件 -->
		<div class="sysConfig_body_ctg">
			<label class="sysConfig_body_ctg_header">辅助控件</label>
			<div class="sysConfig_body_ctg_li">
				<div id="sysCfg_x" class="label_bg sysConfig_options">
					<label class="sysConfig_options_header">比例尺</label>
					<label class="sysConfig_options_desc">是否显示比例尺控件，以参考地物尺寸</label>
					<div class="sysConfig_options_tag">
						<input class="tgl tgl-flip" id="sysCfg_plottingScale" type="checkbox" checked="true" onchange="optionChked(this);" />
					    <label class="tgl-btn" data-tg-off="关" data-tg-on="开" for="sysCfg_plottingScale"></label>
					</div>
				</div>
				<div id="sysCfg_x" class="label_bg sysConfig_options">
					<label class="sysConfig_options_header">导航面板</label>
					<label class="sysConfig_options_desc">是否显示导航面板，以辅助控制浏览视角</label>
					<div class="sysConfig_options_tag">
						<input class="tgl tgl-flip" id="sysCfg_navigation" type="checkbox" checked="true" onchange="optionChked(this);" />
					    <label class="tgl-btn" data-tg-off="关" data-tg-on="开" for="sysCfg_navigation"></label>
					</div>
				</div>
				<div id="sysCfg_x" class="label_bg sysConfig_options">
					<label class="sysConfig_options_header">地理坐标</label>
					<label class="sysConfig_options_desc">是否显示地理坐标，以精确了解当前地理坐标</label>
					<div class="sysConfig_options_tag">
						<input class="tgl tgl-flip" id="sysCfg_coordinate" type="checkbox" checked="true" onchange="optionChked(this);" />
					    <label class="tgl-btn" data-tg-off="关" data-tg-on="开" for="sysCfg_coordinate"></label>
					</div>
				</div>

				<div id="sysCfg_x" class="label_bg sysConfig_options">
					<label class="sysConfig_options_header">时间轴</label>
					<label class="sysConfig_options_desc">开启时间轴以控制当前时间与动画速度</label>
					<div class="sysConfig_options_tag">
						<input class="tgl tgl-flip" id="sysCfg_time" type="checkbox" checked="true" onchange="optionChked(this);" />
					    <label class="tgl-btn" data-tg-off="关" data-tg-on="开" for="sysCfg_time"></label>
					</div>
				</div>
			</div>
		</div>

		<div class="sysConfig_body_ctg">
			<label class="sysConfig_body_ctg_header">性能</label>
			<div class="sysConfig_body_ctg_li">
				<div id="sysCfg_x" class="label_bg sysConfig_options">
					<label class="sysConfig_options_header">抗锯齿</label>
					<label class="sysConfig_options_desc">是否开启抗锯齿效果，关闭可提升性能</label>
					<div class="sysConfig_options_tag">
						<input class="tgl tgl-flip" id="sysCfg_fxaa" type="checkbox" checked="true" onchange="optionChked(this);" />
					    <label class="tgl-btn" data-tg-off="关" data-tg-on="开" for="sysCfg_fxaa"></label>
					</div>
				</div>
			</div>
		</div>


	</div>

</div>