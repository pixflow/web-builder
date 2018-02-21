<?php
use KarmaBuilder\Helper\Karma_Helper_Utility as Karma_Helper_Utility;
?>

<div>
	<div class="karma-panel-templates-container">
		<div class="element-panel-button element-panel-upgrade-element-button" data-open-panel="karma-element-panel-upgrade-template">
			<?php print Karma_Helper_Utility::karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/upgrade1.svg' ); ?>
		</div>

		<div class="karma-element-panel-view karma-element-panel-upgrade-template karma-deactive-element-panel"  >
			<div class="element-panel-section-container element-panel-permium" >
				<div class="element-panel-part-img"> <img  src="<?php  echo KARMA_BUILDER_URL . 'builder/media/premium_panel.jpg' ; ?>"></div>
				<div class="element-panel-part-title"><?php echo esc_attr__( "Upgrade to Premium", 'karma' );?></div>
				<span><?php echo esc_attr__( "Coming soon", 'karma' ); ?></span>
				<div class="element-panel-part-description">
					<ul class="checkmark">
						<li>Professional templates</li>
						<li>Tons of elements</li>
						<li>More premade sections</li>
						<li>E-Commerce website options & elements</li>
						<li>VIP support in no time</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</div>
