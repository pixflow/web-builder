<?php

namespace KarmaBuilder\Elements;
use KarmaBuilder\ElementsManager\Karma_Shortcode_Base as Karma_Shortcode_Base;

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
 * @since      0.1.0
 * @package    Karma_Builder
 * @subpackage Karma_Builder/elements/karma_text
 * @author     Pixflow <info@pixflow.net>
 */
class Karma_Text extends Karma_Shortcode_Base {

	/**
	 * Element name
	 *
	 * @since 0.1.0
	 * @access public
	 */
	public static $element_name = 'karma_text';

	/**
	 * Return default attributes
	 *
	 * @since 0.1.0
	 * @access public
	 *
	 * @return array
	 */
	static function get_element_default_attributes(){

		return array(
			'element_key'  				=> 'kb',
			'tag'           			=> 'h5',
			'color'						=> '#394959',
			'align'       				=> 'center',
			'topspacepadding'			=> '10',
			'tablettopspacepadding'		=> '16',
			'mobiletopspacepadding'		=> '16',
			'elementalign'				=> 'center',
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
	 * @since 0.1.0
	 * @access public
	 *
	 * @return string Html output
	 */
	public function render( $attributes, $content ) {

		$attributes = shortcode_atts(
			$this->get_element_default_attributes(),
			$attributes
		);

		$content = ( '' === trim( $content ) ) ? 'Write down something cool': $content;
		$content = '<' . $attributes['tag'] . ' class="karma-text-content karma-text-tag karma-document-click karma-editable-content ">' . $content . '</' . $attributes['tag'] . '>';

		ob_start();
		?>
		<div class='karma-text karma-text-<?php echo esc_attr( $attributes['element_key'] ); ?>'>
				<?php echo $content; ?>
		</div>
		<?php
		return ob_get_clean();

	}

	/**
	 * Render text element template.
	 *
	 * Written in JS and used to for underscore template.
	 *
	 * @since 0.1.0
	 * @access public
	 *
	 * @return string Template output
	 */
	public function js_render() {


		$js_template = '<# var content = ( "" ===  data.attributes.shortcode_content.trim() ) ? "Write down something cool" : data.attributes.shortcode_content; #>';
		$js_template .= '<div class="karma-text karma-text-{{ data.attributes.element_key }}" >'
			. '<{{{ data.attributes.shortcode_attributes.tag }}} class="karma-text-content karma-text-tag karma-document-click karma-editable-content" ><# print( content ); #></{{{  data.attributes.shortcode_attributes.tag }}}>'
			. '</div>';
		return $js_template;

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
				'postfix'		 => ' .karma-text-tag',
				'property'       => array(
				'text-align'	 => self::$element_attributes[ 'align' ],
				'color'     	 => self::$element_attributes[ 'color' ],
				)
			),
			array(
				'property'		=> array(
					'padding-top' 	=> self::$element_attributes[ 'topspacepadding' ] . "px"	,
				),
				'tablet_property' => array(
					'padding-top'  => self::$element_attributes[ 'tablettopspacepadding' ] . 'px',
				),
				'mobile_property' => array(
					'padding-top'  => self::$element_attributes[ 'mobiletopspacepadding' ] . 'px',
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