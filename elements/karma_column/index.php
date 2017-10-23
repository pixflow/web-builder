<?php

class Karma_Column extends Karma_Shortcode_Base {

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

	public static $element_name = 'karma_column';

	public static function render( $atts, $content ) {

		$atts = shortcode_atts(
			array(
				'sm_size'          => '12',
				'md_size'       => '12' ,
				'lg_size'=>'12',
				'xl_size'  => '12',
			)
			, $atts
		);

		return "<div class='"
			       ."karma_column "
			       ."karma-col-sm-" . $atts['sm_size']
			       ." karma-col-md-" . $atts['md_size']
			       ." karma-col-lg-" . $atts['lg_size']
			       ." karma-col-xl-" . $atts['xl_size']
			       ."'> " . do_shortcode($content) . "</div>";

	}

	public static function js_render() {

		return "<div class='karma_column karma-col-sm-{{ attributes.sm_size }} karma-col-md-{{ attributes.md_size }} karma-col-lg-{{ attributes.lg_size }} karma-col-xl-{{ attributes.xl_size }}'> {{ attributes.shortcode_content }} </div>";

	}

	public function map() {

		$map = array(
			"name"   => "Column",
			"params" => array(
				array(
					"name"		=> "width",
					"type"		=> Karma_Builder_Setting_Panel::TEXT,
					"label"		=> esc_attr__( "Structure", 'karma' ),
					"value"		=> 'full',
					"options"	=> array(
						'full'		=> "full.png",
						'container'	=> "container.png"
					)
				),
				array(
					"name"		=> "space",
					"type"		=> Karma_Builder_Setting_Panel::RANGE_SLIDER,
					"label"		=> esc_attr__( "Top & Bottom Spacing", 'karma' ),
					'value'		=> 0,
					"options"	=> array(
						'min'	=> 0,
						'max'	=> 600,
						'step'	=> 1,
						'unit'	=> 'px'
					)
				)

			,array(
					"name"		=> "extra_class",
					"type"		=> Karma_Builder_Setting_Panel::TEXT,
					"label"		=> esc_attr__( "Class Name", 'karma' ),
					'value'		=> ''
				)
			)
		);

		parent::$elements_map['karma_column'] = $map;
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
	 * @return	void
	 */
	public function render_css(){


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