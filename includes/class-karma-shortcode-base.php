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
	 * It is an array that contains elements map
	 *
	 * @since    1.0.0
	 * @access   public
	 * @var      array    $elements_map    elements map.
	 */
    public static $elements_map = array();

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

		if ( ! isset( static::$instance[ static::$element_name ] ) ) {
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
		add_shortcode( static::$element_name , array( $this, 'render' ) );
		add_action( 'karma_before_shortcode_apply_' . static::$element_name , array( $this , 'load_assets' ) );
		if( method_exists( $this, 'wrapper_classes' ) ) {
			add_filter( 'karma_builder/elements/' . static::$element_name . '/classes', array( $this, 'wrapper_classes' ), 10, 2 );
		}

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

	/**
	 * Set the element id and elements attributes
	 *
	 * @param array	$shortcode_info	The attributes of each element
	 *
	 * @since    1.0.0
	 * @access   public
	 * @return	void
	 */
	public function load_assets( $shortcode_info ){

		static::get_element_attributes( $shortcode_info )->render_assets();

	}

	/**
	 * Load CSS and JS of each element
	 *
	 *
	 * @since    1.0.0
	 * @access   private
	 * @return	void
	 */
	private function render_assets(){

		$this->render_style();
		$this->render_scripts();

	}


	/**
	 * Load CSS each element
	 *
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @return	void
	 */
	protected function render_style(){

		$style_string = '.' . static::$element_name . '_' . static::$element_id . '{'
			. static::render_css()
			. '}';

		?>
		<style>
			<?php echo $style_string; ?>
		</style>
		<?php

	}

	/**
	 * Load js each element
	 *
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @return	void
	 */
	protected function render_scripts(){

		$script_string = static::render_script();

		?>
		<script id="<?php echo static::$element_name . '_' . static::$element_id; ?> ">
			<?php echo $script_string; ?>
		</script>
		<?php

	}


}