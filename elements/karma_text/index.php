<?php
/**
 * The file that defines the Text element class
 *
 * A class definition that includes base function of Text element
 *
 * @link       http://pixflow.net
 */

/**
 * Text element class.
 *
 * This includes base methods and variable that need for Text element
 *
 *
 * @since      1.0.0
 * @package    Karma_Builder
 * @subpackage Karma_Builder/elements/karma_text
 * @author     Pixflow <info@pixflow.net>
 */
class Karma_Text extends Karma_Shortcode_Base {

	/**
	 * Element name
	 *
	 * @since 1.0.0
	 * @access public
	 */
	public static $element_name = 'karma_text';

	/**
	 * Return default attributes
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @return array
	 */
	public function get_element_default_attributes(){

		return 	array(
			'element_key'   => 'kb' ,
		);

	}

	/**
	 * Render text element output.
	 *
	 * Written in PHP and used to generate the final HTML.
	 *
	 * @param array $attributes Attribute of element
	 * @param string $content Content of element
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @return string Html output
	 */
	public function render( $attributes, $content ) {

		$attributes = shortcode_atts(
			$this->get_element_default_attributes(),
			$attributes
		);


		ob_start();
		?>
		<div class='karma-text karma-text-<?php echo esc_attr( $attributes['element_key'] ); ?>'>
			test
		</div>
		<?php
		return ob_get_clean();

	}

	/**
	 * Render text element template.
	 *
	 * Written in JS and used to for underscore template.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @return string Template output
	 */
	public function js_render() {

		$js_template = '<div class="karma-text karma-text-{{ data.element_key }}" >test'
			. '</div>';
		return $js_template;

	}

	/**
	 * Register text element controls.
	 * Adds different input fields to allow the user to change and customize the element settings.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @return array Element controls
	 */
	public function map() {

		$map = array(
			'setting-panel' => array(
				"title"  => esc_attr__( "Text Setting", 'karma' ),
				"height" => "570",
				"params" => array(

				),
			),
		);


		parent::$elements_map[ self::$element_name ] = $map;

		return parent::$elements_map;

	}

	/**
	 * Set the gizmo controller
	 *
	 *
	 * @since   1.0.0
	 * @access  public
	 * @return    array    Gizmo controller of all elements
	 */
	public function gimzo_controllers() {

		$controllers = array(
			array(
				"type"      => "outerGizmo",
				"className" => "text-gizmo-group",
				"params"    => array(

				)
			),
		);

		parent::$elements_gizmo[ self::$element_name ] = $controllers;

		return parent::$elements_gizmo;

	}

	/**
	 * Load CSS
	 *
	 *
	 * @since   1.0.0
	 * @access  public
	 * @return  string    The style of element
	 */
	public function render_css() {

		$styles = '.' . str_replace( "_", "-", static::$element_name ) . '-' . $this->element_id . '{'
			. "}";

		return $styles;

	}

	/**
	 * Load JS
	 *
	 *
	 * @since   1.0.0
	 * @access  public
	 * @return  void
	 */
	public function render_script() {

		$block = '' ;
		return $block ;

	}


	/**
	 * List of dependencies
	 *
	 *
	 * @since   1.0.0
	 * @access  public
	 * @return  array
	 */
	public function get_style_script_dependencies(){

		$dependencies = array(
			'css' => array() ,
			'js' => array()
		);

		return $dependencies ;

	}


	/**
	 * Get element info
	 *
	 *
	 * @since   1.0.0
	 * @access  public
	 * @return  array   The element info
	 */
	public function get_element_info() {

		$element_info = array(
			'elementName' => self::$element_name,
			'icon'        => karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/image-element-icon.svg' ),
			'category'    => array(
				'basic',
				'media',
				str_replace( 'karma_', '', self::$element_name ),
			),
			'showInList'  => true,
		);

		parent::$elements_info[ self::$element_name ] = $element_info;

		return parent::$elements_info;

	}

}