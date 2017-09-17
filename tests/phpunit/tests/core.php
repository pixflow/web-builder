<?php

/**
 * test
 *
 * @group post
 */
class Tests_Core extends WP_UnitTestCase {

	protected $builder;

	public function setUp() {
		$this->builder = Pixity_Builder_Core::get_instance();
	}

	public function test_parse_shortcode(){
		$title = '"this is a \\" title \\" "';
		$shortcode = "[test_shortcode color = 'red' font=\"arial\" bg='#000fff' style='font-family: \"tahoma\";' radius = 18 title=" . $title . " sub_title='this is a subtitle\'s test'] Test Content Goes here[/test_shortcode]";
		$shortcode2 = "[test_shortcode color='red' font=\"arial\" bg='#000fff' style='font-family: \"tahoma\";' radius = 18 title=" . $title . " sub_title='this is a subtitle\'s test']";
		$shortcode3 = "[test_shortcode]";
		$shortcode4 = "[test_shortcode color='red' font=\"arial\" bg='#000fff' style='font-family: \"tahoma\";' radius=18 title=" . $title . " sub_title='this is a subtitle\'s test'";


		$this->assertEquals( $this->builder->parse_shortcode( $shortcode ),array(
			"shortcode_name"        =>  "test_shortcode",
			"shortcode_attributes"  =>  array(
				"color"     =>  "red",
				"font"      =>  "arial",
				"bg"        =>  "#000fff",
				"style"     =>  'font-family: "tahoma";',
				"radius"    =>  18,
				"title"     =>  'this is a " title " ',
				"sub_title" =>  "this is a subtitle's test"
			),
			"shortcode_content"             =>  " Test Content Goes here"
		) );


		$this->assertEquals( $this->builder->parse_shortcode( $shortcode2 ),array(
			"shortcode_name"        =>  "test_shortcode",
			"shortcode_attributes"  =>  array(
				"color"     =>  "red",
				"font"      =>  "arial",
				"bg"        =>  "#000fff",
				"style"     =>  'font-family: "tahoma";',
				"radius"    =>  18,
				"title"     =>  'this is a " title " ',
				"sub_title" =>  "this is a subtitle's test"
			),
			"shortcode_content"             =>  ""
		) );

		$this->assertEquals( $this->builder->parse_shortcode( $shortcode3 ), array(
			"shortcode_name"        =>  "test_shortcode",
			"shortcode_attributes"  =>  array(),
			"shortcode_content"     =>  ""
		) );

		$this->assertEquals( $this->builder->parse_shortcode( $shortcode4 ), false);
	}

	public function test_parse_shortcodes(){

		$shortcodes =
			'[shortcode_test color=\'red\' font = "arial" bg="#000fff" style="font-family: \"tahoma\";" radius=18 title="this is a \" title \" " sub-title="this is a subtitle\'s test"]'
			.'[shortcode_test2] Test Content Goes here[/shortcode_test2]'
			.'[shortcode_test4 color="red" font="arial" bg="#000fff" style="font-family: \"tahoma\";" radius=18 title="this is a \" title \" " sub-title="this is a subtitle\'s test"][/shortcode_test4]'
			.'[/shortcode_test]'
			.'[shortcode_test3][/shortcode_test3]';

		$expect = array(
			1 => array(
				"shortcode_name"        => "shortcode_test",
				"children"              =>  array(2,3),
				"order"                 => 1,
				"shortcode_attributes"  =>  array(
					"color"     =>  "red",
					"font"      =>  "arial",
					"bg"        =>  "#000fff",
					"style"     =>  'font-family: "tahoma";',
					"radius"    =>  18,
					"title"     =>  'this is a " title " ',
					"sub_title" =>  "this is a subtitle's test"
				)
			),
			2 => array(
				"shortcode_attributes"  =>  array(),
				"shortcode_name"        => "shortcode_test2",
				"shortcode_content"     => " Test Content Goes here",
				"order"                 => 1
			),
			3 => array(
				"shortcode_name"        => "shortcode_test4",
				"shortcode_attributes"  =>  array(
					"color"     =>  "red",
					"font"      =>  "arial",
					"bg"        =>  "#000fff",
					"style"     =>  'font-family: "tahoma";',
					"radius"    =>  18,
					"title"     =>  'this is a " title " ',
					"sub_title" =>  "this is a subtitle's test"
				),
				"order"                 => "2"
			),
			4 => array(
				"shortcode_name"        => "shortcode_test3",
				"order"                 => "2"
			),
		);

		$this->assertEquals($this->builder->generate_post_content( $shortcodes ), $expect);

	}

