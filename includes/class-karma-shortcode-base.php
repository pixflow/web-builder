<?php
namespace KarmaBuilder\ElementsManager ;

/** Importing, Aliases, and Name Resolution */
use KarmaBuilder\FPD\Karma_Factory_Pattern as Karma_Factory_Pattern;
use KarmaBuilder\CacheManager\Karma_Cache_Manager as Cache_Manager;

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
 * @since      0.1.0
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
 * @since      0.1.0
 * @package    Karma_Shortcode_Base
 * @subpackage Karma_Shortcode_Base/includes
 * @author     Pixflow <info@pixflow.net>
 */


class Karma_Shortcode_Base {

    /**
     * Generic element attributes .
     *
     * Holds the element attributes .
     *
     * @access public
     *
     * @var array
     */
    public static $element_attributes;

    /**
     * Generic ID.
     *
     * Holds the uniqe ID.
     *
     * @access protected
     *
     * @var string
     */
    protected $element_id;

	/**
	 * The instance of all elements class
	 *
	 * @since    0.1.0
	 * @access   protected
	 * @var      array
	 */
	protected static $instance = array();


	/**
	 * Class builder admin instance
	 *
	 * @since	0.1.0
	 * @access	public
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
	 * @since    0.1.0
	 * @access   protected
	 */
	protected function __construct(){

		add_shortcode( static::$element_name , array( $this, 'render' ) );

		//Apply hooks when builder is going to load
		$builder = Karma_Factory_Pattern::$builder;
		add_action( 'karma/before/shortcode/apply/' . static::$element_name , array( $this , 'load_assets' ) );
		add_filter( 'karma/elements/load/dependencies/' . static::$element_name , array( $this, 'get_style_script_dependencies' ) );
		if( $builder::is_in_builder() ){
			wp_enqueue_script( static::$element_name, KARMA_BUILDER_URL . '/elements/' . static::$element_name . '/view.min.js', array( KARMA_BUILDER_NAME . '-shortcodes' ) );
			add_action( 'wp_footer', array( $this, 'load_js_templates' ) );
			add_filter( 'karma/elements/all/map', array( $this, 'map_injection' ) );
			add_filter( 'karma/elements/all/gizmo', array( $this, 'gimzo_controllers_injection' ) );
			add_filter( 'karma/elements/all/element_info', array( $this, 'element_info_injection' ) );
			if( method_exists( $this, 'wrapper_classes' ) ) {
				add_filter( 'karma/elements/' . static::$element_name . '/classes', array( $this, 'wrapper_classes' ), 10, 2 );
			}

		}

	}

	/**
	 * Add element map to the builder maps array
	 * @since 0.1.0
	 * @access public
	 * @param $maps
	 *
	 * @return array
	 */
	public function map_injection( $maps ){

		$map = $this->map();
		$maps[ static::$element_name ] = $map;
		return $maps;

	}

	/**
	 * Add element gizmo to the builder gizmos array
	 * @since 0.1.0
	 * @access public
	 * @param $controllers
	 *
	 * @return array
	 */
	public function gimzo_controllers_injection( $controllers ){

		$controller = $this->gimzo_controllers();
		$controllers[ static::$element_name ] = $controller;
		return $controllers;

	}

	/**
	 * Add element info to the builder element info array
	 * @since 0.1.0
	 * @access public
	 * @param $element_info
	 *
	 * @return array
	 */
	public function element_info_injection( $element_info ){

		$info = $this->element_info();
		$element_info[ static::$element_name ] = $info;
		return $element_info;

	}

	/*
	 * Load underscore templates of each elements in builder for using instance render
	 *
	 * @since    0.1.0
	 * @return	 void
	 */
	public function load_js_templates(){

		$model = $this->get_element_default_attributes() ;
		unset( $model['element_key'] );
		$element_model = ' jQuery( document ).on( "karma/before/createElement/' . static::$element_name . '" , function(){
				return ' . json_encode( $model ) . ';
			})  ';
		?>
		<script type="text/html" id="tmpl-karma-element-<?php echo static::$element_name; ?>">
			<?php echo $this->js_render(); ?>
		</script>
		<script type="text/javascript" id="karma-element-<?php echo static::$element_name; ?>-model">
			<?php echo $element_model; ?>
		</script>
		<?php

	}

    /**
     * Set the attributes of current elements and also set the unique id
     *
     * @param	array	$attributes	contains element attribute
     *
     * @since   0.1.0
     * @access  public
     * @return	object	Instance of current class
     */
    public function get_element_attributes( $attributes ) {

	    $default_attributes = $this->get_element_default_attributes();
	    $element_attributes = $attributes[ 'attributes' ];
	    self::$element_attributes = array_merge( $default_attributes, $element_attributes );
	    $this->element_id = self::$element_attributes[ 'element_key' ];
	    return $this;

    }

	/**
	 * Set the element id and elements attributes
	 *
	 * @param array	$shortcode_info	The attributes of each element
	 *
	 * @since    0.1.0
	 * @access   public
	 * @return	void
	 */
	public function load_assets( $shortcode_info ){

		$this
			->get_element_attributes( $shortcode_info )
			->render_style()
			->render_scripts();


	}


	/**
	 * Load CSS each element
	 *
	 *
	 * @since    0.1.0
	 * @access   protected
	 * @return	void
	 */
	protected function render_style(){

		$builder = Karma_Factory_Pattern::$builder;
		$element_selector =  '#' ;
		$elements_style_attributes = array(
			'selector' => $element_selector . str_replace( "_", "-", static::$element_name ) . '-' . $this->element_id,
			'css'      => static::get_css_attributes()
		);

		$block = Karma_Factory_Pattern::$stylesheet->create_css_block( $elements_style_attributes );
		Cache_Manager::$css_blocks .= $block;
		if( $builder::is_in_builder() ) :
			?>
				<style id="style-<?php echo str_replace( "_", "-", static::$element_name ) . '-' . $this->element_id; ?>" >
					<?php echo $block; ?>
				</style>
			<?php
		endif;
		return $this;

	}

	/**
	 * Load js each element
	 *
	 *
	 * @since    0.1.0
	 * @access   protected
	 * @return	void
	 */
	protected function render_scripts(){

		$script_string = static::render_script();
		Cache_Manager::$js_blocks .= $script_string;
		$builder = Karma_Factory_Pattern::$builder;
		if( $builder::is_in_builder() ) :
		?>
		<script id="script-<?php echo str_replace( "_", "-", static::$element_name ). '-' . $this->element_id; ?>">
			<?php echo $script_string; ?>
		</script>
		<?php
		endif;
	}




}