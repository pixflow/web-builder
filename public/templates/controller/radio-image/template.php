
<div class="karma-radio-image-controller">
	<div class="radio-image-controller-template">
		<# for( var i in data.field ) { #>
			<div class="radio-image-controller-img" data-value="{{ data.field[i].value }}">
				<svg width="45px" height="30px" viewBox="0 0 45 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
					<title>Group 19 Copy</title>
					<desc>Created with Sketch.</desc>
					<defs></defs>
					<g id="Setting-pannel" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" fill-opacity="0.2">
						<g id="Column-setting-panel" transform="translate(-633.000000, -491.000000)" fill="#419CF8">
							<g id="Group-19-Copy" transform="translate(633.000000, 491.000000)">
								<rect id="Rectangle-19-Copy-11" x="24.3" y="0" width="20.7" height="30" rx="2"></rect>
								<rect id="Rectangle-19-Copy-12" x="0" y="0" width="20.7" height="30" rx="2"></rect>
							</g>
						</g>
					</g>
				</svg>
			</div>
		<# } #>
		<input	type="text" name="{{{ data.name }}}" class="hidden-input" value="">
	</div>
</div>