<?php
/**
 * This file describes the Text element
 *
 * A class definition that includes Text element maps and information which builder needs
 *
 * @link       http://pixflow.net
 */

/**
 * Describe Text element.
 *
 * This includes base methods and variable that describe text element
 *
 *
 * @since      1.0.0
 * @package    Karma_Builder
 * @subpackage Karma_Builder/elements/karma_text
 * @author     Pixflow <info@pixflow.net>
 */
class Karma_Text_Describe extends Karma_Text {


	/**
	 * Adds different input fields to allow the user to change and customize the element settings.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @return array Element panels
	 */
	public function map() {

		$map = array(
			'setting-panel' => array(
				"title"  => esc_attr__( "Text Setting", 'karma' ),
				"height" => "570",
				"params" => array(

				),
			),
		);


		return $map;

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
				"type"      => "outerGizmo",
				"className" => "text-gizmo-group",
				"params"    => array(
					array(
						'type'      => 'colorPicker',
						'className' => 'karma-color-picker-gizmo',
						"params"    => array(
							'value' => $this->element_attributes[ 'color' ],
						)
					)
				)
			)
		);

		return $controllers;

	}

	/**
	 * Get element info
	 *
	 *
	 * @since   1.0.0
	 * @access  public
	 * @return  array   The element info
	 */
	public function element_info() {

		$element_info = array(
			'elementName' => self::$element_name,
			'icon'        => karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/image-element-icon.svg' ),
			'category'    => array(
				'basic',
				'media',
				str_replace( 'karma_', '', self::$element_name ),
			),
			'showInList'  => true,
		);

		return $element_info;

	}

}