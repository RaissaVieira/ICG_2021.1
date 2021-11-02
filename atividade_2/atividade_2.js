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
  

// Cria um color buffer para armazenar a imagem final.
let color_buffer = new Canvas("canvas");
color_buffer.clear();

function graphic_pipeline(design) {

    /******************************************************************************
     * Vértices do modelo (cubo) centralizado no seu espaco do objeto. Os dois
     * vértices extremos do cubo são (-1,-1,-1) e (1,1,1), logo, cada aresta do cubo
     * tem comprimento igual a 2.
     *****************************************************************************/
    
    let vertices;

    if(design == "cubo"){
        //                               X     Y     Z    W (coord. homogênea)
        vertices = [new THREE.Vector4(-1.0, -1.0, -1.0, 1.0),
                    new THREE.Vector4(1.0, -1.0, -1.0, 1.0),
                    new THREE.Vector4(1.0, -1.0, 1.0, 1.0),
                    new THREE.Vector4(-1.0, -1.0, 1.0, 1.0),
                    new THREE.Vector4(-1.0, 1.0, -1.0, 1.0),
                    new THREE.Vector4(1.0, 1.0, -1.0, 1.0),
                    new THREE.Vector4(1.0, 1.0, 1.0, 1.0),
                    new THREE.Vector4(-1.0, 1.0, 1.0, 1.0)];
    
    } else if (design == "piramide"){
        vertices = [new THREE.Vector4(-1.0, -1.0, -1.0, 1.0),
                    new THREE.Vector4(1.0, -1.0, -1.0, 1.0),
                    new THREE.Vector4(1.0, 0.0, 1.0, 1.0),
                    new THREE.Vector4(-1.0, -1.0, 1.0, 1.0),
                    new THREE.Vector4(1.0, 1.5, 1.0, 1.0),
                    new THREE.Vector4(1.0, 1.0, -1.0, 1.0),
                    new THREE.Vector4(1.0, 1.7, 1.5, 1.0),
                    new THREE.Vector4(-0.5, 1.0, 1.0, 1.0)];
    }
    
    /******************************************************************************
    * As 12 arestas do cubo, indicadas através dos índices dos seus vértices.
    *****************************************************************************/
    let edges = [[0, 1],
                 [1, 2],
                 [2, 3],
                 [3, 0],
                 [4, 5],
                 [5, 6],
                 [6, 7],
                 [7, 4],
                 [0, 4],
                 [1, 5],
                 [2, 6],
                 [3, 7]];

    /******************************************************************************
    * Matriz Model (modelagem): Esp. Objeto --> Esp. Universo. 
    * OBS: A matriz está carregada inicialmente com a identidade.
    *****************************************************************************/
    let m_model = new THREE.Matrix4();

    m_model.set(1.0, 0.0, 0.0, 0.0,
                0.0, 1.0, 0.0, 0.0,
                0.0, 0.0, 1.0, 0.0,
                0.0, 0.0, 0.0, 1.0);

    // Matrix Escala

    let m_scale = new THREE.Matrix4();

    let sx = 1.0;
    let sy = 1.0;
    let sz = 1.0;

    m_scale.set(sx, 0.0, 0.0, 0.0,
                0.0, sy, 0.0, 0.0,
                0.0, 0.0, sz, 0.0,
                0.0, 0.0, 0.0, 1.0);

    m_model.clone().multiply(m_scale);

    // Matrix rotacao eixo-x

    let m_axis_x = new THREE.Matrix4();

    let alphaX = 0.0;

    m_axis_x.set(1.0, 0.0, 0.0, 0.0,
                 0.0, Math.cos(alphaX), -Math.sin(alphaX), 0.0,
                 0.0, Math.sin(alphaX), Math.cos(alphaX), 0.0,
                 0.0, 0.0, 0.0, 1.0);

    m_model.clone().multiply(m_axis_x);

    // Matrix rotacao eixo-y

    let m_axis_y = new THREE.Matrix4();

    let alphaY = 0.0;

    m_axis_y.set(Math.cos(alphaY), 0.0, Math.sin(alphaY), 0.0,
                 0.0, 1.0, 0.0, 0.0,
                 -Math.sin(alphaY), 0.0, Math.cos(alphaY), 0.0,
                 0.0, 0.0, 0.0, 1.0);

    m_model.clone().multiply(m_axis_y);

    // Matrix rotacao eixo-z

    let m_axis_z = new THREE.Matrix4();

    let alphaZ = 0.0;

    m_axis_z.set(Math.cos(alphaZ), -Math.sin(alphaZ), 0.0, 0.0,
                 Math.sin(alphaZ), Math.cos(alphaZ), 0.0, 0.0,
                 0.0, 0.0, 1.0, 0.0,
                 0.0, 0.0, 0.0, 1.0);

    m_model.clone().multiply(m_axis_z);

    // Matriz de transladacao

    let m_translation = new THREE.Matrix4();

    let dx = 0.0;
    let dy = 0.0;
    let dz = 0.0;

    m_translation.set(1.0, 0.0, 0.0, dx,
                      0.0, 1.0, 0.0, dy,
                      0.0, 0.0, 1.0, dz,
                      0.0, 0.0, 0.0, 1.0);

    m_model.clone().multiply(m_translation)

    for (let i = 0; i < 8; ++i)
        vertices[i].applyMatrix4(m_model);

    /******************************************************************************
    * Parâmetros da camera sintética.
    *****************************************************************************/
    let cam_pos = new THREE.Vector3(1.3, 1.7, 2.0);     // posição da câmera no esp. do Universo.
    let cam_look_at = new THREE.Vector3(0.0, 0.0, 0.0); // ponto para o qual a câmera aponta.
    let cam_up = new THREE.Vector3(0.0, 1.0, 0.0);      // vetor Up da câmera.

    /******************************************************************************
    * Matriz View (visualização): Esp. Universo --> Esp. Câmera
    * OBS: A matriz está carregada inicialmente com a identidade. 
    *****************************************************************************/

    // Derivar os vetores da base da câmera a partir dos parâmetros informados acima.

    /*
    * Zcam = Oposto da direcao, normalizada
    * Xcam = Produto vetorial entre vetor up e Zcam, nomalizados
    * Ycam = Produto vetorial entre Zcam e Xcam, normalizados
    */

    Zcam = cam_look_at.clone().sub(cam_pos.clone()).multiplyScalar(-1).normalize();

    Xcam = cam_up.clone().cross(Zcam.clone()).normalize();

    Ycam = Zcam.clone().cross(Xcam.clone()).normalize();

    // Construir 'm_bt', a inversa da matriz de base da câmera.
    let m_bt = new THREE.Matrix4();

    m_bt.set(Xcam.x, Xcam.y, Xcam.z, 0.0,
             Ycam.x, Ycam.y, Ycam.z, 0.0,
             Zcam.x, Zcam.y, Zcam.z, 0.0,
             0.0, 0.0, 0.0, 1.0);

    // Construir a matriz 'm_t' de translação para tratar os casos em que as
    // origens do espaço do universo e da câmera não coincidem.

    let m_t = new THREE.Matrix4();

    m_t.set(1.0, 0.0, 0.0, -cam_pos.x,
            0.0, 1.0, 0.0, -cam_pos.y,
            0.0, 0.0, 1.0, -cam_pos.z,
            0.0, 0.0, 0.0, 1.0);

    // Constrói a matriz de visualização 'm_view' como o produto
    //  de 'm_bt' e 'm_t'.
    let m_view = m_bt.clone().multiply(m_t);

    for (let i = 0; i < 8; ++i)
        vertices[i].applyMatrix4(m_view);

    /******************************************************************************
    * Matriz de Projecao: Esp. Câmera --> Esp. Recorte
    * OBS: A matriz está carregada inicialmente com a identidade. 
    *****************************************************************************/

    let m_projection = new THREE.Matrix4();

    let d = 1.0;

    m_projection.set(1.0, 0.0, 0.0, 0.0,
                     0.0, 1.0, 0.0, 0.0,
                     0.0, 0.0, 1.0, d,
                     0.0, 0.0, -(1.0 / d), 0.0);

    for (let i = 0; i < 8; ++i)
        vertices[i].applyMatrix4(m_projection);

    /******************************************************************************
    * Homogeneizacao (divisao por W): Esp. Recorte --> Esp. Canônico
    *****************************************************************************/

    for (let i = 0; i < 8; ++i)
        vertices[i].multiplyScalar(1.0 / vertices[i].w);

    /******************************************************************************
    * Matriz Viewport: Esp. Canônico --> Esp. Tela
    * OBS: A matriz está carregada inicialmente com a identidade. 
    *****************************************************************************/

    let m_viewport = new THREE.Matrix4();

    let m_translation_ = new THREE.Matrix4();

    let m_scale_ = new THREE.Matrix4();

    m_translation_.set(1.0, 0.0, 0.0, 1.0,
                       0.0, 1.0, 0.0, 1.0,
                       0.0, 0.0, 1.0, 0.0,
                       0.0, 0.0, 0.0, 1.0);

    m_scale_.set(128 / 2, 0.0, 0.0, 0.0,
                 0.0, 128 / 2, 0.0, 0.0,
                 0.0, 0.0, 1.0, 0.0,
                 0.0, 0.0, 0.0, 1.0);

    /*
    *  Matriz viewport = Matriz de translacao X Matriz de escala 
    */

    m_viewport = m_scale_.clone().multiply(m_translation_);

    for (let i = 0; i < 8; ++i)
        vertices[i].applyMatrix4(m_viewport).round();
    
    return vertices;

}

