<div class="karma-builder-element-panel-header">
	<input id="karma-search-field" type="search" class="karma-builder-search-text" placeholder="Search...">
	<button class="karma-search-close-icon" >
		<?php print karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/close-icon.svg' ); ?>
	</button>
	<div class="karma-builder-element-panel-gather-menu ">
		<?php print karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/gather-menu.svg' ); ?>
		<ul>
			<li class="active" data-id="*"><?php echo esc_attr__("All Categories", 'karma');?></li>
			<li data-id="agency"><?php echo esc_attr__("Agency", 'karma');?></li>
			<li data-id="portfolio"><?php echo esc_attr__("Portfolio", 'karma');?></li>
			<li data-id="creative"><?php echo esc_attr__("Creative", 'karma');?></li>
			<li data-id="shop"><?php echo esc_attr__("Shop", 'karma');?></li>
		</ul>
	</div>
</div>
