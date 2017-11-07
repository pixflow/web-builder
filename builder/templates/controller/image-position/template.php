<div class='karma-image-position-container'>
	<# if( data.label != "" ) { #>
		<div class="karma-all-controller-title">{{{data.label}}}</div>
		<# } #>

			<div class="karma-image-position-container">
				<div class="karma-image-position-content">
					<div class="karma-image-position-box karma-image-position-top-left-dot">
						<div class="karma-image-position-dot "></div>
					</div>
					<div class="karma-image-position-box karma-image-position-center-dot">
						<div class="karma-image-position-dot"></div>
					</div>
					<div class="karma-image-position-box karma-image-position-top-right-dot">
						<div class="karma-image-position-dot "></div>
					</div>
					<div class="karma-image-position-box karma-image-position-center-dot">
						<div class="karma-image-position-dot"></div>
					</div>
					<div class="karma-image-position-box karma-image-position-center-dot karma-image-position-selected-item">
						<div class="karma-image-position-dot"></div>
					</div>
					<div class="karma-image-position-box karma-image-position-center-dot">
						<div class="karma-image-position-dot"></div>
					</div>
					<div class="karma-image-position-box karma-image-position-bottom-left-dot">
						<div class="karma-image-position-dot "></div>
					</div>
					<div class="karma-image-position-box karma-image-position-center-dot">
						<div class="karma-image-position-dot"></div>
					</div>
					<div class="karma-image-position-box karma-image-position-bottom-right-dot">
						<div class="karma-image-position-dot "></div>
					</div>
				</div>
			</div>

			<# if( data.separator != "" && data.separator == "full" ) { #>
				<hr class="karma-full-separator">
				<#}else if(data.separator != "" && data.separator == "container" ){ #>
					<hr class="karma-container-separator">
					<# } #>
</div>