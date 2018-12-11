import React, { Component } from 'react';

class Canvas extends Component {
    constructor(props) {
        super(props);

        this.continueAnimation = true;
    }
    /**
     * After the component has mounted
     */
    componentDidMount() {
        // Request initial animation frame
        // requestAnimationFrame((timestamp) => { this.onAnimFrame(timestamp); });
        this.buildGrid();
    }
    componentDidUpdate(){
        this.onAnimFrame();
    }
    /**
     * When the component is about to unmount
     */
    // componentWillUnmount() {
    //     // Stop animating
    //     this.continueAnimation = false;
    // }

    /**
     * Called every frame of animation
     */
    buildGrid = () => {
        const ctx = this.refs.canvas.getContext('2d');
        for(let i = 0; i <= this.props.height; i += this.props.rowPx){
            ctx.moveTo(i, 0);
            ctx.lineTo(i, this.props.height)
            for(let j = 0 ; j <= this.props.width; j+= this.props.colPx){
                ctx.moveTo(0, j);
                ctx.lineTo(this.props.height, j)
            }
        }
        ctx.stroke();
        // ctx.fillRect(30, 0, 15, 15)
    }

    determinPosition = (e) => {
        console.log(this.props.rowPx)
        const pos = this.refs.canvas.getBoundingClientRect()
        const xAxis = Math.floor((e.clientX - pos.x) / this.props.rowPx);
        const yAxis = Math.floor((e.clientY - pos.y) / this.props.colPx);
        // const ctx = this.refs.canvas.getContext('2d');
        console.log("clientX - posX", (e.clientX - pos.x));

        
        // ctx.fillRect(
        //     e.clientX - pos.x - ((e.clientX - pos.x) % 15),
        //     e.clientY - pos.y - ((e.clientY - pos.y) % 15),
        //     15,
        //     15
        // );
        this.props.boardClick(yAxis, xAxis)
        // console.log(xAxis, yAxis);
    }
    onAnimFrame() {
        // If desired, request another anim frame for later
        // if (this.continueAnimation) {
        //     requestAnimationFrame((timestamp) => { this.onAnimFrame(timestamp); });
        // }
        const ctx = this.refs.canvas.getContext('2d');
        const board = this.props.board;
        for(let i = 0, l = board.length; i < l; i++){
            for(let j = 0, l = board.length; j < l; j++){
                if(board[i][j]){
                    ctx.fillRect(j * this.props.colPx + 1, i * this.props.rowPx + 1, this.props.colPx - 2, this.props.rowPx - 2)
                }else{
                    ctx.clearRect(j * this.props.colPx + 1, i * this.props.rowPx + 1, this.props.colPx - 2, this.props.rowPx - 2)
                }
            }
        }
        // this.buildGrid()
    }

    /**
     * Render the canvas
     */
    render() {
        return( 
            <canvas 
                ref="canvas" 
                width={this.props.width} 
                height={this.props.height}
                onClick={this.determinPosition}
                className="canvas"
            />
        );
    }
}

export default Canvas;