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
        this.buildGrid()
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
        for(let i = 0; i <= this.props.height; i += 15){
            ctx.moveTo(i, 0);
            ctx.lineTo(i, this.props.height)
            for(let j = 0 ; j <= this.props.width; j+= 15){
                ctx.moveTo(0, j);
                ctx.lineTo(this.props.height, j)
            }
        }
        ctx.stroke();
        // ctx.fillRect(30, 0, 15, 15)
    }

    determinPosition = (e) => {
        const pos = this.refs.canvas.getBoundingClientRect()
        const xAxis = Math.floor((e.clientX - pos.x) / 15);
        const yAxis = Math.floor((e.clientY - pos.y) / 15);
        // const ctx = this.refs.canvas.getContext('2d');
        console.log("clientX - posX", (e.clientX - pos.x));
        console.log("clientX - posX % 15", ((e.clientX - pos.x) % 15));
        console.log(e.clientX - pos.x - ((e.clientX - pos.x) % 15))
        
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
        for(let i = 0; i < board.length; i++){
            for(let j = 0; j < board.length; j++){
                
                if(board[i][j]){
                    console.log("test")
                    ctx.fillRect(j * 15, i * 15, 15, 15)
                }else{
                    ctx.clearRect(j * 15, i * 15, 15, 15)
                }
            }
        }
        this.buildGrid()
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