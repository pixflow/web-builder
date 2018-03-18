<?php

namespace KarmaBuilder\Elements;
use KarmaBuilder\ElementsManager\Karma_Shortcode_Base as Karma_Shortcode_Base;

/**
 * The file that defines the Button element class
 *
 * A class definition that includes base function of Button element
 *
 * @link       http://pixflow.net
 */

/**
 * Button element class.
 *
 * This includes base methods and variable that need for Button element
 *
 *
 * @since      0.1.1
 * @package    Karma_Builder
 * @subpackage Karma_Builder/elements/karma_button
 * @author     Pixflow <info@pixflow.net>
 */
class Karma_Button extends Karma_Shortcode_Base {

	/**
	 * Element name
	 *
	 * @since 0.1.1
	 * @access public
	 */
	public static $element_name = 'karma_button';

	/**
	 * Return default attributes
	 *
	 * @since 0.1.1
	 * @access public
	 *
	 * @return array
	 */
	static function get_element_default_attributes(){

		return 	array(


			'element_key'   			=> 'kb' ,
			'type'						=> 'fill' ,
			'linkurl'       			=> '#',
			'target'	    			=> '_self' ,
			'linkcontent'				=> esc_attr__( "Explore more", 'karma' ),
			'topspacepadding'			=> '10',
			'tablettopspacepadding'		=> '16',
			'mobiletopspacepadding'		=> '16',
			'generalcolor'				=> '#419CF8',
			'textcolor'					=> '#fff',
			'fillbuttonborderradius'	=> '3px',
			'outlinebuttonborderradius'	=> '3px',
			'rangemodel'           		=>'3',
			'elementalign'				=> 'center',

		);

	}

	/**
	 * Render Button element output.
	 *
	 * Written in PHP and used to generate the final HTML.
	 *
	 * @param array $attributes Attribute of element
	 * @param string $content Content of element
	 *
	 * @since 0.1.1
	 * @access public
	 *
	 * @return string Html output
	 */
	public function render( $attributes, $content ) {

		$attributes = shortcode_atts(
			$this->get_element_default_attributes(),
			$attributes
		);

		$class = ( 'fill' == $attributes['type'] ) ? 'karma-button-fill' : 'karma-button-outline' ;
		ob_start();
		?>
		<div class='karma-button karma-button-<?php echo esc_attr( $attributes['element_key'] ); ?>'>
			<div class="karma-button-container <?php echo $class; ?> ">
				<a class="karma-button-link karma-document-click" href="<?php echo $attributes['linkurl']; ?>"
				   target="<?php echo $attributes['target']; ?>">
					<span class="karma-button-editable" ><?php echo  $attributes['linkcontent'] ; ?></span>
				</a>
			</div>
		</div>
		<?php
		return ob_get_clean();

	}

	/**
	 * Render button element template.
	 *
	 * Written in JS and used to for underscore template.
	 *
	 * @since 0.1.1
	 * @access public
	 *
	 * @return string Template output
	 */
	public function js_render() {

		$js_template = '<# var content = ( "" ===  data.attributes.shortcode_content.trim() ) ? "See More" : data.attributes.shortcode_content; #>'
			. '<# var newClass = ( "fill" == data.attributes.shortcode_attributes.type ) ? "karma-button-fill" : "karma-button-outline"; #>'
			. '<div class="karma-button karma-button-{{ data.attributes.element_key }} " >'
			. '<div class="karma-button-container {{ newClass }}">'
			. '<a class="karma-button-link karma-document-click" href="{{{ data.attributes.shortcode_attributes.linkurl }}}" target="{{ data.attributes.shortcode_attributes.target }}" >'
			. '<span class="karma-button-editable" > {{{ data.attributes.shortcode_attributes.linkcontent }}}'
			. '</span>'
			. '</a>'
			. '</div>'
			. '</div>';

		return $js_template;

	}


	/**
	 * Return CSS property
	 * Note : postfix or prefix are the CSS selectors
	 * @example if yor prefix is .karma-prefix so your CSS selector is .karma-prefix .karma-section-{element-key}
	 *
	 * @since   0.1.1
	 * @access  public
	 * @return  array The style property of element
	 */
	public static function get_css_attributes() {

		$styles = array(
			array(
				'property'		=> array(
				'padding-top' 	=> self::$element_attributes[ 'topspacepadding' ] . "px",
				),
				'tablet_property' => array(
					'padding-top'  => self::$element_attributes[ 'tablettopspacepadding' ] . 'px',
				),
				'mobile_property' => array(
					'padding-top'  => self::$element_attributes[ 'mobiletopspacepadding' ] . 'px',
				)
			),

			array(
				'postfix'	=> ' .karma-button-fill .karma-button-link span ',
				'property'	=> array(
					'color'		=> self::$element_attributes[ 'textcolor' ],
				)
			),

			array(
				'postfix'	=> ' .karma-button-container.karma-button-fill',
				'property'	=> array(
					'background-color'	=> self::$element_attributes[ 'generalcolor' ],
					'border-color'	=> self::$element_attributes[ 'generalcolor' ],
				)
			),

			array(
				'postfix'	=> ' .karma-button-container.karma-button-outline',
				'property'	=> array(
					'border-color'	=> self::$element_attributes[ 'generalcolor' ],
				)
			),

			array(

				'postfix'	=> ' .karma-button-container',
				'property'	=> array(
					'border-radius'	=> self::$element_attributes[ 'rangemodel' ] . 'px',
				)
			),

			array(

				'postfix'  => ' .karma-button-outline .karma-button-link span ',
				'property' => array(
					'color' => self::$element_attributes[ 'generalcolor' ],
				)
			),

			array(
				'postfix'  => ' .karma-button-container',
				'property' => array(
					'border-radius' => self::$element_attributes[ 'rangemodel' ] . 'px',
				)
			),
		);
		return $styles;

	}

	/**
	 * Load JS
	 *
	 *
	 * @since   0.1.1
	 * @access  public
	 * @return  void
	 */
	public function render_script() {


	}

	/**
	 * List of dependencies
	 *
	 *
	 * @since   0.1.1
	 * @access  public
	 * @return  array
	 */
	public function get_style_script_dependencies(){

		$dependencies = array(
			'css' => array() ,
			'js' => array(

			)
		);

		return $dependencies ;

	}

}