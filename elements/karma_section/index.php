<?php

class Karma_Section extends Karma_Shortcode_Base {

	public static $element_name = 'karma_section';

	/**
	 * Return default attributes
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @return array
	 */
	static function get_element_default_attributes(){

		return 	array(
			'structure'				=> 'container',
			'space'					=> '70',
			'element_key'			=> '',
			'extraclass'			=> '',
			'columnspace'  			=> '0',
			'backgroundimage'   	=> 'none',
			'backgroundsize'		=> 'cover',
			'backgroundposition'	=> 'center-center',
			'backgroundcolor'		=> '#ffffff',
			'backgroundtype'		=> 'color'

		);

	}

	public function render( $atts, $content ) {

		$atts = shortcode_atts(
			$this->get_element_default_attributes(),
			$atts
		);
		$container_class = ( $atts[ 'structure' ] == 'container' ) ? "karma-container" : "karma-container-fluid";
		ob_start();
		?>

		<section class="karma-section-container karma-background-section <?php echo esc_attr( $this->background_classes( $atts ) ); ?>">
			<div class='karma-section karma-section-<?php echo esc_attr( $atts[ 'element_key' ] ); ?> <?php echo esc_attr( $atts[ 'extraclass' ] ); ?>'
			     style="padding-top:<?php echo esc_attr( $atts['space'] );?>px;padding-bottom:<?php echo esc_attr( $atts['space'] ); ?>px;">
				<div class='<?php echo esc_attr( $container_class ); ?> karma-row karma-no-gutters'>
					<?php echo do_shortcode( $content ); ?>
				</div>
			</div>
		</section>

		<?php
		return ob_get_clean();

	}

	public function js_render() {

		return "<# var rowContainer = ('container' == data.changed.structure ) ? 'karma-container' : 'karma-container-fluid'; #>"
			. '<section class="karma-section-container karma-background-section {{ backgroundClasses }}">'
			. "<div class='karma-section karma-section-{{ data.attributes.element_key }} {{ data.attributes.shortcode_attributes.extra_class }}' style='padding-bottom:{{ data.attributes.shortcode_attributes.space }}px;padding-top:{{ data.attributes.shortcode_attributes.space }}px;'>"
			. "<# var backgroundType = data.attributes.shortcode_attributes.backgroundtype; #>"
			. "<# var backgroundClasses = ( 'color' == backgroundType ) ? 'karma-section-color-background' : 'karma-section-image-background karma-background-image-{{ data.attributes.shortcode_attributes.backgroundsize }} karma-background-position-{{ data.attributes.shortcode_attributes.backgroundposition }}'; #>"
			. "<div class='{{ rowContainer }} karma-row karma-no-gutters'>"
			. "</div>"
			. "</div>"
			. '</section>' ;

	}


	/**
	 * Return CSS property
	 * Note : postfix or prefix are the CSS selectors
	 * @example if yor prefix is .karma-prefix so your CSS selector is .karma-prefix .karma-section-{element-key}
	 *
	 * @since   1.0.0
	 * @access  public
	 * @return  array The style property of element
	 */
	public static function get_css_attributes(){

		$styles = array(
			array(
				'postfix' => ' .karma-column-margin',
				'property' => array(
					'margin-left' => self::$element_attributes['columnspace'] . 'px',
					'margin-right' => self::$element_attributes['columnspace'] . 'px',
				)
			),
			array(
				'postfix'  => ' .karma-background-section.karma-section-color-background',
				'property' => array(
					'background-color' => ( '' == self::$element_attributes[ 'backgroundcolor' ] ) ? "#ffffff" : self::$element_attributes[ 'backgroundcolor' ],
				)
			),
			array(
				'postfix'  => ' .karma-background-section.karma-section-image-background',
				'property' => array(
					'background-image' => ( 'none' == self::$element_attributes[ 'backgroundimage' ] ) ? "none" : "url(" . self::$element_attributes[ 'backgroundimage' ] . ")",
				)
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

	/**
	 * return background class base on background type
	 *
	 * @param    array $attributes section attributes
	 * @since   1.0.0
	 * @access  public
	 * @return  string the list of classes of background
	 */
	public function background_classes( $attributes ) {

		switch ( $attributes[ 'backgroundtype' ] ) {
			case 'color':
				$background_classes = 'karma-section-color-background';
				break;
			case 'image':
				$background_classes = "karma-section-image-background karma-background-image-" . $attributes[ 'backgroundsize' ] . " karma-background-position-" . $attributes[ 'backgroundposition' ];
				break;
			case 'video':
				$background_classes = 'karma-section-video-background';
				break;
			default:
				$background_classes = 'karma-section-color-background';
		}
		return $background_classes;

	}


}