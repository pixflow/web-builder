<?php

class Karma_Column extends Karma_Shortcode_Base {

	public static $element_name = 'karma_column';

	public static function render( $atts, $content ) {

		$atts = shortcode_atts(
			array(
				'sm_size'          => '12',
				'md_size'       => '12' ,
				'lg_size'=>'12',
				'xl_size'  => '12',
			)
			, $atts
		);

		return "<div class='"
			       ."karma_column "
			       ."karma-col-sm-" . $atts['sm_size']
			       ." karma-col-md-" . $atts['md_size']
			       ." karma-col-lg-" . $atts['lg_size']
			       ." karma-col-xl-" . $atts['xl_size']
			       ."'> " . do_shortcode($content) . "</div>";

	}

	public static function js_render() {

		return "<div class='karma_column karma-col-sm-{{ attributes.sm_size }} karma-col-md-{{ attributes.md_size }} karma-col-lg-{{ attributes.lg_size }} karma-col-xl-{{ attributes.xl_size }}'> {{ attributes.shortcode_content }} </div>";

	}

	public function map() {

		$map = array(
			"name"   => "Column",
			"params" => array(
				array(
					"name"		=> "width",
					"type"		=> Karma_Builder_Setting_Panel::TEXT,
					"label"		=> esc_attr__( "Structure", 'karma' ),
					"value"		=> 'full',
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
				)

			,array(
					"name"		=> "extra_class",
					"type"		=> Karma_Builder_Setting_Panel::TEXT,
					"label"		=> esc_attr__( "Class Name", 'karma' ),
					'value'		=> ''
				)
			)
		);

		parent::$elements_map['karma_column'] = $map;
		return parent::$elements_map;

	}

}