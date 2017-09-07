import HomePage from './HomePage.observer.component';
import SideMenu from './SideMenu.observer.component';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { RaisedButton, Menu, MenuItem, Divider, Drawer, FlatButton, FontIcon, AppBar, BottomNavigation, Paper } from 'material-ui';


class App extends React.Component {

	constructor() {
		super();
		this.state = {
			open: false
		}
	}


	render() {
		return (
			<MuiThemeProvider>
				<div>
					<AppBar
						title="NET"
						iconElementLeft={<div>iconElementLeft</div>}
						iconElementRight={<div>iconElementRight</div>}
					/>

					<SideMenu/>

					<HomePage />

					<Paper style={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
						<BottomNavigation>
						</BottomNavigation>
					</Paper>
				</div>
			</MuiThemeProvider>
		);
	}
}

export default App;

