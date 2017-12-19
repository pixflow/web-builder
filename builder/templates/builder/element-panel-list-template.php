<div class="element-panel-section-container karma-element-panel-list karma-active-tab" >
	<# print( KarmaView.getWpTemplate( 'karma-element-panel-top-header' ) ); var i=0; #>
		<div class="karma-elements karma-isotope" >
			<# _.each( data.elementInfo, function( element ){
					i++;
					if( false !== element.showInList ){
					#>
						<div class="karma-element-single-element" data-id="creative{{++i}}" data-category="<# print( element.category.join(',') ); #>" data-element-name="{{ element.elementName }}" >
							<div class="karma-element-single-element-icon" style="background-image: url( <# print( element.icon ); #> );"></div>
							<div class="karma-element-single-element-name" >
							<span>
								<# print( element.elementName.replace( 'karma_', '', element.elementName ) ); #>
							</span>
							</div>
						</div>

					<# } #>
			<# }); #>
				<div class="karma-element-single-element karma-deactive-element" data-id="agency23" data-category="team member" data-element-name="Team member" >
					<div class="karma-element-single-element-icon" style="background-image: url( <?php echo KARMA_BUILDER_URL . 'builder/media/svg/team-element.svg' ?> );"></div>
					<div class="karma-element-single-element-name" >
							<span>
								Team member
							</span>
					</div>
				</div>
				<div class="karma-element-single-element karma-deactive-element" data-id="shop32" data-category="icon" data-element-name="Icon" >
					<div class="karma-element-single-element-icon" style="background-image: url( <?php echo KARMA_BUILDER_URL . 'builder/media/svg/icon-box-element.svg' ?> );"></div>
					<div class="karma-element-single-element-name" >
							<span>
								Icon
							</span>
					</div>
				</div>
				<div class="karma-element-single-element karma-deactive-element" data-id="portfolio56" data-category="slider" data-element-name="slider" >
					<div class="karma-element-single-element-icon" style="background-image: url( <?php echo KARMA_BUILDER_URL . 'builder/media/svg/slider-element.svg' ?> );"></div>
					<div class="karma-element-single-element-name" >
							<span>
								Slider
							</span>
					</div>
				</div>
				<div class="karma-element-single-element karma-deactive-element" data-id="portfolio60" data-category="video" data-element-name="Video" >
					<div class="karma-element-single-element-icon" style="background-image: url( <?php echo KARMA_BUILDER_URL . 'builder/media/svg/video-element.svg' ?> );"></div>
					<div class="karma-element-single-element-name" >
							<span>
								Video
							</span>
					</div>
				</div>
				<span class="karma-not-found karma-hide">Element not found</span>

		</div>
</div>