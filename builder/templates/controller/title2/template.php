<div class="karma-title2-controller">
	<div class="karma-title2-field"> {{{data.label}}} </div>
	<# if( data.separator != "" && data.separator == "full" ) { #>
		<hr class="karma-full-separator">
	<#}else if(data.separator != "" && data.separator == "container" ){ #>
		<hr class="karma-container-separator">
	<# } #>
</div>
