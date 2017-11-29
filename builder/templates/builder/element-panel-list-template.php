<div class="element-panel-section-container karma-element-panel-list karma-active-tab" >
	<# print( KarmaView.getWpTemplate( 'karma-element-panel-top-header' ) ); #>
		<div class="karma-elements" >
			<# _.each( data.elementInfo, function( element ){
		if( false !== element.showInList ){
		#>
		<div class="karma-element-single-element" data-category="<# print( element.category.join(',') ); #>" >
			<div class="karma-element-single-element-icon">
				<# print( element.icon ); #>
			</div>
			<div class="karma-element-single-element-name" >
				<span>
					<# print( element.elementName.replace( 'karma_', '', element.elementName ) ); #>
				</span>
			</div>
		</div>
		<# } #>
	<# }); #>
		</div>
</div>