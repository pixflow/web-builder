<# if( data.separator != "" && data.separator != undefined  ) { #>
<div id="{{ data.id }}" class="karma-color-picker-controller controller-separator">
<#}else{ #>
<div id="{{ data.id }}" class='karma-color-picker-controller'>
<# } #>
	<div class="color-picker-controller-template">
	<# if( data.label != "" ) { #>
		<div class="karma-color-picker-title">{{{ data.label }}}</div>
	<# } #>
		<div class="karma-color-picker-controller-container">
			<input type="text" value="{{ data.value }}" name="{{ data.name }}" class="karma-colorpicker-main-color"/>
		</div>
	</div>
	<# if( data.separator != "" && data.separator == "full" ) { #>
	<hr class="karma-full-separator">
	<#}else if(data.separator != "" && data.separator == "container" ){ #>
	<hr class="karma-container-separator">
	<# } #>
</div>