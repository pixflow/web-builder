<?php

class Karma_Column extends Karma_Shortcode_Base {

	public static $element_name = 'karma_column';

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

		);

	}

	public function wrapper_classes( $classes, $atts ) {

		$classes[] = 'karma-col-sm-' . $atts[ 'sm_size' ];
		$classes[] = 'karma-col-md-' . $atts[ 'md_size' ];
		$classes[] = 'karma-col-lg-' . $atts[ 'lg_size' ];
		$classes[] = 'karma-col-xl-' . $atts[ 'xl_size' ];
		return $classes;

	}

	public  function render( $atts, $content ) {

		$atts = shortcode_atts(
			$this->get_element_default_attributes(),
			$atts
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

	/**
	 * Return CSS property
	 *
	 *
	 * @since   1.0.0
	 * @access  public
	 * @return  array The style property of element
	 */
	public function get_css_attributes() {

		$leftSpace  = array_key_exists( 'leftspace', $this->element_attributes ) ? $this->element_attributes[ 'leftspace' ] : 20;
		$rightSpace = array_key_exists( 'rightspace', $this->element_attributes ) ? $this->element_attributes[ 'rightspace' ] : 20 ;
		$styles = array(
			'selector-prefix' => '.karma-no-gutters ' ,
			'property'        => array(
				'padding-left' => $leftSpace . "px" ,
				'padding-right' => $rightSpace . "px",
			)
		);
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

		$block = '' ;
		return $block;

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

}