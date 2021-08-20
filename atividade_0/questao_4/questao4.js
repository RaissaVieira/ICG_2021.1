class Vector {
    constructor(vector) {
        this.vector = vector;
    }

    Norma() {
        return Math.sqrt(Math.pow(this.vector[0], 2) + Math.pow(this.vector[1], 2) + Math.pow(this.vector[2], 2));
    }

    static ProdutoVetorial(vector1, vector2) {
        var product = [];

        for (var i = 0; i < 3; i++) {
            product.push(vector1.vector[i]*vector2.vector[i]);
        }

        return product;
    }

    static ProdutoEscalar(vector1, vector2) {
        var product = 0;

        for (var i = 0; i < 3; i++) {
            product += vector1.vector[i]*vector2.vector[i];
        }

        return product;
    }

}

class Matriz {
    constructor(matriz) {
        this.matriz = matriz;
    }

    Determinante() {
        const a = this.matriz[0][0];
        const b = this.matriz[0][1];
        const c = this.matriz[0][2];
        const d = this.matriz[1][0];
        const e = this.matriz[1][1];
        const f = this.matriz[1][2];
        const g = this.matriz[2][0];
        const h = this.matriz[2][1];
        const i = this.matriz[2][2];
    
        return a * e * i - a * f * h - b * d * i + b * f * g + c * d * h - c * e * g;
    }

    Transposta() {
        return new Matriz(
            [[this.matriz[0][0], this.matriz[1][0], this.matriz[2][0]],
             [this.matriz[0][1], this.matriz[1][1], this.matriz[2][1]],
             [this.matriz[0][2], this.matriz[1][2], this.matriz[2][2]]]
        )
    }
}

function ProdutoVetorMatriz(vector, matriz) {
    var product = [];

    for(var i=0; i<3; i++){
        var product1 = 0;
        for(var j=0; j<3; j++){
            product1 += vector.vector[j]*matriz.matriz[j][i];
        }

        product.push(product1);
    }

    return product;
}

function ProdutoMatrizMatriz(matriz1, matriz2) {
    product = new Array(3);

    for (var a = 0; a < 3; ++a) { // 3 - tamanho da matriz1
        product[a] = new Array(3); 
        for (var b = 0; b < 3; ++b) { // 3 - tamanho da matriz2
            product[a][b] = 0;             
          for (var i = 0; i < 3; ++i) { // 3 - tamanho da matriz1
            product[a][b] += matriz1.matriz[a][i] * matriz2.matriz[i][b];
          }
        }
      }

    return product;
}


var vectorTest1 = new Vector([1,2,3]);
var vectorTest2 = new Vector([4,5,6]);

var matrizTeste1 = new Matriz([[1,2,3], [4,5,6], [7,8,9]]);