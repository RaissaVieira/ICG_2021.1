class Canvas {
    constructor(canvas_id) {
      this.canvas = document.getElementById(canvas_id);
      this.context = this.canvas.getContext("2d");
      this.clear_color = 'rgba(0,0,0,255)';
    }
  
    clear() {
      this.context.fillStyle = this.clear_color;
      this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
  
    putPixel(x, y, color) {
      this.context.fillStyle = 'rgb(' + color[0] + ',' + color[1] + ',' + color[2] + ')';
      this.context.fillRect(x, (this.canvas.height - 1) - y, 1, 1);
    }
  }

let color_buffer = new Canvas("canvas");
color_buffer.clear();

function MidPointLineAlgorithm(x0, y0, x1, y1, color_0, color_1) {
  
    dx = x1 - x0;
    dy = y1 - y0;
    M = dy/dx;

    // INTERPOLAÇÃO DAS CORES
	
    dr = (color_1[0] - color_0[0])/dx
    dg = (color_1[1] - color_0[1])/dx
    db = (color_1[2] - color_0[2])/dx
        
    // Se modulo dy > dx, a variacao de cores eh maior
    if(Math.abs(dx) < Math.abs(dy)) {
        dr = (color_1[0] - color_0[0])/dy
        dg = (color_1[1] - color_0[1])/dy
        db = (color_1[2] - color_0[2])/dy
    }

    // PRIMEIRO OU QUINTO OCTANTE

    if ((0<=M) && (M<=1)) {

        //	PRIMEIRO OCTANTE
        if (x0 < x1) {
            dx = x1 - x0
            dy = y1 - y0
            d = 2 * dy - dx
            inc_L = 2 * dy
            inc_NE = 2 * (dy - dx)
            x = x0
            y = y0

            color_buffer.putPixel(x, y, color_0) 

            while (x < x1) {
                if (d <= 0) {
                    d += inc_L
                    x++
                } else {
                    d += inc_NE
                    x++
                    y++
                }

                color_0[0] = color_0[0] + dr;
                color_0[1] = color_0[1] + dg;
                color_0[2] = color_0[2] + db;
                    
                color_buffer.putPixel(x, y, color_0)
            }
        }

        //	QUINTO OCTANTE
        else {
            MidPointLineAlgorithm(x1, y1, x0, y0, color_1, color_0)
        }
    }
    
    // SEGUNDO OU SEXTO OCTANTE

    else if (M > 1) {
        // SEGUNDO OCTANTE
        if (y0 < y1) {
            dx = y1 - y0
            dy = x1 - x0
            d = 2 * dy - dx
            inc_L = 2 * dy
            inc_NE = 2 * (dy - dx)
            x = x0
            y = y0
						
            color_buffer.putPixel(x, y, color_0); 

            while (y < y1) {
                if (d <= 0) {
                    d += inc_L
                    y++
                }
                else {
                    d += inc_NE
                    x++
                    y++
                }

                color_0[0] = color_0[0] + dr
                color_0[1] = color_0[1] + dg
                color_0[2] = color_0[2] + db
                    
                color_buffer.putPixel(x, y, color_0)
            }
        }
        // SEXTO OCTANTE
        else {
            MidPointLineAlgorithm(x1, y1, x0, y0, color_1, color_0)
        }
    }
    
	// QUARTO OU OITAVO OCTANTE

    else if((0 > M) && (M >= -1)){

		// QUARTO OCTANTE
        if ((x0 > x1) && (y0 < y1)){
            MidPointLineAlgorithm(x1, y1, x0, y0, color_1, color_0)
        }

        // OITAVO OCTANTE
        else{
            dx = x1 - x0
            dy = y1 - y0
            d = 2 * dy + dx
            inc_L = 2 * dy
            inc_NE = 2 * (dy + dx)
            x = x0
            y = y0
    
            color_buffer.putPixel(x, y, color_0) 
    
            while (x < x1) {
                if (d > 0) {
                    d += inc_L
                    x++
                }
                else {
                    d += inc_NE
                    x++
                    y--
                }
    
                color_0[0] = color_0[0] + dr;
                color_0[1] = color_0[1] + dg;
                color_0[2] = color_0[2] + db;
                    
                color_buffer.putPixel(x, y, color_0)
            }
        }
    }

	// TERCEIRO OU SETIMO OCTANTE

    else if(-1 > M){

		// TERCEIRO OCTANTE
        if ((x0 > x1) && (y0 < y1)){
            MidPointLineAlgorithm(x1, y1, x0, y0, color_1, color_0)
        }
        
        // SETIMO OCTANTE
        else{
            aux = y0;
            y0 = x0;
            x0 = aux;
            aux = y1;
            y1 = x1;
            x1 = aux;
            dx = x1 - x0;
            dy = y1 - y0;
            D = 2 * dy + dx;
            inc_L = 2 * dy;
            inc_SE = 2 * (dy + dx);
            x = x0;
            y = y0;
            
            color_buffer.putPixel(y, x, color_0)
    
            while (x > x1) {
                if (D < 0){
                    D += inc_L;
                    x--;
                }
                else{
                    D += inc_SE;
                    x--;
                    y++;
                }
    
                color_0[0] = color_0[0] - dr;
                color_0[1] = color_0[1] - dg;
                color_0[2] = color_0[2] - db;
                    
                color_buffer.putPixel(y, x, color_0)
            }
        } 
    }
}

function DrawTriangle(x0, y0, x1, y1, x2, y2, color_0, color_1, color_2) {
	  MidPointLineAlgorithm(x0, y0, x2, y2, color_0.slice(), color_2.slice())
    MidPointLineAlgorithm(x2, y2, x1, y1, color_2.slice(), color_1.slice())
	  MidPointLineAlgorithm(x1, y1, x0, y0, color_1.slice(), color_0.slice())
}

//MidPointLineAlgorithm(25, 30, 100, 80, [255,0,0,255], [255,255,0,255]);
//DrawTriangle(25, 30, 50, 100, 100, 15, [255,0,0,255], [0,0,255,255], [0,255,0,255])

//Comecando daqui
//Chao
MidPointLineAlgorithm(250, 9, 0, 9, [255,0,0,255], [255,255,0,255])
MidPointLineAlgorithm(250, 8, 0, 8, [255,0,0,255], [255,255,0,255])
MidPointLineAlgorithm(250, 7, 0, 7, [255,0,0,255], [255,255,0,255])
MidPointLineAlgorithm(250, 6, 0, 6, [255,0,0,255], [255,255,0,255])
MidPointLineAlgorithm(250, 5, 0, 5, [255,0,0,255], [255,255,0,255])
MidPointLineAlgorithm(250, 4, 0, 4, [255,0,0,255], [255,255,0,255])
MidPointLineAlgorithm(250, 3, 0, 3, [255,0,0,255], [255,255,0,255])
MidPointLineAlgorithm(250, 2, 0, 2, [255,0,0,255], [255,255,0,255])
MidPointLineAlgorithm(250, 1, 0, 1, [255,0,0,255], [255,255,0,255])
MidPointLineAlgorithm(250, 0, 0, 0, [255,0,0,255], [255,255,0,255])

//Base     //x0  y0  x1  y1  x2  y2
DrawTriangle(70, 10, 30, 10, 50, 20, [255,0,0,255], [0,0,255,255], [0,255,0,255])

//Corpo
DrawTriangle(30, 10, 30, 60, 50, 20, [255,0,0,255], [0,0,255,255], [0,255,0,255])
DrawTriangle(70, 10, 70, 60, 50, 20, [255,0,0,255], [0,0,255,255], [0,255,0,255])
MidPointLineAlgorithm(70, 60, 50, 80, [255,0,0,255], [255,255,0,255])
MidPointLineAlgorithm(50, 20, 50, 80, [255,0,0,255], [255,255,0,255])
DrawTriangle(30, 60, 20, 90, 50, 80, [255,0,0,255], [0,0,255,255], [0,255,0,255])
DrawTriangle(50, 80, 80, 90, 70, 60, [255,0,0,255], [0,0,255,255], [0,255,0,255])
MidPointLineAlgorithm(20, 90, 30, 10, [255,0,0,255], [255,255,0,255])
MidPointLineAlgorithm(80, 90, 70, 10, [255,0,0,255], [255,255,0,255])
//Costas e Cauda
DrawTriangle(80, 90, 105, 50, 70, 10, [255,0,0,255], [0,0,255,255], [0,255,0,255])
DrawTriangle(105, 50, 105, 25, 70, 10, [255,0,0,255], [0,0,255,255], [0,255,0,255])
DrawTriangle(105, 25, 70, 10, 90, 10, [255,0,0,255], [0,0,255,255], [0,255,0,255])
DrawTriangle(105, 25, 125, 10, 90, 10, [255,0,0,255], [0,0,255,255], [0,255,0,255])
DrawTriangle(105, 25, 150, 10, 125, 10, [255,0,0,255], [0,0,255,255], [0,255,0,255])
DrawTriangle(150, 10, 128, 18, 135, 25, [255,0,0,255], [0,0,255,255], [0,255,0,255])

//Cabeca

//Olho esquerdo
DrawTriangle(20, 90, 30, 130, 50, 80, [255,0,0,255], [0,0,255,255], [0,255,0,255])
MidPointLineAlgorithm(33, 98, 37, 100, [255,0,0,255], [255,255,0,255])
MidPointLineAlgorithm(27, 100, 33, 98, [255,0,0,255], [255,255,0,255])
//Olho direito
DrawTriangle(80, 90, 70, 130, 50, 80, [255,0,0,255], [0,0,255,255], [0,255,0,255])
MidPointLineAlgorithm(70, 98, 74, 100, [255,0,0,255], [255,255,0,255])
MidPointLineAlgorithm(64, 100, 70, 98, [255,0,0,255], [255,255,0,255])

//Testa
DrawTriangle(50, 143, 70, 130, 30, 130, [255,0,0,255], [0,0,255,255], [0,255,0,255])
DrawTriangle(50, 143, 30, 130, 8, 133, [255,0,0,255], [0,0,255,255], [0,255,0,255])
DrawTriangle(50, 143, 70, 130, 92, 133, [255,0,0,255], [0,0,255,255], [0,255,0,255])
DrawTriangle(30, 130, 8, 133, 8, 110, [255,0,0,255], [0,0,255,255], [0,255,0,255])
DrawTriangle(20, 90, 30, 130, 8, 110, [255,0,0,255], [0,0,255,255], [0,255,0,255])
DrawTriangle(92, 133, 70, 130, 92, 110, [255,0,0,255], [0,0,255,255], [0,255,0,255])
DrawTriangle(80, 90, 70, 130, 92, 110, [255,0,0,255], [0,0,255,255], [0,255,0,255])

//Orelhas

//Esquerda
DrawTriangle(30, 139, 30, 130, 8, 133, [255,0,0,255], [0,0,255,255], [0,255,0,255])
DrawTriangle(30, 139, 8, 133, 8, 165, [255,0,0,255], [0,0,255,255], [0,255,0,255])
//Direita
DrawTriangle(70, 130, 70, 139, 92, 133, [255,0,0,255], [0,0,255,255], [0,255,0,255])
DrawTriangle(70, 139, 92, 133, 92, 165, [255,0,0,255], [0,0,255,255], [0,255,0,255])
