<div>
	<div class="element-panel-button element-panel-add-element-button" data-open-panel="karma-element-panel-add-element-view">
		<?php print karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/element-panel-1.svg' ); ?>
	</div>
	<div class="karma-element-panel-view
	karma-element-panel-add-element-view" data-active-tab = 'karma-element-panel-list' >
		<div class="karma-element-panel-add-element-view-left">
			<div class="karma-element-panel-add-element-view-content">
                <# print( KarmaView.getWpTemplate( 'karma-element-panel-category-filter' , data.leftParam ) ); #>
            </div>
			<div class="karma-element-panel-add-element-view-content-border"></div>
			<div class="karma-element-panel-add-element-view-filtering">
				<# print( KarmaView.getWpTemplate( 'karma-element-panel-price-filter' ) ); #>
			</div>
		</div>
		<div class="karma-element-panel-add-element-view-right">

			<#	var childTemplates = {
					'karma-element-panel-section'	: {},
					'karma-element-panel-header'	: {},
					'karma-element-panel-footer'	: {},
					'karma-element-panel-shop'		: {},
					'karma-element-panel-image'		: {},
					'karma-element-panel-permium'	: {},
					'karma-element-panel-list' 		: { elementInfo : data.elementInfo },

				} #>
			<# _.each( childTemplates, function( templateParams, templateName ){  #>
				<# print( KarmaView.getWpTemplate( templateName, templateParams ) ); #>
			<# });  #>
		</div>
	</div>

</div>