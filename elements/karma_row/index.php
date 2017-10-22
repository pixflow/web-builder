<?php
class Karma_Row extends Karma_Shortcode_Base {

	public static $element_name = 'karma_row';

	public function render( $atts, $content ) {

		$atts = shortcode_atts(
			array(
				'structure'		=> 'container',
				'space'       	=> '200' ,
				'element_key'	=> '',
				'extra_class'	=> '',
			)
			, $atts
		);
		$container_class = ($atts['structure'] == 'container')?"container":"karma-container-fluid";

		return "<div class='karma_row karma_row_".$atts['element_key'].' '.$atts['extra_class']."'>"
				."<div class='".$container_class." '>"
					. do_shortcode($content)
				."</div>"
			. " </div>";

	}

	public function js_render() {

		return "<div class='karma_row {{data.structure}}' style='padding-top: {{data.space}}px; padding-bottom: {{data.space}}px;'> {{ data.shortcode_content }} </div>";

	}

	public function map() {

		$map = array(
			"name"		=> "Row",
			"params"	=> array(
				array(
					"name"		=> "structure",
					"type"		=> Karma_Builder_Setting_Panel::IMAGE,
					"label"		=> esc_attr__( "Structure", 'karma' ),
					"value"		=> 'full',

					"options"	=> array(
						'full'		=> "full.png",
						'container'	=> "container.png"
					)
				),
				array(
					"name"		=> "space",
					"type"		=> Karma_Builder_Setting_Panel::RANGE_SLIDER,
					"label"		=> esc_attr__( "Top & Bottom Spacing", 'karma' ),
					'value'		=> 0,
					"options"	=> array(
						'min'	=> 0,
						'max'	=> 600,
						'step'	=> 1,
						'unit'	=> 'em'
					)
				),
				array(
					"name"		=> "extra_class",
					"type"		=> Karma_Builder_Setting_Panel::TEXT,
					"label"		=> esc_attr__( "Class Name", 'karma' ),
					'value'		=> 'Put your text',
					"group"		=> "advance"
				),
				array(
					"name"		=> "radio-image",
					"type"		=> Karma_Builder_Setting_Panel::RADIO_IMAGE,
					"label"		=> esc_attr__( "images", 'karma' ),
					"columns"    => 2,
					'value'		=> 0,

					"field"		=> array(

						array(
							'image' 			=> karma_load_svg(KARMA_BUILDER_URL . 'public/media/svg/2col.svg'),
							'title' 			=> "Container width",
							'value' 			=> "1",
						),
						array(
							'image' => karma_load_svg(KARMA_BUILDER_URL . 'public/media/svg/2col.svg'),
							'title' => "Container width",
							'value' 	=> "2"
						),
						array(
							'image' => karma_load_svg(KARMA_BUILDER_URL . 'public/media/svg/2col.svg'),
							'title' => "Container width",
							'value' 	=> "3"
						),
						array(
							'image' => karma_load_svg(KARMA_BUILDER_URL . 'public/media/svg/2col.svg'),
							'title' => "Container width",
							'value' 	=> "4"
						),
						array(
							'image' => karma_load_svg(KARMA_BUILDER_URL . 'public/media/svg/2col.svg'),
							'title' => "Container width",
							'value' 	=> "5"
						),
						array(
							'image' => karma_load_svg(KARMA_BUILDER_URL . 'public/media/svg/2col.svg'),
							'title' => "Container width",
							'value' 	=> "6"
						)
					)
				),
				array(
					"name"		=> "title",
					"type"		=> Karma_Builder_Setting_Panel::TITLE,
					"label"		=> esc_attr__( "Spacing", 'karma' ),

					'value'		=> 'Spacing'
				)	,
		array(
					"name"		=> "title2",
					"type"		=> Karma_Builder_Setting_Panel::TITLE2,
					"label"		=> esc_attr__( "Grid option", 'karma' ),

					'value'		=> 'Grid option'
				)
			)
		);


		parent::$elements_map['karma_row'] = $map;
		return parent::$elements_map;
	}

}