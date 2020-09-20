import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import styled from 'styled-components';
import test from '../../../test.json';
import SubmitForm from './SubmitForm.jsx';
import WeekPicker from './WeekPicker.jsx';


const LeftCol = styled.div`
height: 100%;
display: block;
margin: 0 auto;
width: 65%;
flex-direction: column;
flex: 1;
position: relative;
float: left;
font-family: Arial, Helvetica, sans-serif;
`;

const RightCol = styled(LeftCol)`
&&& {
  width: 35%;
  float: right;
  text-position: center;
}
`

const Game = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px;
  margin: 10px;
  position: relative;
  float: left;
  width: 65%;
`;

const GameHeader = styled.div`
  display: block;
  height: auto;
  background: #fff;
  border: 1px solid #cfd6db;
  // border-top-right-radius: 4px;
  // border-top-left-radius: 4px;
  flex: left;
  position: relative
  padding: 1px;
  width: 660px;
  // text-transform: uppercase;
`;

const GameNumber = styled.div`
  position: relative;
  flex: right;
  float: right;
  text-align: right;
  display: block;
  padding: 10px;
  width: 30%;
`;

const TeamHeader = styled(GameNumber)`
&&& {
  float: left;
  text-align: left;
}
`;

const SpreadHeader = styled(GameNumber)`
&&& {
  float: left;
  text-align: center;
}
`;

const Day = styled.div`
  position: relative;
  flex: right;
  float: right;
  display: block;
  padding: 10px;
`;

const Details = styled.div`
  display: block;
  float: left;
  padding: 10px;
  border: 1px solid #cfd6db;
  //width: 60%;
  width: 640px;
`;

const Container = styled.div`
  width: 590px;
`;

const PickDetails = styled(Details)`
&&& {
  border: none;
  // height: 300px;
  width: 80%;
  margin-right: 5px;
}
`;

const Team = styled.div`
  float: left;
  text-align: left;
  width: 30%;
  padding: 10px;
`;

const Spread = styled.div`
  float: left;
  text-align: center;
  width: 30%;
  padding: 10px;
`;

const Select = styled.button`
  float: right;
  padding: 5px;
  color: white;
  background-color: green;
`;

const Delete = styled(Select)`
&&& {
  background-color: red;
  float: left;
  margin-right: 10px;
  padding: 0px 2px;
}
`;

const PicksHeader = styled.h2`
  padding: 20px;
`;

const PickWrapper = styled.div`
width: 100%;
float: left;
padding: 5px;
position: relative;
`;

const SelectedTeam = styled.div`
width: 75%;
display: flex;
`;

const WeekPicks = styled.div`
  margin-bottom: 10px;
`;


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      games: test.data,
      availableWeeks: [1,2,3,4,5,6,7,8,9,10,11,12],
      selectedWeek: 2,
      selectedTeams: [],
      weeks: {
        1: {
          start: '2020-09-10',
          end: '2020-09-17'
        },
        2: {
          start: '2020-09-17',
          end: '2020-09-24'
        },
        3: {
          start: '2020-10-01',
          end: '2020-10-08'
        },
        4: {
          start: '2020-10-08',
          end: '2020-10-15'
        },
        5: {
          start: '2020-10-15',
          end: '2020-10-22'
        },
        6: {
          start: '2020-10-22',
          end: '2020-10-29'
        },
        7: {
          start: '2020-11-05',
          end: '2020-11-12'
        },
        8: {
          start: '2020-11-12',
          end: '2020-11-19'
        },
        9: {
          start: '2020-11-19',
          end: '2020-11-26'
        },
        10: {
          start: '2020-11-26',
          end: '2020-12-03'
        },
        11: {
          start: '2020-12-03',
          end: '2020-12-10'
        },
        12: {
          start: '2020-12-10',
          end: '2020-12-17'
        }
      },
    };
    this.handlePick = this.handlePick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.changeWeek = this.changeWeek.bind(this);
    this.getGames = this.getGames.bind(this);
  }

  componentDidMount() {
    this.getGames();
  }

  getGames() {
    axios.get(`/api/games`)
    .then((response) => {
      console.log(response);
      this.setState({
        games: response.data.data
      })
    });
  };

  handlePick(team) {
    let oldPicks = this.state.selectedTeams;
    if (oldPicks.indexOf(team) !== -1) {
      alert(`You cannot pick ${team} twice`);
    } else {
      oldPicks.push(team);
      this.setState({selectedTeams: oldPicks});
    }
  }

  handleDelete(removedPick) {
    console.log(removedPick);
    let newPicks = this.state.selectedTeams.filter(team => team !== removedPick);
    this.setState({
      selectedTeams: newPicks
    })
  }

  changeWeek(event) {
    console.log('week trying to change');
    console.log(event.target.value);
    this.setState({
      selectedWeek: event.target.value
    })
  }

  render () {
    return (
      <div>
        <h1>Survivor Pool Assistant</h1>
        <LeftCol>
        <h2>{`Week ${this.state.selectedWeek} Remaining Games`}</h2>
        <p>Select a different week: </p>
        <WeekPicker selectedWeek={this.state.selectedWeek} weeks={this.state.availableWeeks} changeWeek={this.changeWeek}></WeekPicker>
        <p>{`Data last updated on ` + new Date()}</p>
          {
            this.state.games.map((game, i) => {
              let gameTime = game.commence_time.substring(0,10);
              let weekStart = this.state.weeks[this.state.selectedWeek].start;
              let weekEnd = this.state.weeks[this.state.selectedWeek].end;
              if (gameTime >= weekStart && gameTime < weekEnd) {
                return (
                  <Game>
                    <GameHeader>
                      <Container>
                        <TeamHeader>Team</TeamHeader>
                        <SpreadHeader>Spread</SpreadHeader>
                      </Container>
                      <GameNumber>{'Game ' + (i+1)}</GameNumber>
                      {/* <Day>{new Date(game.commence_time).toString().substring(0, 15)}</Day> */}
                    </GameHeader>
                    <span></span>
                    <Details>
                      <Container>
                        <Team>{game.teams[0]}</Team>
                        <Spread>{game.sites[0].odds.spreads.points[0]}</Spread>
                        <Select id={game.teams[0]} onClick={() => this.handlePick(game.teams[0])}>Select</Select>
                      </Container>
                      <br></br>
                      <Container>
                        <Team>{game.teams[1]}</Team>
                        <Spread>{game.sites[0].odds.spreads.points[1]}</Spread>
                        <Select id={game.teams[1]} onClick={() => this.handlePick(game.teams[1])}>Select</Select>
                      </Container>
                    </Details>
                  </Game>
                )
              }
            })
          }
        </LeftCol>
        <RightCol>
        <PicksHeader>Selected Teams</PicksHeader>
        <br></br>
          <PickDetails>
            <WeekPicks>{`Week ` + this.state.selectedWeek + ` Picks`}</WeekPicks>
            {this.state.selectedTeams.map((team) => {
              return (
                <PickWrapper>
                  <Delete id={team} onClick={() => this.handleDelete(team)}>x</Delete>
                  <SelectedTeam>{team}</SelectedTeam>
                </PickWrapper>
              )
            })}
          </PickDetails>
          <br></br>
          <SubmitForm selectedWeek={this.state.selectedWeek} picks={this.state.selectedTeams}></SubmitForm>
        </RightCol>
     </div>
    );
  }
}

export default App;