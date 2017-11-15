<# if( data.separator != "" ) { #>
	<div class="karma-check-box-controller controller-separator">
<#}else{ #>
	<div class='karma-check-box-controller'>
<# } #>
		<div class="check-box-controller-template">
			<# if( data.label != "" ) { #>
				<div class="karma-check-box-title">{{{ data.label }}}</div>
			<# } #>
			<div class="karma-check-box-container">
				<div class="check-box-circle">
					<input	type="checkbox" id="karma-input-checkbox-controller" name="{{{ data.name }}}" class="check-box-input" value="{{ data.value }}">
					<label class="check-box-circle-fill" for="karma-input-checkbox-controller"></label>
				</div>
			</div>
		</div>

		<# if( data.separator != "" && data.separator == "full" ) { #>
			<hr class="karma-full-separator">
		<#}else if(data.separator != "" && data.separator == "container" ){ #>
			<hr class="karma-container-separator">
		<# } #>

</div>



