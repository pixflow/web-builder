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
 * @package    Pixity_Builder
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
	 * The list of elements name
	 *
	 * @since    1.0.0
	 * @access   public
	 */
	public static $element_filename = array(
		'row',
		'column',
	);


	/**
	 * The list of elements instance
	 *
	 * @since    1.0.0
	 * @access   public
	 */
	public static $element_instance = array();


	/**
	 * Define the core functionality of the elements.
	 *
	 * Call and register their functionality of elements
	 * Load the dependencies, and set the hooks for elements.
	 *
	 * @since    1.0.0
	 */
	public function __construct(){

		$this->init_elements();

	}

	/*
	 * Load elements files and create their instance
	 *
	 * @since    1.0.0
	 * @return	 void
	 */
	protected function init_elements(){

		self::$element_filename = apply_filters( 'karma_elements', self::$element_filename );
		foreach ( self::$element_filename as $element ){
			require_once plugin_dir_path( dirname( __FILE__ ) ) . 'elements/karma_' . $element . '/index.php';
			$class_name  = 'Karma_' . ucfirst( $element ) ;
			self::$element_instance[ $class_name ] = new $class_name() ;
		}

	}


	/*
	 * Load underscore templates of each elements in builder for using instance render
	 *
	 * @since    1.0.0
	 * @return	 void
	 */
	public function load_js_templates(){

		foreach ( self::$element_instance as $element_instance ){
			?>
			<script type="text/html" id="tmpl-karma-element-<?php echo $element_instance->element_name; ?>">
				<?php echo $element_instance->js_render(); ?>
			</script>
			<?php
		}

	}


}