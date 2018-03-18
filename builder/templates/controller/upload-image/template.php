<div class="karma-upload-image-container">
			<# if ( "" != data.value  ) { #>
				<div class="karma-upload-image-content karma-upload-image-has-image" style="background-image:url({{ data.value }});">
					<#}else { #>
						<div class="karma-upload-image-content" style="background-image:url({{ data.value }});">
							<# } #>
								<div class="karma-image-buttons">
									<a><div class="karma-upload-image-button">{{ data.label }}</div></a>
									<# if( undefined != data.cancelButton && 'false' != data.cancelButton ){ #>
										<a><div class="karma-cancel-image-button">{{{ data.icon }}}</div></a>
									<# } #>
								</div>

								<input type="text" name="{{ data.name }}" class="hidden-input karma-upload-image-input" value="">
						</div>
				</div>