import getMuiTheme from 'material-ui/styles/getMuiTheme';

export const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#5492c5',
    accent1Color: '#7270e0'
  },
  button: {
    height: 50
  }
});

export default {
  palette: {
    white: '#fff',
    primary: muiTheme.palette.primary1Color,
    info: muiTheme.palette.accent1Color,
    success: '#5cb85c',
    danger: '#d9534f',
    warning: '#f0ad4e'
  }
}
