<?php

class Karma_Column extends Karma_Shortcode_Base {

	public static $element_name = 'karma_column';

	public static function render( $atts, $content ) {

		return "<div class='karma_column'> $content </div>";

	}

	public static function js_render() {

		return "<div class='karma_column'> {{ attributes.shortcode_content }} </div>";

	}

	public function map() {

		$map = array(
			"name"   => "Column",
			"params" => array(
				array(
					"name"		=> "width",
					"type"		=> Karma_Controller::TEXT,
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
				)

			,array(
					"name"		=> "extra_class",
					"type"		=> Karma_Controller::TEXT,
					"label"		=> esc_attr__( "Class Name", 'karma' ),
					'value'		=> ''
				)
			)
		);
		$elements_map['karma_column'] = $map;
		return $elements_map;

	}

}