<?php

namespace KarmaBuilder\Elements\DescribeElement;
/** Importing, Aliases, and Name Resolution */
use KarmaBuilder\Elements\Karma_Image;
use KarmaBuilder\SettingPanel\Karma_Builder_Setting_Panel as Karma_Builder_Setting_Panel;
use KarmaBuilder\Helper\Karma_Helper_Utility as Karma_Helper_Utility;

/**
 * This file describes the Image element
 *
 * A class definition that includes Image element maps and information which builder needs
 *
 * @link       http://pixflow.net
 */

/**
 * Describe Image element.
 *
 * This includes base methods and variable that describe image element
 *
 *
 * @since      0.1.0
 * @package    Karma_Builder
 * @subpackage Karma_Builder/elements/karma_image
 * @author     Pixflow <info@pixflow.net>
 */
class Karma_Image_Describe extends Karma_Image {

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
				"title"  => esc_attr__( "Image Setting", 'karma' ),
				"height" => "589",
				"params" => array(
					array(
						"name"  => "imgurl",
						"type"  => Karma_Builder_Setting_Panel::UPLOAD_IMAGE,
						"label" => esc_attr__( "Change image", 'karma' ),
						"value" => "",
					),
					array(
						"name"      => "scale",
						"type"      => Karma_Builder_Setting_Panel::RADIO_IMAGE,
						"label"     => esc_attr__( "Scale", 'karma' ),
						'value'     => "fill",
						"class"     => "radio-image-border-hover",
						"field"     => array(
							array(
								'image' => Karma_Helper_Utility::karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/realsize-image.svg' ),
								'style' => 'padding-left: 35px; padding-right: 18px;',
								'title' => esc_attr__( "Real size", 'karma' ),
								'value' => "real",
							),
							array(
								'image' => Karma_Helper_Utility::karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/fill-image.svg' ),
								'style' => 'padding-left: 18px; padding-right: 34px; ',
								'title' => esc_attr__( "Fill", 'karma' ),
								'value' => "fill",
							),
						),
						'separator' => "container",
					),
					array(
						"name"      => 'position',
						"type"      => Karma_Builder_Setting_Panel::IMAGE_POSITION,
						"label"     => esc_attr__( "Position", 'karma' ),
						"values"    => 'center-center',
						"separator" => "full",

					),
					array(
						"name"      => "action",
						"type"      => Karma_Builder_Setting_Panel::DROPDOWN,
						"label"     => esc_attr__( "Action on click", 'karma' ),
						'value'     => "none",
						'separator' => "container",
						"options"   => array(
							'none'  => array(
								'title' => esc_attr( 'None', 'karma' ),
							),
							'popup' => array(
								'title' => esc_attr( "Popup", 'karma' ),
							),
							'link'  => array(
								'title' => esc_attr( "Link", 'karma' ),
							),
						)
					),
					array(
						"name"       => "linkurl",
						"type"       => Karma_Builder_Setting_Panel::TEXT,
						"label"      => __( "URL", 'karma' ),
						"dependency" => array(
							"controller" => "action",
							"value"      => "link"
						)
					),
					array(
						"name"       => "linktarget",
						"type"       => Karma_Builder_Setting_Panel::DROPDOWN,
						"label"      => esc_attr__( "Open image on", 'karma' ),
						'value'      => "_blank",
						'separator'  => "container",
						"options"    => array(
							'_self'  => array(
								'title' => esc_attr( 'This window', 'karma' ),
							),
							'_blank' => array(
								'title' => esc_attr( "New window", 'karma' ),
							),
						),
						"dependency" => array(
							"controller" => "action",
							"value"      => "link"
						)
					),
					array(
						"name"  => "alt",
						"type"  => Karma_Builder_Setting_Panel::TEXT,
						"label" => __( "Alt", 'karma' ),
						"group" => "Advance option"
					),
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
				"className" => "image-gizmo-group",
				"params"    => array(
					array(
						'type'   => 'icon',
						'form'   => 'more-panel',
						'className' => 'karma-more-setting',
						"params" => array(
							'icon'      => Karma_Helper_Utility::karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/more.svg' ),
						)
					),
					array(
						'type'   => 'icon',
						'form'   => 'more-panel',
						'className' => 'karma-delete-element-setting ',
						"params" => array(
							'icon'      => Karma_Helper_Utility::karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/delete-element.svg' ),
						)
					),
					array(
						'type'   => 'icon',
						'form'   => 'more-panel',
						'className' => 'karma-duplicate-element-setting ',
						"params" => array(
							'icon'      => Karma_Helper_Utility::karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/duplicate-element.svg' ),
						)
					),
					array(
						'type'   => 'icon',
						'form'   => 'animation-panel',
						"params" => array(
							'icon'      => Karma_Helper_Utility::karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/animation.svg' ),
						)
					),
					array(
						'type'      => 'icon',
						'className' => 'karma-image-setting-layout',
						'form'      => 'setting-panel',
						"params"    => array(
							'icon' => Karma_Helper_Utility::karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/setting-panel.svg' ),
						)
					),
					array(
						'type'      => 'text',
						'form'      => 'background-panel',
						'className' => 'karma-image-background-setting',
						'params'    => array(
							'value' => esc_attr( 'change image', 'karma' ),
						)
					),
				)
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
				"type"      => "imageResizeGizmo",
				"className"	=> "karma-image-resize",
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
	 * @since   0.1.0
	 * @access  public
	 * @return  array   The element info
	 */
	public function element_info() {

		$element_info = array(
			'elementName' => self::$element_name,
			'icon'        => KARMA_BUILDER_URL . 'builder/media/svg/image-element.svg',
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