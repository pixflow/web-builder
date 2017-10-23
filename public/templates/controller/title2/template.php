<div class="karma-title2-controller">
	<div class="karma-title2-field"> {{{data.value}}} </div>
	<# if( data.seprator != "" && data.seprator == "full" ) { #>
		<hr class="karma-full-seprator">
	<#}else if(data.seprator != "" && data.seprator == "container" ){ #>
		<hr class="karma-container-seprator">
	<# } #>
</div>
