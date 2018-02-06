<?php
use KarmaBuilder\Helper\Karma_Helper_Utility as Karma_Helper_Utility;
?>

<div class="karma-switch-panel-container">
	<button class="karma-switch-panel-button" type="button" data-action="{{ data.action }}" data-form="{{ data.form }}" >
		<# if ( "yes" == data.shape ) { #>
			<div class="karma-oval-button-icon"><?php print Karma_Helper_Utility::karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/back_icon.svg' ); ?></div>
		<#	} #>
		<p>{{ data.label }}</p>
	</button>
	<#	if ( true == data.formBuilder ){ #>
			<div id="new-form-builder-panel" data-height="{{ data.height }}">
			<# print( data.view.formBuilderContentHtml( data.form ) ); #>
			</div>
	<#	} #>
</div>