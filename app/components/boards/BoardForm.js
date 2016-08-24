import React from 'react';
import $ from 'jquery';

class BoardForm extends React.Component {
	constructor(props) {
		super(props);
		this.addBoard = this.addBoard.bind(this);
	}

	addBoard(e) {
		e.preventDefault();
		let name = this.refs.name;
		$.ajax({
			url: '/boards',
			type: 'POST',
			dataType: 'JSON',
			data: { name: name.value }
		}).done( board => {
			this.props.addBoard(board);
			name.value = null;
		})
	}

	render() {
		return(
			<div className='center'>
				<form onSubmit={this.addBoard}>
					<input placeholder="name" ref='name' />
				</form>
			</div>
		)
	}
}

export default BoardForm;