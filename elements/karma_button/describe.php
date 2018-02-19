<?php

namespace KarmaBuilder\Elements\DescribeElement;
/** Importing, Aliases, and Name Resolution */
use KarmaBuilder\Elements\Karma_Button;
use KarmaBuilder\SettingPanel\Karma_Builder_Setting_Panel as Karma_Builder_Setting_Panel;
use KarmaBuilder\Helper\Karma_Helper_Utility as Karma_Helper_Utility;

/**
 * This file describes the Button element
 *
 * A class definition that includes Button element maps and information which builder needs
 *
 * @link       http://pixflow.net
 */

/**
 * Describe Button element.
 *
 * This includes base methods and variable that describe Button element
 *
 *
 * @since      0.1.1
 * @package    Karma_Builder
 * @subpackage Karma_Builder/elements/karma_button
 * @author     Pixflow <info@pixflow.net>
 */
class Karma_Button_Describe extends Karma_Button {

	/**
	 * Adds different input fields to allow the user to change and customize the element settings.
	 *
	 * @since 0.1.1
	 * @access public
	 *
	 * @return array Element panels
	 */
	public function map() {

		$map = array(

		);

		return $map;

	}

	/**
	 * Set the gizmo controller
	 *
	 *
	 * @since   0.1.1
	 * @access  public
	 * @return    array    Gizmo controller of all elements
	 */
	public function gimzo_controllers() {

		$controllers = array(
			array(
				"type"      => "outerGizmo",
				"selector" 	=> '.karma-element-content',
				"className" => "button-gizmo-group",
				"title"		=> esc_attr__( "Image Box Setting", 'karma' ),
				"params"    => array(
					array(
						'type'   	=> 'icon',
						'form'   	=> 'more-panel',
						'className' => 'karma-more-setting',
						"params" 	=> array(
							'icon'      => Karma_Helper_Utility::karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/more.svg' ),
						)
					),
					array(
						'type'   	=> 'icon',
						'form'   	=> 'more-panel',
						'className' => 'karma-delete-element-setting ',
						"params" 	=> array(
							'icon'      => Karma_Helper_Utility::karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/delete-element.svg' ),
						)
					),
					array(
						'type'  	=> 'icon',
						'form'   	=> 'more-panel',
						'className' => 'karma-duplicate-element-setting ',
						"params" 	=> array(
							'icon'      => Karma_Helper_Utility::karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/duplicate-element.svg' ),
						)
					),

					array(
						'type'      => 'color',
						'className' => esc_attr( 'karma-color-picker-gizmo' ),
						"params"    => array(
							'opacity'           => false,
							'multiColor'        => true,
							'firstColorTitle'  => 'General',
							'secondColorTitle' => 'Text',
							'model'			    => 'generalcolor',
							'secondColorModel'  => 'textcolor'
						)
					),

					array(
						'type'		=>'link',
						'className' => esc_attr( 'karma-button-link' ),
						"params" 	=> array(
							'defaultIcon'  		=> KARMA_BUILDER_URL . 'builder/media/svg/gizmo-link.svg',
							'model'				=> 'linkurl'
						),
					),

					array(

						'type'    =>'sliderAndRadioButton',
						"params"   => array(
							'defaultIcon'		=> KARMA_BUILDER_URL . 'builder/media/svg/border-radius.svg',
							'value'				=> '3',
							'min'				=> '0',
							'max'				=> '20',
							'unit'				=>'px',
							'rangeModel'		=> 'rangemodel' ,
							'type'				=> 'type',
							"field"				=> array(
								array(
										'text'  => "Fill",
										'value' => "fill",
								),
								array(
										'text'  => "outline",
										'value' => "outline",
								),
							),

						)
					),


				),

			),
			array(
				"type"      => "titleGizmo",
				'selector' 	=> '.karma-element-content',
				"params"    => array(
					array(
						'type'      => 'text',
						'className' => 'element-name-text-gizmo',
						'params'    => array(
								'value' => __( 'Edit', 'karma' ) . ' ' . str_replace( '_', ' ', str_replace( 'karma_', '', self::$element_name ) )
						)
					)
				)
			),
			array(
					"type"		=> "topSpacingGizmo",
					"className"	=> "section-top-spacing",
					'selector' 	=> '.karma-element-content',
			),
		);

		return $controllers;

	}

	/**
	 * Element Panel uses this method to know how to display the element
	 *
	 *
	 * @since   0.1.1
	 * @access  public
	 * @return  array   The element info
	 */
	public function element_info() {

		$element_info = array(
			'elementName' => self::$element_name,
			'icon'        => KARMA_BUILDER_URL . 'builder/media/svg/button-element.svg',
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