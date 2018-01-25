<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * The file that defines the stylesheet class
 *
 *
 * @link       http://pixflow.net
 * @since      0.1.0
 *
 * @package    Karma_Builder
 * @subpackage Karma_Builder/includes
 */

/**
 * Stylesheet class
 * A class definition that for managing CSS attributes
 *
 *
 * @since      0.1.0
 * @package    Karma_Builder
 * @subpackage Karma_Builder/includes
 * @author     Pixflow <info@pixflow.net>
 */
class Karma_Stylesheet {


	/**
	 * Create CSS blocks .
	 *
	 * @param    array  $element_attributes CSS attribute of elements
	 * @since    0.1.0
	 *
	 * @return string CSS blocks
	 */
	public function create_css_block( array $element_attributes ){

		if( empty( $element_attributes['css'] ) ){
			return '';
		}
		$css_block = '' ;
		foreach ( $element_attributes['css'] as $element_style ){
			$prefix = isset( $element_style["prefix"] ) ? $element_style["prefix"] : '' ;
			$postfix = isset( $element_style["postfix"] ) ? $element_style["postfix"] : '' ;
			$selector = $this->create_selector( $element_attributes['selector'], $prefix, $postfix );
			$property = $this->parse_property( $element_style['property'] );
			$css_block .= $selector . '{' . $property . '}';
		}

		return $css_block;

	}

	/**
	 * Create CSS selector .
	 *
	 * @param    string $selector   Element selector
	 * @param    string $prefix     Element prefix
	 * @param    string $postfix    Element postfix
	 *
	 *
	 * @since    0.1.0
	 *
	 * @return string Element selector
	 */
	protected function create_selector( $selector, $prefix, $postfix ){

		return $prefix . $selector . $postfix;

	}


	/**
	 * Create CSS property and value for each element .
	 *
	 * @param    array  $attributes CSS attribute of elements
	 * @since    0.1.0
	 *
	 * @return string CSS properties
	 */
	protected function parse_property( array $attributes ){

		$selector_content = '';
		foreach ( $attributes as $property => $value ){
			$selector_content .= $property . ':' . $value . ';';
		}
		return $selector_content;

	}


	/**
	 * Create default styles for elements
	 *
	 * @since    0.1.0
	 *
	 * @return string CSS properties
	 */
	public function create_default_styles(){

		$builder_instance = Karma_Factory_Pattern::$builder_loader;
		$elements = apply_filters( 'karma_elements', $builder_instance::$element_filename );
		$block = '';
		foreach ( $elements as $element ){
			$class_name = 'Karma_' . ucfirst( $element );
			if ( class_exists( $class_name ) ) {
				$class_name::$element_attributes = $class_name::get_element_default_attributes();
				$elements_style_attributes = array(
					'selector' =>  '.karma-builder-element[data-name="' . strtolower( $class_name ) . '"]',
					'css'      => $class_name::get_css_attributes()
				);
				$block .= $this->create_css_block( $elements_style_attributes );
			}
		}

		ob_start();
		?>
			<style id="karma-global-elements-style">
				<?php echo $block; ?>
			</style>
		<?php
		return ob_get_flush();

	}

}