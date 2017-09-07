import HomePage from './HomePage.observer.component';
import SideMenu from './SideMenu.observer.component';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
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

					<div style={{ margin: '0 auto', width: 900 }}>
						<HomePage />
					</div>


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

