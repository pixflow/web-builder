<?php

namespace KarmaBuilder\Elements\DescribeElement;
/** Importing, Aliases, and Name Resolution */
use KarmaBuilder\Elements\Karma_Column;
use KarmaBuilder\SettingPanel\Karma_Builder_Setting_Panel as Karma_Builder_Setting_Panel;
use KarmaBuilder\Helper\Karma_Helper_Utility as Karma_Helper_Utility;

/**
 * This file describes the Column element
 *
 * A class definition that includes Column element maps and information which builder needs
 *
 * @link       http://pixflow.net
 */

/**
 * Describe Column element.
 *
 * This includes base methods and variable that describe column element
 *
 *
 * @since      0.1.0
 * @package    Karma_Builder
 * @subpackage Karma_Builder/elements/karma_column
 * @author     Pixflow <info@pixflow.net>
 */
class Karma_Column_Describe extends Karma_Column {


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
				"title" 	=> esc_attr__( "Column Setting", 'karma' ),
				"params"    => array(
					array(
						"name"  => "extraclasslabel",
						"type"  => Karma_Builder_Setting_Panel::TITLE,
						"label" => esc_attr__( "Extra class name", 'karma' ),
					),

					array(
						"name"          => "extraclass",
						"type"          => Karma_Builder_Setting_Panel::TEXT,
						"label"         => esc_attr__( "Class Name", 'karma' ),
					),
					array(
						"name"  		=> "space",
						"type"  		=> Karma_Builder_Setting_Panel::TITLE_WITH_BACKGROUND,
						"label"			=> esc_attr__( "Spacing", 'karma' ),

					),
					array(
						"name"  	    => "leftspace",
						"type"   	    => Karma_Builder_Setting_Panel::RANGE_SLIDER,
						"label"  	    => esc_attr__( "Left padding", 'karma' ),
						'value'   	    => 20,
						'separator'	    => "container",
						"options"  		=> array(
							'min'   => 0,
							'max'   => 600,
							'step'  => 1,
							'unit'  => 'px'
						)
					),
					array(
						"name"    	  => "rightspace",
						"type"    	  => Karma_Builder_Setting_Panel::RANGE_SLIDER,
						"label"   	  => esc_attr__( "Right padding", 'karma' ),
						'value'   	  => 20,
						"options" 	  => array(
							'min' 	  => 0,
							'max' 	  => 600,
							'step'    => 1,
							'unit' 	  => 'px'
						)
					)

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
				"type"      => "topGizmo",
				"class"     => "column-gizmo-group",
				"params"    => array(
					array(
						'type'      => 'icon-text',
						'icon'      => Karma_Helper_Utility::karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/setting-panel.svg' ),
						'text'      => 'Column',
						'showIndex' => 'true',
						'form'      => 'setting-panel',
						'className'	=> 'column-setting',
					)
				)
			),
			array(
				"type"		=> "rightSpacingGizmo",
				"className"	=> "section-right-spacing",
			),
			array(
				"type"		=> "leftSpacingGizmo",
				"className"	=> "section-left-spacing",
			),
			array(
				"type"		=> "innerGizmo",
				"className"	=> "column-gizmo-group-responsive",
				"params"	=> 	array(

					array(
						'type' => 'hidden',
						'form' => 'visibility',
						'device' => 'karma-responsive'
					),
					array(
						'type'		=> 'text',
						'form'		=> 'column-responsive-panel',
						'className'	=> 'column-responsive-setting',
						'params'=> array(
							'value'		=> esc_attr( 'Column', 'karma' ),
							'mode'		=> 'count',
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
			'elementName'   => self::$element_name ,
			'icon'          => KARMA_BUILDER_URL . 'builder/media/svg/section_container.svg',
			'category'      => array(
				'basic',
				str_replace( 'karma_', '', self::$element_name ),
			),
			'showInList'   => false ,
		);

		return $element_info;

	}

}