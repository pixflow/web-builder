<div class="karma-page-popup-overlay">
	<div class="karma-page-popup-container">
		<div class="karma-page-popup-content">
			<form action="?builder-page=karma-page-manager" method="post">
				<div class="karma-page-popup-add-new">
				<div class="karma-page-popup-title"><?php echo esc_attr__("Add New Page", 'karma');?></div>
				<div class="karma-page-popup-name-tiltle"><?php echo esc_attr__("Page name", 'karma');?></div>
					<div class="karma-page-popup-name-input">
						<input name="page-title" type="text">
					</div>
				<div class="karma-page-popup-layout-title"><?php echo esc_attr__("Page layout", 'karma');?></div>
				<div class="karma-dropdown-body">
					<div class="karma-page-popup-layout-input karma-dropdown-header">
						<div class="karma-dropdown-selected-item" ><?php echo esc_attr__("karma simple template", 'karma');?></div>
						<div class="karma-dropdown-icon">
							<span class="karma-down-arrow">
							<svg width="12px" height="6px" viewBox="0 0 12 6" version="1.1"
								 xmlns="http://www.w3.org/2000/svg"><defs></defs><g
										id="drop-down-all-Setting-pannel--style-guide" stroke="none"
										stroke-width="1" fill="none" fill-rule="evenodd"
										stroke-linecap="round" stroke-linejoin="round"><g
											class="bottom-arrow"
											transform="translate(-2725.000000, -776.000000)"
											stroke-width="2" stroke="#419CF8"><g id="drop-down-Group-19"
																				 transform="translate(2715.000000, 762.000000)"><polyline
													id="drop-down-Path-2-Copy-9"
													points="11 15 16 19 21 15"></polyline></g></g></g></svg>
							</span>
							</div>
							<input name="page-template" type="text" class="karma-page-popup-hidden-input" value="karma-simple-template">

						</div>
						<ul class="karma-dropdown-options">
							<?php
							$templates = wp_get_theme()->get_page_templates();
							foreach ( $templates as $template_name => $template_filename ) {
								?>
								<li class="karma-dropdown-option" data-value="<?php echo $template_name; ?>">
								<span class="karma-dropdown-option-title">
								<?php echo "$template_filename<br />"; ?>
								</span>
								</li>
							<?php }
							?>
						</ul>

					</div>

					<div class="karma-page-popup-layout-description">
						<div></div><?php echo esc_attr__( "Work with Karma layout is more comfortable.", 'karma' ); ?>
					</div>
					<div class="karma-page-popup-button">
						<input type="hidden" name="import-template" value="">
						<input type="submit" class="karma-page-popup-create-button" value="Create">
						<div class="karma-page-popup-cancel-button"><?php echo esc_attr__( "Cancel", 'karma' ); ?></div>
					</div>
				</div>
			</form>
			<div class="karma-page-popup-image">
				<div class="karma-page-popup-image-close-icon"></div>
				<img src="<?php echo KARMA_BUILDER_URL . 'builder/media/add-page.png'; ?>"
			</div>
		</div>
	</div>
</div>