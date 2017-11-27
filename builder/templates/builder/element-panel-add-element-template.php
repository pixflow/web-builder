<div>
	<div class="element-panel-button element-panel-add-element-button">
		<?php print karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/element-panel-1.svg' ); ?>
	</div>
	<div class="karma-element-panel-add-element-view">
		<div class="karma-element-panel-add-element-view-left">
			<div class="karma-element-panel-add-element-view-content">
                <# print( KarmaView.getWpTemplate( 'karma-category-filter' , data.leftParam ) ); #>
            </div>
			<div class="karma-element-panel-add-element-view-content-border"></div>
			<div class="karma-element-panel-add-element-view-filtering">
				<# print( KarmaView.getWpTemplate( 'karma-element-panel-price-filter', { elementInfo : data.elementInfo } ) ); #>
			</div>
		</div>
		<div class="karma-element-panel-add-element-view-right">
			<# print( KarmaView.getWpTemplate( 'karma-element-panel-list', { elementInfo : data.elementInfo } ) ); #>
		</div>
	</div>

</div>