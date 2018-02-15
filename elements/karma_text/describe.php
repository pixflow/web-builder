<?php
namespace KarmaBuilder\Elements\DescribeElement;

/** Importing, Aliases, and Name Resolution */
use KarmaBuilder\Elements\Karma_Text;
use KarmaBuilder\SettingPanel\Karma_Builder_Setting_Panel as Karma_Builder_Setting_Panel;
use KarmaBuilder\Helper\Karma_Helper_Utility as Karma_Helper_Utility;

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
 * @since      0.1.0
 * @package    Karma_Builder
 * @subpackage Karma_Builder/elements/karma_text
 * @author     Pixflow <info@pixflow.net>
 */
class Karma_Text_Describe extends Karma_Text {


	/**
	 * Adds different input fields to allow the user to change and customize the element settings.
	 *
	 * @since 0.1.0
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
	 * @since   0.1.0
	 * @access  public
	 * @return    array    Gizmo controller of all elements
	 */
	public function gimzo_controllers() {

		$controllers = array(
			array(
				"type"      => "outerGizmo",
				"selector" 	=> '.karma-element-content',
				"className" => esc_attr("text-gizmo-group"),
				'selector' 	=> '.karma-element-content',
				"params"    => array(
					array(
							'type'   	=> 'icon',
							'form'   	=> 'more-panel',
							'className' => 'karma-more-setting',
							"params" => array(
									'icon'      => Karma_Helper_Utility::karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/more.svg' ),
							)
					),
					array(
							'type'   	=> 'icon',
							'form'   	=> 'more-panel',
							'className' => 'karma-delete-element-setting ',
							"params" => array(
									'icon'      => Karma_Helper_Utility::karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/delete-element.svg' ),
							)
					),
					array(
							'type'   	=> 'icon',
							'form'   	=> 'more-panel',
							'className' => 'karma-duplicate-element-setting ',
							"params" => array(
									'icon'      => Karma_Helper_Utility::karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/duplicate-element.svg' ),
							)
					),
					array(

						'type'   => 'fontStyle',
						"params" => array(
							'defaultIcon'    => Karma_Helper_Utility::karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/bold.svg' ),
							'bold'      => Karma_Helper_Utility::karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/bold.svg' ),
							'italic'      => Karma_Helper_Utility::karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/italic.svg' ),
							'underline'      => Karma_Helper_Utility::karma_load_svg( KARMA_BUILDER_URL .'builder/media/svg/underline.svg' ),
						),

					),
					array(
						'type'   => 'alignment',
						'form'   => 'animation-panel',
						"params" => array(
							'defaultIcon'			=> KARMA_BUILDER_URL . 'builder/media/svg/leftalign.svg',
							'leftAlignIcon' 		=> KARMA_BUILDER_URL . 'builder/media/svg/leftalign.svg',
							'centerAlignIcon'		=> KARMA_BUILDER_URL . 'builder/media/svg/centeralign.svg',
							'rightAlignIcon'		=> KARMA_BUILDER_URL . 'builder/media/svg/rightalign.svg',
						),
					),
					array(
						'type'      => 'color',
						'className' => esc_attr('karma-color-picker-gizmo'),
						"params"    => array(
							'opacity'       => false,
							'multiColor'    => false
							)
					),
					array(
						'type'   => 'typography',
						'form'   => 'animation-panel',
						"params" => array(
							'defaultIcon'  		=> KARMA_BUILDER_URL . 'builder/media/svg/h3-typography.svg',
							'h1Typography'      => KARMA_BUILDER_URL . 'builder/media/svg/h1-typography.svg',
							'h2Typography'      => KARMA_BUILDER_URL . 'builder/media/svg/h2-typography.svg',
							'h3Typography'      => KARMA_BUILDER_URL . 'builder/media/svg/h3-typography.svg',
							'h4Typography'      => KARMA_BUILDER_URL . 'builder/media/svg/h4-typography.svg',
							'h5Typography'      => KARMA_BUILDER_URL . 'builder/media/svg/h5-typography.svg',
							'h6Typography'      => KARMA_BUILDER_URL . 'builder/media/svg/h6-typography.svg',
							'pTypography'		=> KARMA_BUILDER_URL . 'builder/media/svg/p-typography.svg',
							'h1Typography'      => KARMA_BUILDER_URL . 'builder/media/svg/h1-typography.svg',
							'typographyLink' 	=> esc_attr( 'Typography', 'karma' ),

						),
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
							'value' => __( 'Edit', 'karma' ) . ' ' . str_replace( 'karma_', '', self::$element_name )
						)
					)
				)
			),
		array(
				"type"		=> "topSpacingGizmo",
				"className"	=> "element-top-spacing",
				'selector' 	=> '.karma-element-content',
			),
		);

		return $controllers;

	}

	/**
	 * Get element info
	 *
	 *
	 * @since   0.1.0
	 * @access  public
	 * @return  array   The element info
	 */
	public function element_info() {

		$element_info = array(
			'elementName' => self::$element_name,
			'icon'        => KARMA_BUILDER_URL . 'builder/media/svg/text-element.svg',
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