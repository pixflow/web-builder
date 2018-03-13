<?php

namespace KarmaBuilder\Elements\DescribeElement;
/** Importing, Aliases, and Name Resolution */
use KarmaBuilder\Elements\Karma_Section;
use KarmaBuilder\SettingPanel\Karma_Builder_Setting_Panel as Karma_Builder_Setting_Panel;
use KarmaBuilder\Helper\Karma_Helper_Utility as Karma_Helper_Utility;

/**
 * This file describes the Section element
 *
 * A class definition that includes Section element maps and information which builder needs
 *
 * @link       http://pixflow.net
 */

/**
 * Describe Section element.
 *
 * This includes base methods and variable that describe section element
 *
 *
 * @since      0.1.0
 * @package    Karma_Builder
 * @subpackage Karma_Builder/elements/karma_section
 * @author     Pixflow <info@pixflow.net>
 */
class Karma_Section_Describe extends Karma_Section {


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
			'setting-panel'    => array(
				"title"	=> esc_attr__( "Section Setting", 'karma' ),
				"height" => "384",
				"params" => array(
					array(
						"name"	=> "structure",
						"type"	=> Karma_Builder_Setting_Panel::RADIO_IMAGE,
						"label"	=> esc_attr__( "Grid options", 'karma' ),
						'value'	=> "full",
						"class" => "radio-image-border-hover",
						"field"	=> array(

							array(
								'image'	=> Karma_Helper_Utility::karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/section_container.svg' ),
								'style' => 'padding-left:29px; padding-right: 19px; ',
								'title'	=> "Full screen",
								'value'	=> "full",
							),
							array(
								'image'	=> Karma_Helper_Utility::karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/section_full.svg' ),
								'style' => 'padding-left: 19px; padding-right: 38px; ',
								'title'	=> "Container",
								'value'	=> "container"
							),

						)
					),
					array(
						"name"	=> "title",
						"type"	=> Karma_Builder_Setting_Panel::TITLE_WITH_BACKGROUND,
						"label"	=> esc_attr__( "Spacing", 'karma' )
					),
					array(
						"name"		=> "space",
						"type"		=> Karma_Builder_Setting_Panel::RANGE_SLIDER,
						"label"		=> esc_attr__( "Top & bottom spacing", 'karma' ),
						'value'		=> 0,
						"options"	=> array(
							'value'	=> 0,
							'min'   => 0,
							'max'   => 800,
							'step'  => 1,
							'unit'  => 'px'
						)
					),
					array(
						"name"			=> "extraclass",
						"type"			=> Karma_Builder_Setting_Panel::TEXT,
						"label"			=> __( "Class Name", 'karma' ),
						"group"			=> "Advance option"

					),
				)
			),

			'layout-panel'		=> array(
				'title'		=> __( 'Column Layout', 'karma' ),
				'params'	=> array(
					array(
						"name"	=> 'gridlayout' ,
						"type"	=> Karma_Builder_Setting_Panel::GRID,
					),
					array(
						"name"	=> "grid",
						"type"	=> Karma_Builder_Setting_Panel::RADIO_IMAGE,
						"label"	=> esc_attr__( "Grid options", 'karma' ),
						'value'	=> "",
						"class" => "radio-image-opacity-hover",
						"field"	=> array(

							array(
								'image'	=> Karma_Helper_Utility::karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/grid-1.svg' ),
								'value'	=> "[12]",
							),
							array(
								'image'	=> Karma_Helper_Utility::karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/grid-2.svg' ),
								'value'	=> "[6,6]",
							),
							array(
								'image'	=> Karma_Helper_Utility::karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/grid-3.svg' ),
								'value'	=> "[4,4,4]",
							),
							array(
								'image'	=> Karma_Helper_Utility::karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/grid-4.svg' ),
								'value'	=> "[3,3,3,3]",
							),
							array(
								'image'	=> Karma_Helper_Utility::karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/grid-5.svg' ),
								'value'	=> "[8,4]",
							),
							array(
								'image'	=> Karma_Helper_Utility::karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/grid-6.svg' ),
								'value'	=> "[4,8]",
							),
							array(
								'image'	=> Karma_Helper_Utility::karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/grid-7.svg' ),
								'value'	=> "[3,6,3]",
							),
							array(
								'image'	=> Karma_Helper_Utility::karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/grid-8.svg' ),
								'value'	=> "[2,2,2,2,2,2]",
							),


						)
					),
					array(
						"name"	=> "title",
						"type"	=> Karma_Builder_Setting_Panel::TITLE_WITH_BACKGROUND,
						"label"	=> esc_attr__( "Spacing", 'karma' )
					),
					array(
						"name"		=> "columnspace",
						"type"		=> Karma_Builder_Setting_Panel::RANGE_SLIDER,
						"label"		=> esc_attr__( "Space between column", 'karma' ),
						'value'		=> 0,
						"options"	=> array(
							'value'	=> 0,
							'min'   => 0,
							'max'   => 100,
							'step'  => 1,
							'unit'  => 'px'
						)
					),
				)
			),

