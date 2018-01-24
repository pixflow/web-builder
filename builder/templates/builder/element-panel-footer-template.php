<div class="element-panel-section-container element-panel-footer element-panel-deactive-part" >

	<div class="deactivate-title"><?php _e( 'COMING SOON...!', 'karma' ) ?></div>

	<div class="karma-add-element-inactive-container">
	<?php for ( $i = 0; $i < 3 ; $i++ ){

		$imageUrl =  KARMA_BUILDER_URL . 'builder/media/deactive/footer' . ( $i + 1 ) . '.jpg'; ?>
		<div class="karma-section-element" style="height: 117px; width: 240px;" >
			<img class="karma-section-image" width="240" height="117" src="<?php echo $imageUrl; ?>">
		</div>

	<?php } ?>
	</div>

</div>
