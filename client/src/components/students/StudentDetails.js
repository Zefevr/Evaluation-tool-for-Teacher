import React, { PureComponent } from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { updateStudent, fetchStudent } from "../../actions/students";
import { addEvaluation } from "../../actions/evaluations";
import { fetchBatch } from "../../actions/batches";
import CreateStudent from "../batches/CreateStudent";
import CreateEvaluation from "./CreateEvaluation";

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
        {this.state.edit && <CreateStudent onSubmit={this.updateStudent} />}
        {!this.state.edit && (
          <div>
            <Button onClick={this.toggleEdit}>edit</Button>
            <h1>
              {student.id}
              {student.firstName}
              {student.lastName}
            </h1>
          </div>
        )}
        {student.id && (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Score</th>
                <th>Evaluation date</th>
                <th>Remark</th>
              </tr>
            </thead>
            <tbody>
              {student.evaluations.map(evaluation => (
                <tr key={evaluation.id}>
                  <td>{student.id}</td>
                  <td>{evaluation.color}</td>
                  <td>{evaluation.scoreDate.slice(0, 10)}</td>
                  <td>{evaluation.remark}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

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