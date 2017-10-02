

class KarmaApp extends React.Component {
	render() {
		return (
			<div>
			{this.props.children}
			</div>
		);

	}
}

class KarmaRow extends React.Component {

	constructor(props){

		super(props);
		this.state = {
			"children" 	: this.props.children,
			"type"		: this.props.type,
			"color"		: this.props.color
		}
        
		this.changeBG = this.changeBG.bind(this);

	}

	changeBG(){
		this.setState({
			color  : "blue"
		});
	}

	render() {
		let style = {
			"backgroundColor" : this.state.color,
		};
		return (
			<div className={this.state.type} style={style} onClick={this.changeBG}>
			{this.state.children}
			</div>
		);

	}
}


class KarmaColumn extends React.Component {

	constructor(props){

		super(props);
		this.state = {
			"children" 	: this.props.children,
			"width"		: this.props.width
		}

	}

	render() {
        
		return (
			<div className={this.state.width}>
				{this.state.children}
			</div>
		);

	}
}

class KarmaImage extends React.Component {

	constructor(props){

		super(props);
		this.state = {
			"src" 	      : this.props.src,
            "className"   : this.props.className
		}

	}

	render() {

		return (
			<img src={this.state.src} className={this.state.className} />
		);

	}
}