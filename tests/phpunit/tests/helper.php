<?php

/**
 * test
 *
 * @group post
 */
class Tests_Helper extends WP_UnitTestCase {

	public function setUp() {
		run_karma_builder();
	}

	public function test_find_unsplash_images() {

		$content = '[karma_section element_key="ef7gt2" structure="full" extra_class="a" space="115"][karma_column element_key="asdfd2" background="https://images.unsplash.com/photo-1510533272796-05b1435d832a?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&s=78aaf36af5bba73ad388ca91a09c1a9a" rightSpace="0" sm_size="4" md_size="4" lg_size="4" xl_size="4" leftSpace="164" rightspace=0 leftspace=0]<img class="alignnone size-medium wp-image-52" src="https://images.unsplash.com/photo-1510533272796-05b1435d832a?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&s=78aaf36af5bba73ad388ca91a09c1a9a" alt="" width="300" height="263" />[/karma_column][karma_column element_key="efhghg" rightSpace="192" sm_size="6" md_size="6" lg_size="6" xl_size="6" leftSpace="140" leftspace=0 rightspace=0]Hello, my name is mahmoud and look for tool like page builder to run my wesite. i am photographer.[/karma_column][karma_column element_key="jhfgjh" sm_size="2" md_size="2" lg_size="2" xl_size="2"][/karma_column][/karma_section][karma_section element_key="345345" space="200"][/karma_section]';
		$result = karma_find_unsplash_images( $content );
		$expect = array(
				0 => array(
					'image'     => 'https://images.unsplash.com/photo-1510533272796-05b1435d832a?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&s=78aaf36af5bba73ad388ca91a09c1a9a'
					, 'type'    => 'jpg'
				)
		);

		$this->assertEquals( $expect, $result );
	}
}
