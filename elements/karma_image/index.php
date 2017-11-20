<?php
/**
 * The file that defines the Image element class
 *
 * A class definition that includes base function of Image element
 *
 * @link       http://pixflow.net
 */

/**
 * Image element class.
 *
 * This includes base methods and variable that need for image element
 *
 *
 * @since      1.0.0
 * @package    Karma_Builder
 * @subpackage Karma_Builder/elements/karma_image
 * @author     Pixflow <info@pixflow.net>
 */
class Karma_Image extends Karma_Shortcode_Base {

	/**
	 * Element name
	 *
	 * @since 1.0.0
	 * @access public
	 */
	public static $element_name = 'karma_image';

	/**
	 * Render image element output.
	 *
	 * Written in PHP and used to generate the final HTML.
	 *
	 * @param $attributes    Attribute of element
	 * @param $content      Content of element
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @return string Html output
	 */
	public function render( $attributes, $content ) {

		$attributes = shortcode_atts(
			array(
				'imgurl'		=> 'container',
				'action'        => 'none'
			)
			, $attributes
		);

		ob_start();
		?>
		<div class='karma-image karma-image-<?php echo esc_attr( $attributes[ 'element_key' ] ); ?>' >
			<div class="karma-image-container">
				<a href="" title="" >
					<img src="<?php echo esc_url( $attributes[ 'imgurl' ] ); ?>" title="" alt="" />
				</a>
			</div>
		</div>
		<?php
		return ob_get_clean();

	}

	/**
	 * Retrieve image element link URL.
	 *
	 * @since 1.0.0
	 * @access private
	 *
	 * @param $attributes    Attribute of element
	 *
	 * @return void
	 */
	private function get_image_url( $attributes ){

		switch ( $attributes['action'] ){
			default:
				break;
		}

	}


	/**
	 * Render image element template.
	 *
	 * Written in JS and used to for underscore template.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @return string Template output
	 */
	public function js_render() {

		return "";

	}


	/**
	 * Register image element controls.
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
				"title"	=> esc_attr__( "Image Setting", 'karma' ),
				"height" => "357",
				"params" => array(
					array(
						"name"	=> "scale",
						"type"	=> Karma_Builder_Setting_Panel::RADIO_IMAGE,
						"label"	=> esc_attr__( "Scale", 'karma' ),
						'value'	=> "fill",
						"field"	=> array(
							array(
								'image'	=> karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/section_container.svg' ),
								'title'	=> esc_attr__( "Real size", 'karma' ),
								'value'	=> "real",
							),
							array(
								'image'	=> karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/section_full.svg' ),
								'title'	=> "Fill",
								'value'	=> "fill",
							),
						),
						'separator' => "container",
					),
					array(
						"name" => 'position' ,
						"type"	=> Karma_Builder_Setting_Panel::IMAGE_POSITION,
						"label"	=> esc_attr__( "Position", 'karma' ),
						'value'	=> 'center-center',
						'separator' => "container",

					),
					array(
						"name"			=> "link-title",
						"type"			=> Karma_Builder_Setting_Panel::TEXT,
						"label"			=> __( "Title", 'karma' ),
						"group"			=> "Advance option"
					),
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

		$controllers = array();

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

		$styles = '';
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


	}

}