<?php
use KarmaBuilder\Helper\Karma_Helper_Utility as Karma_Helper_Utility;
?>

<div class="karma-panel-templates-container">
	<div class="element-panel-button" data-open-panel="karma-element-panel-templates-template">
		<?php print Karma_Helper_Utility::karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/element-panel-2.svg' ); ?>
	</div>

	<div class="karma-element-panel-view karma-element-panel-templates-template karma-deactive-element-panel"  >
		<div class="element-panel-section-container element-panel-permium" >
			<div class="element-panel-part-img"> <img  src="<?php  echo KARMA_BUILDER_URL . 'builder/media/responsive_panel.jpg' ; ?>"></div>
			<div class="element-panel-part-title"><?php echo esc_attr__( "Responsive Editor", 'karma' );?></div>
			<span><?php echo esc_attr__( "coming soon", 'karma' ); ?></span>
			<div class="element-panel-part-description"><?php echo esc_attr__( "Now you can easily make your website responsive. Switch between different device views and adjust your design for each device independently.", 'karma' ) ;?> </div>
		</div>

</div>