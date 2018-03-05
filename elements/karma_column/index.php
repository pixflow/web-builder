<?php

namespace KarmaBuilder\Elements;
use KarmaBuilder\ElementsManager\Karma_Shortcode_Base as Karma_Shortcode_Base;
use KarmaBuilder\FileSystem\Karma_File_System as File_System;

class Karma_Column extends Karma_Shortcode_Base {

	public static $element_name = 'karma_column';

	/**
	 * Return default attributes
	 *
	 * @since 0.1.0
	 * @access public
	 *
	 * @return array
	 */
	static function get_element_default_attributes(){

		return 	array(
			'sm_size'   		=> '12',
			'md_size'   		=> '12',
			'lg_size'   		=> '12',
			'xl_size'   		=> '12',
			'element_key'		=> '',
			'extraclass'		=> '',
			'rightspace'		=> '10',
			'leftspace'			=> '10',
			'tabletleftspace'	=> '70',
			'mobileleftspace'	=> '0',
			'tabletrightspace'	=> '70',
			'mobilerightspace'	=> '0',
			'visibleonmobile'	=> 'on',
			'visibleontablet'	=> 'on',

		);

	}

	public function wrapper_classes( $classes, $atts ) {
		
		$classes[] = 'karma-col-sm-' . $atts[ 'sm_size' ];
		$classes[] = 'karma-col-md-' . $atts[ 'md_size' ];
		$classes[] = 'karma-col-lg-' . $atts[ 'lg_size' ];
		$classes[] = 'karma-col-xl-' . $atts[ 'xl_size' ];
		return $classes;

	}

	public function render( $atts, $content ) {

		$atts = shortcode_atts(
			$this->get_element_default_attributes(),
			$atts
		);
		$visible_mobile 	= ( 'on' == $atts['visibleonmobile'] ) ? '' : 'mobile-display-none karma-deactive-on-mobile';
		$visible_tablet 	= ( 'on' == $atts['visibleontablet'] ) ? '' : 'tablet-display-none karma-deactive-on-tablet';
		return "<div class='"
			. "karma-column"
			. " karma-column-" . $atts[ 'element_key' ]
			. " karma-col-sm-" . $atts[ 'sm_size' ]
			. " karma-col-md-" . $atts[ 'md_size' ]
			. " karma-col-lg-" . $atts[ 'lg_size' ]
			. " karma-col-xl-" . $atts[ 'xl_size' ]
			. ' ' . $visible_mobile
			. ' ' . $visible_tablet
			. "'visibe-on-tablet='"
			. $atts[ 'visibleontablet' ]
			."'visibe-on-mobile='"
			. $atts[ 'visibleonmobile' ]
			."' > <div class='karma-column-margin' >" .  do_shortcode( $content ) . "</div></div>";

	}

	public static function js_render() {

		return "<# var visibleMobile = ( 'on' == data.attributes.shortcode_attributes.visibleonmobile  ) ? '' : 'mobile-display-none karma-deactive-on-mobile';  #>
				<# var visibleTablet = ( 'on' == data.attributes.shortcode_attributes.visibleontablet  ) ? '' : 'tablet-display-none karma-deactive-on-mobile';  #>
				<div visibe-on-tablet='{{ data.attributes.shortcode_attributes.visibleontablet }} '  visibe-on-mobile='{{ data.attributes.shortcode_attributes.visibleonmobile }} ' class='karma-column karma-column-{{ data.attributes.element_key }}  karma-col-sm-{{ data.attributes.shortcode_attributes.sm_size }} karma-col-md-{{ data.attributes.shortcode_attributes.md_size }} karma-col-lg-{{ data.attributes.shortcode_attributes.lg_size }} karma-col-xl-{{ data.attributes.shortcode_attributes.xl_size }}  {{ data.attributes.extra_class }}  <# print( visibleMobile ); #>  <# print( visibleTablet ); #>'> 
				<div class='karma-column-margin' >{{ data.attributes.shortcode_attributes.shortcode_content }} </div>
				</div>";

	}

	/**
	 * Return CSS property
	 * Note : postfix or prefix are the CSS selectors
	 * @example if yor prefix is .karma-prefix so your CSS selector is .karma-prefix .karma-section-{element-key}
	 *
	 * @since   0.1.0
	 * @access  public
	 * @return  array The style property of element
	 */
	public static function get_css_attributes() {

		$styles = array(
			array(
				'prefix' => '.karma-no-gutters > ' ,
				'postfix' => '> .karma-column',
				'property'        => array(
					'padding-left' => self::$element_attributes[ 'leftspace' ] . "px" ,
					'padding-right' => self::$element_attributes[ 'rightspace' ] . "px",
				),
				'tablet_property' => array(
						'padding-left'  => self::$element_attributes[ 'tabletleftspace' ] . 'px',
						'padding-right'  => self::$element_attributes[ 'tabletrightspace' ] . 'px'
				),
				'mobile_property' => array(
						'padding-left'  => self::$element_attributes[ 'mobileleftspace' ] . 'px',
						'padding-right'  => self::$element_attributes[ 'mobilerightspace' ] . 'px'
				)
			)
		);
		return $styles;

	}

	/**
	 * Load JS
	 *
	 *
	 * @since   0.1.0
	 * @access  public
	 * @return    void
	 */
	public function render_script() {

	//	$block = File_System::file_get_content();
		$instance = File_System::get_instance();
		$block = $instance->file_get_content( KARMA_BUILDER_URL . 'elements/karma_column/script.js' );
		return $block;

	}

	/**
	 * List of dependencies
	 *
	 *
	 * @since   0.1.0
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