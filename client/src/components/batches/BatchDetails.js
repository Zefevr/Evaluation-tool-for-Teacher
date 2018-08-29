import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { fetchBatch, fetchAllBatches } from "../../actions/batches";
import { createStudent, deleteStudent, fetchStudent } from "../../actions/students";
import CreateStudent from "./CreateStudent";
import { Link, Redirect } from "react-router-dom";
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Image from "../../components/images/image";
import "../../App.css";


class BatchDetails extends PureComponent {
  state = {}

  componentWillMount() {
    if (this.props.authenticated){
      this.props.fetchBatch(this.props.match.params.id)
    }
  }

  fetchStudent(studentId) {
    this.props.fetchStudent(studentId);
  }

  createStudent = student => {
    const { batch } = this.props;
    student = { ...student, batch: batch.id };
    this.props.addStudent(student);
  };

  deleteStudent(studentId) {
    this.props.deleteStudent(studentId, parseInt(this.props.match.params.id, 10))
  }

  


  render() {
    const { batch, authenticated, history } = this.props;
    
    if (!authenticated) return (
      <Redirect to="/login" />
    )
    
    if (!batch) return null

    

    const allStudents = batch.students.length
    const redStudents = batch.students.filter(student => student.color === 'Red').length
    const redStudentsPercentage = redStudents / allStudents * 100
    const yellowStudents = batch.students.filter(student => student.color === 'Yellow').length
    const yellowStudentsPercentage = yellowStudents / allStudents * 100

    const greenStudents = batch.students.filter(student => student.color === 'Green').length
    const greenStudentsPercentage = greenStudents / allStudents * 100

    const mightyReds = batch.students.filter(student => student.color === 'Red')
    const migthyYellows = batch.students.filter(student => student.color === 'Yellow')
    const mightyGreens = batch.students.filter(student => student.color === 'Green')
    const mightAll = batch.students


    const ColorArray = Array(20)
      .fill("green")
      .concat(Array(45).fill("red"), Array(35).fill("yellow"));
    

    let randomColor = ColorArray[Math.floor(Math.random() * ColorArray.length)];

    let randomStudentId;

  

    if (randomColor === "Red" && redStudents > 0) {
      randomStudentId = mightyReds[Math.floor(Math.random() * mightyReds.length)].student
    }
    if (randomColor === "Green" && greenStudents > 0) {
      randomStudentId = mightyGreens[Math.floor(Math.random() * mightyGreens.length)].student
    }
    if (randomColor === "Yellow" && yellowStudents > 0) {
      randomStudentId = migthyYellows[Math.floor(Math.random() * migthyYellows.length)].student
    } else {
      randomStudentId = mightAll[Math.floor(Math.random() * mightAll.length)]
    }
    

    return (
      <div>
        {!batch.id && <div>Loading...</div>}
        {batch.id && (
          <Paper className="batches" elevation={4}>
            <br />
            <div>
              <Link
                className="link"
                to={`/students/${randomStudentId.id}`}
                onClick={() => this.fetchStudent(randomStudentId.id)}
              >
              Ask a Question
              </Link>
            </div>

            <h1>Batch #{batch.batchId}</h1>

            <div style={{border: "1px solid black", margin: "10px"}}>
              <div style={{width: Math.floor( redStudentsPercentage ) + '%', backgroundColor: 'red', float: "left", color: "white", textAlign: "center"}}>{Math.floor(redStudentsPercentage)}%</div>
              <div style={{width: Math.floor( yellowStudentsPercentage ) + '%', backgroundColor: 'yellow', float: "left", textAlign: "center"}}>{Math.floor(yellowStudentsPercentage)}%</div>
              <div style={{width: Math.floor( greenStudentsPercentage ) + '%', backgroundColor: 'green', float: "left", color: "white", textAlign: "center"}}>{Math.floor(greenStudentsPercentage)}%</div>
              <div style={{clear: "both"}}> </div>
            </div>
            <br />
            <table>
              <thead>
                <tr>
                  <th>First name</th>
                  <th>Last name</th>
                  <th>Picture</th>
                </tr>
              </thead>
         
              <tbody>
                {batch.students.map((student) => (
                  <tr key={student.id}>
                    <td>{student.firstName}</td>
                    <td>{student.lastName}</td>
                    <td>
                      <Image content={student.profilePicture} />
                    </td>
                    <td>
                      {" "}
                      <Button onClick={() => history.push(`/students/${student.id}`)}>Student profile</Button>
                    </td>
                    <td>
                      <Button
                        onClick={() => this.deleteStudent(student.id)}
                      >
                        Delete
                      </Button>
                      {" "}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h1>Add new student</h1>
            <CreateStudent onSubmit={this.addStudent} />
          </Paper>)}
      </div>
    )}}

const mapStateToProps = function(state) {
  return {
    authenticated: state.currentUser !== null,
    batch: state.batch,
    students: state.students,
    deleteStudent: state.deleteStudent
  };
};

export default connect(mapStateToProps,{fetchBatch,createStudent,deleteStudent,fetchStudent, fetchAllBatches})(BatchDetails);