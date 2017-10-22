
<div class="karma-radio-image-controller">
	<div class="radio-image-controller-title">{{{data.label}}}</div>
	<div class="radio-image-controller-template">
		<# for( var i in data.field ) { #>
			<div class="radio-image-controller-img" data-value="{{ data.field[i].value }}">
				{{{data.field[i].image}}}
			</div>
			<# if( data.field[i].title != "" ) { #>
			<span>{{{data.field[i].title}}}</span>
			<# } #>
		<# } #>
		<input	type="text" name="{{{ data.name }}}" class="hidden-input" value="">
	</div>
</div>
