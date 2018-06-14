import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {createBatch} from '../../actions/batches'
import CreateBatchForm from './CreateBatchForm'
import {Redirect} from 'react-router-dom'


class CreateBatchPage extends PureComponent {
	handleSubmit = (data) => {
	  this.props.postNewBatch(data.batchId, data.startDate, data.endDate)
	}

	render() {
	  if (this.props.createBatch.success) return (
	    <Redirect to="/batches" />
	  )

	  return (
	    <div>
	      <h1>Create a new batch</h1>

	      <CreateBatchForm onSubmit={this.handleSubmit} />

	      <p style={{color:'red'}}>{ this.props.createBatch.error }</p>
	    </div>
	  )
	}
}

const mapStateToProps = function (state) {
  return {
    createBatch: state.createBatch
  }
}

export default connect(mapStateToProps, {postNewBatch: createBatch})(CreateBatchPage)