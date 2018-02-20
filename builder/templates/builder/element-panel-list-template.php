<div class="element-panel-section-container karma-element-panel-list" >
	<# print( karmaBuilderEnviroment.getIframe().KarmaView.getWpTemplate( 'karma-element-panel-top-header', {}, 1 ) ); var i=0; #>
		<div class="karma-elements karma-isotope" >
			<# _.each( data.elementInfo, function( element ){
					i++;
					if( false !== element.showInList ){
					#>
						<div class="karma-element-single-element" data-id="creative{{++i}} free{{++i}}"  data-category="<# print( element.category.join(',') ); #>" data-element-name="{{ element.elementName }}" >
							<div class="karma-element-single-element-icon" style="background-image: url( <# print( element.icon ); #> );"></div>
							<div class="karma-element-single-element-name" >
							<span>
								<#   var elementName = element.elementName.replace( 'karma_', '', element.elementName ) ;
										print( elementName.replace( /_/g,' ' ) ) #>
							</span>
							</div>
						</div>

					<# } #>
			<# }); #>

				<div class="karma-element-single-element karma-deactive-element" data-id="shop32 premium30" data-category="icon" data-element-name="Icon" >
					<div class="karma-element-single-element-icon" style="background-image: url( <?php echo KARMA_BUILDER_URL . 'builder/media/svg/icon-element.svg' ?> );"></div>
					<div class="karma-element-single-element-name" >
							<span>
								Icon box
							</span>
					</div>
				</div>
				<div class="karma-element-single-element karma-deactive-element" data-id="agency23 premium20" data-category="team" data-element-name="Team" >
					<div class="karma-element-single-element-icon" style="background-image: url( <?php echo KARMA_BUILDER_URL . 'builder/media/svg/team-element.svg' ?> );"></div>
					<div class="karma-element-single-element-name" >
							<span>
								Team
							</span>
					</div>
				</div>
				<div class="karma-element-single-element karma-deactive-element" data-id="creative56 free50" data-category="skill" data-element-name="skill" >
					<div class="karma-element-single-element-icon" style="background-image: url( <?php echo KARMA_BUILDER_URL . 'builder/media/svg/skill-element.svg' ?> );"></div>
					<div class="karma-element-single-element-name" >
							<span>
								Skill
							</span>
					</div>
				</div>
				<div class="karma-element-single-element karma-deactive-element" data-id="agency54 free51" data-category="counter box" data-element-name="counter box" >
					<div class="karma-element-single-element-icon" style="background-image: url( <?php echo KARMA_BUILDER_URL . 'builder/media/svg/count-element.svg' ?> );"></div>
					<div class="karma-element-single-element-name" >
							<span>
								Count box
							</span>
					</div>
				</div>
				<div class="karma-element-single-element karma-deactive-element" data-id="creative73 free50" data-category="button" data-element-name="button" >
					<div class="karma-element-single-element-icon" style="background-image: url( <?php echo KARMA_BUILDER_URL . 'builder/media/svg/button-element.svg' ?> );"></div>
					<div class="karma-element-single-element-name" >
							<span>
								Button
							</span>
					</div>
				</div>
				<div class="karma-element-single-element karma-deactive-element" data-id="creative13 free50" data-category="music" data-element-name="music" >
					<div class="karma-element-single-element-icon" style="background-image: url( <?php echo KARMA_BUILDER_URL . 'builder/media/svg/music-element.svg' ?> );"></div>
					<div class="karma-element-single-element-name" >
							<span>
								Music
							</span>
					</div>
				</div>
				<div class="karma-element-single-element karma-deactive-element" data-id="agency22 free50" data-category="testimonial" data-element-name="testimonial" >
					<div class="karma-element-single-element-icon" style="background-image: url( <?php echo KARMA_BUILDER_URL . 'builder/media/svg/testimonial-element.svg' ?> );"></div>
					<div class="karma-element-single-element-name" >
							<span>
								Testimonial
							</span>
					</div>
				</div>
				<div class="karma-element-single-element karma-deactive-element" data-id="shop17 free50" data-category="image slide" data-element-name="image slide" >
					<div class="karma-element-single-element-icon" style="background-image: url( <?php echo KARMA_BUILDER_URL . 'builder/media/svg/image-slide-element.svg' ?> );"></div>
					<div class="karma-element-single-element-name" >
							<span>
								Image slide
							</span>
					</div>
				</div>
				<div class="karma-element-single-element karma-deactive-element" data-id="creative64 free50" data-category="slider" data-element-name="slider" >
					<div class="karma-element-single-element-icon" style="background-image: url( <?php echo KARMA_BUILDER_URL . 'builder/media/svg/slider-element.svg' ?> );"></div>
					<div class="karma-element-single-element-name" >
							<span>
								Slider
							</span>
					</div>
				</div>
				<div class="karma-element-single-element karma-deactive-element" data-id="shop9 free50" data-category="team 2" data-element-name="team 2" >
					<div class="karma-element-single-element-icon" style="background-image: url( <?php echo KARMA_BUILDER_URL . 'builder/media/svg/team-2-element.svg' ?> );"></div>
					<div class="karma-element-single-element-name" >
							<span>
								Team 2
							</span>
					</div>
				</div>
				<div class="karma-element-single-element karma-deactive-element" data-id="shop11 free50" data-category="price" data-element-name="price" >
					<div class="karma-element-single-element-icon" style="background-image: url( <?php echo KARMA_BUILDER_URL . 'builder/media/svg/price-element.svg' ?> );"></div>
					<div class="karma-element-single-element-name" >
							<span>
								Price
							</span>
					</div>
				</div>
				<div class="karma-element-single-element karma-deactive-element" data-id="portfolio56 free50" data-category="portfolio" data-element-name="portfolio" >
					<div class="karma-element-single-element-icon" style="background-image: url( <?php echo KARMA_BUILDER_URL . 'builder/media/svg/portfolio-element.svg' ?> );"></div>
					<div class="karma-element-single-element-name" >
							<span>
								Portfolio
							</span>
					</div>
				</div>
				<span class="karma-not-found karma-hide">Element not found</span>

		</div>
</div>