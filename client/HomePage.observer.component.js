import { RaisedButton, AutoComplete, TextField, Menu, CircularProgress, MenuItem, Divider, Drawer, FlatButton, FontIcon, AppBar, BottomNavigation, Paper } from 'material-ui';
import {
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableFooter,
	TableRowColumn,
} from 'material-ui/Table';
import {Tabs, Tab} from 'material-ui/Tabs';
// Components
import PlayerTable from "./PlayerTable.observer.component";


class HomePage extends React.Component {

	constructor() {
		super();
		this.state = {
			netData: [],
			selectedRow: 0
		};
	}


	componentDidMount() {
		window.fetch('/keepers')
			.then((res)=> res.json())
			.then((netData)=> {
				this.setState({
					netData
				});
			})
	}


	get selectedPlayer() { return this.state.netData[this.state.selectedRow]; };

	get playersNames() { return _.map(this.state.netData, (player)=> player.name ); };

	
	onRowSelection = (selectedRow)=> {
		this.setState({ selectedRow: selectedRow[0] });
	};


	handleActive = (tab)=> {
		window.fetch(`${tab.props['data-route']}`)
			.then((res) => res.json())
			.then((netData) => {
				this.setState({
					netData
				});
			})
	};


	onNameSearch = (playerName)=> {
		let playerIndex = -1;
		_.forEach(this.state.netData, (player, index)=> {
			if(player.name === playerName) playerIndex = index;
		});
		this.setState({ selectedRow: playerIndex });

	};
	

	render() {
		return (
			<div>
				<Paper>
					<Tabs style={styles.tabs}>
						<Tab label="All Players"
						     data-route="/players"
						     onActive={this.handleActive}>
						</Tab>
						<Tab label="Keepers"
						     data-route="/keepers"
						     onActive={this.handleActive}>
						</Tab>
					</Tabs>

					<Table
						onRowSelection={ this.onRowSelection }
						height={ '304px' }>
						<TableHeader displaySelectAll={ false }>
							<TableRow>
								<TableRowColumn>ID</TableRowColumn>
								<TableRowColumn>
									<AutoComplete
										hintText="Name"
										onNewRequest={ (playerName)=> this.onNameSearch(playerName) }
										dataSource={this.playersNames}
									/>
								</TableRowColumn>
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
						<PlayerTable { ...this.state }/>
					</Paper>
					:
					null
				}
			</div>
		);
	}
}


const styles = {
	headline: {
		fontSize: 24,
		paddingTop: 16,
		marginBottom: 12,
		fontWeight: 400,
		textAlign: "center",
	},
	tabs: {
		paddingTop: 10,
	},
};

export default HomePage;
