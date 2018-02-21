<?php
/** Create the validate url for loading iframe */
$page_url = KarmaBuilder\Karma_Builder::get_current_page_url() ;
$page_url .= ( false === strpos( $page_url, '?' ) ) ? '?in_builder=true' : '&in_builder=true' ;
?>
<div class="karma-builder-iframe-container ">
	<div class="karma-builder-responsive-frame">
		<div class="karma-builder-responsive-frame-shape">
			<div class="karma-builder-responsive-frame-shape-circle"></div>
			<div class="karma-builder-responsive-frame-shape-line"></div>
		</div>
		<iframe width="100%" height="1080px" src="<?php echo  $page_url; ?>" id="karma-builder-iframe" ></iframe>
	</div>
</div>