			'background-panel'	=> array(
				"title"	=> esc_attr__( "Background Setting", 'karma' ),
				'height'	=> '499',
				'params'	=> array(
					array(
						'name'      => 'backgroundtype' ,
						'type'      => Karma_Builder_Setting_Panel::TAB ,
						'value'		=> 'color',
						'params'	=> array(
							array(
								'name' 		=> 'image',
								'icon' 		=> Karma_Helper_Utility::karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/image-tab.svg' ),
								'text' 		=> esc_attr__( "Image", 'karma' ),
							),
							array(
								'name' 		=> 'color',
								'icon' 		=> Karma_Helper_Utility::karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/color-tab.svg' ),
								'text' 		=> esc_attr__( "Color", 'karma' ),
							),
							array(
								'name' 		=> 'video',
								'icon' 		=> Karma_Helper_Utility::karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/video-tab.svg' ),
								'text' 		=> esc_attr__( "Video", 'karma' ),
							),
						)
					),
					array(
						'name'  => 'backgroundcolor',
						'type'  => Karma_Builder_Setting_Panel::COLOR_PICKER,
						"label" => esc_attr__( "Background Color", 'karma' ),
						'id'    => uniqid( 'kama-colorpicker-controller-' ),
						"dependency" => array(
							"controller" => "backgroundtype",
							"value"      => "color"
						)
					),
					array(
						'name'      => 'backgroundimage' ,
						'type'      => Karma_Builder_Setting_Panel::UNSPLASH ,
						"dependency" => array(
							"controller" => "backgroundtype",
							"value"      => "image"
						)
					),
					array(
						"name"		=> "backgroundsetting",
						"type"		=> Karma_Builder_Setting_Panel::SWITCH_PANEL,
						"label"		=> esc_attr__( "Background Setting", 'karma' ),
						"form"      => "background-setting-panel",
						"height"	=> "392",
						"action"	=> "open",
						"dependency" => array(
							"controller" => "backgroundtype",
							"value"      => "image"
						)
					),
				),
			),

			'background-setting-panel' => array(
				'title'  => __( 'Background Setting', 'karma' ),
				'params' => array(
					array(
						"name"      => "backgroundsize",
						"type"      => Karma_Builder_Setting_Panel::RADIO_IMAGE,
						"label"     => esc_attr__( "Scale", 'karma' ),
						'value'     => "cover",
						"class"     => "radio-image-border-hover",
						"field"     => array(
							array(
								'image' =>  Karma_Helper_Utility::karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/fill-image.svg' ) ,
								'style' => 'padding-left: 35px; padding-right: 18px;',
								'title' => esc_attr__( "Real size", 'karma' ),
								'value' => "contain",
							),
							array(
								'image' => Karma_Helper_Utility::karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/realsize-image.svg' ),
								'style' => 'padding-left: 18px; padding-right: 34px; ',
								'title' => esc_attr__( "Fill", 'karma' ),
								'value' => "cover",
							),
						),	
						'separator' => "container",
					),
					array(
						"name"      => 'backgroundposition',
						"type"      => Karma_Builder_Setting_Panel::IMAGE_POSITION,
						"label"     => esc_attr__( "Position", 'karma' ),
						"values"    => 'center-center',
						"separator" => "full",

					),
					array(
						"name"   => "back",
						"type"   => Karma_Builder_Setting_Panel::SWITCH_PANEL,
						"label"  => esc_attr__( "Back", 'karma' ),
						"action" => "close",
						"shape"  => "yes"
					),
				)
			)
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
				"type"		=> "innerGizmo",
				"className"	=> "section-gizmo-group",
				"params"	=> array(
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
						'type'		=> 'icon',
						'form'		=> 'setting-panel',
						'className'	=> 'karma-element-setting',
						'params'=> array(
							'icon'		=> Karma_Helper_Utility::karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/setting-panel.svg' ),

						)
					),
					array(
						'type'		=> 'icon',
						'form'		=> 'layout-panel',
						'className'	=> 'row-setting-layout',
						'params'=> array(
							'icon'		=> Karma_Helper_Utility::karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/layout.svg' ),
						)
					),
					array(
						'type'		=> 'text',
						'form'		=> 'background-panel',
						'className'	=> 'row-background-setting',
						'params'=> array(
							'value'		=> esc_attr( 'background', 'karma' ),
						)


					),
				)
			),
			array(
				"type"		=> "bothSpacingGizmo",
				"className"	=> "section-both-spacing",
			),
			array(
				"type"		=> "newSectionButton",
				'icon'		=> Karma_Helper_Utility::karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/plus-new.svg' ),
			),


			array(
				"type"		=> "innerGizmo",
				"className"	=> "section-gizmo-group-responsive",
				"params"	=> 	array(

					array(

						'type'   => 'responsiveLayout',
						'form'   	=> 'responsive-layout',
						'className' => 'karma-layout-option',
						"params" => array(
							'defaultIcon'    => Karma_Helper_Utility::karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/responsive-layout.svg' ),
							'oneColumn'      => Karma_Helper_Utility::karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/responsive-1-column.svg' ),
							'twoColumn'      => Karma_Helper_Utility::karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/responsive-2-column.svg' ),
							'threeColumn'      => Karma_Helper_Utility::karma_load_svg( KARMA_BUILDER_URL .'builder/media/svg/responsive-3-column.svg' ),
							'fourColumn'      => Karma_Helper_Utility::karma_load_svg( KARMA_BUILDER_URL .'builder/media/svg/responsive-4-column.svg' ),
						),

					),

					array(
						'type'		=> 'text',
						'form'		=> 'row-responsive-panel',
						'className'	=> 'row-responsive-setting',
						'params'=> array(
							'value'		=> esc_attr( 'Section', 'karma' ),
						)
					),
				),
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
	public function element_info(){

		$element_info = array(
			'elementName' => self::$element_name ,
			'icon'         => KARMA_BUILDER_URL . 'builder/media/svg/section_container.svg',
			'category'     => array(
				'basic',
				str_replace( 'karma_', '', self::$element_name ),
			),
			'showInList'   => false ,
		);

		return $element_info;

	}

}