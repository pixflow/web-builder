<div class='karma-range-slider-container'>
	<# if( data.label != "" ) { #>
		<div class="karma-all-controller-title">{{{data.label}}}</div>
		<# } #>

			<div class="karma-range-slider-content">

				<input type="range" id="karma-range-slider-range" value="{{{data.value}}}" min="{{{data.options.min}}}" max="{{{data.options.max}}}">
				<div class="karma-range-slider-number">
					<input type="number" id="karma-range-slider-input" value="{{{data.value}}}" min="{{{data.options.min}}}" max="{{{data.options.max}}}">
					<label class="karma-unit">{{{ data.options.unit}}}</label>
				</div>
			</div>

	<# if( data.seprator != "" && data.seprator == "full" ) { #>
		<hr class="karma-full-seprator">
	<#}else if(data.seprator != "" && data.seprator == "container" ){ #>
		<hr class="karma-container-seprator">
	<# } #>
</div>