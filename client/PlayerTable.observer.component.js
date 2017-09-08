import { RaisedButton, TextField, Menu, MenuItem, Divider, Drawer, FlatButton, FontIcon, AppBar, BottomNavigation, Paper } from 'material-ui';
import {
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableFooter,
	TableRowColumn,
} from 'material-ui/Table';


class PlayerTable extends React.Component {


	get selectedPlayer() { return this.props.netData[this.props.selectedRow]; };


	onChange = (newValue)=> {
		console.log('newValue', newValue);
	};
	

	render() {
		return (
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
					<TableRow key={5}>
						<TableRowColumn>player quality: (1-10)</TableRowColumn>
						<TableRowColumn>
							<TextField
								onChange={ (event, newValue)=> this.onChange(newValue) }
								hintText="Hint Text"
							/><br />
						</TableRowColumn>
						<TableRowColumn></TableRowColumn>
						<TableRowColumn></TableRowColumn>
					</TableRow>

				</TableBody>
			</Table>
		);
	}
}

export default PlayerTable;

