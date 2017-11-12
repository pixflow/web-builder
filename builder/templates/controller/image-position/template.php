<# if( data.separator != "" ) { #>
	<div class="karma-image-position-container controller-seprator">
<#}else{ #>
	<div class='karma-image-position-container'>
<# } #>
<# if( data.label != "" ) { #>
	<div class="karma-all-controller-title">{{{data.label}}}</div>
<# } #>
		<div class="karma-image-position-content">
			<div class="karma-image-position-box karma-image-position-top-left-dot" data-value="top-left">
				<div class="karma-image-position-dot "></div>
			</div>
			<div class="karma-image-position-box karma-image-position-center-dot" data-value="top-center">
				<div class="karma-image-position-dot"></div>
			</div>
			<div class="karma-image-position-box karma-image-position-top-right-dot" data-value="top-right">
				<div class="karma-image-position-dot "></div>
			</div>
			<div class="karma-image-position-box karma-image-position-center-dot" data-value="center-left">
				<div class="karma-image-position-dot"></div>
			</div>
			<div class="karma-image-position-box karma-image-position-center-dot " data-value="center-center">
				<div class="karma-image-position-dot"></div>
			</div>
			<div class="karma-image-position-box karma-image-position-center-dot" data-value="center-right">
				<div class="karma-image-position-dot"></div>
			</div>
			<div class="karma-image-position-box karma-image-position-bottom-left-dot" data-value="bottom-left">
				<div class="karma-image-position-dot "></div>
			</div>
			<div class="karma-image-position-box karma-image-position-center-dot" data-value="bottom-center">
				<div class="karma-image-position-dot"></div>
			</div>
			<div class="karma-image-position-box karma-image-position-bottom-right-dot" data-value="bottom-right">
				<div class="karma-image-position-dot"></div>
			</div>
			<input	type="text" name="{{{ data.name }}}" class="hidden-input image-position-input" value="{{{data.value}}}">
		</div>

	<# if( data.separator != "" && data.separator == "full" ) { #>
		<hr class="karma-full-separator">
	<#}else if( data.separator != "" && data.separator == "container" ){ #>
		<hr class="karma-container-separator">
	<# } #>
</div>