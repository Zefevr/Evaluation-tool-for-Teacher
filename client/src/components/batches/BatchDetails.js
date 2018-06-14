import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { fetchBatch } from "../../actions/batches";
import { createStudent, deleteStudent, fetchStudent } from "../../actions/students";
import CreateStudent from "./CreateStudent";
import { Link, Redirect } from "react-router-dom";
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import "../../App.css";


class BatchDetails extends PureComponent {
  state = {}

  componentDidMount() {
    if (this.props.authenticated){
      this.props.fetchBatch(this.props.match.params.id)
    }
  }

  componentReload() {
    this.props.fetchBatch(this.props.match.params.id);
  }

  createStudent = student => {
    const { batch } = this.props;
    student = { ...student, batch: batch.id };
    this.props.addStudent(student);
  };

  deleteStudent(studentId) {
    this.props.deleteStudent(studentId)
    this.props.fetchBatch(this.props.match.params.id)
  }

  fetchStudent(studentId) {
    this.props.fetchStudent(studentId);
  }

  

  render() {
    const { batch, authenticated } = this.props;
    if (!batch) return null

    if (!authenticated) return (
      <Redirect to="/login" />
    )

    const allStudents = batch.students.length
    const redStudents = batch.students.filter(student => student.color === 'Red').length
    const redStudentsPercentage = redStudents / allStudents * 100
    const yellowStudents = batch.students.filter(student => student.color === 'Yellow').length
    const yellowStudentsPercentage = yellowStudents / allStudents * 100

    const greenStudents = batch.students.filter(student => student.color === 'Green').length
    const greenStudentsPercentage = greenStudents / allStudents * 100


    const ColorArray = Array(20)
      .fill("green")
      .concat(Array(45).fill("red"), Array(35).fill("yellow"));
    

    let randomColor = ColorArray[Math.floor(Math.random() * ColorArray.length)];

    let randomStudentId;

  

    if (randomColor === "Red" && redStudents.length > 0) {
      randomStudentId = redStudents[Math.floor(Math.random() * redStudents.length)].student;
    }
    if (randomColor === "Green" && greenStudents.length > 0) {
      randomStudentId = greenStudents[Math.floor(Math.random() * greenStudents.length)].student;
    }
    if (randomColor === "Yellow" && yellowStudents.length > 0) {
      randomStudentId = yellowStudents[Math.floor(Math.random() * yellowStudents.length)].student;
    } else {
      randomStudentId = allStudents[Math.floor(Math.random() * allStudents.length)]
    }
    console.log(randomStudentId);

    return (
      <div>
        {!batch.id && <div>Loading...</div>}
        {batch.id && (
          <Paper className="styles" elevation={4}>
            <br />
            <div>
              <Link
                className="link"
                to={`/students/${randomStudentId}`}
                onClick={() => this.fetchStudent(randomStudentId)}
              >
              Ask a Question
              </Link>
            </div>

            <h1>Batch #{batch.batchId}</h1>

            <div style={{border: "1px solid black"}}>
              <div style={{width: Math.floor( redStudentsPercentage ) + '%', backgroundColor: 'red', float: "left", color: "white", textAlign: "center"}}>{Math.floor(redStudentsPercentage)}%</div>
              <div style={{width: Math.floor( yellowStudentsPercentage ) + '%', backgroundColor: 'yellow', float: "left", textAlign: "center"}}>{Math.floor(yellowStudentsPercentage)}%</div>
              <div style={{width: Math.floor( greenStudentsPercentage ) + '%', backgroundColor: 'green', float: "left", color: "white", textAlign: "center"}}>{Math.floor(greenStudentsPercentage)}%</div>
              <div style={{clear: "both"}}> </div>
            </div>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>First name</th>
                  <th>Last name</th>
                  <th>Picture</th>
                </tr>
              </thead>
         
              <tbody>
                {batch.students.map((student) => (
                  <tr key={student.id}>
                    <td>{student.id}</td>
                    <td>{student.firstName}</td>
                    <td>{student.lastName}</td>
                    <td>{student.profilePicture}</td>
                    <td>
                      {" "}
                      <Button
                        onClick={() => this.deleteStudent(student.id)}
                      >
                      Delete Student
                      </Button>
                    </td>
                    <td>
                      {" "}
                      <Link
                        className="link"
                        to={`/students/${student.id}`}
                        onClick={() => this.fetchStudent(student.id)}
                      >
                      Student profile
                      </Link>
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
    students: state.students 
  };
};

export default connect(mapStateToProps,{fetchBatch,createStudent,deleteStudent,fetchStudent})(BatchDetails);