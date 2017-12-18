<?php
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
 * @since      1.0.0
 * @package    Karma_Builder
 * @subpackage Karma_Builder/elements/karma_text
 * @author     Pixflow <info@pixflow.net>
 */
class Karma_Text extends Karma_Shortcode_Base {

	/**
	 * Element name
	 *
	 * @since 1.0.0
	 * @access public
	 */
	public static $element_name = 'karma_text';

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
			'element_key'   => 'kb' ,
			'tag'           => 'div',
			'color'			=> '#000',
			'align'         => 'left'
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
	 * @since 1.0.0
	 * @access public
	 *
	 * @return string Html output
	 */
	public function render( $attributes, $content ) {

		$attributes = shortcode_atts(
			$this->get_element_default_attributes(),
			$attributes
		);

		$content = ( '' === trim( $content ) ) ? 'Click here to edit content': $content;
		$content = '<' . $attributes['tag'] . ' class="karma-text-content karma-text-tag karma-document-click" >' . $content . '</' . $attributes['tag'] . '>';

		ob_start();
		?>
		<div class='karma-text karma-text-<?php echo esc_attr( $attributes['element_key'] ); ?>'>
			<div class="karma-editable-content" contentEditable="true" >
				<?php echo $content; ?>
			</div>
		</div>
		<?php
		return ob_get_clean();

	}

	/**
	 * Render text element template.
	 *
	 * Written in JS and used to for underscore template.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @return string Template output
	 */
	public function js_render() {


		$js_template = '<# var content = ( "" === data.content.trim() ) ? "Click here to edit content..." : data.content; #>';
		$js_template .= '<div class="karma-text karma-text-{{ data.element_key }}" >'
			. '<div class="karma-editable-content" contentEditable="true" >'
			. '<{{{ data.tag }}} class="karma-text-content karma-text-tag karma-document-click" contentEditable="true" ><# print( content ); #></{{{ data.tag }}}>'
			. '</div>'
			. '</div>';
		return $js_template;

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

		$styles = array(
			'selector-postfix' => ' .karma-text-tag',
			'property'         => array(
				'text-align' => $this->element_attributes[ 'align' ],
				'color'      => $this->element_attributes[ 'color' ]
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