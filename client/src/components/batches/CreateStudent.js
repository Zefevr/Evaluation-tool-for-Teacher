import React, {PureComponent} from 'react'
import { connect } from 'react-redux'
import { createStudent } from '../../actions/students'

class CreateStudent extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      profilePicture: '',
      batchId: ''
    }
		
  }

	handleSubmit = (e) => {
	  e.preventDefault()
	  this.props.createStudent(this.state)
	}

	handleChange = (event) => {
	  const {name, value} = event.target

	  this.setState({
		  [name]: value
	  })
	}

	render() {

	  return (
	    <form onSubmit={this.handleSubmit}>
	      <div>
	        <label htmlFor="firstName">first name: </label>
	        <input name="firstName" id="firstName" value={
	          this.state.firstName || ''
	        } onChange={ this.handleChange } />
	      </div>

	      <div>
	        <label htmlFor="lastName">Last name: </label>
	        <input name="lastName" id="lastName" value={
	          this.state.lastName ||  ''
	        } onChange={ this.handleChange } />
	      </div>

	      <div>
	        <label htmlFor="profilePicture">profilePicture url: </label>
	        <input name="profilePicture" id="profilePicture" value={
	          this.state.profilePicture ||  ''
	        } onChange={ this.handleChange } />
	      </div>

	      <div>
	        <label htmlFor="batchId">Batch Id: </label>
	        <input name="batchId" id="batchId" type="integer" value={
	          this.state.batchId ||  ''
	        } onChange={ this.handleChange } />
	      </div>

	      <button type="submit" onSubmit={this.handleSubmit}>Save</button>
	    </form>
	  )
	}
}

export default connect(null, {createStudent})(CreateStudent)