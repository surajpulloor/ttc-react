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
            winnerFound: false,

            line: {
                x: 0,
                y: 0,

                width: 0,

                angle: 0,
                isHorizontal: false
            }
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

                let winObj = {};

                if ((winObj = this.foundWinner(i)).foundWinner || this.state.n === 9) {

                    this.setState(state => ({
                        winnerFound: winObj.foundWinner,
                        finished: true,
                        started: false,

                        line: winObj.foundWinner ? winObj.limits : state.line
                    }));

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

        let y = 0;

        if (i >= 0 && i <= 2) {
            lower = 0;
            upper = 2;

            y = 44;
        } else if (i >= 3 && i <= 5) {
            lower = 3;
            upper = 5;

            y = 103;
        } else if (i >= 6 && i <= 8) {
            lower = 6;
            upper = 8;


            y = 161;
        }


        return {
            lower,
            upper,
            cnt,

            line: {
                x: 0,
                y,

                width: 0,

                angle: 0,

                isHorizontal: true
            }
        };

    }

    vCheck = (i) => {
        
        let lower = null;
        let upper = null;
        const cnt = 3;
        

        const angle = 90;
        let x = 0;
        let y = 0;
        const width = 197;

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


        // set the x & y
        if ([0, 3, 6].indexOf(i) !== -1) {

            x = 17;
            y = 16;

        } else if ([1, 4, 7].indexOf(i) !== -1) {

            x = 50;
            y = 52;

        } else if ([2, 5, 8].indexOf(i) !== -1) {

            
            x = 87;
            y = 85;
            
        }



        return {
            lower,
            upper,
            cnt,

            line: {
                x,
                y,
                width,
                angle,

                isHorizontal: false
            }
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
                    cnt,

                    line: {
                        x: -3,
                        y: -19,
                        width: 307,
                        angle: 40,
        
                        isHorizontal: false
                    }
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
                    cnt,

                    line: {
                        x: 259,
                        y: 120,
                        width: 307,
                        angle: -40,
        
                        isHorizontal: false
                    }
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
                    cnt,

                    line: {
                        x: -3,
                        y: -19,
                        width: 307,
                        angle: 40,
        
                        isHorizontal: false
                    }
                }
            };


            // left diagonal
            lower = 2;
            upper = 6;
            cnt = 2;

            limits[2] = {
                lower,
                upper,
                cnt,

                line: {
                    x: 259,
                    y: 120,
                    width: 307,
                    angle: -40,
    
                    isHorizontal: false
                }
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


        let dLimits = null;


        const limits = {
            hLimits: hLimits.line,
            vLimits: vLimits.line
        }


        if (i % 2 === 0) {

            dLimits = this.dCheck(i);

            
            if (dLimits.hasOwnProperty('0')) {
                wonRD = this.findOut(dLimits[0]);

                limits['rDLimits'] = dLimits[0].line;
            }


            if (dLimits.hasOwnProperty('2')) {
                wonLD = this.findOut(dLimits[2]);

                limits['lDLimits'] = dLimits[2].line;
            }


        }

        

        const winTypes = {
            wonH,
            wonV,

            wonLD,
            wonRD
        }


        return this.structureWinObj(winTypes, limits);

    }


    structureWinObj(winTypes, limits) {

        const winObj = {
            foundWinner: winTypes.wonH || winTypes.wonV || winTypes.wonRD || winTypes.wonLD
        }

        if (winTypes.wonH) {

            winObj['limits'] = limits.hLimits

        } else if (winTypes.wonV) {

            winObj['limits'] = limits.vLimits

        } else if (winTypes.wonRD) {

            winObj['limits'] = limits.rDLimits

        } else if (winTypes.wonLD) {

            winObj['limits'] = limits.lDLimits

        } 


        return winObj;

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
                winnerFound: false,

                line: {
                    x: 0,
                    y: 0,
    
                    width: 0,
    
                    angle: 0,
                    isHorizontal: false
                }
            });
        }
            
           
    }


    render() {
        return (

            <div className="board-with-controls">
                <div className="board">
                    
                    <div className="non-horizontal-line" style={
                        {
                            display: this.state.winnerFound && !this.state.line.isHorizontal ? 'inline-block' : 'none',
                            transform: `rotate(${this.state.line.angle}deg)`,
                            transformOrigin: `${this.state.line.x}px ${this.state.line.y}px`,
                            width: `${this.state.line.width}px`
                        }
                    }></div>
                    <div className="horizontal-line" style={
                        { 
                            display: this.state.winnerFound && this.state.line.isHorizontal ? 'inline-block' : 'none',
                            top: `${this.state.line.y}px`
                        }
                    }></div>


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