	public function test_generate_post_content(){

		$models = array(
			1 => array(
				"shortcode_name"        => "shortcode_test",
				"children"              =>  array(2,40),
				"order"                 => 1,
				"shortcode_attributes"  =>  array(
					"color"     =>  "red",
					"font"      =>  "arial",
					"bg"        =>  "#000fff",
					"style"     =>  'font-family: "tahoma";',
					"radius"    =>  18,
					"title"     =>  'this is a " title " ',
					"sub_title" =>  "this is a subtitle's test"
				)
			),
			2 => array(
				"shortcode_attributes"  =>  array(),
				"shortcode_name"        => "shortcode_test2",
				"shortcode_content"     => " Test Content Goes here",
				"order"                 => 1
			),
			3 => array(
				"shortcode_name"        => "shortcode_test3",
				"order"                 => "2"
			),
			40 => array(
				"shortcode_name"        => "shortcode_test4",
				"shortcode_attributes"  =>  array(
					"color"     =>  "red",
					"font"      =>  "arial",
					"bg"        =>  "#000fff",
					"style"     =>  'font-family: "tahoma";',
					"radius"    =>  18,
					"title"     =>  'this is a " title " ',
					"sub_title" =>  "this is a subtitle's test"
				),
				"order"                 => "2"
			),
		);

		$expect =
			'[shortcode_test color="red" font="arial" bg="#000fff" style="font-family: \"tahoma\";" radius=18 title="this is a \" title \" " sub-title="this is a subtitle\'s test"]'
			.'[shortcode_test2] Test Content Goes here[/shortcode_test2]'
			.'[shortcode_test4 color="red" font="arial" bg="#000fff" style="font-family: \"tahoma\";" radius=18 title="this is a \" title \" " sub-title="this is a subtitle\'s test"][/shortcode_test4]'
			.'[/shortcode_test]'
			.'[shortcode_test3][/shortcode_test3]';
		$this->assertEquals($this->builder->generate_post_content( $models ), $expect);

	}

	public function test_save_post_conent(){

		// Create post object
		$my_post = array(
			'post_title'    => 'test_save_post_content',
			'post_content'  => '',
			'post_status'   => 'publish',
		);

		// Insert the post into the database
		$id = wp_insert_post( $my_post );

		$models = array(
			1 => array(
				"shortcode_name"        => "shortcode_test",
				"children"              =>  array(2,40),
				"order"                 => 1,
				"shortcode_attributes"  =>  array(
					"color"     =>  "red",
					"font"      =>  "arial",
					"bg"        =>  "#000fff",
					"style"     =>  'font-family: "tahoma";',
					"radius"    =>  18,
					"title"     =>  'this is a " title " ',
					"sub_title" =>  "this is a subtitle's test"
				)
			),
			2 => array(
				"shortcode_attributes"  =>  array(),
				"shortcode_name"        => "shortcode_test2",
				"shortcode_content"     => " Test Content Goes here",
				"order"                 => 1
			),
			3 => array(
				"shortcode_name"        => "shortcode_test3",
				"order"                 => "2"
			),
			40 => array(
				"shortcode_name"        => "shortcode_test4",
				"shortcode_attributes"  =>  array(
					"color"     =>  "red",
					"font"      =>  "arial",
					"bg"        =>  "#000fff",
					"style"     =>  'font-family: "tahoma";',
					"radius"    =>  18,
					"title"     =>  'this is a " title " ',
					"sub_title" =>  "this is a subtitle's test"
				),
				"order"                 => "2"
			),
		);

		$expect =
			'[shortcode_test color="red" font="arial" bg="#000fff" style="font-family: \"tahoma\";" radius=18 title="this is a \" title \" " sub-title="this is a subtitle\'s test"]'
			.'[shortcode_test2] Test Content Goes here[/shortcode_test2]'
			.'[shortcode_test4 color="red" font="arial" bg="#000fff" style="font-family: \"tahoma\";" radius=18 title="this is a \" title \" " sub-title="this is a subtitle\'s test"][/shortcode_test4]'
			.'[/shortcode_test]'
			.'[shortcode_test3][/shortcode_test3]';


		$this->builder->save_post_content( $models, $id );
		$post = get_post($id);

		$this->assertEquals( $post->post_content, $expect );
	}

}
