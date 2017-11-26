<div class="karma-upload-image-container">
	<# if ( data.value != ""  ) { #>
		<div class="karma-upload-image-content karma-upload-image-has-image" style="sbackground-image:url( {{ data.value }} );">
	<#}else { #>
		<div class="karma-upload-image-content" style="background-image:url( {{ data.value }} );">
	<# } #>
		<a><div class="karma-upload-image-button">{{ data.label }}</div></a>
		<input type="text" name="{{ data.name }}" class="hidden-input karma-upload-image-input" value="">
	</div>
</div>