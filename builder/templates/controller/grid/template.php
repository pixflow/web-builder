<div class="karma-grid-controller">
	<div class="grid-controller-template">
		<div class="karma-add-column-view">
			<div class="karma-add-column-view-border karma-row karma-no-gutters">
				<# for( var i=0; i < data.value; i++ ){ #>
					<div class="karma-add-column-view-length"></div>
				<# } #>
				<div class="karma-add-column-view-length karma-add-column-view-add"></div>
			</div>
		</div>

		<div class="karma-add-column-button">
			<button type="button" > <span> + </span> New Column </button>
		</div>
	</div>
</div>
