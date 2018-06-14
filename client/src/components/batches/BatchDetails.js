import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {fetchBatch} from '../../actions/batches'
import {fetchStudent} from '../../actions/students'
import { Link } from "react-router-dom";
import Moment from 'react-moment'
import CreateStudent from './CreateStudent'


class BatchDetails extends PureComponent {
  state = {}

  componentWillMount(props) {
    this.props.fetchBatch(this.props.match.params.id)
  }

  render() {
    const {batch} = this.props
    if (!batch) return null

    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Batch nr 
                { batch.batchId }
              </th>
              <th>Start date: <Moment format="YYYY/MM/DD">{ batch.startDate } </Moment></th>
              <th>End date: { batch.endDate }</th>
            </tr>
          </thead>
          <tbody>
            { batch.students.map(student => (<tr key={student.id}>
              <td><Link to={ `/students/${student.id}` } onClick={() => this.fetchStudent(student.id)}>Student {student.firstName}{student.lastName}</Link></td>
              <td>{student.profilePicture}</td>
              <td>{student.evaluation}</td>
            </tr>)) }
          </tbody>
        </table>
        <div>
          <h1>Add a Student</h1>
          <CreateStudent href='/students/create' />
        </div>
     
      </div>
    )
  }
}

const mapStateToProps = function (state, props) {
  return {
    batch: state.batch,
    students: state.students
  }
}

export default connect(mapStateToProps, {fetchBatch, fetchStudent})(BatchDetails)