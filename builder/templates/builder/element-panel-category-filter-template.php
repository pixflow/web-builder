<?php
use KarmaBuilder\Helper\Karma_Helper_Utility as Karma_Helper_Utility ;
?>

<div class="karma-builder-addcontent">
    <div class="karma-builder-addcontent-title"><?php echo esc_attr__("Add Content", 'Karma'); ?></div>
    <ul class="karma-remove-list-margin">

		<li class="karma-addcontent karma-addcontent-disable karma-addcontent-active " data-tab="element-panel-section">
			<div title="Sections" class="karma-addcontent-icon karma-tooltip">
			    <?php print Karma_Helper_Utility::karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/add-panel-sections.svg' ); ?>
			</div>
			<div class="karma-addcontent-name"><?php echo esc_attr__("Blocks", 'Karma'); ?></div>
		</li>

        <li class="karma-addcontent " data-tab="karma-element-panel-list" >
            <div title="Elements" class="karma-addcontent-icon karma-tooltip">
                <?php print Karma_Helper_Utility::karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/add-panel-elements.svg' ); ?>
            </div>
            <div class="karma-addcontent-name"><?php echo esc_attr__("Elements", 'Karma'); ?></div
        </li>

        <li class="karma-addcontent" data-tab="element-panel-image">
            <div title="Photos" class="karma-addcontent-icon karma-tooltip">
                <?php print Karma_Helper_Utility::karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/add-panel-photos.svg' ); ?>
            </div>
            <div class="karma-addcontent-name"><?php echo esc_attr__("Photos", 'Karma'); ?></div>
        </li>

        <li class="karma-addcontent karma-addcontent-disable" data-tab="element-panel-header">
            <div title="Header" class="karma-addcontent-icon karma-tooltip">
                <?php print Karma_Helper_Utility::karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/add-panel-header.svg' ); ?>
            </div>
            <div class="karma-addcontent-name"><?php echo esc_attr__("Header", 'Karma'); ?></div>
        </li>

        <li class="karma-addcontent karma-addcontent-disable" data-tab="element-panel-footer">
            <div title="Footer" class="karma-addcontent-icon karma-tooltip">
                <?php print Karma_Helper_Utility::karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/add-panel-footer.svg' ); ?>
            </div>
            <div class="karma-addcontent-name"><?php echo esc_attr__("Footer", 'Karma'); ?></div>
        </li>

        <li class="karma-addcontent karma-addcontent-disable" data-tab="element-panel-shop">
            <div title="Shop" class="karma-addcontent-icon karma-tooltip">
                <?php print Karma_Helper_Utility::karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/add-panel-shop.svg' ); ?>
            </div>
            <div class="karma-addcontent-name"><?php echo esc_attr__("Shop", 'Karma'); ?></div>
        </li>
    </ul>
</div>
