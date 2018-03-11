<?php

namespace KarmaBuilder\Elements\DescribeElement;
/** Importing, Aliases, and Name Resolution */
use KarmaBuilder\Elements\Karma_Image_Box;
use KarmaBuilder\SettingPanel\Karma_Builder_Setting_Panel as Karma_Builder_Setting_Panel;
use KarmaBuilder\Helper\Karma_Helper_Utility as Karma_Helper_Utility;

/**
 * Describe Image and text box element.
 *
 * This includes base methods and variable that describe Image and text box element
 *
 *
 * @since      0.1.0
 * @package    Karma_Builder
 * @subpackage Karma_Builder/elements/karma_image_text_box
 * @author     Pixflow <info@pixflow.net>
 */
class Karma_Image_Box_Describe extends Karma_Image_Box {

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
				"title"  => esc_attr__( "Image Box Setting", 'karma' ),
				"params" => array(
					array(
						"name"  => "imgurl",
						"type"  => Karma_Builder_Setting_Panel::UPLOAD_IMAGE,
						"label" => esc_attr__( "Change image", 'karma' ),
						"value" => "",
					),
					array(
						"name" 	=> "backgroundsize",
						"type" 	=> Karma_Builder_Setting_Panel::RADIO_IMAGE,
						"label"	=> esc_attr__( "Scale", 'karma' ),
						'value'	=> "fill",
						"class"	=> "radio-image-border-hover",
						"field"	=> array(
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
						"name"      => 'backgroundposition',
						"type"      => Karma_Builder_Setting_Panel::IMAGE_POSITION,
						"label"     => esc_attr__( "Image Position", 'karma' ),
						"values"    => 'center-center',
						"separator" => "full",

					),
					array(
						'name'   => 'overlaycolor',
						'type'   => Karma_Builder_Setting_Panel::COLOR_PICKER,
						"label"  => esc_attr__( "Color overlay", 'karma' ),
						'id'     => uniqid( 'kama-image-text-box-colorpicker-controller-' ),
						"separator" => "full",
						"params" => array(
							'opacity'           => true,
							'multiColor'        => false,
							'presetColors'      => 'rgba(20, 20, 20, 0.1)-'
							                       . 'rgba(45, 155, 240, 0.1)-'
							                       . 'rgba(81, 96, 254, 0.1)-'
							                       . 'rgba(251, 0, 83, 0.1)-'
							                       . 'rgba(20, 20, 20, 0.2)-'
							                       . 'rgba(45, 155, 240, 0.2)-'
							                       . 'rgba(81, 96, 254, 0.2)-'
							                       . 'rgba(251, 0, 83, 0.2)-'
							                       . 'rgba(20, 20, 20, 0.5)-'
							                       . 'rgba(45, 155, 240, 0.5)-'
							                       . 'rgba(81, 96, 254, 0.5)-'
							                       . 'rgba(251, 0, 83, 0.5)-'
							                       . 'rgba(20, 20, 20, 0.8)-'
							                       . 'rgba(45, 155, 240, 0.8)-'
							                       . 'rgba(81, 96, 254, 0.8)'
						)
					),
					array(
						'name'  	=> 'backgroundcolor',
						'type'  	=> Karma_Builder_Setting_Panel::COLOR_PICKER,
						"label" 	=> esc_attr__( "Color background", 'karma' ),
						'id'    	=> uniqid( 'kama-image-text-box-colorpicker-controller-' ),
						"separator" => "full",
						"params" 	=> array(
							'opacity'           => true,
							'multiColor'        => false,
						)
					),
					array(
						"name"		=> "imageheight",
						"type"		=> Karma_Builder_Setting_Panel::RANGE_SLIDER,
						"label"		=> esc_attr__( "Height", 'karma' ),
						'value'		=> 0,
						"options"	=> array(
							'value'	=> 0,
							'min'   => 200,
							'max'   => 1000,
							'step'  => 1,
							'unit'  => 'px',
						)
					),
					array(
						"name"		=> "radiusbox",
						"type"		=> Karma_Builder_Setting_Panel::RANGE_SLIDER,
						"label"		=> esc_attr__( "Radius Box", 'karma' ),
						'value'		=> 0,
						"group" 	=> "Advance option",
						"options"	=> array(
							'value'	=> 0,
							'min'   => 0,
							'max'   => 30,
							'step'  => 1,
							'unit'  => 'px',
						)
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
				"selector"  => '.karma-element-content',
				"className" => "image-box-gizmo-group",
				"params"    => array(
					array(
						'type'      => 'icon',
						'form'      => 'more-panel',
						'className' => 'karma-more-setting',
						"params"    => array(
							'icon' => Karma_Helper_Utility::karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/more.svg' ),
						)
					),
					array(
						'type'      => 'icon',
						'form'      => 'more-panel',
						'className' => 'karma-delete-element-setting ',
						"params"    => array(
							'icon' => Karma_Helper_Utility::karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/delete-element.svg' ),
						)
					),
					array(
						'type'      => 'icon',
						'form'      => 'more-panel',
						'className' => 'karma-duplicate-element-setting ',
						"params"    => array(
							'icon' => Karma_Helper_Utility::karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/duplicate-element.svg' ),
						)
					),

					array(
						'type'   => 'position',
						"params" => array(
							'icon' => Karma_Helper_Utility::karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/position.svg' ),
							'model' => 'textposition'

						)
					),
					array(
						'type'      => 'icon',
						'className' => 'karma-image-setting-layout',
						'form'      => 'setting-panel',
						"params"    => array(
							'icon' => Karma_Helper_Utility::karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/image-setting.svg' ),
						)
					),
					array(
						'type'      => 'multiDropDown',
						'icon'		=>Karma_Helper_Utility::karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/magic.svg' ),
						'model'		=>'animation',
						'params'	=> array(
							array(
									'icon'	=>Karma_Helper_Utility::karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/none-animation.svg' ),
									'text'	=>'none',
									'value' =>'none'
							),
							array(
									'icon'	=>Karma_Helper_Utility::karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/none-animation.svg' ),
									'text'	=>'shadow',
									'value' =>'shadowModel'
							),
							array(
									'icon'	=>Karma_Helper_Utility::karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/none-animation.svg' ),
									'text'	=>'shadow with animation',
									'value' =>'shadowAnimationModel'
							),
						)
					)

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
							'value' => __( 'Edit', 'karma' ) . ' ' . str_replace( '_', ' ', str_replace( 'karma_', '', self::$element_name ) )
						)
					)
				)
			),
			array(
				"type"      => "outerGizmo",
				"selector"  => '.karma-image-text-box-title',
				"className" => "image-text-gizmo-group",
				"params"    => array(
					array(
						'type'      => 'color',
						'className' => esc_attr( 'karma-color-picker-gizmo' ),
						"params"    => array(
							'opacity'    => false,
							'multiColor' => false,
							'model'      => 'titlecolor'
						)
					),
					array(
						'type'      => 'typography',
						'className' => esc_attr( 'karma-image-text-gizmo-typography' ),
						"params"    => array(
							'defaultIcon'    => KARMA_BUILDER_URL . 'builder/media/svg/h3-typography.svg',
							'h1Typography'   => KARMA_BUILDER_URL . 'builder/media/svg/h1-typography.svg',
							'h2Typography'   => KARMA_BUILDER_URL . 'builder/media/svg/h2-typography.svg',
							'h3Typography'   => KARMA_BUILDER_URL . 'builder/media/svg/h3-typography.svg',
							'h4Typography'   => KARMA_BUILDER_URL . 'builder/media/svg/h4-typography.svg',
							'h5Typography'   => KARMA_BUILDER_URL . 'builder/media/svg/h5-typography.svg',
							'h6Typography'   => KARMA_BUILDER_URL . 'builder/media/svg/h6-typography.svg',
							'pTypography'    => KARMA_BUILDER_URL . 'builder/media/svg/p-typography.svg',
							'h1Typography'   => KARMA_BUILDER_URL . 'builder/media/svg/h1-typography.svg',
							'typographyLink' => esc_attr( 'Typography', 'karma' ),
							'model'          => 'titletag'

						),
					),
				)
			),
			array(
				"type"      => "outerGizmo",
				"selector"  => '.karma-image-text-box-description',
				"className" => "karma-image-text-box-description-gizmo",
				"params"    => array(
					array(
						'type'      => 'color',
						'form'      => 'animation-panel',
						'className' => esc_attr( 'karma-color-picker-gizmo' ),
						"params"    => array(
							'opacity'    => false,
							'multiColor' => false,
							'model'      => 'descriptioncolor'
						)
					),
					array(
						'type'   => 'typography',
						'form'   => 'animation-panel',
						"params" => array(
							'defaultIcon'    => KARMA_BUILDER_URL . 'builder/media/svg/h3-typography.svg',
							'h1Typography'   => KARMA_BUILDER_URL . 'builder/media/svg/h1-typography.svg',
							'h2Typography'   => KARMA_BUILDER_URL . 'builder/media/svg/h2-typography.svg',
							'h3Typography'   => KARMA_BUILDER_URL . 'builder/media/svg/h3-typography.svg',
							'h4Typography'   => KARMA_BUILDER_URL . 'builder/media/svg/h4-typography.svg',
							'h5Typography'   => KARMA_BUILDER_URL . 'builder/media/svg/h5-typography.svg',
							'h6Typography'   => KARMA_BUILDER_URL . 'builder/media/svg/h6-typography.svg',
							'pTypography'    => KARMA_BUILDER_URL . 'builder/media/svg/p-typography.svg',
							'h1Typography'   => KARMA_BUILDER_URL . 'builder/media/svg/h1-typography.svg',
							'typographyLink' => esc_attr( 'Typography', 'karma' ),
							'model'          => 'descriptiontag'
						),
					),
				)
			),
			array(
				"type"      => "outerGizmo",
				"selector"  => '.karma-image-text-box-link-content',
				"className" => "karma-image-text-box-link-gizmo",
				"params"    => array(
					array(
						'type'   	=> 'hidden',
						'form' 		=> 'visibility',
						'device' => 'karma-desktop'

					),

                    array(
                        'type'      => 'color',
                        'className' => esc_attr( 'karma-color-picker-gizmo' ),
                        "params"    => array(
                            'opacity'           => false,
                            'multiColor'        => true,
                            'firstColorTitle'   => 'General',
                            'secondColorTitle'  => 'Text',
                            'model'             => 'generalcolor',
                            'secondColorModel'  => 'textcolor'
                        )
                    ),

                    array(
						'type'   => 'link',
						"params" => array(
							'defaultIcon' => KARMA_BUILDER_URL . 'builder/media/svg/gizmo-link.svg',
						)
					),
					array(
						'type'		=>'sliderAndRadioButton',
						"params" 	=> array(
							'defaultIcon'  		=> KARMA_BUILDER_URL . 'builder/media/svg/border-radius.svg',
							'value'			=> '0',
							'min'			=> '0',
							'max'			=> '20',
							'unit'			=>'px',
							'rangeModel' 	=> 'rangemodel' ,
							'type' 			=> 'type',
							"field"			=> array(
									array(
											'text'	=> "Fill",
											'value' => "fill",
									),
									array(
											'text'	=> "Outline",
											'value' => "outline",
									),
									array(
											'text'	=> "Link",
											'value' => "link",
									),
							),

						)
						),
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
	 * @since   0.1.0
	 * @access  public
	 * @return  array   The element info
	 */
	public function element_info() {

		$element_info = array(
			'elementName' => self::$element_name,
			'icon'        => KARMA_BUILDER_URL . 'builder/media/svg/image-box.svg',
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