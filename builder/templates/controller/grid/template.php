<?php
use KarmaBuilder\Helper\Karma_Helper_Utility as Karma_Helper_Utility ;
?>

<div class="karma-grid-controller">
	<div class="grid-controller-template" data-current-grid="{{ data.value }}">
		<div class="karma-add-column-view">
			<div class="karma-add-column-view-border karma-row karma-no-gutters">
				<# for( var i=0; i < data.value; i++ ){ #>
					<div class="karma-add-column-view-length"></div>
				<# } #>

						<div class="karma-add-column-view-length karma-add-column-view-add" <# if( 6 == data.value ) { print('style="display:none"'); } #> ></div>

			</div>
		</div>

		<div class="karma-add-column-button">
			<button type="button" >
				<div class="karma-oval-button-icon">
					<?php print Karma_Helper_Utility::karma_load_svg( KARMA_BUILDER_URL . 'builder/media/svg/plus.svg' ); ?>
				</div>
				New Column
			</button>
		</div>
	</div>
</div>
