import React from 'react'
import AppBar from "@material-ui/core/AppBar"
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from "@material-ui/core/Button";
import {withRouter} from 'react-router'
import {userId} from '../../jwt'
import {connect} from 'react-redux'


const TopBar = (props) => {
  const { location, history } = props

  return (
    <AppBar
      position="absolute"
      color="primary"
      align="center"
      style={{ zIndex: 10 }}
    >
      <Toolbar>
        <Typography
          variant="title"
          color="inherit"
          align="left"
          style={{ flex: 1 }}
        >
          Evaluation Tool for Teachers
        </Typography>
        <Button color="inherit" href="/batches">
          HOME
        </Button>
        {location.pathname.indexOf("signup") > 0 && (
          <Button color="inherit" onClick={() => history.push("/login")}>
            Login
          </Button>
        )}
      
        {location.pathname.indexOf("batches/") > 0 && (
          <Button color="inherit" onClick={() => history.push("/batches")}>
            All Batches
          </Button>
        )}
        {/batches$/.test(location.pathname) && (
          <Button color="inherit" onClick={() => history.push("/logout")}>
            Log out
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

const mapStateToProps = state => ({
  user:
    state.currentUser &&
    state.users &&
    state.users[userId(state.currentUser.jwt)]
});

export default withRouter(
  connect(mapStateToProps)(TopBar)
)