import "./App.css";
import React, { Component } from "react";
import GameItem from "./components/GameItem";
import congratulations from "./components/congratulations.jsx";
import rainbow from "./rainbow.png";
import jellyfish from "./jellyfish.png";
import disco from "./disco.png";
import flamingo from "./flamingo.png";
import lollipop from "./lollipop.png";
import mermaid from "./mermaid.png";
import PinkHeartEmoji from "./PinkHeartEmoji.png";
import purpleheart from "./purpleheart.png";
import raccoon from "./raccoon.png";
import rollerskate from "./rollerskate.png";
class App extends Component {
  constructor(props) {
    super(props);

    const best = localStorage.getItem("best");

    this.state = {
      score: 0,
      bestScore: best ? best : 0,
      items: [
        {
          content: <img src={rainbow} className="" alt="rainbow" width="300" />,
          wasViewed: false,
        },
        {
          content: (
            <img src={jellyfish} className="" alt="jellyfish" width="300" />
          ),
          wasViewed: false,
        },
        {
          content: (
            <img src={disco} className="" alt="disco ball" width="300" />
          ),
          wasViewed: false,
        },
        {
          content: (
            <img src={flamingo} className="" alt="flamingo" width="300" />
          ),
          wasViewed: false,
        },
        {
          content: (
            <img src={lollipop} className="" alt="lollipop" width="300" />
          ),
          wasViewed: false,
        },
        {
          content: <img src={mermaid} className="" alt="mermaid" width="300" />,
          wasViewed: false,
        },
        {
          content: (
            <img
              src={PinkHeartEmoji}
              className=""
              alt="pink heart emoji"
              width="300"
            />
          ),
          wasViewed: false,
        },
        {
          content: (
            <img
              src={purpleheart}
              className=""
              alt="purple heart"
              width="300"
            />
          ),
          wasViewed: false,
        },
        {
          content: <img src={raccoon} className="" alt="raccoon" width="300" />,
          wasViewed: false,
        },
        {
          content: (
            <img
              src={rollerskate}
              className=""
              alt="roller skate"
              width="300"
            />
          ),
          wasViewed: false,
        },
      ],
    };

    this.checkScore = this.checkScore.bind(this);
    this.randomizeNumbers = this.randomizeNumbers.bind(this);
  }

  flashCongratulations() {
    const congrats = document.getElementById("congratulations");
    congrats.classList.toggle("show-congrats");
    setTimeout(() => congrats.classList.toggle("show-congrats"), 5000);
  }

  checkScore(item, answer) {
    let tempArray = this.randomizeNumbers();

    if (item.wasViewed === answer) {
      let incrementedScore = this.state.score + 1;

      if (incrementedScore === 10) {
        this.flashCongratulations();

        localStorage.setItem("best", incrementedScore);
        this.setState({
          score: 0,
          bestScore: incrementedScore,
          items: tempArray,
        });
      } else {
        tempArray.forEach((num) => {
          if (num.content == item.content) {
            num.wasViewed = true;
          }
        });
        const newBest =
          this.state.bestScore > incrementedScore
            ? this.state.bestScore
            : incrementedScore;

        localStorage.setItem("best", newBest);

        this.setState({
          score: incrementedScore,
          bestScore: newBest,
          items: tempArray,
        });
      }
    } else {
      tempArray.forEach((item) => {
        item.wasViewed = false;
      });
      this.setState({
        score: 0,
        bestScore:
          this.state.bestScore > this.state.score
            ? this.state.bestScore
            : this.state.score,
        items: tempArray,
      });
    }
  }

  randomizeNumbers() {
    let array = this.state.items;
    let index = this.state.items.length,
      temporaryIndex,
      randomIndex;

    while (0 !== index) {
      randomIndex = Math.floor(Math.random() * index);
      index -= 1;

      temporaryIndex = array[index];
      array[index] = array[randomIndex];
      array[randomIndex] = temporaryIndex;
    }

    return array;
  }

  componentDidMount() {
    let array = this.randomizeNumbers();
    this.setState({ items: array });
  }

  render() {
    const randomIndex = Math.floor(Math.random() * this.state.items.length);
    const selectedNum = this.state.items[randomIndex];

    return (
      <main className="App">
        <header className="header">
          <h1>React: Emoji Memory Game</h1>
        </header>
        <div className="instructions">
          <p>
            Test your memory.<br></br>
          </p>
        </div>
        <div className="scoreboard">
          Highest possible score is 10!<p></p>
          <span>Score: {this.state.score} </span>
          <span>Best Score: {this.state.bestScore}</span>
        </div>

        <section className="body">
          <div className="game">
            <GameItem value={selectedNum} />
            <div>
              <h3>Have you seen this emoji yet?</h3>
              <button
                id="no"
                className="btn"
                onClick={() => this.checkScore(selectedNum, false)}
              >
                No
              </button>
              {"  or  "}
              <button
                id="yes"
                className="btn"
                onClick={() => this.checkScore(selectedNum, true)}
              >
                Yes
              </button>
            </div>
          </div>
        </section>
      </main>
    );
  }
}

export default App;
