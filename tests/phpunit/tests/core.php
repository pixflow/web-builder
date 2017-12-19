<?php

/**
 * test
 *
 * @group post
 */
class Tests_Core extends WP_UnitTestCase {

	protected $builder;

	public function setUp() {
		run_karma_builder();
		$this->builder = Karma_Builder_Core::get_instance();
	}

	public function test_parse_shortcode() {

		$title = '"this is a \\" title \\" "';
		$shortcode1 = "[karma_text element_key='w4trwe' color = 'red' font=\"arial\" bg='#000fff' style='font-family: \"tahoma\";' radius = 18 title=" . $title . " sub_title='this is a subtitle\'s test'] Test Content Goes here[/karma_text]";
		$shortcode2 = "[karma_text element_key='w4trwv' color='red' font=\"arial\" bg='#000fff' style='font-family: \"tahoma\";' radius = 18 title=" . $title . " sub_title='this is a subtitle\'s test']";
		$shortcode3 = "[karma_text element_key='w4tfwe']";
		$shortcode4 = "[karma_text element_key='w46rwe' color='red' font=\"arial\" bg='#000fff' style='font-family: \"tahoma\";' radius=18 title=" . $title . " sub_title='this is a subtitle\'s test'";

		$result = $this->builder->parse_shortcode( $shortcode1 );
		ksort( $result );
		$this->assertEquals( array(
			'element_key'          => 'w4trwe',
			'shortcode_attributes' =>
				array(
					'align'     => 'left',
					'bg'        => '#000fff',
					'color'     => 'red',
					'font'      => 'arial',
					'radius'    => '18',
					'style'     => 'font-family: "tahoma";',
					'sub_title' => 'this is a subtitle\'s test',
					'tag'       => 'div',
					'title'     => 'this is a " title " ',
				),
			'shortcode_content'    => ' Test Content Goes here',
			'shortcode_name'       => 'karma_text',
		), $result );

		$result = $this->builder->parse_shortcode( $shortcode2 );
		ksort( $result );
		$this->assertEquals( array(
			'element_key'          => 'w4trwv',
			'shortcode_attributes' =>
				array(
					'align'     => 'left',
					'color'     => 'red',
					'font'      => 'arial',
					'bg'        => '#000fff',
					'style'     => 'font-family: "tahoma";',
					'radius'    => '18',
					'tag'       => 'div',
					'title'     => 'this is a " title " ',
					'sub_title' => 'this is a subtitle\'s test',
				),
			'shortcode_content'    => '',
			'shortcode_name'       => 'karma_text',
		), $result );

		$result = $this->builder->parse_shortcode( $shortcode3 );
		ksort( $result );
		$this->assertEquals( array(
			'element_key'          => 'w4tfwe',
			'shortcode_attributes' => array(
				'align' => 'left',
				'color' => '#000',
				'tag'   => 'div'
			),
			'shortcode_content'    => '',
			'shortcode_name'       => 'karma_text',

		), $result );

		$this->assertEquals( false, $this->builder->parse_shortcode( $shortcode4 ) );
	}

