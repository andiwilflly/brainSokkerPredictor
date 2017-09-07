import { RaisedButton, Menu, MenuItem, Divider, Drawer, FlatButton, FontIcon, AppBar, BottomNavigation, Paper } from 'material-ui';
import RemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import ContentLink from 'material-ui/svg-icons/content/link';
import ContentCopy from 'material-ui/svg-icons/content/content-copy';
import Download from 'material-ui/svg-icons/file/file-download';
import Delete from 'material-ui/svg-icons/action/delete';


class SideMenu extends React.Component {

	render() {
		return (
			<Drawer width={200} openSecondary={true} open={ false }>
				<AppBar title="Side menu" />
				<Menu>
					<MenuItem primaryText="Preview" leftIcon={<RemoveRedEye />} />
					<MenuItem primaryText="Share" leftIcon={<PersonAdd />} />
					<MenuItem primaryText="Get links" leftIcon={<ContentLink />} />
					<Divider />
					<MenuItem primaryText="Make a copy" leftIcon={<ContentCopy />} />
					<MenuItem primaryText="Download" leftIcon={<Download />} />
					<Divider />
					<MenuItem primaryText="Remove" leftIcon={<Delete />} />
				</Menu>
			</Drawer>
		);
	}
}

export default SideMenu;

