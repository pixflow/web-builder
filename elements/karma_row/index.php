<?php
class Karma_Row extends Karma_Shortcode_Base {

	/**
	 * Generic element attributes .
	 *
	 * Holds the element attributes .
	 *
	 * @access private
	 *
	 * @var array
	 */
	private $element_attributes;

	/**
	 * Generic ID.
	 *
	 * Holds the uniqe ID.
	 *
	 * @access public
	 *
	 * @var string
	 */
	public static $element_id;

	public static $element_name = 'karma_row';

	public function render( $atts, $content ) {

		$atts = shortcode_atts(
			array(
				'structure'		=> 'container',
				'space'       	=> '200' ,
				'element_key'	=> '',
				'extra_class'	=> '',
			)
			, $atts
		);
		$container_class = ($atts['structure'] == 'container')?"container":"karma-container-fluid";
		ob_start();
		?>
		<div class='karma_section karma_row_<?php echo esc_attr( $atts['element_key'] ); ?> <?php echo esc_attr( $atts['extra_class'] ); ?>'>
			<div class='<?php echo esc_attr( $container_class ); ?> karma-row no-gutters'>
				<?php do_shortcode( $content ); ?>
			</div>
		</div>
		<?php
		return ob_get_clean();

	}

	public function js_render() {

		return "<div class='karma-row {{data.extra_class}}'>"
			. "<div class='{{data.structure}}'>"
			. '<# print( createChildren( data.shortcodeContent ) ) #>'
			. "</div>"
			. "</div>";
	}


	public function map() {

		$map = array(
			"name"		=> "Row",
			"params"	=> array(
				array(
					"name"		=> "structure",
					"type"		=> Karma_Builder_Setting_Panel::RADIO_IMAGE,
					"label"		=> esc_attr__( "Grid options", 'karma' ),
					'value'		=> 2,
					"field"		=> array(

						array(
							'image'	=> karma_load_svg(KARMA_BUILDER_URL . 'public/media/svg/section_container.svg'),
							'title' => "Full screen",
							'value' => "1",
						),
						array(
							'image' => karma_load_svg(KARMA_BUILDER_URL . 'public/media/svg/section_full.svg'),
							'title' => "Container",
							'value' => "2"
						),

					)
				),
				array(
					"name"		=> "title",
					"type"		=> Karma_Builder_Setting_Panel::TITLE,
					"label"		=> esc_attr__( "Spacing", 'karma' ),
					'value'		=> 'Spacing'
				),
				array(
					"name"		=> "space",
					"type"		=> Karma_Builder_Setting_Panel::RANGE_SLIDER,
					"label"		=> esc_attr__( "Top & bottom spacing", 'karma' ),
					'value'		=> 0,
					"options"	=> array(
						'value'	=>200,
						'min'	=> 0,
						'max'	=> 800,
						'step'	=> 1,
						'unit'	=> 'px'
					)
				),
				array(
					"name"			=> "extra_class",
					"type"			=> Karma_Builder_Setting_Panel::TEXT,
					"label"			=> __( "Class Name", 'karma' ),
					'placeholder'	=> __( 'Class name', 'karma' ),
					"group"			=> "Advance option"
				),

			)
		);


		parent::$elements_map['karma_row'] = $map;
		return parent::$elements_map;
	}


	/**
	 * Set the attributes of current elements and also
	 * set the uniqe id
	 *
	 *
	 * @since   1.0.0
	 * @access  public
	 * @return	object	Instance of current class
	 */
	public function get_element_attributes( $attributes ) {

		$this->element_attributes = $attributes['attributes'];
		self::$element_id =  $this->element_attributes['element_key'] ;
		return $this;

	}


	/**
	 * Load CSS
	 *
	 *
	 * @since   1.0.0
	 * @access  public
	 * @return	string	The style of element
	 */
	public function render_css(){

		$styles = "padding-top:{$this->element_attributes['space']}px;padding-bottom:{$this->element_attributes['space']}px;";
		return $styles;

	}

	/**
	 * Load JS
	 *
	 *
	 * @since   1.0.0
	 * @access  public
	 * @return	void
	 */
	public function render_script(){


	}


}