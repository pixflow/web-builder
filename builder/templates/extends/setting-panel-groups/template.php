
<div class="karma-setting-panel-group-container">
	<button class="karma-setting-panel-group-button">
		<p>{{ data.title }}</p>
		<div class="karma-group-button-shape">
			<svg width="12px" height="6px" viewBox="0 0 12 6" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
				<!-- Generator: Sketch 46 (44423) - http://www.bohemiancoding.com/sketch -->
				<title>Path 2 Copy 9</title>
				<desc>Created with Sketch.</desc>
				<defs></defs>
				<g id="all-Setting-pannel--style-guide" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
					<g id="advanced-option-arrow" transform="translate(-2725.000000, -776.000000)" stroke-width="2" stroke="rgba(57,73,89,0.5)">
						<g id="Group-19" transform="translate(2715.000000, 762.000000)">
							<polyline id="Path-2-Copy-9" points="11 15 16 19 21 15"></polyline>
						</g>
					</g>
				</g>
			</svg>
		</div>
	</button>
	<div class="karma-group-panel">
		<# _.each( data.items, function( field ){ #>
			{{{ field }}}
		<# } ); #>

	</div>
</div>