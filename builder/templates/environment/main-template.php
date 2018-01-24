<?php

 /** Create the validate url for loading iframe */
 $page_url = Karma_Builder::get_current_page_url() ;
 $page_url .= ( false === strpos( $page_url, '?' ) ) ? '?in_builder=true' : '&in_builder=true' ;
?>
<iframe width="100%" height="1080px" src="<?php echo  $page_url; ?>" id="karma-builder-iframe" ></iframe>