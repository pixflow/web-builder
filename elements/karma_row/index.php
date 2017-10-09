<?php

class Karma_Row extends Karma_Shortcode_Base {

	public $element_name = 'karma_row';

	public function __construct() {

		add_filter( 'karma_elements_map', array( $this, 'map' ) );
		add_shortcode( 'karma_row', array( $this, 'render' ) );

	}

	public function render( $atts, $content ) {

		return "<div class='karma_row'> $content </div>";

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
					"type"		=> "select_image",
					"label"		=> esc_attr__( "Structure", 'karma' ),
					"value"		=> 'full',
					"options"	=> array(
						'full'		=> "full.png",
						'container'	=> "container.png"
					)
				),

				array(
					"name"		=> "space",
					"type"		=> "range_slider",
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
					"type"		=> "text",
					"label"		=> esc_attr__( "Class Name", 'karma' ),
					'value'		=> ''
				)
			)
		);
		$elements_map['karma_row'] = $map;
		return $elements_map;

	}

}