const gridSize = 9;

document.addEventListener('DOMContentLoaded',() => {
    const solveBtn = document.querySelector('#solve-btn');
    solveBtn.addEventListener('click',solveSoduko);

    const sodukoGrid = document.querySelector('#soduko-grid');

    for(let row=0;row<gridSize;row++){
        const newRow = document.createElement('tr');
        for(let col=0;col<gridSize;col++){
            const cell = document.createElement('td');
            const input = document.createElement('input');
            input.type = 'number';
            input.className = 'cell';
            input.id = `cell-${row}-${col}`;
            cell.appendChild(input);
            newRow.appendChild(cell);
        }
        sodukoGrid.appendChild(newRow);
    }
});

async function solveSoduko(){
    
    const sodukoArray = [];
    for(let row=0;row<gridSize;row++){
        sodukoArray[row] = [];
        for(let col=0;col<gridSize;col++){
            const cellId = `#cell-${row}-${col}`;
            const cellValue = document.querySelector(cellId).value;
            sodukoArray[row][col] = cellValue !== "" ? parseInt(cellValue) : 0;
        }
    }

    for(let row=0;row<gridSize;row++){
        for(let col=0;col<gridSize;col++){
            const cellId = `#cell-${row}-${col}`;
            const cell = document.querySelector(cellId);

            if(sodukoArray[row][col] !== 0){
                cell.classList.add('user-input');
            }
        }
    }

    if(solveSodukoHelper(sodukoArray)){
        for(let row=0;row<gridSize;row++){
            for(let col=0;col<gridSize;col++){
                const cellId = `#cell-${row}-${col}`;
                const cell = document.querySelector(cellId);

                if(!cell.classList.contains('user-input')){
                    cell.value = sodukoArray[row][col];
                    cell.classList.add('solved');
                    await sleep(20);
                }
            }
        }
    }
    else{
        alert('No solution exists for this puzzle');
    }
}

const solveSodukoHelper = board => {
    for(let row=0;row<gridSize;row++){
        for(let col=0;col<gridSize;col++){
            if(board[row][col]===0){
                for(let num = 1; num<=9 ; num++){
                    if(isValidMove(board,row,col,num)){
                        board[row][col] = num;

                        if(solveSodukoHelper(board)){
                            return true;
                        }

                        board[row][col] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}

const isValidMove = (board,row,col,num) => {
    for(let i = 0; i<gridSize; i++){
        if(board[i][col] === num || board[row][i] === num){
            return false;
        }
    }

    const startRow = Math.floor(row/3)*3;
    const startCol = Math.floor(col/3)*3;

    for(let i = startRow ; i < startRow+3 ; i++){
        for(let j = startCol ; j < startCol+3 ; j++){
            if(board[i][j]===num){
                return false;
            }
        }    
    }
    return true;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}