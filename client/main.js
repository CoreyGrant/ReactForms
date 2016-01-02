import ReactDom from 'react-dom';
import React from 'react';
import _ from 'lodash';
import {InputData, GroupData, FormData, OptionData} from './dataClasses.js';
import {Form} from './components.js';

const form = new FormData([
	new GroupData("Group1",[
		new GroupData("Group1.1", [
			new InputData("Question 1", {
				type: "select",
				options: [
					 new OptionData("Choice 1"),
					 new OptionData("Choice 2"),
					 new OptionData("Choice 3")
				]
			}),
			new InputData("Question 2"),
		]),
		new InputData("Question 3"),
		new InputData("Question 4")
	]),
	new GroupData("ConditionalGroup 1", [
		new InputData('Question A'),
		new GroupData('Group B', [ new InputData('Question B.A')]),
		new InputData('MultiQuestion B', {
			type: "select",
			options: [
				 new OptionData("Choice 1"),
				 new OptionData("Choice 2"),
				 new OptionData("Choice 3")
			]}
		)
	], {type: "conditional"}),
	new GroupData("RepeatedGroup 1", [
		new InputData('Question A'),
		new GroupData('Group B', [ new InputData('Question B.A')]),
		new InputData('MultiQuestion B', {
			type: "select",
			options: [
				 new OptionData("Choice 1"),
				 new OptionData("Choice 2"),
				 new OptionData("Choice 3")
			]}
		)
	], {type: "repeated"})
]);

ReactDom.render(
	<Form form={form} />,
	document.getElementById('react-body'));