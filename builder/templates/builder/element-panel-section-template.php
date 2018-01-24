<div class="element-panel-section-container element-panel-section element-panel-deactive-part" >

	<div class="deactivate-title"><?php _e( 'COMING SOON...!', 'karma' ) ?></div>

	<div class="karma-add-element-inactive-container" >
	<?php
		$images = [ 123, 115, 89, 110, 110, 110, 110, 110, 114, 103 ];
		for ( $i = 0; $i < 10 ; $i++ ){
	    $imageUrl =  KARMA_BUILDER_URL . 'builder/media/deactive/section' . ( $i + 1 ) . '.jpg'; ?>

		<div class="karma-section-element" style="height: <?php echo $images[ $i ] ?>px; width: 240px;" >
			<img class="karma-section-image" width="240" height="<?php echo $images[ $i ]; ?>" src="<?php echo $imageUrl; ?>">
		</div>

	<?php } ?>
	</div>

</div>
