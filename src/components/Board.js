import React, { Component } from "react";
import Square from "./Square";

import '../styles/Board.css';

class Board extends Component {
    constructor(props) {
        super(props);

        this.state = {
            board: [
                null, null, null,
                null, null, null,
                null, null, null
            ],
            n: 0,
            current: '',
            finished: false,
            started: false
        };
    }


    generateSquare = (i) => {
        return <Square sign={this.state.board[i]} onClick={() => this.handleClick(i)} />
    }


    handleClick = (i) => {

        if (this.state.started && !this.state.finished) {
            const board = [...this.state.board];
            board[i] = this.state.current;
    
            this.setState(prevState => ({
                board: board,
                current: prevState.current === 'X' ? 'O' : 'X',
                n: prevState.n + 1
            }), () => {

                if (this.state.n === 8 || this.foundWinner(i)) {

                    this.setState({
                        finished: true
                    }, this.resetState);
                }

            });
        }

        
    }

    hCheck = (i) => {

        let lower = null;
        let upper = null;
        const cnt = 1;

        if (i >= 0 && i <= 2) {
            lower = 0;
            upper = 2;
        } else if (i >= 3 && i <= 5) {
            lower = 3;
            upper = 5;
        } else if (i >= 6 && i <= 8) {
            lower = 6;
            upper = 8;
        }


        return {
            lower,
            upper,
            cnt
        };

    }

    vCheck = (i) => {
        
        let lower = null;
        let upper = null;
        const cnt = 3;

        if (i >= 0 && i <= 2) {
            lower = i;
            upper = i + 6;
        } else if (i >= 3 && i <= 5) {
            lower = i - 3;
            upper = i + 3;
        } else if (i >= 6 && i <= 8) {
            lower = i - 6;
            upper = i;
        }


        return {
            lower,
            upper,
            cnt
        };

    }

    dCheck = (i) => {

        let lower = null;
        let upper = null;
        const cnt = 3;
        
        if (i % 2 === 0) {

            if (i === 0 || i === 8) {
                lower = 0;
                upper = 8;
                cnt = 4;

                return {
                    0: {
                        lower,
                        upper,
                        cnt
                    }
                };

            } else if (i === 2 || i === 6) {
                lower = 2;
                upper = 6;
                cnt = 2;

                return {
                    2: {
                        lower,
                        upper,
                        cnt
                    }
                };

            } else {
                
                // right diagonal
                lower = 0;
                upper = 8;
                cnt = 4;

                const limits =  {
                    0: {
                        lower,
                        upper,
                        cnt
                    }
                };


                // left diagonal
                lower = 2;
                upper = 6;
                cnt = 2;

                limits[2] = {
                    lower,
                    upper,
                    cnt
                }
                
            }

           
            

        } 


        return {
            lower,
            upper,
            cnt
        }

    }


    foundWinner = (i) => {

    }


    findOut = (limit) => {

    }

    start = () => {
        if (!this.state.started) {
            const pValue = prompt("Enter either X/O");
            this.setState({
                current: pValue,
                started: true,
                finished: false
            });
        } else {
            this.resetState();
        }
    }

    resetState = () => {
        this.setState({
            board: [
                null, null, null,
                null, null, null,
                null, null, null
            ],
            n: 0,
            started: false
        });
    }


    render() {
        return (

            <div className="board-with-controls">
                <div className="board">
                    <div className="squares">
                        {this.generateSquare(0)}
                        {this.generateSquare(1)}
                        {this.generateSquare(2)}
                    </div>

                    <div className="squares">
                        {this.generateSquare(3)}
                        {this.generateSquare(4)}
                        {this.generateSquare(5)}
                    </div>

                    <div className="squares">
                        {this.generateSquare(6)}
                        {this.generateSquare(7)}
                        {this.generateSquare(8)}
                    </div>
                </div>

                {
                    this.state.finished ?

                    <h1>The Winner is: {this.state.current} </h1>

                    :

                    ''
                }

                <input type="button" value={!this.state.started || this.state.finished ? "Start" : "Reset"} onClick={this.start} className="btn btn-primary" />
            </div>


        );
    }
}


export default Board;