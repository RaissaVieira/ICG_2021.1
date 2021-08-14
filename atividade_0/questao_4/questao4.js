class Vector {
    constructor(vector) {
        this.vector = vector;
    }

    Norma() {
        return Math.sqrt(Math.pow(this.vector[0], 2) + Math.pow(this.vector[1], 2) + Math.pow(this.vector[2], 2));
    }

    static ProdutoVetorial(vector1, vector2) {
        return [vector1.vector[0]*vector2.vector[0], vector1.vector[1]*vector2.vector[1], vector1.vector[2]*vector2.vector[2]];
    }

    static ProdutoEscalar(vector1, vector2) {
        return vector1.vector[0]*vector2.vector[0] + vector1.vector[1]*vector2.vector[1] + vector1.vector[2]*vector2.vector[2];
    }

}

class Matriz {
    constructor(matriz) {
        this.matriz = matriz;
    }

    static Determinante(matriz) {
        var det = 0;

        for (var j = 0; j < 3; j++) {
            det += matriz.matriz[0][j] * Matriz.cofator(this.matriz, 0, j);
        }

        return det;
    }

    static cofator(a, coluna) {
        var sub_matriz = [],
            m = 0;
    
        for (var i = 1; i < 3; i++) {
            sub_matriz[m] = [];
    
            for (var j = 0; j < 3; j++) {
                if (j !== coluna) {
                    sub_matriz[m].push(a[i][j]);
                }
            }
            m++;
        }
    
        //return Math.pow(-1, linha + coluna) * determinante(sub_matriz);
        return (coluna % 2 ? -1 : 1) * Matriz.Determinante(sub_matriz);
    }
}

var vectorTest1 = new Vector([1,2,3]);
var vectorTest2 = new Vector([4,5,6]);

var matrizTeste1 = new Matriz([[1,2,3], [4,5,6], [7,8,9]]);

console.log(Matriz.Determinante(matrizTeste1))