/******************************************************************************
* Rasterização
*****************************************************************************/

function MidPointLineAlgorithm(x0, y0, x1, y1, color_0, color_1) {

    dx = x1 - x0;
    dy = y1 - y0;
    M = dy / dx;

    // INTERPOLAÇÃO DAS CORES

    dr = (color_1[0] - color_0[0]) / dx;
    dg = (color_1[1] - color_0[1]) / dx;
    db = (color_1[2] - color_0[2]) / dx;

    // Se modulo dy > dx, a variacao de cores eh maior
    if (Math.abs(dx) < Math.abs(dy)) {
        dr = (color_1[0] - color_0[0]) / dy;
        dg = (color_1[1] - color_0[1]) / dy;
        db = (color_1[2] - color_0[2]) / dy;
    }

    // PRIMEIRO OU QUINTO OCTANTE

    if ((0 <= M) && (M <= 1)) {

        //	PRIMEIRO OCTANTE
        if (x0 < x1) {
            dx = x1 - x0;
            dy = y1 - y0;
            d = 2 * dy - dx;
            inc_L = 2 * dy;
            inc_NE = 2 * (dy - dx);
            x = x0;
            y = y0;

            color_buffer.putPixel(x, y, color_0);

            while (x < x1) {
                if (d <= 0) {
                    d += inc_L;
                    x++;
                } else {
                    d += inc_NE;
                    x++;
                    y++;
                }

                color_0[0] = color_0[0] + dr;
                color_0[1] = color_0[1] + dg;
                color_0[2] = color_0[2] + db;

                color_buffer.putPixel(x, y, color_0);
            }
        }

        //	QUINTO OCTANTE
        else {
            MidPointLineAlgorithm(x1, y1, x0, y0, color_1, color_0);
        }
    }

    // SEGUNDO OU SEXTO OCTANTE

    else if (M > 1) {
        // SEGUNDO OCTANTE
        if (y0 < y1) {
            dx = y1 - y0;
            dy = x1 - x0;
            d = 2 * dy - dx;
            inc_L = 2 * dy;
            inc_NE = 2 * (dy - dx);
            x = x0;
            y = y0;

            color_buffer.putPixel(x, y, color_0);

            while (y < y1) {
                if (d <= 0) {
                    d += inc_L;
                    y++;
                }
                else {
                    d += inc_NE;
                    x++;
                    y++;
                }

                color_0[0] = color_0[0] + dr;
                color_0[1] = color_0[1] + dg;
                color_0[2] = color_0[2] + db;

                color_buffer.putPixel(x, y, color_0);
            }
        }
        // SEXTO OCTANTE
        else {
            MidPointLineAlgorithm(x1, y1, x0, y0, color_1, color_0);
        }
    }

    // QUARTO OU OITAVO OCTANTE

    else if ((0 > M) && (M >= -1)) {

        // QUARTO OCTANTE
        if ((x0 > x1) && (y0 < y1)) {
            MidPointLineAlgorithm(x1, y1, x0, y0, color_1, color_0);
        }

        // OITAVO OCTANTE
        else {
            dx = x1 - x0;
            dy = y1 - y0;
            d = 2 * dy + dx;
            inc_L = 2 * dy;
            inc_NE = 2 * (dy + dx);
            x = x0;
            y = y0;

            color_buffer.putPixel(x, y, color_0);

            while (x < x1) {
                if (d > 0) {
                    d += inc_L;
                    x++;
                }
                else {
                    d += inc_NE;
                    x++;
                    y--;
                }

                color_0[0] = color_0[0] + dr;
                color_0[1] = color_0[1] + dg;
                color_0[2] = color_0[2] + db;

                color_buffer.putPixel(x, y, color_0);
            }
        }
    }

    // TERCEIRO OU SETIMO OCTANTE

    else if (-1 > M) {

        // TERCEIRO OCTANTE
        if ((x0 > x1) && (y0 < y1)) {
            MidPointLineAlgorithm(x1, y1, x0, y0, color_1, color_0);
        }

        // SETIMO OCTANTE
        else {
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

            color_buffer.putPixel(y, x, color_0);

            while (x > x1) {
                if (D < 0) {
                    D += inc_L;
                    x--;
                }
                else {
                    D += inc_SE;
                    x--;
                    y++;
                }

                color_0[0] = color_0[0] - dr;
                color_0[1] = color_0[1] - dg;
                color_0[2] = color_0[2] - db;

                color_buffer.putPixel(y, x, color_0);
            }
        }
    }
}

