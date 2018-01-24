<div class="karma-controller-tab karma-section-type-tab">
	<ul>
		<#
			_.each( data.params, function ( node ){ #>
				<# var nodeClass =  ( undefined == node.classname ) ? '' : node.classname;
						if (data.value == node.name){
							nodeClass += " karma-active-background-tab";
						} #>
				<li data-type="<# print( node.name ); #>" class="<# print( nodeClass ); #>" >
					<div class="karma-section-type-icon">
						<# print( node.icon ); #>
					</div>
					<div class="karma-section-type-text">
						<# print( node.text ); #>
					</div>
				</li>
			<#
			});
		#>

	</ul>
	<input	type="text" name="{{{ data.name }}}" value="{{data.value}}" class="hidden-input">

</div>
