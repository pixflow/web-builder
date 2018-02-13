<?php

namespace KarmaBuilder\PublicArea ;


/** Importing, Aliases, and Name Resolution */
use KarmaBuilder\FPD\Karma_Factory_Pattern as Karma_Factory_Pattern;

/**
 * The public-facing functionality of the plugin.
 *
 * @link       http://pixflow.net
 * @since      0.1.0
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
	 * @since    0.1.0
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since    0.1.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    0.1.0
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
	 * @since    0.1.0
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

		$stylesheet = Karma_Factory_Pattern::$stylesheet;
		$stylesheet->create_global_css_file();

		wp_enqueue_style( $this->plugin_name, KARMA_BUILDER_URL . 'builder/css/builder-styles.css', array(), $this->version, 'all' );
		wp_enqueue_style( $this->plugin_name, KARMA_BUILDER_URL . 'builder/css/builder-styles.css', array(), $this->version, 'all' );


	}

	/**
	 * Register the JavaScript for the public-facing side of the site.
	 *
	 * @since    0.1.0
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
			wp_enqueue_script( $this->plugin_name . '-jquery-ui' , KARMA_BUILDER_URL . 'builder/js/jquery-ui.min.js', array( 'jquery' ), $this->version, false );
			wp_enqueue_script( $this->plugin_name . '-grid-resizer' , KARMA_BUILDER_URL . 'builder/js/grid-resizer.min.js', array( ), $this->version, false );
			wp_enqueue_script( $this->plugin_name . '-spectrum' , KARMA_BUILDER_URL . 'builder/js/spectrum.min.js', array( ), $this->version, false );
			wp_enqueue_script( $this->plugin_name . '-color-picker' , KARMA_BUILDER_URL . 'builder/js/karma-builder-color-picker.min.js', array( ), $this->version, false );
			wp_enqueue_script( $this->plugin_name, KARMA_BUILDER_URL . 'builder/js/karma-builder-init.min.js', array( 'jquery', 'backbone', 'wp-util', $this->plugin_name . '-jquery-ui' ), $this->version, false );
			wp_enqueue_script( $this->plugin_name . '-gizmos', KARMA_BUILDER_URL . 'builder/js/karma-builder-gizmos.min.js', array( $this->plugin_name ), $this->version, false );
			wp_enqueue_script( $this->plugin_name . '-gizmos-icon', KARMA_BUILDER_URL . 'builder/js/gizmos/icon.min.js', array( $this->plugin_name . '-gizmos' ), $this->version, false );
			wp_enqueue_script( $this->plugin_name . '-gizmos-alignment', KARMA_BUILDER_URL . 'builder/js/gizmos/alignment.min.js', array( $this->plugin_name . '-gizmos' ), $this->version, false );
			wp_enqueue_script( $this->plugin_name . '-gizmos-position', KARMA_BUILDER_URL . 'builder/js/gizmos/position.min.js', array( $this->plugin_name . '-gizmos' ), $this->version, false );
			wp_enqueue_script( $this->plugin_name . '-gizmos-link', KARMA_BUILDER_URL . 'builder/js/gizmos/link.min.js', array( $this->plugin_name . '-gizmos' ), $this->version, false );
			wp_enqueue_script( $this->plugin_name . '-gizmos-text', KARMA_BUILDER_URL . 'builder/js/gizmos/text.min.js', array( $this->plugin_name . '-gizmos' ), $this->version, false );
			wp_enqueue_script( $this->plugin_name . '-gizmos-typography', KARMA_BUILDER_URL . 'builder/js/gizmos/typography.min.js', array( $this->plugin_name . '-gizmos' ), $this->version, false );
			wp_enqueue_script( $this->plugin_name . '-gizmos-font-style', KARMA_BUILDER_URL . 'builder/js/gizmos/font-style.min.js', array( $this->plugin_name . '-gizmos' ), $this->version, false );
			wp_enqueue_script( $this->plugin_name . '-gizmos-color', KARMA_BUILDER_URL . 'builder/js/gizmos/color.min.js', array( $this->plugin_name . '-gizmos' ), $this->version, false );
			wp_enqueue_script( $this->plugin_name . '-shortcodes', KARMA_BUILDER_URL . 'builder/js/karma-builder-shortcodes.min.js', array( $this->plugin_name . '-gizmos' ), $this->version, false );

		}
	}

}
