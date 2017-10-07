<div class="karma-top-nav"  >
</div>
<?php

 /** Create the validate url for loading iframe */
 $page_url = Pixity_Builder::get_current_page_url() ;
 $page_url .= ( false === strpos( $page_url, '?' ) ) ? '?in_builder=true' : '&in_builder=true' ;

 ?>
<iframe src="<?php echo  $page_url; ?>" ></iframe>