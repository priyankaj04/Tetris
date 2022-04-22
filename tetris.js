document.addEventListener('DOMContentLoaded', () => {
        const gridWidth = 30;
        const gridHeight = 20;
        const gridSize = gridWidth * gridHeight;

        const grid = createGrid();
        let squares = Array.from(grid.querySelectorAll("div"));
        const ScoreDisplay = document.querySelector('.value');
        const StartButton = document.querySelector('.start-button');
        let game = document.getElementsByClassName(".game-over");
        let curIndex = 0;
        let curRotation = 0;
        const width = 30;
        let score = 0;
        let time;
        let nextRan = 0;
        let clrRandom = 0;
        const color = [
                "url(blue_block.png)",
                "url(pink_block.png)",
                "url(purple_block.png)",
                "url(peach_block.png)",
                "url(yellow_block.png)",
                "url(navy_block.png)",
                "url(green_block.png)",
        ];
        let clrRan = Math.floor((Math.random() * 7) + 1);
        function createGrid() {
                let grid = document.querySelector(".grid");
                for (let j = 0; j < gridSize; j++) {
                        let gridElement = document.createElement("div");
                        grid.appendChild(gridElement);
                }

                for (let z = 0; z < gridWidth; z++) {
                        let gridElement = document.createElement("div");
                        gridElement.setAttribute("class", "Block3");
                        grid.appendChild(gridElement);
                }

                let nextGrid = document.querySelector(".next-grid");
                for (let x = 0; x < 16; x++) {
                        let gridElement = document.createElement("div");
                        nextGrid.appendChild(gridElement);
                }
                return grid;
        }

        function control(e) {
                if (e.keyCode == 39) moveRight();
                else if (e.keyCode === 13) rotate();
                else if (e.keyCode === 37) moveLeft();
                else if (e.keyCode === 40) moveDown();
                else if (e.keyCode === 32) startpause();
        }

        document.addEventListener("keydown", control);

        const LTetro = [
                [1, gridWidth + 1, gridWidth * 2 + 1, 2],
                [0, 1, gridWidth + 1, gridWidth * 2 + 1],
                [0, gridWidth, gridWidth * 2, gridWidth * 2 + 1],
                [gridWidth * 2 + 1, gridWidth * 2 + 2, gridWidth + 2, 2],
        ]

        const zTetro = [
                [0, gridWidth, gridWidth + 1, gridWidth * 2 + 1],
                [gridWidth, gridWidth + 1, gridWidth * 2 + 1, gridWidth * 2 + 2],
                [2, gridWidth + 2, gridWidth + 1, gridWidth * 2 + 1],
                [gridWidth + 2, gridWidth + 1, gridWidth * 2 + 1, gridWidth * 2],
        ];

        const lTetro = [
                [gridWidth, gridWidth + 1, gridWidth * 2 + 1],
                [gridWidth, gridWidth * 2, gridWidth * 2 + 1],
                [gridWidth + 1, gridWidth, gridWidth * 2],
                [gridWidth + 1, gridWidth * 2 + 1, gridWidth * 2],
        ];

        const wTetro = [
                [0, gridWidth, gridWidth + 1, gridWidth * 2 + 1, gridWidth * 2 + 2],
                [2, gridWidth + 2, gridWidth + 1, gridWidth * 2 + 1, gridWidth * 2],
                [2, 1, gridWidth + 1, gridWidth * 2 + 1, gridWidth * 2],
                [0, 1, gridWidth + 1, gridWidth + 2, gridWidth * 2 + 2],
        ];

        const cTetro = [
                [gridWidth, gridWidth * 2, gridWidth * 2 + 1, gridWidth * 2 + 2],
                [gridWidth + 2, gridWidth * 2 + 2, gridWidth * 2 + 1, gridWidth * 2],
                [gridWidth * 2, gridWidth, gridWidth + 1, gridWidth + 2],
                [gridWidth * 2 + 2, gridWidth + 2, gridWidth + 1, gridWidth],
        ];

        const uTetro = [
                [gridWidth * 2, gridWidth, 0, 1, 2, gridWidth + 2, gridWidth * 2 + 2],
                [0, gridWidth, gridWidth * 2, gridWidth * 2 + 1, gridWidth * 2 + 2, gridWidth + 2, 2],
                [gridWidth * 2, gridWidth, 0, 1, 2, gridWidth + 2, gridWidth * 2 + 2],
                [0, gridWidth, gridWidth * 2, gridWidth * 2 + 1, gridWidth * 2 + 2, gridWidth + 2, 2],
        ];

        const ITetro = [
                [gridWidth, gridWidth + 1, gridWidth + 2],
                [1, gridWidth + 1, gridWidth * 2 + 1],
                [gridWidth, gridWidth + 1, gridWidth + 2],
                [1, gridWidth + 1, gridWidth * 2 + 1],
        ];

        const oTetro = [
                [0, 1, gridWidth, gridWidth + 1],
                [0, 1, gridWidth, gridWidth + 1],
                [0, 1, gridWidth, gridWidth + 1],
                [0, 1, gridWidth, gridWidth + 1],
        ];

        const iTetro = [
                [1, gridWidth + 1, gridWidth * 2 + 1, gridWidth + 2],
                [1, gridWidth + 1, gridWidth * 2 + 1, gridWidth],
                [gridWidth, gridWidth + 1, gridWidth + 2, gridWidth * 2 + 1],
                [gridWidth, gridWidth + 1, gridWidth + 2, 1],
        ];

        const tTetro = [
                [1, gridWidth + 1, gridWidth *2 + 1, gridWidth, gridWidth + 2],
                [1, gridWidth + 1, gridWidth *2 + 1, gridWidth, gridWidth + 2],
                [1, gridWidth + 1, gridWidth *2 + 1, gridWidth, gridWidth + 2],
                [1, gridWidth + 1, gridWidth *2 + 1, gridWidth, gridWidth + 2],
        ];

        const allTetros = [
                LTetro,
                zTetro,
                lTetro,
                wTetro, 
                cTetro, 
                uTetro,
                ITetro,
                oTetro,
                iTetro,
                tTetro,
        ];

        let random = Math.floor(Math.random() * allTetros.length);
        let current = allTetros[random][curRotation];

        let currentPos = 4;
        function draw() {
                current.forEach((index) => {
                        let list = squares[currentPos + index].classList;
                        list.add("Block");
                        squares[currentPos + index].style.backgroundImage = color[clrRan];
                });
        }

        function undraw() {
                current.forEach((index) => {
                        squares[currentPos + index].classList.remove("Block");
                        squares[currentPos + index].style.backgroundImage = "none";
                });
        }

        function moveDown() {
                undraw();
                currentPos = currentPos + width;
                draw();
                freeze();
        }

        StartButton.addEventListener("click", () => {
                if (time) {
                        clearInterval(time);
                        time = null;
                }
                else {
                        draw();
                        time = setInterval(moveDown, 1000);
                        nextRan = Math.floor(Math.random() * allTetros.length);
                        clrRandom = Math.floor((Math.random() * 7) + 1);
                        displayShape();
                }
        });

        function startpause() {
                if (time) {
                        clearInterval(time);
                        time = null;
                }
                else {
                        draw();
                        time = setInterval(moveDown, 1000);
                        nextRan = Math.floor(Math.random() * allTetros.length);
                        clrRandom = Math.floor((Math.random() * 7) + 1);
                        displayShape();
                }
        }

        function moveRight() {
                undraw();
                const isAtRightEdge = current.some(
                        (index) => (currentPos + index) % width === width - 1
                );
                if (!isAtRightEdge) currentPos += 1;
                if (
                        current.some((index) =>
                                squares[currentPos + index].classList.contains('Block2'))
                ) {
                        currentPos -= 1;
                }
                draw();
        }

        function moveLeft() {
                undraw();
                const isAtLeftEdge = current.some(
                        (index) => (currentPos + index) % width === 0
                );
                if (!isAtLeftEdge) currentPos -= 1;
                if (
                        current.some((index) =>
                                squares[currentPos + index].classList.contains("Block2")
                        )
                ) {
                        currentPos += 1;
                }
                draw();
        }
        
        function freeze() {
                if (
                        current.some(
                                (index) =>
                                        squares[currentPos + index + width].classList.contains("Block3") ||
                                        squares[currentPos + index + width].classList.contains("Block2")
                        )
                ) {
                        current.forEach((index) =>
                                squares[index + currentPos].classList.add("Block2")
                        );
                        random = nextRan;
                        nextRan = Math.floor(Math.random() * allTetros.length);
                        clrRan = clrRandom;
                        current = allTetros[random][curRotation];
                        currentPos = 4;
                        draw();
                        displayShape();
                        addScore();
                        gameOver();
                }
        }
        freeze();
        function rotate()
        {
                undraw();
                curRotation++;
                if (curRotation === 4)
                {
                        curRotation = 0;
                }
                current = allTetros[random][curRotation];
                draw();
        }
        
        function gameOver() {
                if (
                        current.some((index) =>
                                squares[currentPos + index].classList.contains("Block2")
                        )
                ) {
                        ScoreDisplay.innerHTML = "End";
                        for (let x = 0; x < gridSize; x++)
                        {
                                squares[x].classList.remove("Block");
                                squares[x].style.backgroundImage = "none";
                        }
                        game.innerHTML = "GAME OVER!";
                        clearInterval(time);
                }
        }
        
        const displayWidth = 3;
        const displaySquares = document.querySelectorAll(".next-grid div");
        let displayIndex = 0;
        
        const smalltetros = [
                [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 2 + 2],
                [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1],
                [displayWidth, displayWidth + 1, displayWidth * 2 + 1],
                [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 2 + 2],
                [displayWidth, displayWidth * 2, displayWidth * 2 + 1, displayWidth * 2 + 2],
                [displayWidth * 2, displayWidth, 0, 1, 2, displayWidth + 2, displayWidth * 2 + 2],
                [displayWidth, displayWidth + 1, displayWidth + 2],
                [0, 1, displayWidth, displayWidth + 1],
                [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth + 2],
                [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth, displayWidth + 2],
        ];
        function displayShape()
        {
                displaySquares.forEach((square) => {
                        square.classList.remove("Block");
                        square.style.backgroundImage = "none";
                });
                smalltetros[nextRan].forEach((index) => {
                        displaySquares[displayIndex + index].classList.add("Block");
                        displaySquares[displayIndex + index].style.backgroundImage = color[clrRan];
                });
        }

        function addScore() {
                for (
                        curIndex = 0; curIndex < gridSize; curIndex += gridWidth
                ){
                        const row = [
                                curIndex,
                                curIndex + 1,
                                curIndex + 2,
                                curIndex + 3,
                                curIndex + 4,
                                curIndex + 5,
                                curIndex + 6,
                                curIndex + 7,
                                curIndex + 8,
                                curIndex + 9,
                                curIndex + 10,
                                curIndex + 11,
                                curIndex + 12,
                                curIndex + 13,
                                curIndex + 14,
                                curIndex + 15,
                                curIndex + 16,
                                curIndex + 17,
                                curIndex + 18,
                                curIndex + 19,
                                curIndex + 20,
                                curIndex + 21,
                                curIndex + 22,
                                curIndex + 23,
                                curIndex + 24,
                                curIndex + 25,
                                curIndex + 26,
                                curIndex + 27,
                                curIndex + 28,
                                curIndex + 29,
                        ];
                        if (row.every((index) => squares[index].classList.contains('Block2'))) {
                                score += 10;
                                ScoreDisplay.innerHTML = score;
                                row.forEach((index) => {
                                        squares[index].style.backgroundImage = 'none';
                                        squares[index].classList.remove('Block2') || squares[index].classList.remove('Block');
                                });
                                const squaresRemoved = squares.splice(curIndex, width);
                                squares = squaresRemoved.concat(squares);
                                squares.forEach((cell) => grid.appendChild(cell));
                        }
                }
        }
});