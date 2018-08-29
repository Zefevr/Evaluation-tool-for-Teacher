import React, { PureComponent } from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { updateStudent, fetchStudent } from "../../actions/students";
import { addEvaluation } from "../../actions/evaluations";
import { fetchBatch } from "../../actions/batches";
import CreateStudent from "../batches/CreateStudent";
import CreateEvaluation from "./CreateEvaluation";
import Image from "../../components/images/image";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper'

class StudentDetails extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      edit: false
    };
  }

    toggleEdit = () => {
      this.setState({
        edit: !this.state.edit
      });
    };

    componentDidMount() {
      this.props.fetchStudent(this.props.match.params.id)
    }

  updateStudent = student => {
    this.props.updateStudent(this.props.match.params.id, student);
    this.toggleEdit();
  };

  createEvaluation = evaluation => {
    const { student } = this.props;
    evaluation = { ...evaluation, student: student.id };
    this.props.createEvaluation(evaluation);
  };

  fetchBatch() {
    const { student } = this.props;
    const batchId = student.batch;
    this.props.fetchBatch(batchId);
  }

  render() {
    const {student} = this.props;
    if (!student) return null;


    return (
      <div>
        <Paper className="batches">
          {this.state.edit && <CreateStudent onSubmit={this.updateStudent} />}
          {!this.state.edit && (
            <div>
              <h1>
                <Image content={student.profilePicture} />
                <br />
                {student.firstName} {student.lastName}
              </h1>
              <Button onClick={this.toggleEdit}>edit student</Button>
            </div>
          )}
          <Table className="batches">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Score</TableCell>
                <TableCell>Evaluation date</TableCell>
                <TableCell>Remark</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {student.evaluations.map(evaluation => {
                return (
                  <TableRow key={evaluation.id}>
                    <TableCell component="th" scope="row">
                      {student.id}
                    </TableCell>
                    <TableCell>{evaluation.color}</TableCell>
                    <TableCell>{evaluation.scoreDate.slice(0, 10)}</TableCell>
                    <TableCell>{evaluation.remark}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>

        <CreateEvaluation onSubmit={this.addEvaluation} />
      </div>
    );
  }
}

const mapStateToProps = function(state, props) {
  return {
    student: state.student,
    evaluations: state.evaluations
  };
};

export default connect(mapStateToProps,{fetchStudent, updateStudent, fetchBatch, addEvaluation})(StudentDetails);