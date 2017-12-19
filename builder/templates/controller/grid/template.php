<div class="karma-grid-controller">
	<div class="grid-controller-template" data-current-grid="{{ data.value }}">
		<div class="karma-add-column-view">
			<div class="karma-add-column-view-border karma-row karma-no-gutters">
				<# for( var i=0; i < data.value; i++ ){ #>
					<div class="karma-add-column-view-length"></div>
				<# } #>

						<div class="karma-add-column-view-length karma-add-column-view-add" <# if( 6 == data.value ) { print('style="display:none"'); } #> ></div>

			</div>
		</div>

		<div class="karma-add-column-button">
			<button type="button" >
				<span class="karma-plus">
					<svg width="8px" height="8px" viewBox="0 0 8 8" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
					<g id="columnplus-Setting-pannel" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
						<g id="columnplus-background-pannel1" transform="translate(-1328.000000, -883.000000)" fill="#419CF8">
							<g id="columnplus-Group-36-Copy" transform="translate(1328.000000, 883.000000)">
								<rect id="columnplus-Rectangle" x="3" y="0" width="2" height="8" rx="1"></rect>
								<rect id="columnplus-Rectangle-Copy-25" transform="translate(4.000000, 4.000000) rotate(-270.000000) translate(-4.000000, -4.000000) " x="3" y="0" width="2" height="8" rx="1"></rect>
							</g>
						</g>
					</g>
				</svg>
				</span>
				New Column
			</button>
		</div>
	</div>
</div>
