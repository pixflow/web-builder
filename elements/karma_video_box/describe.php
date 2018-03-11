<?php
namespace KarmaBuilder\Elements\DescribeElement;
/** Importing, Aliases, and Name Resolution */
use KarmaBuilder\Elements\Karma_Video_Box;
use KarmaBuilder\SettingPanel\Karma_Builder_Setting_Panel as Karma_Builder_Setting_Panel;
use KarmaBuilder\Helper\Karma_Helper_Utility as Karma_Helper_Utility;

/**
 * Describe video box element.
 *
 * This includes base methods and variable that describe video box element
 *
 *
 * @since      0.1.1
 * @package    Karma_Builder
 * @subpackage Karma_Builder/elements/karma_video_box
 * @author     Pixflow <info@pixflow.net>
 */
class Karma_Video_Box_Describe extends Karma_Video_Box {

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
			'setting-panel' => array(
				"title"  => esc_attr__( "Video Box Setting", 'karma' ),
				"params" => array(
					array(
						"name"  => "imgurl",
						"type"  => Karma_Builder_Setting_Panel::UPLOAD_IMAGE,
						"label" => esc_attr__( "Change image", 'karma' ),
						"value" => "",
					),

					array(
						"name"  => "videotitle",
						"type"  => Karma_Builder_Setting_Panel::TITLE,
						"label" => __( "Youtube embed URL", 'karma' ),
					),

					array(
						"name"  	=> "videourl",
						"type"  	=> Karma_Builder_Setting_Panel::TEXT,
						"label" 	=> __( "Insert web address", 'karma' ),
						"separator"	=>"full"
					),

					array(
						'name'  	=> 'coloroverlay',
						'type'  	=> Karma_Builder_Setting_Panel::COLOR_PICKER,
						"label" 	=> esc_attr__( "Color overlay", 'karma' ),
						'id'    	=> uniqid( 'kama-video-box-colorpicker-controller-' ),
						"separator"	=>"full",
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
							'name'  	=> 'colorbackground',
							'type'  	=> Karma_Builder_Setting_Panel::COLOR_PICKER,
							"label" 	=> esc_attr__( "Color Background", 'karma' ),
							'id'    	=> uniqid( 'kama-video-box-colorpicker-controller-' ),
							"separator"	=>"full",
							"params" => array(
								'opacity'           => true,
								'multiColor'        => false,

							)
					),

					array(
						"name"		=> "videoheight",
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
	 * @since   0.1.1
	 * @access  public
	 * @return    array    Gizmo controller of all elements
	 */
	public function gimzo_controllers() {

		$controllers = array(
			array(
				"type"      => "outerGizmo",
				"selector" 	=> '.karma-element-content',
				"className" => "video-box-gizmo-group",
				"params"    => array(
					array(
						'type'   	=> 'icon',
						'form'   	=> 'more-panel',
						'className' => 'karma-more-setting',
						"params" => array(
							'icon'	=> Karma_Helper_Utility::karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/more.svg' ),
						)
					),
					array(
						'type'   	=> 'icon',
						'form'   	=> 'more-panel',
						'className' => 'karma-delete-element-setting ',
						"params" => array(
							'icon'  => Karma_Helper_Utility::karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/delete-element.svg' ),
						)
					),
					array(
						'type'   	=> 'icon',
						'form'   	=> 'more-panel',
						'className' => 'karma-duplicate-element-setting ',
						"params" => array(
							'icon'  => Karma_Helper_Utility::karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/duplicate-element.svg' ),
						)
					),

					array(
						'type'      => 'multiDropDown',
						'icon'		=>Karma_Helper_Utility::karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/magic.svg' ),
						'model'		=>'animation',
						'params'	=> array(
								array(
										'icon'	=> KARMA_BUILDER_URL . 'builder/media/svg/none-animation.svg',
										'text'	=>'None',
										'value' =>'none'
								),
								array(
										'icon'	=> KARMA_BUILDER_URL . 'builder/media/svg/boxshadow.svg' ,
										'text'	=>'Shadow',
										'value' =>'shadowModel'
								),
								array(
										'icon'	=> KARMA_BUILDER_URL . 'builder/media/svg/boxshadow-with-animation.svg' ,
										'text'	=>'Shadow with animation',
										'value' =>'shadowAnimationModel'
								),
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
						'className' => 'karma-video-setting-layout',
						'form'      => 'setting-panel',
						"params"    => array(
							'icon' => Karma_Helper_Utility::karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/video-setting.svg' ),
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
							'value' => __( 'Edit', 'karma' ) . ' ' . str_replace( '_', ' ', str_replace( 'karma_', '', self::$element_name ) )
						)
					)
				)
			),
			
			array(
				"type"      => "outerGizmo",
				"selector" 	=> '.karma-video-box-title',
				"className" => "video-text-gizmo-group",
				"params"    => array(
					array(
						'type'      => 'color',
						'className' => esc_attr( 'karma-color-picker-gizmo' ),
						"params"    => array(
							'opacity'       => false,
							'multiColor'    => false,
							'model'			=> 'titlecolor'
						)
					),
					array(
						'type'   => 'typography',
						'className' => esc_attr( 'karma-video-gizmo-typography' ),
						"params" => array(
							'defaultIcon'  		=> KARMA_BUILDER_URL . 'builder/media/svg/h3-typography.svg',
							'h1Typography'      => KARMA_BUILDER_URL . 'builder/media/svg/h1-typography.svg',
							'h2Typography'      => KARMA_BUILDER_URL . 'builder/media/svg/h2-typography.svg',
							'h3Typography'      => KARMA_BUILDER_URL . 'builder/media/svg/h3-typography.svg',
							'h4Typography'      => KARMA_BUILDER_URL . 'builder/media/svg/h4-typography.svg',
							'h5Typography'      => KARMA_BUILDER_URL . 'builder/media/svg/h5-typography.svg',
							'h6Typography'      => KARMA_BUILDER_URL . 'builder/media/svg/h6-typography.svg',
							'pTypography'		=> KARMA_BUILDER_URL . 'builder/media/svg/p-typography.svg',
							'typographyLink' 	=> esc_attr( 'Typography', 'karma' ),
							'model'				=>'titletag'

						),
					),
				)
			),
			array(
				"type"      => "outerGizmo",
				"selector" 	=> '.karma-video-box-description',
				"className" => "karma-video-box-description-gizmo",
				"params"    => array(
					array(
						'type'      => 'color',
						'form'   	=> 'animation-panel',
						'className' => esc_attr('karma-color-picker-gizmo'),
						"params"    => array(
							'opacity'       => false,
							'multiColor'    => false,
							'model'			=> 'descriptioncolor'
						)
					),
					array(
						'type'   => 'typography',
						"params" => array(
							'defaultIcon'  		=> KARMA_BUILDER_URL . 'builder/media/svg/h3-typography.svg',
							'h1Typography'      => KARMA_BUILDER_URL . 'builder/media/svg/h1-typography.svg',
							'h2Typography'      => KARMA_BUILDER_URL . 'builder/media/svg/h2-typography.svg',
							'h3Typography'      => KARMA_BUILDER_URL . 'builder/media/svg/h3-typography.svg',
							'h4Typography'      => KARMA_BUILDER_URL . 'builder/media/svg/h4-typography.svg',
							'h5Typography'      => KARMA_BUILDER_URL . 'builder/media/svg/h5-typography.svg',
							'h6Typography'      => KARMA_BUILDER_URL . 'builder/media/svg/h6-typography.svg',
							'pTypography'		=> KARMA_BUILDER_URL . 'builder/media/svg/p-typography.svg',
							'typographyLink' 	=> esc_attr( 'Typography', 'karma' ),
							'model'				=>'descriptiontag'
						),
					),
				)
			),
			array(
				"type"      => "outerGizmo",
				"selector" 	=> '.karma-video-box-link-content',
				"className" => "karma-video-box-link-gizmo",
				"params"    => array(
                    array(
                        'type'   	=> 'hidden',
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
						'type'		=>'link',
						"params" => array(
							'defaultIcon'  		=> KARMA_BUILDER_URL . 'builder/media/svg/gizmo-link.svg',
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
	 * @since   0.1.1
	 * @access  public
	 * @return  array   The element info
	 */
	public function element_info() {

		$element_info = array(
			'elementName' => self::$element_name,
			'icon'        => KARMA_BUILDER_URL . 'builder/media/svg/video-box.svg',
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