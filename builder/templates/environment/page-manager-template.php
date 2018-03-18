<?php
use KarmaBuilder\PageManager\Karma_Page_Manager as Karma_Page_Manager;
use KarmaBuilder\Helper\Karma_Helper_Utility as Karma_Helper_Utility;

// Get the list of templates
$page_manager = Karma_Page_Manager::get_instance();
$templates    = $page_manager->templates_list();
?>
<div class="karma-page-manager">
	<div class="karma-templates-container">
		<div class="karma-premade-page-template karma-blank-page-template" >
			<div class="karma-page-screenshot-container">
			</div>
			<div class="karma-template-description-container karma-blank-template">
				<p class="karma-page-template-title" ><?php echo esc_attr( 'Blank Page', 'karma' ); ?></p>
			</div>
		</div>
		<?php foreach ( $templates as $key => $template ): ?>
			<div class="karma-premade-page-template">
				<div class="karma-page-screenshot-container" style="background-image: url(http://pixflow.net/products/karma/templates-api/images/<?php echo esc_attr( $key ); ?>.png);">
					<div class="karma-screenshot-overlay">
						<a class="karma-create-page-button" data-url="<?php echo esc_url( $template[ 'url' ] ) ?>" data-id="<?php echo esc_attr( $key ) ?>"><?php echo esc_attr( 'Create', 'karma' ); ?></a>
					</div>
				</div>
				<div class="karma-template-description-container">
					<p class="karma-page-template-title" ><?php echo esc_attr( $template[ 'title' ] ); ?></p>
					<div class="karma-page-lock"><?php echo Karma_Helper_Utility::karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/lock.svg' ) ?></div>
				</div>
			</div>


		<?php endforeach; ?>
	</div>
</div>
