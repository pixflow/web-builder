<?php


class Karma_Typography{

	public static function check_typography_page(){

		if( isset( $_GET['builder-page'] ) &&  'karma-typography-page' === $_GET['builder-page'] ){
			return true ;
		}

		return false;

	}


	public function load_page_templates(){

		$builder_views = Karma_Factory_Pattern::$builder_views;
		$builder_views->load_typography_environment();

	}

}