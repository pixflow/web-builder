<?php

namespace KarmaBuilder\Elements;
use KarmaBuilder\ElementsManager\Karma_Shortcode_Base as Karma_Shortcode_Base;

class Karma_Section extends Karma_Shortcode_Base {

	public static $element_name = 'karma_section';

	/**
	 * Return default attributes
	 *
	 * @since 0.1.0
	 * @access public
	 *
	 * @return array
	 */
	static function get_element_default_attributes() {

		return 	array(
			'structure'				=> 'container',
			'space'					=> '70',
			'tabletspace'			=> '0',
			'mobilespace'			=> '0',
			'element_key'			=> '',
			'extraclass'			=> '',
			'columnspace'  			=> '0',
			'backgroundimage'   	=> 'none',
			'backgroundsize'		=> 'cover',
			'backgroundposition'	=> 'center-center',
			'backgroundcolor'		=> '#ffffff',
			'backgroundtype'		=> 'color',
			'visibleonmobile'		=> 'on',
			'visibleontablet'		=> 'on',

		);

	}

	public function render( $atts, $content ) {

		$atts = shortcode_atts(
			$this->get_element_default_attributes(),
			$atts
		);
		$container_class 	= ( $atts[ 'structure' ] == 'container' ) ? "karma-container" : "karma-container-fluid";
		$visible_mobile 	= '';//( 'on' == $atts['visibleonmobile'] ) ? '' : 'mobile-display-none karma-deactive-on-mobile';
		$visible_tablet 	= '';//( 'on' == $atts['visibleontablet'] ) ? '' : 'tablet-display-none karma-deactive-on-tablet';
		ob_start();
		?>

		<section
				class="karma-section-container karma-background-section <?php echo $visible_tablet ?> <?php echo $visible_mobile ?> <?php echo esc_attr( $this->background_classes( $atts ) ); ?>"
				visibe-on-tablet="<?php echo $atts[ 'visibleontablet' ] ?>"
				visibe-on-mobile="<?php echo $atts[ 'visibleonmobile' ] ?>">
			<div class='karma-section karma-section-<?php echo esc_attr( $atts[ 'element_key' ] ); ?> <?php echo esc_attr( $atts[ 'extraclass' ] ); ?>'>
				<div class='<?php echo esc_attr( $container_class ); ?> karma-row karma-no-gutters'>
					<?php echo do_shortcode( $content ); ?>
				</div>
			</div>
		</section>

		<?php
		return ob_get_clean();

	}

	public function js_render() {

		return "<# var rowContainer = ('container' == data.attributes.shortcode_attributes.structure ) ? 'karma-container' : 'karma-container-fluid'; #>"
		       . "<# var visibleMobile = '';//( 'on' == data.attributes.shortcode_attributes.visibleonmobile  ) ? '' : 'mobile-display-none karma-deactive-on-mobile';  #>"
		       . "<# var visibleTablet = '';//( 'on' == data.attributes.shortcode_attributes.visibletablet  ) ? '' : 'tablet-display-none karma-deactive-on-tablet';  #>"
		       . "<# var backgroundType = data.attributes.shortcode_attributes.backgroundtype; #>"
		       . "<# var backgroundClasses = ( 'color' == backgroundType ) ? 'karma-section-color-background' : 'karma-section-image-background karma-background-image-' + data.attributes.shortcode_attributes.backgroundsize + ' karma-background-position-' + data.attributes.shortcode_attributes.backgroundposition ; #>"
		       . '<section class="karma-section-container karma-background-section {{ backgroundClasses }} {{visibleMobile}}  {{ visibleTablet }}"  visibe-on-tablet="{{ data.attributes.shortcode_attributes.visibleontablet }}"   visibe-on-mobile="{{ data.attributes.shortcode_attributes.visibleonmobile }}" >'
		       . "<div class='karma-section karma-section-{{ data.attributes.element_key }} {{ data.attributes.shortcode_attributes.extra_class }}'>"
		       . "<div class='{{ rowContainer }} karma-row karma-no-gutters'>"
		       . "</div>"
		       . "</div>"
		       . '</section>';

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
				'postfix'  => ' .karma-section',
				'property' => array(
					'padding-top'  => self::$element_attributes[ 'space' ] . 'px',
					'padding-bottom'  => self::$element_attributes[ 'space' ] . 'px'
				),
				'tablet_property' => array(
					'padding-top'  => self::$element_attributes[ 'tabletspace' ] . 'px',
					'padding-bottom'  => self::$element_attributes[ 'tabletspace' ] . 'px'
				),
				'mobile_property' => array(
					'padding-top'  => self::$element_attributes[ 'mobilespace' ] . 'px',
					'padding-bottom'  => self::$element_attributes[ 'mobilespace' ] . 'px'
				)
			),
			array(
				'postfix'  => ' .karma-column-margin',
				'property' => array(
					'margin-left'  => self::$element_attributes[ 'columnspace' ] . 'px',
					'margin-right' => self::$element_attributes[ 'columnspace' ] . 'px',
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
	 * @since   0.1.0
	 * @access  public
	 * @return    void
	 */
	public function render_script() {

		$block = '';
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
	public function get_style_script_dependencies() {

		$dependencies = array(
			'css' => array(),
			'js'  => array()
		);

		return $dependencies;

	}

	/**
	 * return background class base on background type
	 *
	 * @param    array $attributes section attributes
	 *
	 * @since   0.1.0
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