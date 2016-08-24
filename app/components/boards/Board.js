import React from 'react';
import $ from 'jquery';

class Board extends React.Component {
	constructor(props) {
		super(props);
		this.toggleEdit = this.toggleEdit.bind(this);
		this.updateBoard = this.updateBoard.bind(this);
		this.deleteBoard = this.deleteBoard.bind(this);
		this.state = { edit: false };
	}

	toggleEdit() {
		this.setState({ edit: !this.state.edit });
	}

	updateBoard() {
		//update in database
		let name = this.refs.name.value
		let description = this.refs.description.value;
		$.ajax({
			url: `/boards/${this.props._id}`,
			type: 'PUT',
			dataType: 'JSON',
			data: { name, description }
		}).done( board => {
			this.props.updateBoard(board._id, name, description);
			this.toggleEdit();
		});
	}

	deleteBoard() {
		$.ajax({
			url: `/boards/${this.props._id}`,
			type: 'DELETE',
			dataType: 'JSON'
		}).done( () => {
			this.props.deleteBoard(this.props._id);
		})
	}

	board() {
		return(
			<div className="col s12 m3">
				<div className="card blue-grey">
					<div className="card-content white-text">
						<span onClick={this.toggleEdit} className="card-title">{this.props.name}</span>
						<p>{this.props.description || "Click board name to add"}</p>
					</div>
					<div className="card-action">
						<button onClick={this.deleteBoard} className='btn'>Delete</button>
						<a href={`/boards/${this.props._id}`} className='btn'>Show</a>
					</div>
				</div>
			</div>
		)
	}

	edit() {
		return(
			<div className="col s12 m3">
				<div className="card blue-grey">
					<div className="card-content white-text">
					<input required={true} ref="name" placeholder={this.props.name} defaultValue={this.props.name} />
					<textarea ref="description">{this.props.description}</textarea>
					</div>
					<div className="card-action">
						<button onClick={this.updateBoard} className='btn'>Update</button>
						<button onClick={this.toggleEdit} className='btn'>Cancel</button>
					</div>
				</div>
			</div>
		)
	}

	render() {
		if (this.state.edit)
			return this.edit();
		else
			return this.board();
	}
}

export default Board;