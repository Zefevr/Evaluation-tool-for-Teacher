import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { login } from '../../actions/login'
import { Redirect } from 'react-router-dom'
import "../../App.css";
import Paper from "@material-ui/core/Paper"
import Button from '@material-ui/core/Button'
import TextField from "@material-ui/core/TextField"



class LoginForm extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }

  handleSubmit(event) {
    event.preventDefault()
    const { email, password } = this.state
    this.props.login(email, password)
  }

  handleChangeEmail = event => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  handleChangePassword = event => {
    const { name, value } = event.target 
    this.setState({
      [name]: value
    })
  }

  render() {
    if (this.props.currentUser) return <Redirect to="/batches" />
    const textField = {
      width: 300
    }

    return (
      <Paper className="styles" elevation={4}>
        <h1>Log In</h1>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <TextField
            style={textField}
            type="email"
            name="email"
            value={this.state.email}
            placeholder="Please enter your email"
            onChange={this.handleChangeEmail.bind(this)}
          />
          <br/>
          <TextField
            style={textField}
            type="password"
            name="password"
            value={this.state.password}
            placeholder="Please enter your password"
            onChange={this.handleChangePassword.bind(this)}
          />
          <br/>
          <Button type="submit" className="loginButton" id="loginButton">
             submit
          </Button>
        </form>
      </Paper>
    )
  }
}
const mapStateToProps = ({ currentUser }) => {
  return { currentUser }
}
export default connect(mapStateToProps, { login })(LoginForm)