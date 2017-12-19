<div class="karma-builder-addcontent">
    <div class="karma-builder-addcontent-title"><?php echo esc_attr__("Add Content", 'Karma'); ?></div>
    <ul>
        <li title="Elements" class="karma-addcontent karma-addcontent-active karma-tooltip" data-tab="karma-element-panel-list" >
            <div class="karma-addcontent-icon">
                <?php print karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/add-panel-elements.svg' ); ?>
            </div>
            <div class="karma-addcontent-name"><?php echo esc_attr__("Elements", 'Karma'); ?></div
        </li>

        <li class="karma-addcontent" data-tab="element-panel-image">
            <div class="karma-addcontent-icon">
                <?php print karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/add-panel-photos.svg' ); ?>
            </div>
            <div class="karma-addcontent-name"><?php echo esc_attr__("Photos", 'Karma'); ?></div>
        </li>


        <li class="karma-addcontent karma-addcontent-disable" data-tab="element-panel-section">
			<div class="karma-addcontent-icon">
				<?php print karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/add-panel-sections.svg' ); ?>
			</div>
			<div class="karma-addcontent-name"><?php echo esc_attr__("Sections", 'Karma'); ?></div>
        </li>

        <li class="karma-addcontent karma-addcontent-disable" data-tab="element-panel-header">
            <div class="karma-addcontent-icon">
                <?php print karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/add-panel-header.svg' ); ?>
            </div>
            <div class="karma-addcontent-name"><?php echo esc_attr__("Header", 'Karma'); ?></div>
        </li>

        <li class="karma-addcontent karma-addcontent-disable" data-tab="element-panel-footer">
            <div class="karma-addcontent-icon">
                <?php print karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/add-panel-footer.svg' ); ?>
            </div>
            <div class="karma-addcontent-name"><?php echo esc_attr__("Footer", 'Karma'); ?></div>
        </li>

        <li class="karma-addcontent karma-addcontent-disable" data-tab="element-panel-shop">
            <div class="karma-addcontent-icon">
                <?php print karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/add-panel-shop.svg' ); ?>
            </div>
            <div class="karma-addcontent-name"><?php echo esc_attr__("Shop", 'Karma'); ?></div>
        </li>
    </ul>
</div>
