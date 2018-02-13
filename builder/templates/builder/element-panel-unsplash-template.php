<?php
use KarmaBuilder\Helper\Karma_Helper_Utility as Karma_Helper_Utility;
?>
<div>
	<div class="karma-panel-templates-container">
		<div class="element-panel-button" data-open-panel="karma-element-panel-unsplash-template">
			<?php print Karma_Helper_Utility::karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/element-panel-3.svg' ); ?>
		</div>

		<div class="karma-element-panel-view karma-element-panel-unsplash-template karma-deactive-element-panel"  >
			<div class="element-panel-section-container element-panel-permium" >
				<div class="element-panel-part-img"> <img  src="<?php  echo KARMA_BUILDER_URL . 'builder/media/unsplash_image.jpg' ; ?>"></div>
				<div class="element-panel-part-title"><?php echo esc_attr__( "Templates Library", 'karma' );?></div>
				<span><?php echo esc_attr__( "coming soon", 'karma' ); ?></span>
				<div class="element-panel-part-description"><?php echo esc_attr__( "Choose from beautifully crafted premade pages designed for a vast variety of websites. These pages are perfect for every industry and field.", 'karma' );?> </div>
			</div>
		</div>
	</div>
</div>


