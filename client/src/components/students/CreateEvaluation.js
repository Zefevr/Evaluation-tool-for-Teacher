import React, { PureComponent } from "react";
import { connect } from 'react-redux'
import "../../App.css";
import { addEvaluation } from '../../actions/evaluations'
import { addLastColor } from '../../actions/students'
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

class CreateEvaluation extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      remark: '',
      date: new Date(),
      teacherId: '',
      studentId: Number((window.location.href).split('/').pop())
    };

    
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.addEvaluation(this.state);
    console.log(this.state)
    this.props.addLastColor(this.state);
    this.setState({
      color: "",
      remark: "",
      scoreDate: '',
      selectedValue: ""
    });
  };

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
      selectedValue: event.target.value
    });
  };

  render() {
    const initialValues = this.props.initialValues || {};

    return (
      <div>
        <Paper className="styles" elevation={4}>
          <form onSubmit={this.handleSubmit}>
            <br />
            <div>
              <TextField
                label="Remark"
                name="remark"
                id="remark"
                value={this.state.remark || initialValues.remark || ""}
                onChange={this.handleChange}
              />
            </div>
            <br/>
            <div>
              <br/>
              <p>Evaluation Date</p>
              <TextField
                label=""
                name="scoreDate"
                id="scoreDate"
                type="date"
                value={this.state.scoreDate || initialValues.date || ""}
                onChange={this.handleChange}
              />
            </div>
            <br/>
            <div>
              <TextField
                label="Your ID"
                name="teacherId"
                id="teacherId"
                value={this.state.teacherId || initialValues.teacherId || ""}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <TextField
                label="Student ID"
                name="studentId"
                id="studentId"
                value={this.state.studentId || initialValues.studentId || ""}
                onChange={this.handleChange}
              />
              <br/>
              <FormLabel component="legend">Score</FormLabel>
              <FormControlLabel
                value="Green"
                name="color"
                control={<Radio />}
                label="Green"
                checked={this.state.selectedValue === "Green"}
                onChange={this.handleChange}
              />
              <FormControlLabel
                value="Yellow"
                name="color"
                control={<Radio />}
                label="Yellow"
                checked={this.state.selectedValue === "Yellow"}
                onChange={this.handleChange}
              />
              <FormControlLabel
                value="Red"
                name="color"
                control={<Radio />}
                label="Red"
                checked={this.state.selectedValue === "Red"}
                onChange={this.handleChange}
              />
            </div>
            <br />
            <Button type="submit">ADD EVALUATION</Button>
          </form>
        </Paper>
      </div>
    );
  }
}

export default connect(null, {addEvaluation, addLastColor})(CreateEvaluation)