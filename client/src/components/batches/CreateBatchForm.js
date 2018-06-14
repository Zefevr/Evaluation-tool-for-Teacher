import React, {PureComponent} from 'react'
import Paper from "@material-ui/core/Paper"
import Button from '@material-ui/core/Button'
import TextField from "@material-ui/core/TextField"


export default class CreateBatchForm extends PureComponent {
	state = {}

	handleSubmit = (e) => {
	  e.preventDefault()
      this.props.onSubmit(this.state)
      console.log(this.state)
	}

	handleChange = (event) => {
	  const {name, value} = event.target

	  this.setState({
	    [name]: value
	  })
	}

	render() {
	  return (
	    <Paper className="styles">
	      <h3>Create new Class</h3>
	      <form onSubmit={this.handleSubmit}>
	        <TextField
	          id="batchId"
	          label="Batch Id"
	          name="batchId"
	          type="number"
	          value={ this.state.batchId || '' }
	          onChange={ this.handleChange }
	        />
	        <br/>
	        <TextField
	          id="startDate"
	          name="startDate"
	          type="date"
	          value={ this.state.startDate || '' }
	          onChange={ this.handleChange }
	        />
	        <br/>
	        <TextField
	          id="endDate"
	          name="endDate"
	          type="date"
	          value={ this.state.endDate || '' }
	          onChange={ this.handleChange }
	        />
	        <br/>
	        <Button
	          className="loginButton"
	          type="submit"
	          color="primary"
	          variant="raised"
	        >
                      Save
	        </Button>
	      </form>
	    </Paper>
			
	  )
	}
}