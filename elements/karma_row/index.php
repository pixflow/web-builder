<?php
class Karma_Row extends Karma_Shortcode_Base {

	public static $element_name = 'karma_row';

	public function render( $atts, $content ) {

		return "<div class='karma_row'> " . do_shortcode($content) . " </div>";

	}

	public function js_render() {

		return "<div class='karma_row'> {{ attributes.shortcode_content }} </div>";

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
					"group"		=> 'advance',
					"options"	=> array(
						'full'		=> "full.png",
						'container'	=> "container.png"
					)
				),
				array(
					"name"		=> "space",
					"type"		=> Karma_Builder_Setting_Panel::RANGE,
					"label"		=> esc_attr__( "Top & Bottom Spacing", 'karma' ),
					'value'		=> 0,
					"options"	=> array(
						'min'	=> 0,
						'max'	=> 600,
						'step'	=> 1,
						'unit'	=> 'px'
					)
				),
				array(
					"name"		=> "extra_class",
					"type"		=> Karma_Builder_Setting_Panel::TEXT,
					"label"		=> esc_attr__( "Class Name", 'karma' ),
					"group"		=> 'advance',
					'value'		=> 'coulmn'
				),
				array(
					"name"		=> "radio-image",
					"type"		=> Karma_Builder_Setting_Panel::RADIO_IMAGE,
					"label"		=> esc_attr__( "images", 'karma' ),
					"columns"    => 2,
					'value'		=> 0,
					"field"		=> array(

						array(
							'image' => KARMA_BUILDER_URL . 'public/media/build1-example.png',
							'title' 	=> "Container width",
							'value' 	=> "1"
						),
						array(
							'image' => KARMA_BUILDER_URL . 'public/media/build1-example.png',
							'title' => "Container width",
							'value' 	=> "2"
						),
						array(
							'image' => KARMA_BUILDER_URL . 'public/media/build1-example.png',
							'title' => "Container width",
							'value' 	=> "3"
						),
						array(
							'image' => KARMA_BUILDER_URL . 'public/media/build1-example.png',
							'title' => "Container width",
							'value' 	=> "4"
						),
						array(
							'image' => KARMA_BUILDER_URL . 'public/media/build1-example.png',
							'title' => "Container width",
							'value' 	=> "5"
						),
						array(
							'image' => KARMA_BUILDER_URL . 'public/media/build1-example.png',
							'title' => "Container width",
							'value' 	=> "6"
						)
					)
				),
				array(
					"name"		=> "title",
					"type"		=> Karma_Builder_Setting_Panel::TITLE,
					"label"		=> esc_attr__( "Class Name", 'karma' ),
					"group"		=> 'advance',
					'value'		=> 'Class Name'
				)
			)
		);


		parent::$elements_map['karma_row'] = $map;
		return parent::$elements_map;
	}

}