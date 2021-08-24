class Vector {
    constructor(vector) {
        this.vector = vector;
    }

    Norma() {
        var soma = 0;

        for (var i=0; i<3; i++) {
            soma += Math.pow(this.vector[i], 2);
        }

        return Math.sqrt(soma);
    }

    static ProdutoVetorial(vector1, vector2) {
    
        return [vector1.vector[1]*vector2.vector[2] - vector1.vector[2]*vector2.vector[1],
                vector1.vector[2]*vector2.vector[0] - vector1.vector[0]*vector2.vector[2],
                vector1.vector[0]*vector2.vector[1] - vector1.vector[1]*vector2.vector[0]];
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

    static ProdutoVetorMatriz(vector, matriz) {
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

    static ProdutoMatrizMatriz(matriz1, matriz2) {
        var product = new Array(3);
    
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
}

var vectorTest1 = new Vector([1,2,3]);
var vectorTest2 = new Vector([4,5,6]);

var matrizTeste1 = new Matriz([[1,2,5], [4,5,6], [7,8,9]]);
var matrizTeste2 = new Matriz([[10,20,30], [40,50,60], [70,80,90]]);

console.log(`Norma do vetor teste 1: ${vectorTest1.Norma()}`);
console.log(`Produto vetorial entre os vetores testes 1 e 2: (${Vector.ProdutoVetorial(vectorTest1, vectorTest2)})`);
console.log(`Produto escalar entre os vetores testes 1 e 2: ${Vector.ProdutoEscalar(vectorTest1, vectorTest2)}`);
console.log(`Produto entre os vetorTeste1 e matrizTeste1: ${Matriz.ProdutoVetorMatriz(vectorTest1, matrizTeste1)}`);
console.log("Produto entre os matrizTeste1 e matrizTeste2: ");
console.log(Matriz.ProdutoMatrizMatriz(matrizTeste1, matrizTeste2));
console.log(`Determinante da matrizTeste1: ${matrizTeste1.Determinante()}`);
console.log("Transposta da matrizTeste1: ");
console.log(matrizTeste1.Transposta());