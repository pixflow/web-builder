<# var i = 0; _.each( data.blocks, function( block ){;#>
<div data-block-id="{{ i++ }}" class="karma-section-element" >
	<img class="karma-section-image" src="{{ block.image }}" width="240" height="{{ block.height }}">
</div>
<# }); #>