	public function test_parse_shortcodes() {

		$shortcodes =
			'[karma_section color=\'red\' font = "arial" bg="#000fff" style="font-family: \"tahoma\";" radius=18 title="this is a \" title \" " sub_title="this is a subtitle\'s test" element_key="w3test"]'
			. '[karma_text element_key="w3erts"] Test Content Goes here[/karma_text]'
			. '[karma_image element_key="w3ebty" color="blue" font="arial" bg="#000fff" style="font-family: \"tahoma\";" radius=18 title="this is a \" title \" " sub_title="this is a subtitle\'s test"][/karma_image]'
			. '[/karma_section]'
			. '[karma_column element_key="w4ebtz"][/karma_column]';

		$expect = array(
			array(
				"shortcode_name"       => "karma_section",
				"shortcode_attributes" => array(
					"color"      => "red",
					"font"       => "arial",
					"bg"         => "#000fff",
					"style"      => 'font-family: "tahoma";',
					"radius"     => '18',
					"title"      => 'this is a " title " ',
					"sub_title"  => "this is a subtitle's test",
					"structure"  => "container",
					"space"      => "200",
					"extraclass" => "",

				),
				"element_key"          => 'w3test',
				"order"                => 1,
				"parent_key"           => ''
			),
			array(
				"shortcode_name"       => "karma_text",
				"shortcode_attributes" => array(
					'tag'   => 'div',
					'color' => '#000',
					'align' => 'left'
				),
				"shortcode_content"    => " Test Content Goes here",
				"element_key"          => "w3erts",
				"order"                => 1,
				"parent_key"           => 'w3test'
			),
			array(
				"shortcode_name"       => "karma_image",
				"shortcode_attributes" => array(
					"color"      => "blue",
					"font"       => "arial",
					"bg"         => "#000fff",
					"style"      => 'font-family: "tahoma";',
					"radius"     => '18',
					"title"      => 'this is a " title " ',
					"sub_title"  => "this is a subtitle's test",
					'imgurl'     => KARMA_BUILDER_URL . 'builder/media/defult-img.png',
					'action'     => 'none',
					'linkurl'    => 'http://example.org',
					'linktarget' => '_blank',
					'alt'        => 'Test Blog',
					'scale'      => 'fill',
					'position'   => 'center-center'
				),
				'shortcode_content'    => '',
				"order"                => 2,
				"parent_key"           => 'w3test',
				"element_key"          => 'w3ebty',
			),
			array(
				"shortcode_name"       => "karma_column",
				"shortcode_attributes" => array(
					'sm_size'    => '12',
					'md_size'    => '12',
					'lg_size'    => '12',
					'xl_size'    => '12',
					'rightspace' => '10',
					'leftspace'  => '10',
					'extraclass' => ''
				),
				'shortcode_content'    => '',
				"element_key"          => 'w4ebtz',
				"order"                => 2,
				"parent_key"           => '',

			),
		);
		ksort( $expect );
		$result = $this->builder->parse_shortcodes( $shortcodes );
		ksort( $result );
		$this->assertEquals( $expect, $result );

	}

	public function test_generate_post_content() {

		$models = array(
			array(
				"element_key"          => 'w3test',
				"shortcode_name"       => "shortcode_test",
				"parent_key"           => '',
				"order"                => 1,
				"shortcode_attributes" => array(
					"color"     => "red",
					"font"      => "arial",
					"bg"        => "#000fff",
					"style"     => 'font-family: "tahoma";',
					"radius"    => 18,
					"title"     => 'this is a " title " ',
					"sub_title" => "this is a subtitle's test"
				)
			),
			array(
				"element_key"          => 'w5kjst',
				"shortcode_attributes" => array(),
				"shortcode_name"       => "shortcode_test2",
				"shortcode_content"    => " Test Content Goes here",
				"parent_key"           => 'w3test',
				"order"                => 1
			),
			array(
				"element_key"    => 'w3tert',
				"shortcode_name" => "shortcode_test3",
				"parent_key"     => '',
				"order"          => "2"
			),
			array(
				"element_key"          => 'fghtui',
				"shortcode_name"       => "shortcode_test4",
				"shortcode_attributes" => array(
					"color"     => "blue",
					"font"      => "arial",
					"bg"        => "#000fff",
					"style"     => 'font-family: "tahoma";',
					"radius"    => 18,
					"title"     => 'this is a " title " ',
					"sub_title" => "this is a subtitle's test"
				),
				"parent_key"           => 'w3test',
				"order"                => "2"
			),
		);

		$expect =
			'[shortcode_test element_key="w3test" color="red" font="arial" bg="#000fff" style="font-family: \"tahoma\";" radius=18 title="this is a \" title \" " sub_title="this is a subtitle\'s test"]'
			. '[shortcode_test2 element_key="w5kjst"] Test Content Goes here[/shortcode_test2]'
			. '[shortcode_test4 element_key="fghtui" color="blue" font="arial" bg="#000fff" style="font-family: \"tahoma\";" radius=18 title="this is a \" title \" " sub_title="this is a subtitle\'s test"][/shortcode_test4]'
			. '[/shortcode_test]'
			. '[shortcode_test3 element_key="w3tert"][/shortcode_test3]';
		$this->assertEquals( $expect, $this->builder->generate_post_content( $models ) );

	}

