<# if( data.separator != "" && data.separator != undefined ) { #>
	<div class="karma-title-controller controller-separator">
<#}else{ #>
	<div class='karma-title-controller'>
<# } #>
		<div class="karma-title-field"> {{{data.label}}} </div>
		<# if( data.separator != "" && data.separator == "full" ) { #>
			<hr class="karma-full-separator">
		<#}else if(data.separator != "" && data.separator == "container" ){ #>
			<hr class="karma-container-separator">
		<# } #>
	</div>
