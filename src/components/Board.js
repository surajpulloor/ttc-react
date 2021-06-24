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
            started: false,
            finished: false,
            winnerFound: false
        };
    }


    componentDidMount() {

        document.addEventListener("keydown", (e) => {
            //  Numbers above the alphabets  ||       The Numpad 
            if (e.keyCode >= 49 && e.keyCode <= 57 || e.keyCode >= 97 && e.keyCode <= 105) {
                const startKeyCode = e.keyCode < 97 ? 48 : 96;
                this.handleClick(e.keyCode - startKeyCode - 1);
            } else if (e.keyCode === 83) {
                this.start();
            }

            return;
        });

    }


    generateSquare = (i) => {
        return <Square sign={this.state.board[i]} onClick={() => this.handleClick(i)} />
    }


    handleClick = (i) => {

        if (this.state.started && this.state.board[i] === null) {
            const board = [...this.state.board];
            board[i] = this.state.current;
    
            this.setState(prevState => ({
                board: board,
                n: prevState.n + 1
            }), () => {

                let winnerFound = false;

                if ((winnerFound = this.foundWinner(i)) || this.state.n === 9) {

                    this.setState({
                        winnerFound,
                        finished: true,
                        started: false
                    });

                } else {
                    this.setState(prevState => ({
                        current: prevState.current === 'X' ? 'O' : 'X',
                    }));
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
        let cnt = 3;
    
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

            return limits;
            
        }

    }


    foundWinner = (i) => {

        const hLimits = this.hCheck(i);
        const wonH = this.findOut(hLimits);

        const vLimits = this.vCheck(i);
        const wonV = this.findOut(vLimits);



        // check right diagonal
        let wonRD = false;

        
        // check right diagonal
        let wonLD = false;


        if (i % 2 === 0) {

            const dLimits = this.dCheck(i);

            
            if (dLimits.hasOwnProperty('0')) {
                wonRD = this.findOut(dLimits[0]);
            }


            if (dLimits.hasOwnProperty('2')) {
                wonLD = this.findOut(dLimits[2]);
            }


        }


        return wonH || wonV || wonRD || wonLD;

    }


    findOut = (limit) => {

        for (let i = limit.lower; i <= limit.upper; i += limit.cnt) {
            if (this.state.board[i] !== this.state.current) {
                return false;
            }
        }

        return true;
    }

    start = () => {
        let pValue = prompt("Enter either X/O");
        pValue = pValue ? pValue.toUpperCase() : "";

        if (pValue === "X" || pValue === "O") {
            this.setState({
                board: [
                    null, null, null,
                    null, null, null,
                    null, null, null
                ],
                n: 0,
                started: true,
                current: pValue,
                finished: false,
                winnerFound: false
            });
        }
            
           
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
                    this.state.winnerFound ?

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