	public function test_save_post_conent() {

		// Create post object
		$my_post = array(
			'post_title'   => 'test_save_post_content',
			'post_content' => '',
			'post_status'  => 'publish',
		);

		// Insert the post into the database
		$key = wp_insert_post( $my_post );

		$models = array(
			array(
				"shortcode_name"       => "shortcode_test",
				"shortcode_attributes" => array(
					"color"     => "red",
					"font"      => "arial",
					"bg"        => "#000fff",
					"style"     => 'font-family: "tahoma";',
					"radius"    => 18,
					"title"     => 'this is a " title " ',
					"sub_title" => "this is a subtitle's test"
				),
				"element_key"          => 'w3test',
				"order"                => 1,
				"parent_key"           => ''
			),
			array(
				"shortcode_name"       => "shortcode_test2",
				"shortcode_attributes" => array(),
				"shortcode_content"    => " Test Content Goes here",
				"element_key"          => "w3erts",
				"order"                => 2,
				"parent_key"           => 'w3test'
			),
			array(
				"shortcode_name"       => "shortcode_test4",
				"shortcode_attributes" => array(
					"color"     => "blue",
					"font"      => "arial",
					"bg"        => "#000fff",
					"style"     => 'font-family: "tahoma";',
					"radius"    => '18',
					"title"     => 'this is a " title " ',
					"sub_title" => "this is a subtitle's test"
				),
				'shortcode_content'    => '',
				"order"                => 1,
				"parent_key"           => 'w3test',
				"element_key"          => 'w3ebty',
			),
			array(
				"shortcode_name"       => "shortcode_test3",
				"shortcode_attributes" => array(),
				'shortcode_content'    => '',
				"element_key"          => 'w4ebtz',
				"order"                => 2,
				"parent_key"           => '',

			),
		);

		$expect =
			'[shortcode_test element_key="w3test" color="red" font="arial" bg="#000fff" style="font-family: \"tahoma\";" radius=18 title="this is a \" title \" " sub_title="this is a subtitle\'s test"]'
			. '[shortcode_test4 element_key="w3ebty" color="blue" font="arial" bg="#000fff" style="font-family: \"tahoma\";" radius="18" title="this is a \" title \" " sub_title="this is a subtitle\'s test"][/shortcode_test4]'
			. '[shortcode_test2 element_key="w3erts"] Test Content Goes here[/shortcode_test2]'
			. '[/shortcode_test]'
			. '[shortcode_test3 element_key="w4ebtz"][/shortcode_test3]';


		$this->builder->save_post_content( $models, $key );
		$post_content = get_post_meta( $key, 'karma_post_content', true );

		$this->assertEquals( $expect, $post_content );
	}

	public function test_switch_post_status() {

		// Create post object
		$my_post = array(
			'post_title'   => 'test_switch_post_status',
			'post_content' => '',
			'post_status'  => 'publish',
		);

		// Insert the post into the database
		$post_id = wp_insert_post( $my_post );
		$this->builder->switch_post_status( 'draft', $post_id );
		$expect = 'draft';
		$new_status = get_post_status( $post_id );
		$this->assertEquals( $expect, $new_status );
	}

