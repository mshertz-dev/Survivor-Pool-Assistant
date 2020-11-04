import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import styled from 'styled-components';
import App from './App.jsx';
// import test from '../../../test.json';

function WeekPicker(props) {
  return (
    <select defaultValue={props.selectedWeek} onChange={props.changeWeek}>
      {props.weeks.map((week) => {
        return <option value={week}>{week}</option>;
      })}
    </select>
  );
}

export default WeekPicker;