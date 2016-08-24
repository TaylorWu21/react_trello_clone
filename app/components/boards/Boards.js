import React from 'react';
import Board from './Board';
import BoardForm from './BoardForm';
import $ from 'jquery';

class Boards extends React.Component {
	constructor(props) {
		super(props)
		this.addBoard = this.addBoard.bind(this);
		this.deleteBoard = this.deleteBoard.bind(this);
		this.updateBoard = this.updateBoard.bind(this);
		this.state = { boards: [] };
	}

	componentWillMount() {
		$.ajax({
			url: '/boards',
			type: 'GET',
			dataType: 'JSON'
		}).done( boards => {
			this.setState({ boards });
		});
	}

	addBoard(board) {
		this.setState({ boards: [...this.state.boards, board] })
	}

	updateBoard(id, name, description) {
		let boards = this.state.boards.map( board => {
			if(board._id === id) {
				return {
					...board, 
					description, name
				}
			}
			return board;
		});
		this.setState({ boards });
	}

	deleteBoard(id) {
		this.setState({ boards: this.state.boards.filter( board => board._id !== id)})
	}

	render() {
		let boards = this.state.boards.map( board => {
			return(<Board
			  key={board._id}
			  {...board} 
			  deleteBoard={this.deleteBoard} 
			  updateBoard={this.updateBoard} />
			);
		})
		return(
			<div>
				<BoardForm addBoard={this.addBoard} />
				<div className='row'>
					{ boards }
				</div>
			</div>
		);
	}
}

export default Boards;