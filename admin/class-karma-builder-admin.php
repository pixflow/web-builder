<?php

/**
 * The admin-specific functionality of the plugin.
 *
 * @link       http://pixflow.net
 * @since      1.0.0
 *
 * @package    Karma_Builder
 * @subpackage Karma_Builder/admin
 */

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    Karma_Builder
 * @subpackage Karma_Builder/admin
 * @author     Pixflow <info@pixflow.net>
 */
class Karma_Builder_Admin {

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 */
	public function __construct() {

		$this->plugin_name = 'karma-builder';
		$this->version = '1.0.0';
	}

	/**
	 * Register the stylesheets for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Karma_Builder_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Karma_Builder_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'css/karma-builder-admin.css', array(), $this->version, 'all' );

	}

	/**
	 * Register the JavaScript for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Karma_Builder_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Karma_Builder_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_script( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'js/karma-builder-admin.js', array( 'jquery' ), $this->version, false );

	}


	/**
	 * Save the content of page
	 *
	 * @since     1.0.0
	 * @return    Json	The result of save content
	 */
	public function save_content(){

		$models = $_POST['models'];
		$id = $_POST['id'];
		$builder_core = Karma_Builder_Core::get_instance();
		$models = json_decode( $models );
		if ( $builder_core->save_post_content( $models, $id ) ){
			echo '{ "result" : "true", "msg" : "success" }';
		}else{
			echo '{ "result" : "false", "msg" : "error" }';
		}

		wp_die();
	}

	/**
	 * enqueue style for builder page
	 *
	 * @since     1.0.0
	 * @return    karma builder style
	 */

	public function load_builder_assets(){

		wp_enqueue_style( $this->plugin_name . 'karma-builder', plugin_dir_url( __FILE__ ) . 'css/pages/karma-builder.css', $this->version, false );

	}
}
