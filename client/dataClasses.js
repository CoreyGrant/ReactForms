import helpers from './helpers.js';
import defaults from './defaults.js';

const InputData = class InputData{
	constructor(name, config = {}, id = helpers.spacedToCamelCased(name)){
		Object.assign(this, defaults.input, config);
		this.name = name;
		this.id = id;
	}
};

const GroupData = class GroupData{
	constructor(name, contents, config){
		Object.assign(this, defaults.group, config);
		this.name = name;
		this.contents = contents;
	}
};

const FormData = class FormData{
	constructor(groups, action = '/', config = {}){
		Object.assign(this, defaults.form, config);
		this.groups = groups;
		this.action = action;
	}
};

const OptionData = class OptionData{
	constructor(label, value){
		this.label = label;
		this.value = value || label;
	}
};

module.exports = {
	InputData: InputData,
	GroupData: GroupData,
	FormData: FormData,
	OptionData: OptionData
};