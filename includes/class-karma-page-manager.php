<?php

namespace KarmaBuilder\PageManager;

/** Importing, Aliases, and Name Resolution */
use KarmaBuilder\FPD\Karma_Factory_Pattern as Karma_Factory_Pattern;
use KarmaBuilder\FileSystem\Karma_File_System as File_System;

/**
 * The file for management pages
 *
 * A class definition that includes base attributes and functions of a page manager
 *
 * @link       http://pixflow.net
 * @since      2.0
 *
 * @package    Karma_Builder
 * @subpackage Karma_Builder/includes
 */

/**
 * Karma Page Manager class.
 *
 * This includes base attributes and functions of a Typography class.
 *
 *
 * @since      2.0
 * @package    Karma_Builder
 * @subpackage Karma_Builder/includes
 * @author     Pixflow <info@pixflow.net>
 */
class Karma_Page_Manager {

	/**
	 * The URL Path of karma templates api
	 *
	 * @since    2.0
	 * @var      Karma_Page_Manager    KARMA_PAGE_MANAGER_API_URL  The URL Path of karma templates api.
	 */
	CONST KARMA_PAGE_MANAGER_API_URL = 'http://pixflow.net/products/karma/templates-api/' ;

	/**
	 * A static variable that contains an instance of Karma_Page_Manager
	 *
	 * @since    2.0
	 * @access   private
	 * @var      object $instance The reference to *Singleton* instance of this class.
	 */
	private static $instance;

	/**
	 * Returns the *Singleton* instance of this class.
	 *
	 * @access   public
	 * @return   object The *Singleton* instance.
	 * @since    2.0
	 */
	public static function get_instance() {

		if ( null === Karma_Page_Manager::$instance ) {
			Karma_Page_Manager::$instance = new Karma_Page_Manager();
		}

		return Karma_Page_Manager::$instance;

	}

	/**
	 * Check for import template or not
	 *
	 * @access   public
	 * @since    2.0
	 * @return   bool
	 */
	public static function check_page_manager_page() {

		if ( isset( $_GET[ 'builder-page' ] ) && 'karma-page-manager' === $_GET[ 'builder-page' ] ) {
			return true;
		}

		return false;

	}

	/**
	 * Check the current page is page manager or not
	 *
	 * @access   public
	 * @since    2.0
	 * @return   bool
	 */
	public function check_import_template() {

		if ( isset( $_POST[ 'import-template' ] ) ) {
			return true;
		} else {
			return false;
		}

	}

	/**
	 * Enqueue styles and scripts for page manager
	 *
	 * @since    2.0
	 *
	 * @return void
	 */
	public function enqueue_assets() {

		wp_print_scripts( array( 'jquery', 'wp-util', 'backbone' ) );
		wp_enqueue_script( 'karma-page-manager-script', KARMA_BUILDER_URL . 'builder/js/karma-page-manager.min.js', array(
			'jquery',
			'backbone'
		), KARMA_BUILDER_VERSION, false );
		wp_enqueue_style( 'karma-builder-styles', KARMA_BUILDER_URL . 'builder/css/builder-styles.css', array(), KARMA_BUILDER_VERSION, false );
		wp_enqueue_style( 'karma-dashboard-styles', KARMA_BUILDER_URL . 'builder/css/dashboard-style.css', array(), KARMA_BUILDER_VERSION, false );
		$this->localize_script_value();

	}

	private function localize_script_value(){

		$localize_Value = array(
				'karmaPreviewLogo'	=> KARMA_BUILDER_URL .'builder/media/karma-logo.png' ,
		);

		wp_localize_script( 'karma-page-manager-script', 'pageManagerParams', $localize_Value );

	}

	/**
	 * Load the basic templates of page manager
	 *
	 * @access   public
	 * @since    2.0
	 * @return   void
	 */
	public function load_page_templates() {

		$builder_views = Karma_Factory_Pattern::$builder_views;
		$builder_views->load_page_manager_environment();

	}

	/**
	 * Get list of templates
	 *
	 * @access   public
	 * @since    2.0
	 * @return   array
	 */
	public function templates_list() {

		$request = wp_remote_get( $this::KARMA_PAGE_MANAGER_API_URL . 'karma-template.api.php' );
		$body    = $request[ 'body' ];

		return json_decode( $body, true );

	}

	/**
	 * Get list of templates
	 *
	 * @param int $template_id template ID
	 *
	 * @access   public
	 * @since    2.0
	 * @return   array
	 */
	public function get_template_content( $template_id ) {

		if ( 0 !== $template_id ) {
			$instance = File_System::get_instance();
			$template = $instance->file_get_content( $this::KARMA_PAGE_MANAGER_API_URL . $template_id . '.php' );
		} else {
			$template = '';
		}
		
		return $template;

	}

	/**
	 * Create new page and import template
	 *
	 * @access   public
	 * @since    2.0
	 * @return   bool/string    false on failure and new page url on successful import
	 */
	public function import_template() {

		$template_id   = ( isset( $_POST[ 'import-template' ] ) && '' != $_POST[ 'import-template' ] ) ? $_POST[ 'import-template' ] : 0;
		$title         = ( isset( $_POST[ 'page-title' ] ) ) ? $_POST[ 'page-title' ] : 'Karma Page';
		$page_template = ( isset( $_POST[ 'page-template' ] ) ) ? $_POST[ 'page-template' ] : '';
		//require_once( "../wp-load.php" );
		$new_post = array(
			'post_title'  => $title,
			'post_status' => 'publish',
			'post_type'   => 'page',
			'meta_input'  => array(
				'_wp_page_template'  => $page_template,
				'karma_page'         => 'true',
				'karma_post_content' => $this->get_template_content( $template_id )
			)
		);

		$page_id = wp_insert_post( $new_post );
		if ( $page_id ) {
			return Karma_Factory_Pattern::$builder_loader->generate_builder_url( $page_id );
		} else {
			return false;
		}

	}
}