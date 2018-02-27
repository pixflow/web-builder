<?php
use KarmaBuilder\Helper\Karma_Helper_Utility as Karma_Helper_Utility;
?>

<div class="karma-element-panel-price-filter-container">
	<div class="karma-element-panel-price-filter-title"></div>
	<div class="karma-element-panel-price-filter">
		<ul class="karma-remove-list-margin">
			<li title="All Item"  class="karma-filter-item-all active karma-tooltip" data-filter="*">
				<label for="all-item"><?php echo esc_attr__( "All Item", 'karma' ); ?></label>
				<span  class="karma-filter-item karma-tooltip"  >
					<?php print Karma_Helper_Utility::karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/all-item-icon.svg' ); ?>
				</span>
				<div class="check"></div>
			</li>

			<li title="Free" class="karma-filter-item-free karma-tooltip" data-filter="free">
				<label for="free-item"><?php echo esc_attr__( "Free", 'karma' ); ?></label>
				<span   class="karma-filter-item" >
					<?php print Karma_Helper_Utility::karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/free-item-icon.svg' ); ?>
				</span>
				<div class="check"><div class="inside"></div></div>
			</li>

			<li title="Premium" class="karma-filter-item-premium karma-tooltip" data-filter="premium">
				<label for="premium-item"><?php echo esc_attr__( "Premium", 'karma' ); ?></label>
				<span  class="karma-filter-item" >
					<?php print Karma_Helper_Utility::karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/premium-item-icon.svg' ); ?>
				</span>
				<div class="check"><div class="inside"></div></div>
			</li>

			<li title="Section" class="karma-filter-item-mysection karma-deactive-filter karma-tooltip" data-filter="mysection">
				<label for="my-section-item"><?php echo esc_attr__( "My Section", 'karma' ); ?></label>
				<span  class="karma-filter-item karma-tooltip" >
					<?php print Karma_Helper_Utility::karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/section-item-icon.svg' ); ?>
				</span>
				<div class="check"><div class="inside"></div></div>
			</li>
		</ul>
	</div>


</div>
