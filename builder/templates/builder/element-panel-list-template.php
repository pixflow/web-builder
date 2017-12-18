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
								<# print( element.elementName.replace( 'karma', '', element.elementName ) ); #>
							</span>
							</div>
						</div>

					<# } #>
			<# }); #>
				<div class="karma-element-single-element karma-deactive-element" data-id="creative2" data-category="Team member" data-element-name="Team member" >
					<div class="karma-element-single-element-icon" style="background-image: url( <?php echo KARMA_BUILDER_URL . 'builder/media/svg/team-element.svg' ?> );"></div>
					<div class="karma-element-single-element-name" >
							<span>
								Team member
							</span>
					</div>
				</div>
				<div class="karma-element-single-element karma-deactive-element" data-id="creative3" data-category="Icon" data-element-name="Icon" >
					<div class="karma-element-single-element-icon" style="background-image: url( <?php echo KARMA_BUILDER_URL . 'builder/media/svg/icon-box-element.svg' ?> );"></div>
					<div class="karma-element-single-element-name" >
							<span>
								Icon
							</span>
					</div>
				</div>
				<div class="karma-element-single-element karma-deactive-element" data-id="creative4" data-category="slider" data-element-name="slider" >
					<div class="karma-element-single-element-icon" style="background-image: url( <?php echo KARMA_BUILDER_URL . 'builder/media/svg/slider-element.svg' ?> );"></div>
					<div class="karma-element-single-element-name" >
							<span>
								Slider
							</span>
					</div>
				</div>
				<div class="karma-element-single-element karma-deactive-element" data-id="creative5" data-category="Team member" data-element-name="Video" >
					<div class="karma-element-single-element-icon" style="background-image: url( <?php echo KARMA_BUILDER_URL . 'builder/media/svg/video-element.svg' ?> );"></div>
					<div class="karma-element-single-element-name" >
							<span>
								Video
							</span>
					</div>
				</div>

		</div>
</div>