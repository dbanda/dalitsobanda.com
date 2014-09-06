var c_canvas = document.getElementById("c");
var context = c_canvas.getContext("2d");
var PIXELWIDTH = parseInt(c_canvas.width);
var PIXELHEIGHT = parseInt(c_canvas.height);
var nRows = 10; // default


var CELLWIDTH =40;

var cellArray = [[]];
function drawGrid() {
    for (var x = 0.5; x < PIXELWIDTH; x += CELLWIDTH) {
       context.moveTo(x, 0);
       context.lineTo(x, PIXELHEIGHT);
    }
    
    context.moveTo(PIXELWIDTH, 0);
    context.lineTo(PIXELWIDTH, PIXELHEIGHT);

    context.moveTo(0, PIXELHEIGHT);
    context.lineTo(PIXELWIDTH, PIXELHEIGHT);

    for (var y = 0.5; y < PIXELHEIGHT; y += CELLWIDTH) {
        context.moveTo(0, y);
        context.lineTo(PIXELWIDTH, y);
    }
    context.strokeStyle = "#ddd";
    context.stroke();
}

function buildArray () {
    for (var x = 0.5; x < PIXELWIDTH; x += CELLWIDTH) {
        for (var y = 0.5; y < PIXELHEIGHT; y += CELLWIDTH) {

            var squarecoords = getSquareCoords(x,y);
            var xSq = squarecoords[0];
            var ySq = squarecoords[1];
            console.log(xSq, x);
            if (cellArray[xSq] === undefined){
                cellArray[xSq] = [];
            };
            cellArray[xSq][ySq] = new cell(x,y);
        }      
    };
};

buildArray();
function cell (topXpixel, topYpixel){
    this.topXpixel = topXpixel;
    this.topYpixel = topYpixel;
    this.alive = false; //marks state of cell in current iteration
    this.survive =false; //marks state of cell in next iteration
}; 

function getPixelCoords(x,y){
    return [0.5 + CELLWIDTH *x, 0.5 + CELLWIDTH *y];
    
};

function fillSquare(x,y){
    var point = getPixelCoords(x,y)
    var x = point[0];
    var y = point[1];
    context.fillRect(x,y,CELLWIDTH,CELLWIDTH);
}

function clearSquare(x,y){
    var point = getPixelCoords(x,y)
    var x = point[0];
    var y = point[1];
    context.clearRect(x,y,CELLWIDTH,CELLWIDTH);
}


function setCells(cells){
    for (var i = cells.length - 1; i >= 0; i--) {
        var x = cells[i][0];
        var y = cells[i][1];

        fillSquare(x,y);
    };
}

function getSquareCoords(pixelX, pixelY){
    //console.log(pixelX);
    //console.log(pixelY);
    return [Math.floor(Math.max(0,(pixelX -0.5)/CELLWIDTH)),
             Math.floor(Math.max(0,(pixelY -0.5)/CELLWIDTH))]
}
// mouse listener
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function mouseDownEvent( event){
        var mouseX = event.pageX;
        var mouseY = event.pageY;
        var mousepos = getMousePos(c_canvas, event);
        //console.log(mousepos);

        var point = getSquareCoords(mousepos.x, mousepos.y);
        var x = point[0];
        var y = point[1];
        console.log(x,y);
        fillSquare(x,y);
        cellArray[x][y].alive = true;
        cellArray[x][y].survive = true;
}

function update () {
    //console.log("updating");
    for (var x = cellArray.length - 1; x >= 0; x--) {
        for (var y = cellArray[0].length - 1; y >= 0; y--) {
            var me = cellArray[x][y];
            var aliveNeighbors = 0;
            for (var dx = 1; dx >= -1; dx--) {
                for (var dy = +1; dy >= -1; dy--) {
                    if (!(dy === dx && dx ===0)){
                        // console.log(x+dx, "x");`
                        // console.log(y+dy,  "y");
                        if((x+dx < cellArray.length) &&
                            (y+dy < cellArray[0].length) &&
                            (x+dx >= 0) &&
                            (y+dy >= 0) &&
                            (cellArray[x+dx][y+dy].alive)) { 
                                aliveNeighbors ++;
                        };
                    };
                };
            };

            if (aliveNeighbors  == 3) {
                me.survive = true;
            };

            if (aliveNeighbors  < 2) {
                me.survive = false;
                
            };

            if (aliveNeighbors  > 3) {
                me.survive = false;
            };
        };
    };
    // now prepare cells for next iteration

    for (var x = cellArray.length - 1; x >= 0; x--) {
        for (var y = cellArray[0].length - 1; y >= 0; y--) {
            var me = cellArray[x][y];
            if(me.survive){
                fillSquare(x,y);
                me.alive = true;
            }
            else {
                clearSquare(x,y);
                me.alive =false;
            }
        };
    };
    drawGrid();
};

function startGame() {
    setInterval(update, 100);   
    //c_canvas.removeEventListener("mousedown", mouseDownEvent, false);

}
////
drawGrid();
c_canvas.addEventListener("mousedown", mouseDownEvent, false);