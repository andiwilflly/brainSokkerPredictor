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
		window.fetch('/players')
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
								_.map(this.state.netData, (player, row)=> {
									return (
										<TableRow key={player.id}
												  style={{
													   border: this.state.selectedRow === row ? '2px solid gray' : ''
												  }}>
											<TableRowColumn>{ player.id }</TableRowColumn>
											<TableRowColumn>{ player.name }</TableRowColumn>
											<TableRowColumn>{ Math.round(player.age * 100) }</TableRowColumn>
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
									<TableRowColumn>{ this.selectedPlayer.name }</TableRowColumn>
									<TableRowColumn>age</TableRowColumn>
									<TableRowColumn>{ Math.round(this.selectedPlayer.age * 100) }</TableRowColumn>
								</TableRow>
								<TableRow key={1}>
									<TableRowColumn>stamina</TableRowColumn>
									<TableRowColumn>{ Math.round(this.selectedPlayer.stamina * 100) }</TableRowColumn>
									<TableRowColumn>keeper</TableRowColumn>
									<TableRowColumn>{ Math.round(this.selectedPlayer.keeper * 100) }</TableRowColumn>
								</TableRow>
								<TableRow key={2}>
									<TableRowColumn>pace</TableRowColumn>
									<TableRowColumn>{ Math.round(this.selectedPlayer.pace * 100) }</TableRowColumn>
									<TableRowColumn>defender</TableRowColumn>
									<TableRowColumn>{ Math.round(this.selectedPlayer.defender * 100) }</TableRowColumn>
								</TableRow>
								<TableRow key={3}>
									<TableRowColumn>technique</TableRowColumn>
									<TableRowColumn>{ Math.round(this.selectedPlayer.technique * 100) }</TableRowColumn>
									<TableRowColumn>playmaker</TableRowColumn>
									<TableRowColumn>{ Math.round(this.selectedPlayer.playmaker * 100) }</TableRowColumn>
								</TableRow>
								<TableRow key={4}>
									<TableRowColumn>passing</TableRowColumn>
									<TableRowColumn>{ Math.round(this.selectedPlayer.passing * 100) }</TableRowColumn>
									<TableRowColumn>striker</TableRowColumn>
									<TableRowColumn>{ Math.round(this.selectedPlayer.striker * 100) }</TableRowColumn>
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
