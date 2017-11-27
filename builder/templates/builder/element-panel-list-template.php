<# print( KarmaView.getWpTemplate( 'karma-element-panel-top-header' ) ); #>
<div class="karma-element-panel-list" >
	<# _.each( data.elementInfo, function( element ){
		if( false !== element.showInList ){
		#>
		<div class="karma-element-single-element" >
			<div class="karma-element-single-element-icon">
				<# print( element.icon ); #>
			</div>
			<div class="karma-element-single-element-name" >
				<span>
					<# print( element.elementName.replace( 'karma_', '', element.elementName ) ); #>
				</span>
			</div>
		</div>
		<# }
		}); #>
</div>