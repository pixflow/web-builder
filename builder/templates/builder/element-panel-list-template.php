<div class="element-panel-section-container karma-element-panel-list karma-active-tab" >
	<# print( KarmaView.getWpTemplate( 'karma-element-panel-top-header' ) ); var i=0; #>
		<div class="karma-elements karma-isotope" >
			<# _.each( data.elementInfo, function( element ){
					i++;
					if( false !== element.showInList ){
					#>
						<div class="karma-element-single-element" data-id="creative{{++i}}" data-category="<# print( element.category.join(',') ); #>" data-element-name="{{ element.elementName }}" >
							<div class="karma-element-single-element-icon">
								<# print( element.icon ); #>
							</div>
							<div class="karma-element-single-element-name" >
							<span>
								<# print( element.elementName.replace( 'karma', '', element.elementName ) ); #>
							</span>
							</div>
						</div>
				<div class="karma-element-single-element" data-id="shop{{++i}}" data-category="<# print( element.category.join(',') ); #>" data-element-name="{{ element.elementName }}" >
					<div class="karma-element-single-element-icon">
						<# print( element.icon ); #>
					</div>
					<div class="karma-element-single-element-name" >
							<span>
								<# print( element.elementName.replace( 'karma', '', element.elementName ) ); #>
							</span>
					</div>
				</div>
				<div class="karma-element-single-element" data-id="creative{{++i}}" data-category="<# print( element.category.join(',') ); #>" data-element-name="{{ element.elementName }}" >
					<div class="karma-element-single-element-icon">
						<# print( element.icon ); #>
					</div>
					<div class="karma-element-single-element-name" >
							<span>
								<# print( element.elementName.replace( 'karma', '', element.elementName ) ); #>
							</span>
					</div>
				</div>
				<div class="karma-element-single-element" data-id="portfolio{{++i}}" data-category="<# print( element.category.join(',') ); #>" data-element-name="{{ element.elementName }}" >
					<div class="karma-element-single-element-icon">
						<# print( element.icon ); #>
					</div>
					<div class="karma-element-single-element-name" >
							<span>
								<# print( element.elementName.replace( 'karma', '', element.elementName ) ); #>
							</span>
					</div>
				</div>
				<div class="karma-element-single-element" data-id="agency{{++i}}" data-category="<# print( element.category.join(',') ); #>" data-element-name="{{ element.elementName }}" >
					<div class="karma-element-single-element-icon">
						<# print( element.icon ); #>
					</div>
					<div class="karma-element-single-element-name" >
							<span>
								<# print( element.elementName.replace( 'karma', '', element.elementName ) ); #>
							</span>
					</div>
				</div>
					<# } #>
			<# }); #>

		</div>
</div>