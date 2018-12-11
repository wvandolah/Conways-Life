const life = (board) => {
  // console.log(board);
  const newBoard = board.map(arr => [...arr]);
  const rowL = board.length;
  const colL = board[0].length;
  for(let row = 0; row < rowL; row++){
    for(let col = 0; col < colL; col++){
      let count = 0;
      for(let lRow = -1; lRow < 2; lRow++){
        for(let lCol = -1; lCol < 2; lCol++){
          if(typeof board[row + lRow] !== 'undefined'){
            if(typeof board[row + lRow][col + lCol] !== 'undefined'){
              if(board[row + lRow][col + lCol]){
                count++;
              }
            }
          }
        }
      }
      if(board[row][col]){
        count--;
      }
      
      if(board[row][col]){
        if(count === 2 || count === 3){
          newBoard[row][col] = true;
        }else{
          newBoard[row][col] = false;
        }
      }
      if(!board[row][col] && count === 3){
        newBoard[row][col] = true;
      }
      // console.log("count:", count, "Row:", row, "Col:", col);
    }
  }

  // console.log(newBoard)
  return newBoard;
};

export default life;