import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import styled from 'styled-components';
import test from '../../../test.json';

const Details = styled.div`
  display: block;
  float: left;
  padding: 10px;
  border: 1px solid #cfd6db;
  //width: 60%;
`;

const Container = styled.div`
  width: 590px;
`;

const PickDetails = styled(Details)`
&&& {
  border: none;
  height: auto;
  width: 80%;
  margin-right: 5px;
}
`;

const FormWrapper = styled.div`
display: block;
float: left;
width: 100%;
padding: 10px;
`;

const StatusMessage = styled(FormWrapper)`
&&& {
  color: green;
}
`;


class Submit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      message: "",
      status: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.id]: event.target.value});
  }

  handleSubmit(event) {
    let pickSubmission = {
      week: this.props.selectedWeek,
      picker: this.state.name,
      picks: this.props.picks,
      custom_message: this.state.message,
    };

    axios.post(`/api/picks`, pickSubmission)
    .then((response) => {
      console.log(response);
      this.setState({
        status: response.data
      })
    })
    event.preventDefault();
  }

  render() {
    return (
      <div>
          <FormWrapper>
            <form onSubmit={this.handleSubmit}>
              <label>
                <br></br>
                Your Name:
                <br></br>
                <textarea value={this.state.name} id='name' onChange={this.handleChange} />
                <br></br>
                Custom Message:
                <br></br>
                <textarea value={this.state.message} id='message' onChange={this.handleChange} />
              </label>
              <br></br>
              <input type="submit" value="Text Commish" />
            </form>
          </FormWrapper>
          <StatusMessage>{this.state.status}</StatusMessage>
      </div>
    );
  }
}

export default Submit;