<?php
use KarmaBuilder\Helper\Karma_Helper_Utility as Karma_Helper_Utility;
?>

<div class="karma-builder-element-panel-header">
	<input id="karma-search-field" type="search" class="karma-builder-search-text" placeholder="Search...">
	<button class="karma-search-close-icon" >
		<?php print Karma_Helper_Utility::karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/close-icon.svg' ); ?>
	</button>
	<div class="karma-builder-element-panel-gather-menu ">
		<?php print Karma_Helper_Utility::karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/gather-menu.svg' ); ?>
		<ul class="karma-remove-list-margin">
			<li class="active karma-dropdown-option karma-selected-dropdown-option" data-id="*"><span class="karma-dropdown-option-title"><?php echo esc_attr__("All Categories", 'karma');?></span></li>
			<li class="karma-dropdown-option" data-id="agency"><span class="karma-dropdown-option-title"><?php echo esc_attr__("Agency", 'karma');?></span></li>
			<li class="karma-dropdown-option" data-id="portfolio"><span class="karma-dropdown-option-title"><?php echo esc_attr__("Portfolio", 'karma');?></span></li>
			<li class="karma-dropdown-option" data-id="creative"><span class="karma-dropdown-option-title"><?php echo esc_attr__("Creative", 'karma');?></span></li>
			<li class="karma-dropdown-option" data-id="shop"><span class="karma-dropdown-option-title"><?php echo esc_attr__("Shop", 'karma');?></span></li>
		</ul>
	</div>
</div>
