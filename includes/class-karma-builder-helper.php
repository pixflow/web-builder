<?php
function karma_load_svg( $url ){

	  $response = wp_remote_get($url);
	 return $response['body'];

}