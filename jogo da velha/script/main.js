/**
 * Um jogo da velha simples para aprender mais sobre a linguagem javascript
 */

var { board, turn } = globalScope();


function globalScope() {
    /**Variaveis declaradas como escopo global */
    var turn = 0;
    var board = [];
    return { board, turn };
}

function initBoard() {
    /**
     * Responsável por reiniciar o jogo atribuindo null para o innerHTML dos botões e
     * reativando os botẽs posteriormente clicados
     */
    for (let i = 0; i < board.length; i++) {
        board[i].innerHTML = '';
        board[i].disabled = false;
    }
    turn = 0;
    document.getElementsByClassName("restart")[0].style.display = "none";
    document.getElementById("turn").innerHTML = "Jogador:1";
}
function blockBoard() {
    /**
     * Bloqueia o tabuleior apos determinar que o jogo acabou e mostra 
     * o botao para reiniciar.
     */
    for (let i = 0; i < board.length; i++) {
        board[i].disabled = true;
    }
    document.getElementsByClassName("restart")[0].style.display = "flex";

}
function Listener() {
    /**
     * Adiciona um event listener em todos os botões com a função game 
     * passando como parametro o indice do for, que representa a posição 
     * do botão no array board.
     */
    for (let i = 0; i < 9; i++) {
        board[i] = document.getElementById('bt' + (i + 1));
        document.getElementById('bt' + (i + 1)).addEventListener("click", function () { game(i) });

    }
}
function mainDiagonal() {
    //Diagonal principal
    if (board[4].innerText === board[0].innerText && board[4].innerText === board[8].innerText) {
        return true;
    }
    return false;
}
function secondaryDiagonal(){
    //Diagonal secundaria
    if (board[4].innerText === board[2].innerText && board[4].innerText === board[6].innerText) {
        return true;
    }
    return false;
}
function centerColumn(){
    //Coluna central
    if (board[4].innerText === board[1].innerText && board[4].innerText === board[7].innerText) {
        return true;
    }
    return false;
}
function centerLine(){
    //Linha central
    if (board[4].innerText === board[3].innerText && board[4].innerText === board[5].innerText) {
        return true;
    }
    return false;
}
function firstLine(){
    //Primeira linha
    if (board[0].innerText === board[1].innerText && board[0].innerText === board[2].innerText) {
        return true;
    }
    return false;
}
function firstColumn(){
    //Primeira coluna
    if (board[0].innerText === board[3].innerText && board[0].innerText === board[6].innerText) {
        return true;
    }
    return false;
}
function lastColumn(){
    //Ultima coluna
    if (board[2].innerText === board[5].innerText && board[2].innerText === board[8].innerText) {
        return true;
    }
    return false;
}
function lastLine(){
    //Ultima linha
    if (board[6].innerText === board[7].innerText && board[6].innerText === board[8].innerText) {
        return true;
    }
    return false;
}
function rules(btn) {
    /**
     * Função principal das comparações para determinar o vencedor,
     * esta função recebe como parametro o botão clicado e compara apenas as
     * possiveis chances de vitoria chamando os metodos que comparam as linhas 
     * e colunas ligadas ao botão.
     */
    if(btn === 4){
        return centerLine() || centerColumn() || mainDiagonal() || secondaryDiagonal(); 
    }
    if(btn === 0){
        return firstLine() || firstColumn() || mainDiagonal();
    }
    if(btn === 2){
        return firstLine() || lastColumn() || secondaryDiagonal();
    }
    if(btn === 6){ 
        return firstColumn() || lastLine() || secondaryDiagonal();
    }
    if(btn === 8){
        return lastColumn() || lastLine() || mainDiagonal();
    }
    if(btn === 1){
        return firstLine() || centerColumn();
    }
    if(btn === 3){
        return firstColumn() || centerLine();
    }
    if(btn === 5){
        return centerLine() || lastColumn();
    }
    if(btn === 7){
        return centerColumn() || lastLine();
    }
 
    return false;
}

function game(btn) {
    /**
     * Função responsavel por fazer as jogadas, recebe um inteiro btn 
     * e utiliza o operador mod '%' para determinar se é a vez do jogador 'x' ou 'o'.
     * Após ser clicado o botão é desativado.
     * Após a jogada ser efetuada a variavel turn é incrementada.
     */
   
    document.getElementById("turn").innerHTML = "Jogador:" + ((turn + 1) % 2 + 1);
    if (turn % 2 === 0) {
        board[btn].innerHTML = 'x'.fontsize(30);
    } else {
        board[btn].innerHTML = 'o'.fontsize(30);
    }
    if (turn >= 4 && rules(btn)) {
        alert("jogador " + (turn % 2 + 1) + " ganhoou");
        blockBoard();
    }else if(turn === 8){
        alert("Deu velha!")
        blockBoard();
    }
    board[btn].disabled = true;
    turn++;
}
