<div class="karma-unsplash karma-unsplash-controller" >
	<div class="karma-unsplash-search" >
		<input type="search" id="karma-unsplash-search"  class="no-trigger" placeholder="Over 300,000 free photos of Unsplash" required >
	</div>
	<div class="karma-unsplash-images-result" >
		<div class="karma-unsplash-images-list"></div>
		<div class="karma-unsplash-images-list"></div>
		<div class="karma-unsplash-images-list"></div>
		<div class="karma-unsplash-images-list"></div>
		<div class="karma-unsplash-images-list"></div>
		<div class="karma-unsplash-images-list"></div>
		<div class="karma-unsplash-images-list"></div>
		<div class="karma-unsplash-images-list"></div>
		<div class="karma-unsplash-images-list"></div>
	</div>

	<div class="karma-unspalsh-icon" ></div>
	<a class="karma-unspalsh-media-library" href="#">
		<span class="karma-unsplash-media-library-svg"><?php print karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/upload.svg' ) ?></span>
		<span class="karma-unsplash-media-library-link"><?php _e('Or upload from media library','karma') ?></span>
	</a>
	<input	type="text" name="{{{ data.name }}}" class="hidden-input karma-unsplash-image-input" value="{{{data.value}}}">
</div>