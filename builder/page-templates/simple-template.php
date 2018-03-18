<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit; // Silence is golden.
}
get_header();
?>
<div id="karma-simple-templates" >
	<?php
	while ( have_posts() ) :
		the_post();
		the_content();
	endwhile;
	?>
</div>
<?php
get_footer();
?>