function cubo() {

    let vertices = graphic_pipeline("cubo");

    //ARESTAS DE BAIXO
    MidPointLineAlgorithm(vertices[0].x, vertices[0].y, vertices[1].x, vertices[1].y, [255, 0, 0], [255, 0, 0]);
    MidPointLineAlgorithm(vertices[1].x, vertices[1].y, vertices[2].x, vertices[2].y, [255, 0, 0], [255, 0, 0]);
    MidPointLineAlgorithm(vertices[2].x, vertices[2].y, vertices[3].x, vertices[3].y, [255, 0, 0], [255, 0, 0]);
    MidPointLineAlgorithm(vertices[3].x, vertices[3].y, vertices[0].x, vertices[0].y, [255, 0, 0], [255, 0, 0]);

    //ARESTAS DE CIMA
    MidPointLineAlgorithm(vertices[7].x, vertices[7].y, vertices[4].x, vertices[4].y, [255, 0, 0], [255, 0, 0]);
    MidPointLineAlgorithm(vertices[4].x, vertices[4].y, vertices[5].x, vertices[5].y, [255, 0, 0], [255, 0, 0]);
    MidPointLineAlgorithm(vertices[5].x, vertices[5].y, vertices[6].x, vertices[6].y, [255, 0, 0], [255, 0, 0]);
    MidPointLineAlgorithm(vertices[6].x, vertices[6].y, vertices[7].x, vertices[7].y, [255, 0, 0], [255, 0, 0]);

    //ARESTAS DO MEIO
    MidPointLineAlgorithm(vertices[0].x, vertices[0].y, vertices[4].x, vertices[4].y, [255, 0, 0], [255, 0, 0]);
    MidPointLineAlgorithm(vertices[1].x, vertices[1].y, vertices[5].x, vertices[5].y, [255, 0, 0], [255, 0, 0]);
    MidPointLineAlgorithm(vertices[2].x, vertices[2].y, vertices[6].x, vertices[6].y, [255, 0, 0], [255, 0, 0]);
    MidPointLineAlgorithm(vertices[3].x, vertices[3].y, vertices[7].x, vertices[7].y, [255, 0, 0], [255, 0, 0]);
}

