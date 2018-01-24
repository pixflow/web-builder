<div class="element-panel-section-container element-panel-header element-panel-deactive-part" >
	<div class="deactivate-title"><?php _e( 'COMING SOON...!', 'karma' ) ?></div>
	<div class="karma-add-element-inactive-container">
	<?php
	for ( $i = 0; $i < 4 ; $i++ ):
		$imageUrl =  KARMA_BUILDER_URL . 'builder/media/deactive/header' . ( $i + 1 ) . '.jpg';
		?>
		<div class="karma-section-element" style="height: 44px; width: 240px;" >
			<img class="karma-section-image" width="240" height="44" src="<?php echo $imageUrl; ?>">
		</div>

	<?php endfor; ?>
	</div>
</div>
