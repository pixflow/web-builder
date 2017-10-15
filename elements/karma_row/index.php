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
					"type"		=> Karma_Controller::IMAGE,
					"label"		=> esc_attr__( "Structure", 'karma' ),
					"value"		=> 'full',
					"options"	=> array(
						'full'		=> "full.png",
						'container'	=> "container.png"
					)
				),
				array(
					"name"		=> "space",
					"type"		=> Karma_Controller::RANGE,
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
					"type"		=> Karma_Controller::TEXT,
					"label"		=> esc_attr__( "Class Name", 'karma' ),
					'value'		=> ''
				),
				array(
					"name"		=> "radio-image",
					"type"		=> Karma_Controller::RADIO_IMAGE,
					"label"		=> esc_attr__( "images", 'karma' ),
					"columns"    => 1,
					'value'		=> 0,
					"field"		=> array(
						array(
							'image' => '1.jpg',
							'title' => "Full width"
						),
						array(
							'image' => '2.jpg',
							'title' => "Container width"
						)
					)
				),
				array(
					"name"		=> "title",
					"type"		=> Karma_Controller::TITLE,
					"label"		=> esc_attr__( "Class Name", 'karma' ),
					'value'		=> ''
				)
			)
		);


		parent::$elements_map['karma_row'] = $map;
		return parent::$elements_map;
	}

}