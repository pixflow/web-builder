<?php

class Karma_Column extends Karma_Shortcode_Base {

	public static $element_name = 'karma_column';

	public function wrapper_classes( $classes, $atts ) {

		$classes[] = 'karma-col-sm-' . $atts[ 'sm_size' ];
		$classes[] = 'karma-col-md-' . $atts[ 'md_size' ];
		$classes[] = 'karma-col-lg-' . $atts[ 'lg_size' ];
		$classes[] = 'karma-col-xl-' . $atts[ 'xl_size' ];
		return $classes;

	}

	public static function render( $atts, $content ) {

		$atts = shortcode_atts(
			array(
				'sm_size'   	=> '12',
				'md_size'   	=> '12',
				'lg_size'   	=> '12',
				'xl_size'   	=> '12',
				'element_key'	=> '',
				'rightspace'    => '20',
				'leftspace'     => '20',
				'extraclass'	=> '',
				'rightspace'	=> '10',
				'leftspace'		=> '10',

			)
			, $atts
		);

		return "<div class='"
			. "karma-column"
			. " karma-column-" . $atts[ 'element_key' ]
			. " karma-col-sm-" . $atts[ 'sm_size' ]
			. " karma-col-md-" . $atts[ 'md_size' ]
			. " karma-col-lg-" . $atts[ 'lg_size' ]
			. " karma-col-xl-" . $atts[ 'xl_size' ]
			. "'> " . do_shortcode( $content ) . "</div>";

	}

	public static function js_render() {

		return "<div class='karma-column karma-col-sm-{{ data.attributes.shortcode_attributes.sm_size }} karma-col-md-{{ data.attributes.shortcode_attributes.md_size }} karma-col-lg-{{ data.attributes.shortcode_attributes.lg_size }} karma-col-xl-{{ data.attributes.shortcode_attributes.xl_size }}  {{ data.attributes.extra_class }}'> {{ data.attributes.shortcode_attributes.shortcode_content }} </div>";

	}

	public function map() {

		$map = array(
			'setting-panel' => array(
				"title" 	=> esc_attr__( "Column Setting", 'karma' ),
				"params"    => array(
					array(
						"name"  => "extraclasslabel",
						"type"  => Karma_Builder_Setting_Panel::TITLE,
						"label" => esc_attr__( "Extra class name", 'karma' ),

					),

					array(
						"name"          => "extraclass",
						"type"          => Karma_Builder_Setting_Panel::TEXT,
						"label"         => esc_attr__( "Put Your URL", 'karma' ),
					),
					array(
						"name"  		=> "space",
						"type"  		=> Karma_Builder_Setting_Panel::TITLE_WITH_BACKGROUND,
						"label"			=> esc_attr__( "Spacing", 'karma' ),

					),
					array(
						"name"  	    => "leftspace",
						"type"   	    => Karma_Builder_Setting_Panel::RANGE_SLIDER,
						"label"  	    => esc_attr__( "Left padding", 'karma' ),
						'value'   	    => 20,
						'separator'	    => "container",
						"options"  		=> array(
								'min'   => 0,
								'max'   => 600,
								'step'  => 1,
								'unit'  => 'px'
						)
					),
					array(
						"name"    	  => "rightspace",
						"type"    	  => Karma_Builder_Setting_Panel::RANGE_SLIDER,
						"label"   	  => esc_attr__( "Right padding", 'karma' ),
						'value'   	  => 20,
						"options" 	  => array(
							'min' 	  => 0,
							'max' 	  => 600,
							'step'    => 1,
							'unit' 	  => 'px'
						)
					)

				)
			)
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
				"type"      => "topGizmo",
				"class"     => "karma-column-setting",
				"params"    => array(
					array(
						'type'      => 'icon-text',
						'icon'      => karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/setting-panel.svg' ),
						'text'      => 'Column',
						'showIndex' => 'true',
						'form'      => 'setting-panel',
						'className'	=> 'column-setting',
					)
				)
			),
			array(
				"type"		=> "rightSpacingGizmo",
				"className"	=> "section-right-spacing",
			),
			array(
				"type"		=> "leftSpacingGizmo",
				"className"	=> "section-left-spacing",
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
	 * @return    void
	 */
	public function render_css() {
		
		$leftSpace  = array_key_exists( 'leftspace', $this->element_attributes ) ? $this->element_attributes[ 'leftspace' ] : 20;
		$rightSpace = array_key_exists( 'rightspace', $this->element_attributes ) ? $this->element_attributes[ 'rightspace' ] : 20 ;

		$styles =  '.karma-no-gutters > .karma-builder-element > .karma-column.' . str_replace( "_", "-", static::$element_name ) . '-' . $this->element_id . '{'
		           ."padding-left:" . $leftSpace  . "px;padding-right:" . $rightSpace . "px;"
		           ."}";
		return $styles;

	}

	/**
	 * Load JS
	 *
	 *
	 * @since   1.0.0
	 * @access  public
	 * @return    void
	 */
	public function render_script() {


	}

	/**
	 * Get element info
	 *
	 *
	 * @since   1.0.0
	 * @access  public
	 * @return  array   The element info
	 */
	public function get_element_info(){

		$element_info = array(
			'elementName' => self::$element_name ,
			'icon'         => karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/section_container.svg' ),
			'category'     => array(
				'basic',
				str_replace( 'karma_', '', self::$element_name ),
			),
			'showInList'   => false ,
		);

		parent::$elements_info[ self::$element_name ] = $element_info;
		return parent::$elements_info;

	}

}