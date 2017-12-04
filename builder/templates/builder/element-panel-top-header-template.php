<div class="karma-builder-element-panel-header">
	<input type="search" class="karma-builder-search-text" placeholder="Search...">

	<div class="karma-builder-element-panel-gather-menu">
		<?php print karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/gather-menu.svg' ); ?>
		<ul>
			<li data-filter="all"><?php echo esc_attr__("All Categories", 'karma');?></li>
			<li data-filter="agency"><?php echo esc_attr__("Agency", 'karma');?></li>
			<li data-filter="portfolio"><?php echo esc_attr__("Portfolio", 'karma');?></li>
			<li data-filter="creative"><?php echo esc_attr__("Creative", 'karma');?></li>
			<li data-filter="shop"><?php echo esc_attr__("Shop", 'karma');?></li>
		</ul>
	</div>
</div>
