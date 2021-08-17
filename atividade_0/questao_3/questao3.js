var arr = []

for (let Index = 0; Index < 10; Index++) {
    arr.push(Math.floor(Math.random() * (100 - 0) + 0));
}

//Printa no console o array aleatorio
console.log(arr)

//Troca a posicao de indice do array entre os ponteiros
function trocaPosicao(arr, esq, dir){
    var ind = arr[esq];
    arr[esq] = arr[dir];
    arr[dir] = ind;
}

//Retorna o indice usado para dividir o array (dividir e conquistar)
function particao(arr, esquerda, direita){

    var pivo = arr[Math.floor((esquerda + direita ) / 2)], //elemento do meio
        i    = esquerda, //ponteiro da esquerda
        j    = direita;  //ponteiro da direita

    while (i <= j){
        
        while (arr[i] < pivo){
            i++;
        }

        while (arr[j] > pivo){
            j--;
        }

        if (i <= j) {
            trocaPosicao(arr, i, j); //troca os dois elementos
            i++;
            j--;
        }
    }
    return i;
}

function quickSort(arr, esquerda, direita){
    /*utilizasse da recursividade para ordenar as particoes da esquerda 
      e direita do array, e retorna o array.
    */

    var index;

    if (arr.length > 1){

        index = particao(arr, esquerda, direita); //indice retornado da particao

        if (esquerda < index - 1) { 
            //elementos mais a esquerda do pivô
            quickSort(arr, esquerda, index - 1);
        }

        if (index < direita) { 
            //elementos mais a direita do pivô
            quickSort(arr, index, direita);
        }
    }
    return arr;
}

var arrayOrdenado = quickSort(arr, 0, arr.length - 1);
console.log(arrayOrdenado);