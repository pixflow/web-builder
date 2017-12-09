<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * The file that defines the stylesheet class
 *
 *
 * @link       http://pixflow.net
 * @since      1.0.0
 *
 * @package    Karma_Builder
 * @subpackage Karma_Builder/includes
 */

/**
 * Stylesheet class
 * A class definition that for managing CSS attributes
 *
 *
 * @since      1.0.0
 * @package    Karma_Builder
 * @subpackage Karma_Builder/includes
 * @author     Pixflow <info@pixflow.net>
 */
class Stylesheet {


	/**
	 * Create CSS blocks .
	 *
	 * @param    array  $element_attributes CSS attribute of elements
	 * @since    1.0.0
	 *
	 * @return string CSS blocks
	 */
	public function create_css_block( array $element_attributes ){

		if( ! isset( $element_attributes['css']['property'] ) ){
			return ;
		}
		$prefix = isset( $element_attributes['css']["selector-prefix"] ) ? $element_attributes['css']["selector-prefix"] : '' ;
		$postfix = isset( $element_attributes['css']["selector-postfix"] ) ? $element_attributes['css']["selector-postfix"] : '' ;
		$selector = $this->create_selector( $element_attributes['selector'], $prefix, $postfix );
		$property= $this->parse_property( $element_attributes['css']['property'] );
		$css_block = $selector . '{' . $property . '}';
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
	 * @since    1.0.0
	 *
	 * @return string Element selector
	 */
	protected function create_selector( $selector, $prefix, $postfix ){

		return $prefix . '.' . $selector . $postfix;

	}


	/**
	 * Create CSS property and value for each element .
	 *
	 * @param    array  $attributes CSS attribute of elements
	 * @since    1.0.0
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

}