function piramide() {

    let vertices = graphic_pipeline("piramide");

    //ARESTAS DE BAIXO
    MidPointLineAlgorithm(vertices[0].x, vertices[0].y, vertices[1].x, vertices[1].y, [255, 0, 0], [255, 0, 0]);
    MidPointLineAlgorithm(vertices[1].x, vertices[1].y, vertices[2].x, vertices[2].y, [255, 0, 0], [255, 0, 0]);
    MidPointLineAlgorithm(vertices[2].x, vertices[2].y, vertices[3].x, vertices[3].y, [255, 0, 0], [255, 0, 0]);
    MidPointLineAlgorithm(vertices[3].x, vertices[3].y, vertices[0].x, vertices[0].y, [255, 0, 0], [255, 0, 0]);

    //ARESTAS DO MEIO
    MidPointLineAlgorithm(vertices[0].x, vertices[0].y, vertices[6].x, vertices[6].y, [255, 0, 0], [255, 0, 0]);
    MidPointLineAlgorithm(vertices[1].x, vertices[1].y, vertices[6].x, vertices[6].y, [255, 0, 0], [255, 0, 0]);
    MidPointLineAlgorithm(vertices[2].x, vertices[2].y, vertices[6].x, vertices[6].y, [255, 0, 0], [255, 0, 0]);
    MidPointLineAlgorithm(vertices[3].x, vertices[3].y, vertices[6].x, vertices[6].y, [255, 0, 0], [255, 0, 0]);
}

cubo();

//piramide();