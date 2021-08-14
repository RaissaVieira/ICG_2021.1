var arr = []
var par = 0

for (let index = 0; index < 10; index++) {
    arr.push(Math.floor(Math.random() * (100 - 0) + 0));
}

arr.map( e => {
    if(e % 2 === 0 )
        par++;
})

window.alert(`O array formado foi: ${arr}`);
window.alert(`A quantidade de números pares é: ${par}`);