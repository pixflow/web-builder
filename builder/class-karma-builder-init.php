<?php

/**
 * The public-facing functionality of the plugin.
 *
 * @link       http://pixflow.net
 * @since      1.0.0
 *
 * @package    Karma_Builder
 * @subpackage Karma_Builder/public
 */

/**
 * The public-facing functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    Karma_Builder
 * @subpackage Karma_Builder/public
 * @author     Pixflow <info@pixflow.net>
 */
class Karma_Builder_Public {

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
	 * @param      string    $plugin_name       The name of the plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->version = $version;

	}

	/**
	 * Register the stylesheets for the public-facing side of the site.
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
		wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'css/builder-styles.css', array(), $this->version, 'all' );

	}

	/**
	 * Register the JavaScript for the public-facing side of the site.
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

		$builder = Karma_Factory_Pattern::$builder;
		if( $builder::is_in_builder() ) {
			wp_enqueue_script( $this->plugin_name, plugin_dir_url(__FILE__) . 'js/karma-builder-init.min.js', array('jquery', 'backbone', 'wp-util'), $this->version, false );
			wp_enqueue_script( $this->plugin_name . '-jquery-ui' ,  plugin_dir_url( __FILE__ ). 'js/jquery-ui.min.js', array( 'jquery' ), $this->version, false );
			wp_enqueue_script( $this->plugin_name . '-range-slider' ,  plugin_dir_url( __FILE__ ). 'js/rangeslider.min.js', array( 'jquery' ), $this->version, false );
			wp_enqueue_script( $this->plugin_name . '-grid-resizer' ,  plugin_dir_url( __FILE__ ). 'js/grid-resizer.min.js', array( ), $this->version, false );
			wp_enqueue_script( $this->plugin_name . '-setting-panel', plugin_dir_url(__FILE__) . 'js/setting-panel.min.js', array( $this->plugin_name ), $this->version, false );
			wp_enqueue_script( $this->plugin_name . '-shortcodes', plugin_dir_url(__FILE__) . 'js/shortcodes.min.js', array( $this->plugin_name . '-setting-panel' ), $this->version, false );
			wp_enqueue_media();
		}
	}

}
