<?php

/**
 * The public-facing functionality of the plugin.
 *
 * @link       http://pixflow.net
 * @since      1.0.0
 *
 * @package    Pixity_Builder
 * @subpackage Pixity_Builder/public
 */

/**
 * The public-facing functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    Pixity_Builder
 * @subpackage Pixity_Builder/public
 * @author     Pixflow <info@pixflow.net>
 */
class Pixity_Builder_Public {

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
		 * defined in Pixity_Builder_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Pixity_Builder_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'css/karma-builder-public.css', array(), $this->version, 'all' );

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
		 * defined in Pixity_Builder_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Pixity_Builder_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_script( 'react', plugin_dir_url( __FILE__ ) . 'js/react.min.js', null, $this->version, false );
		wp_enqueue_script( 'react-dom', plugin_dir_url( __FILE__ ) . 'js/react-dom.min.js', null, $this->version, false );
		wp_enqueue_script( 'babel', plugin_dir_url( __FILE__ ) . 'js/babel.min.js', null, $this->version, false );
		wp_enqueue_script( $this->plugin_name . '_babel', plugin_dir_url( __FILE__ ) . 'js/karma-builder-public.jsx', array( 'jquery' ), $this->version, false );
		add_filter('script_loader_tag', array( $this, 'add_babel_attribute' ), 10, 2);


	}

	public function add_babel_attribute($tag, $handle) {
		if ( preg_match('/[.]jsx/', $tag) ) {
			return str_replace('text/javascript', 'text/babel', $tag);
		}
		return $tag;
	}
}
