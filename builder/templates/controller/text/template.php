<# if( data.separator != "" && data.separator != undefined ) { #>
	<div id="{{ data.id }}" class="karma-text-input-controller controller-separator">
<#}else{ #>
	<div id="{{ data.id }}" class="karma-text-input-controller" >
<# } #>
	<input id="input-{{ data.id }}"  type="text" value="{{ data.value }}" placeholder="{{ data.label }}" name="{{ data.name }}" class="karma-text-input-field" />

	<# if( data.separator != "" && data.separator == "full" ) { #>
		<hr class="karma-full-separator">
	<#}else if(data.separator != "" && data.separator == "container" ){ #>
		<hr class="karma-container-separator">
	<# } #>
</div>