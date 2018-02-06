<?php
use KarmaBuilder\Helper\Karma_Helper_Utility as Karma_Helper_Utility;
?>

<div class="karma-unsplash karma-unsplash-controller" >
	<div class="karma-unsplash-search" >
		<input type="search" id="karma-unsplash-search"  class="no-trigger" placeholder="Search over 300,000 free photos of Unsplash" required >
	</div>
	<div class="karma-unsplash-images-result-fake"></div>
	<div class="karma-unsplash-images-result" >
		<?php for( $i=0; $i < 30; $i++ ){ ?>
			<div class="karma-unsplash-images-list"></div>
		<?php } ?>
	</div>

	<div class="karma-change-loading-icon karma-unspalsh-icon" ></div>
	<a class="karma-unspalsh-media-library">

		<span class="karma-unsplash-media-library-svg"><?php print Karma_Helper_Utility::karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/upload.svg' ); ?></span>
		<span class="karma-unsplash-media-library-link"><?php _e( 'Or upload from media library', 'karma' ); ?></span>
	</a>
	<# if( data.name ){ #>
		<input	type="text" name="{{{ data.name }}}" class="hidden-input karma-unsplash-image-input" value="{{{data.value}}}">
	<# } #>
	<div class="karma-unsplash-copyright">&copy;  <a href="https://unsplash.com/" target="_blank" rel="nofollow" >Unsplash.com</a> all rights reserved. </div>
</div>