	public function map_elements() {

		$elements_map = array();
		$row_map = array(
			"name"   => "Row",
			"params" => array(
				array(
					"name"    => "structure",
					"type"    => Karma_Builder_Setting_Panel::IMAGE,
					"label"   => esc_attr__( "Structure", 'karma' ),
					"value"   => 'full',
					"options" => array(
						'full'      => "full.png",
						'container' => "container.png"
					)
				),
				array(
					"name"    => "space",
					"type"    => Karma_Builder_Setting_Panel::RANGE,
					"label"   => esc_attr__( "Top & Bottom Spacing", 'karma' ),
					'value'   => 0,
					"options" => array(
						'min'  => 0,
						'max'  => 600,
						'step' => 1,
						'unit' => 'px'
					)
				),
				array(
					"name"  => "extra_class",
					"type"  => Karma_Builder_Setting_Panel::TEXT,
					"label" => esc_attr__( "Class Name", 'karma' ),
					'value' => ''
				)
			)
		);
		$elements_map[ 'karma_row' ] = $row_map;
		$column_map = array(
			"name"   => "Column",
			"params" => array(
				array(
					"name"    => "wkeyth",
					"type"    => Karma_Builder_Setting_Panel::TEXT,
					"label"   => esc_attr__( "Structure", 'karma' ),
					"value"   => 'full',
					"options" => array(
						'full'      => "full.png",
						'container' => "container.png"
					)
				),
				array(
					"name"    => "space",
					"type"    => Karma_Builder_Setting_Panel::RANGE,
					"label"   => esc_attr__( "Top & Bottom Spacing", 'karma' ),
					'value'   => 0,
					"options" => array(
						'min'  => 0,
						'max'  => 600,
						'step' => 1,
						'unit' => 'px'
					)
				)

			, array(
					"name"  => "extra_class",
					"type"  => Karma_Builder_Setting_Panel::TEXT,
					"label" => esc_attr__( "Class Name", 'karma' ),
					'value' => ''
				)
			)
		);
		$elements_map[ 'karma_column' ] = $column_map;
		return $elements_map;
	}

	public function test_element_map() {

		add_filter( 'karma/elements/all/map', array( $this, 'map_elements' ) );
		$elements_map = array();
		$elements_map = apply_filters( 'karma/elements/all/map', $elements_map );
		$expect = array(
			'karma_row'    => array(
				"name"   => "Row",
				"params" => array(
					array(
						"name"    => "structure",
						"type"    => Karma_Builder_Setting_Panel::IMAGE,
						"label"   => esc_attr__( "Structure", 'karma' ),
						"value"   => 'full',
						"options" => array(
							'full'      => "full.png",
							'container' => "container.png"
						)
					),
					array(
						"name"    => "space",
						"type"    => Karma_Builder_Setting_Panel::RANGE,
						"label"   => esc_attr__( "Top & Bottom Spacing", 'karma' ),
						'value'   => 0,
						"options" => array(
							'min'  => 0,
							'max'  => 600,
							'step' => 1,
							'unit' => 'px'
						)
					),
					array(
						"name"  => "extra_class",
						"type"  => Karma_Builder_Setting_Panel::TEXT,
						"label" => esc_attr__( "Class Name", 'karma' ),
						'value' => ''
					)
				)
			),
			'karma_column' => array(
				"name"   => "Column",
				"params" => array(
					array(
						"name"    => "wkeyth",
						"type"    => Karma_Builder_Setting_Panel::TEXT,
						"label"   => esc_attr__( "Structure", 'karma' ),
						"value"   => 'full',
						"options" => array(
							'full'      => "full.png",
							'container' => "container.png"
						)
					),
					array(
						"name"    => "space",
						"type"    => Karma_Builder_Setting_Panel::RANGE,
						"label"   => esc_attr__( "Top & Bottom Spacing", 'karma' ),
						'value'   => 0,
						"options" => array(
							'min'  => 0,
							'max'  => 600,
							'step' => 1,
							'unit' => 'px'
						)
					)

				, array(
						"name"  => "extra_class",
						"type"  => Karma_Builder_Setting_Panel::TEXT,
						"label" => esc_attr__( "Class Name", 'karma' ),
						'value' => ''
					)
				)
			)
		);

		$this->assertEquals( $expect, $elements_map );
	}

	public function test_add_default_attributes() {
		$element_name = 'karma_text';
		$element_attributes = array(
			'element_key' => '8682364'
		);
		$expect = array(
			'element_key' => '8682364',
			'tag'         => 'div',
			'color'       => '#000',
			'align'       => 'left'
		);
		ksort( $expect );
		$result = $this->builder->add_default_attributes( $element_name, $element_attributes );
		ksort( $result );
		$this->assertEquals( $expect, $result );

	}

}
