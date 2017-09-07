import { RaisedButton, Menu, CircularProgress, MenuItem, Divider, Drawer, FlatButton, FontIcon, AppBar, BottomNavigation, Paper } from 'material-ui';
import {
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableFooter,
	TableRowColumn,
} from 'material-ui/Table';


class HomePage extends React.Component {

	constructor() {
		super();
		this.state = {
			netData: [],
			selectedRow: 0
		};
	}


	componentDidMount() {
		console.log('HOME MOUNTRED');
		window.fetch('/parse')
			.then((res)=> res.json())
			.then((netData)=> {
				this.setState({
					netData
				});
			})
	}


	get selectedPlayer() { return this.state.netData[this.state.selectedRow]; };

	
	onRowSelection = (selectedRow)=> {
		this.setState({ selectedRow: selectedRow[0] });
	};
	

	render() {
		return (
			<div>
				<Paper>
					<Table
						onRowSelection={ this.onRowSelection }
						height={ '384px' }>
						<TableHeader displaySelectAll={ false }>
							<TableRow>
								<TableRowColumn>ID</TableRowColumn>
								<TableRowColumn>Name</TableRowColumn>
								<TableRowColumn>Age</TableRowColumn>
							</TableRow>
						</TableHeader>
						<TableBody displayRowCheckbox={false} showRowHover={true}>
							{ this.state.netData.length ?
								_.map(this.state.netData, (player)=> {
									return (
										<TableRow key={player.input.id}>
											<TableRowColumn>{ player.input.id }</TableRowColumn>
											<TableRowColumn>{ player.input.name }</TableRowColumn>
											<TableRowColumn>{ Math.round(player.input.age * 100) }</TableRowColumn>
										</TableRow>
									);
								})
								:
								<TableRow key={-1}>
									<TableHeaderColumn>
										<CircularProgress size={80} thickness={7} />
									</TableHeaderColumn>
								</TableRow>
							}
						</TableBody>
					</Table>
				</Paper>

				<div style={{ height: '20px' }} />

				{ this.selectedPlayer ?
					<Paper>
						<Table>
							<TableBody displayRowCheckbox={false} showRowHover={false}>
								<TableRow key={0}>
									<TableRowColumn>name</TableRowColumn>
									<TableRowColumn>{ this.selectedPlayer.input.name }</TableRowColumn>
									<TableRowColumn>age</TableRowColumn>
									<TableRowColumn>{ Math.round(this.selectedPlayer.input.age * 100) }</TableRowColumn>
								</TableRow>
								<TableRow key={1}>
									<TableRowColumn>stamina</TableRowColumn>
									<TableRowColumn>{ Math.round(this.selectedPlayer.input.stamina * 100) }</TableRowColumn>
									<TableRowColumn>keeper</TableRowColumn>
									<TableRowColumn>{ Math.round(this.selectedPlayer.input.keeper * 100) }</TableRowColumn>
								</TableRow>
								<TableRow key={2}>
									<TableRowColumn>pace</TableRowColumn>
									<TableRowColumn>{ Math.round(this.selectedPlayer.input.pace * 100) }</TableRowColumn>
									<TableRowColumn>defender</TableRowColumn>
									<TableRowColumn>{ Math.round(this.selectedPlayer.input.defender * 100) }</TableRowColumn>
								</TableRow>
								<TableRow key={3}>
									<TableRowColumn>technique</TableRowColumn>
									<TableRowColumn>{ Math.round(this.selectedPlayer.input.technique * 100) }</TableRowColumn>
									<TableRowColumn>playmaker</TableRowColumn>
									<TableRowColumn>{ Math.round(this.selectedPlayer.input.playmaker * 100) }</TableRowColumn>
								</TableRow>
								<TableRow key={4}>
									<TableRowColumn>passing</TableRowColumn>
									<TableRowColumn>{ Math.round(this.selectedPlayer.input.passing * 100) }</TableRowColumn>
									<TableRowColumn>striker</TableRowColumn>
									<TableRowColumn>{ Math.round(this.selectedPlayer.input.striker * 100) }</TableRowColumn>
								</TableRow>
							</TableBody>
						</Table>
					</Paper>
					:
					null
				}
			</div>
		);
	}
}

export default HomePage;
