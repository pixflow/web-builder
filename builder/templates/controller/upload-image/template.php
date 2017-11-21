<div class="karma-upload-image-container">
	<# if ( data.imageurl != ""  ) { #>
		<div class="karma-upload-image-content karma-upload-image-has-image" style="background-image:url( {{ data.imageurl }} );">
	<#}else { #>
		<div class="karma-upload-image-content" style="background-image:url( {{ data.imageurl }} );">
	<# } #>
		<a><div class="karma-upload-image-button">{{ data.label }}</div></a>
		<input type="text" name=" {{ data.name }} " class="hidden-input karma-upload-image-input" value="">
	</div>
</div>