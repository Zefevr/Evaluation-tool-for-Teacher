import React, {PureComponent} from 'react'
import { connect } from 'react-redux'
import { createBatch } from '../../actions/batches'
import Paper from "@material-ui/core/Paper"
import Button from '@material-ui/core/Button'
import TextField from "@material-ui/core/TextField"

class CreateBatch extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      batch_id: '',
      startDate: '',
      endDate: ''
    }
    // this.handleChange = this.handleChange.bind(this);
		
  }

	handleSubmit = (e) => {
	  e.preventDefault()
	  this.props.createBatch(this.state)
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

export default connect(null, {createBatch})(CreateBatch)