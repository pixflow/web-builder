<div class="karma-check-box-controller">
	<div class="check-box-controller-template">

		<# if( data.label != "" ) { #>
			<div class="karma-check-box-title">{{{ data.label }}}</div>
		<# } #>

		<div class="karma-check-box-container">
			<div class="check-box-circle">
				<div class="check-box-circle-fill"></div>
			</div>
		</div>

	</div>

	<# if( data.separator != "" && data.separator == "full" ) { #>
		<hr class="karma-full-separator">
	<#}else if(data.separator != "" && data.separator == "container" ){ #>
		<hr class="karma-container-separator">
	<# } #>

</div>



