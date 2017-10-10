<?php
if ( ! defined( 'ABSPATH' ) ) {
	/** Exit if accessed directly. */
	die('Silence is golden');
}

/**
 * The file that defines the builder elements
 *
 * A class definition that elements use in builder
 *
 * @link       http://pixflow.net
 * @since      1.0.0
 *
 * @package    Karma_Builder
 * @subpackage Karma_Shortcode_Base/includes
 */

/**
 * Builder elements.
 *
 * This includes builder elements name and load their dependency.
 *
 *
 * @since      1.0.0
 * @package    Karma_Shortcode_Base
 * @subpackage Karma_Shortcode_Base/includes
 * @author     Pixflow <info@pixflow.net>
 */



class Karma_Shortcode_Base {


	/**
	 * The instance of all elements class
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      array
	 */
	protected static $instance = array();


	/**
	 * Class builder admin instance
	 *
	 * @since    1.0.0
	 * @access   public
	 * @return	object	Instance of current element class
	 */
	public static function get_instance() {

		if ( ! static::$instance[ static::$element_name ] ) {
			static::$instance[ static::$element_name ] = new static();
		}
		return static::$instance[ static::$element_name ];

	}

	/**
	 * Defines hook and action for register and load JS templates of each elements
	 *
	 * @since    1.0.0
	 * @access   protected
	 */
	protected function __construct(){

		add_action( 'wp_footer', array( $this, 'load_js_templates' ) );
		add_filter( 'karma_elements_map', array( $this, 'map' ) );
		add_shortcode( $this->element_name, array( $this, 'render' ) );

	}
	/*
	 * Load underscore templates of each elements in builder for using instance render
	 *
	 * @since    1.0.0
	 * @return	 void
	 */
	public function load_js_templates(){

		?>
		<script type="text/html" id="tmpl-karma-element-<?php echo static::$element_name; ?>">
			<?php echo $this->js_render(); ?>
		</script>
		<?php

	}


}