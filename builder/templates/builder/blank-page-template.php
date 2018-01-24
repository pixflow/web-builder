<div class="karma-blank-page-container">
	<div class="karma-blank-page-simple-layout">
		<div class="karma-blank-page-title"><?php echo esc_attr__( "Simple Layouts", 'karma' );?></div>
		<div class="karma-blank-page-description"><?php echo esc_attr__( "Choose your layout and start making your first section right now!", 'karma' );?></div>
		<div>
		<?php require (KARMA_BUILDER_DIR . 'builder/templates/builder/new-section-template.php'); ?>
		</div>
	</div>
	<div class="karma-blank-page-section">
		<div class="karma-blank-page-title"><?php echo esc_attr__( "Pre-Build Sections", 'karma' );?></div>
		<div class="karma-blank-page-description" ><?php echo esc_attr__( "Click the plus button on left and choose from tons of pre-build sections.", 'karma' );?></div>
		<div class="karma-blank-page-section-link"><a><?php echo esc_attr__( "+ Choose Sections", 'karma' );?></a></div>
		<div class="karma-blank-page-section-image"><img src="<?php  echo KARMA_BUILDER_URL . 'builder/media/blank-page-section_image.png' ; ?>" </div>
	</div>
</div>
