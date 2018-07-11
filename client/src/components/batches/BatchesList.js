import React, { PureComponent } from "react"
import { connect } from "react-redux"
import { fetchAllBatches } from '../../actions/batches'
import { Redirect, Link } from 'react-router-dom'
import Moment from 'moment'
//import Paper from "@material-ui/core/Paper"
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import "../../App.css";

class BatchesList extends PureComponent {
    
  componentWillMount() {
    if (this.props.authenticated) {
      this.props.fetchAllBatches()
    }
  }

  renderBatch = (batch) => {
    const { history } = this.props

    return (<Card key={batch.id} className="batches">
      <CardContent>
        <Button
          color="secondary"
          variant="raised"
          onClick={() => history.push(`/batches/${batch.id}`)}
        >
          Batch #{batch.batchId}
        </Button>
        <Typography variant="title" gutterBottom>
          Total students: {batch.students.length}
        </Typography>
        <Typography variant="body2">
          Start date: {Moment(batch.startDate).format('ll')}
        </Typography>
        <Typography variant="body2">
          End date: {Moment(batch.endDate).format('ll')}
        </Typography>
      </CardContent>
    </Card>)
  }
  
  render(){     
    const {batches, authenticated} = this.props

    if (!authenticated) return (
      <Redirect to="/login" />
    )
        

    if (batches === null) return null

    return (
      <div>
        {batches.map(batch => this.renderBatch(batch))}
        <div>
          <button>
            <Link
              to={`/batch/create`}>
            Create a new Batch
            </Link>
          </button>
        </div>
        
      </div>
    )
  }
}

const mapStateToProps = state => ({
  authenticated: state.currentUser !== null,
  batches: state.batches === null ? null : Object.values(state.batches).sort((a, b) => a.id - b.id),
  createBatch: state.createBatch
})

export default connect(mapStateToProps, { fetchAllBatches })(BatchesList)






