var React = require('react');
var ReactDom = require('react-dom');
var _ = require('lodash')

var Form = class Form extends React.Component{
	render(){
		return (
			<form
				method={this.props.method || "post"}
				action={this.props.action}>

			</form>
		);
	}
}

var inputDefaults = {
	type: "text"
}

var Input = class Input extends React.Component{
	constructor(props){
		super(props);
		this.options = _.extend(this.props.options, inputDefaults);
		this.label = props.label;
	}
	render(){
		
		if(type === "select"){
			return this.renderSelect(options);
		}
	}
	renderSelect(x){
		if(!x.options){
			throw new Error("Select inputs require options");
		}
		return (
			<label htmlFor={x.name}
		)
	}
}

var Group = class Group extends React.Component{
	render(){
		const options = this.props.options;
		return (
			<div>
				<p className={"header" + options.depth}>
					{options.name}
				</p>
				this.props.contents.map(this.createComponent)
			</div>
		);
	}
	createComponent(x){
		if(x.contents){
			return (
				<Group
					depth={this.props.depth + 1}
					options={x}/>
			);
		}
		return (
			<Input options={x}/>
		);
	}
}