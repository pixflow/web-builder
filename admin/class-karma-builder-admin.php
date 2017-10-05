<?php

/**
 * The admin-specific functionality of the plugin.
 *
 * @link       http://pixflow.net
 * @since      1.0.0
 *
 * @package    Pixity_Builder
 * @subpackage Pixity_Builder/admin
 */

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    Pixity_Builder
 * @subpackage Pixity_Builder/admin
 * @author     Pixflow <info@pixflow.net>
 */
class Pixity_Builder_Admin {

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
	 * @param      string    $plugin_name       The name of this plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->version = $version;

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
		 * defined in Pixity_Builder_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Pixity_Builder_Loader will then create the relationship
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
		 * defined in Pixity_Builder_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Pixity_Builder_Loader will then create the relationship
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
		$builder_core = Pixity_Builder_Core::get_instance();
		$models = json_decode( $models );
		if ( $builder_core->save_post_content( $models, $id ) ){
			echo '{ "result" : "true", "msg" : "success" }';
		}else{
			echo '{ "result" : "false", "msg" : "error" }';
		}

		wp_die();
	}


	public function load_builder_assets(){

		wp_enqueue_style( $this->plugin_name . 'karma-builder', plugin_dir_url( __FILE__ ) . 'css/karma-builder.css', $this->version, false );

	}
}
