<div class="karma-grid-controller">
	<div class="grid-controller-template">
		<# for( var i in data.field ) { #>
			<# var itemClass = (data.value == data.field[i].value) ? "radio-image-controller-img radio-image-selected-item" : "radio-image-controller-img";  #>
				<div class="{{itemClass}}" data-value="{{ data.field[i].value }}">
					{{{data.field[i].image}}}
					<# if( data.field[i].title != "" ) { #>

						<span class="radio-image-controller-title">{{{data.field[i].title}}}</span>

						<# } #>
				</div>

				<# } #>
					<input	type="text" name="{{{ data.name }}}" class="hidden-input" value="">
	</div>
	<# if( data.separator != "" && data.separator == "full" ) { #>
		<hr class="karma-full-separator">
		<#}else if(data.separator != "" && data.separator == "container" ){ #>
			<hr class="karma-container-separator">
			<# } #>

</div>
