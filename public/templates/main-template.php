
<div class="karma-top-nav" style="width: 100%;height: 50px;background:  purple;color:white;" >
This is just top nav :)
</div>
<?php

 /** Create the validate url for loading iframe */
 $page_url = Pixity_Builder::get_current_page_url() ;
 $page_url .= ( false === strpos( $page_url, '?' ) ) ? '?in_builder=true' : '&in_builder=true' ;

 ?>
<iframe width="100%" height="500px" src="<?php echo  $page_url; ?>" ></iframe>