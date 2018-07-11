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
    <AppBar position="absolute" style={{zIndex:10}}>
      <Toolbar>
        <Typography variant="title" color="inherit" style={{flex: 1}}>
           Evaluation tool for Teachers
        </Typography>
        {
          /batches$/.test(location.pathname) &&
          <Button color="inherit" onClick={() => history.push('/logout')}>Log out</Button>
        }

        {location.pathname === "/batches/1" && (
          <Button onClick={() => history.push("/logout")}>Log out</Button>
        )}

      </Toolbar>
    </AppBar>
  )
}

const mapStateToProps = state => ({
  user: state.currentUser && state.users &&
    state.users[userId(state.currentUser.jwt)]
})

export default withRouter(
  connect(mapStateToProps)(TopBar)
)