<div class="element-panel-section-container element-panel-shop element-panel-deactive-part" >
	<div class="deactivate-title"><?php _e( 'COMING SOON...!', 'karma' ) ?></div>
	<div class="karma-add-element-inactive-container">

	<?php
		$images = [137,92,112,126,92,118,112,];

	for ( $i = 0; $i < 7 ; $i++ ){

		$imageUrl =  KARMA_BUILDER_URL . 'builder/media/deactive/shop' . ( $i + 1 ) . '.jpg'; ?>
		<div class="karma-section-element" style="height: <?php echo $images[ $i ] ?>px; width: 235px;" >
			<img width="235" height="<?php echo $images[ $i ]; ?>" class="karma-section-image" src="<?php echo $imageUrl; ?>">
		</div>

	<?php } ?>
	</div>
</div>
