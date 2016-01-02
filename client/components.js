import React from 'react';
import _ from 'lodash';

const Form = class Form extends React.Component{
	render(){
		const form = this.props.form;
		const button = form.type === "sync" 
			? (
				<button type='submit'>Submit</button>
			)
			: (
				<button type='button' onClick={this.post}>
					Submit
				</button>
			);
		return (
			<form
				method={form.method}
				action={form.action}>
				{form.groups.map((x, i) => (
					<Group
						config={x}
						key={i}
						depth={1}/>
				))}
				{button}
			</form>
		);
	}
	post(){
		// Get data and submit it asynchronously
	}
};

const Input = class Input extends React.Component{
	render(){
		if(this.props.config.type === "select"){
			return this.renderSelect();
		}
		return this.renderInput();
	}
	renderSelect(){
		const config = this.props.config;
		if(!config.options){
			throw new Error("Select inputs require options");
		}
		return (
			<div className="input">
				<label 
					htmlFor={config.id}>
					{config.name}
				</label>
				<select id={config.id}>
					{config.options.map((x,i) => (
						<option 
							value={x.value}
							key={i}>
							{x.label}
						</option>
					))}
				</select>
			</div>
		)
	}
	renderInput(){
		const config = this.props.config;
		return (
			<div className="input">
				<label
					htmlForm={config.id}>
					{config.name}
				</label>
				<input type={config.type} id={config.id}/>
			</div>
		);
	}
};

const ConditionalGroup = class ConditionalGroup extends React.Component{
	constructor(props){
		super(props);
		this.names = this.props.config.contents.map(x => x.name);
		this.state = {
			selected: [],
			selectedValue: props.config.contents[0].name
		};
	}
	render(){
		const config = this.props.config;
		const possibleNames = this.getRemainingNames();
		const style = possibleNames.length 
			? {}
			: {display: 'none'};
		return (
			<div className="group conditionalGroup">
				<p className={"header" + this.props.depth + " header"}>
					{config.name}
				</p>
				<select
					onChange={this.onChange.bind(this)}
					style={style}
					initialValue={possibleNames[0]}>
					{possibleNames.map((x, i) => <option key={i}>{x}</option>)}
				</select>
				<button style={style} type="button" onClick={this.add.bind(this)}>Add</button>
				{config.contents
					.filter(x => this.state.selected.indexOf(x.name) > -1)
					.map(this.createRemovableComponent.bind(this))}
			</div>
		);
	}
	getRemainingNames(newSelected){
		return _.difference(this.names, newSelected || this.state.selected);
	}
	onChange(event){
		this.setState({
			selectedValue: event.target.value
		});
	}
	add(){
		const newSelected = this.state.selected.concat([this.state.selectedValue]);
		this.setState({
			selected: newSelected,
			selectedValue: this.getRemainingNames(newSelected)[0]
		});
	}
	remove(name){
		const newSelected = this.state.selected.filter(x => x !== name);
		this.setState({
			selected: newSelected,
			selectedValue: this.getRemainingNames(newSelected)[0]
		});
	}
	createRemovableComponent(x, i){
		const comp = createComponent.bind(this)(x, i);
		return (
			<div key={i}>
				{comp}
				<button
					type="button"
					onClick={this.remove.bind(this, x.name)}>
					Remove
				</button>
			</div>
		);
	}
};

const Group = class Group extends React.Component{
	render(){
		const config = this.props.config;
		if(config.type === "conditional"){
			return (
				<ConditionalGroup depth={this.props.depth} config={config}/>
			);
		}
		if(config.type === "repeated"){
			return (
				<RepeatedGroup depth={this.props.depth} config={config}/>
			);
		}
		return (
			<div className="group">
				<p className={"header" + this.props.depth + " header"}>
					{config.name}
				</p>
				{config.contents.map(createComponent.bind(this))}
			</div>
		);
	}
};

const RepeatedGroup = class RepeatedGroup extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			amount: 0
		};
	}
	render(){
		var config = this.props.config;
		return (
			<div className="group repeatedGroup">
				<p className={"header" + this.props.depth + " header"}>
					{config.name}
				</p>
				<button type="button" onClick={this.add.bind(this)}>Add</button>
				<button type="button" onClick={this.remove.bind(this)}>Remove</button>
				{_.range(1, this.state.amount + 1)
					.map(x => (
						<div key={x} className="group">
							{this.getNumber(x)}
							{config.contents.map(createComponent.bind(this))}
						</div>
					))}
			</div>
		)
	}
	getNumber(i){
		return this.props.config.numbers
			? (
				<p className={"header" + this.props.depth + " header"}>
					{i + ":"}
				</p>
			)
			: ""
	}
	add(){
		this.setState({
			amount: this.state.amount + 1
		});
	}
	remove(){
		this.setState({
			amount: this.state.amount - 1
		});
	}
}

function createComponent(x, i){
	if(x.contents){
		return (
			<Group
				depth={this.props.depth + 1}
				key={i}
				config={x}/>
		);
	}
	return (
		<Input config={x} key={i}/>
	);
}

module.exports = {
	Input: Input,
	Group: Group,
	Form: Form,
	ConditionalGroup: ConditionalGroup
};