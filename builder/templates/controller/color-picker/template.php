<#
if( 'undefined' == typeof data.params ){ data.params = {} }
var defaultParams = { opacity : false, multiColor : false, firstColorTitle : 'Main', secondColorTitle : 'Hover', presetColors : '' };
for ( var i in defaultParams ) {
	if ( !data.params.hasOwnProperty( i ) ) {
		data.params[ i ] = defaultParams[ i ];
	}
}
#>
<# var separatorClass = ( data.separator != "" && data.separator != undefined  ) ? 'controller-separator' : '' #>
<div id="{{ data.id }}" class="karma-color-picker-controller {{separatorClass}}"
	 data-opacity="{{ data.params.opacity }}" data-multi-color="{{ data.params.multiColor }}"
	 data-first-color-title="{{ data.params.firstColorTitle }}"
	 data-second-color-title="{{ data.params.secondColorTitle }}"
	 data-preset-colors="{{ data.params.presetColors }}">
	<div class="color-picker-controller-template">
		<# if( data.label != "" ) { #>
		<div class="karma-color-picker-title">{{{ data.label }}}</div>
		<# } #>
		<div class="karma-color-picker-controller-container">
			<input type="text" value="{{ data.value }}" name="{{ data.name }}"
				   class="karma-colorpicker-main-color"/>
			<# if( data.params.multiColor == true ) { #>
			<input type="text" value="{{ data.secondValue }}" name="{{ data.params.secondName }}"
				   class="karma-colorpicker-second-color"/>
			<# } #>
		</div>
	</div>
	<# if( data.separator != "" && data.separator == "full" ) { #>
	<hr class="karma-full-separator">
	<#}else if(data.separator != "" && data.separator == "container" ){ #>
	<hr class="karma-container-separator">
	<# } #>
</div>