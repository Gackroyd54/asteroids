var dirYJog;
var dirXJog;
var jogo;
var frames;
var jogador;
var vel;
var posXJog;
var posYJog;
var telaW;
var telaH;
var tecla
var velTiros
var contBombas
var painelContBombas
var bombasTotal
var velBomba
var vidaPlan
var tmpBomba
var vidaPlan
var medVida
function começaJogo(){

}

function teclaDw(){
     tecla = event.keyCode
    nave = document.getElementById("naveJog")
    if(tecla==37){
        //esquerda
        dirXJog = -1
    }
    else if(tecla==39){
        //direita
        dirXJog = +1
        

    }
    else if(tecla==38) {
        //cima
        dirYJog = -1
    }
    else if(tecla==40){
        //baixo
        dirYJog = 1
    }
    else if(tecla == 32){
        //espaço=>tiro
        atira(posXJog+45,posYJog)

    }
    //nave.style.left += dirXJog +"px"


}
function teclaUp(){
    tecla = event.keyCode
    if((tecla==37)||(tecla==39)){
        //esquerda
        dirXJog = 0
    }
    else if((tecla==38)|| (tecla==40)){
        //cima
        dirYJog = 0
    }
   

}
function gameLoop(){
    if(jogo==true){
        //funções de controle
        colisor()
        controlaJog()
        controleTiros()
        controlaBomba()
        contaVida()
        
        


    }
    frames=requestAnimationFrame(gameLoop)

}
function inicia(){
    jogo = true
    //inicialização
    dirXJog = dirYJog = 0
    telaH = innerHeight
    telaW = innerWidth
    posYJog = telaH/2
    posXJog = telaW/2
    vel = 7
    jogador = document.getElementById("naveJog")
    jogador.style.top = posYJog+"px"
    jogador.style.left = posXJog +"px"
    velTiros = 5
    //controle das bombas
    clearInterval(tmpBomba)
    velBomba = 3
    contBombas = 150
    tmpBomba = setInterval(criaBomba,1700) 
    //controle planeta
    vidaPlan = 300
    gameLoop()


}
function controlaJog(){
    posYJog += dirYJog*vel
    posXJog += dirXJog*vel
    jogador.style.top = posYJog+"px"
    jogador.style.left = posXJog +"px"

}
function criaBomba(){
    if(jogo){
        var y = 0
        var x = Math.random()*telaW;
        var bomba = document.createElement("div")
        var att1 = document.createAttribute("class")
        var att2 = document.createAttribute("style")
        att1.value = "bombas"
        att2.value = "top:"+y+"px;left:"+x+"px;"
        bomba.setAttributeNode(att1)
        bomba.setAttributeNode(att2)
        document.body.appendChild(bomba)
        contBombas--
    }
}
function controlaBomba(){
    bombasTotal = document.getElementsByClassName("bombas")
    var tam = bombasTotal.length;
    for(var i = 0;i<tam;i++){
        if(bombasTotal[i]){
            var pi = bombasTotal[i].offsetTop;
            pi+=velBomba
            bombasTotal[i].style.top = pi +"px"
            if(pi>telaH){
                vidaPlan -= 5
                bombasTotal[i].remove()
               

            }

        }
    }


}
function atira(x,y){
    var t = document.createElement("div")
    var att1 = document.createAttribute("class")
    var att2 = document.createAttribute("style")
    att1.value = "tiroJog"
    att2.value = "top:"+y+"px;left:"+x+"px"
    t.setAttributeNode(att1)
    t.setAttributeNode(att2)
    document.body.appendChild(t)

}
function controleTiros(){
    var tiros = document.getElementsByClassName('tiroJog')
    var tam = tiros.length;
    for(var i =0;i<tam;i++){
        if(tiros[i]){
            var pt = tiros[i].offsetTop
            pt-=velTiros
            tiros[i].style.top = pt+"px"
            colisãoTiro(tiros[i])
            if(pt<0){
                tiros[i].remove()

            }
        }
    }
}
function colisãoTiro(tiro){
    var tam = bombasTotal.length;
    for(var i = 0;i<tam;i++){
        if(bombasTotal[i]){
            if((((tiro.offsetTop<=bombasTotal[i].offsetTop+130) && (tiro.offsetTop+6)>=bombasTotal[i].offsetTop))&&
            (tiro.offsetLeft<=bombasTotal[i].offsetLeft+160 && (tiro.offsetLeft+6>=bombasTotal[i].offsetLeft)))
            {
                bombasTotal[i].remove()
                tiro.remove()

            }

            }
    } 

}
function contaVida(){
    console.log(vidaPlan)
    //document.write(vidaPlan)
    medVida = document.getElementById("barraPlaneta")
    medVida.style.width = vidaPlan + "px"
    console.log(contBombas)
    if(contBombas<0){
        window.alert('Parabéns.Você conseguiu salvar o planeta')
        jogo = false
        clearInterval(criaBomba)
    }
    if(vidaPlan==0){
        window.alert("Você perdeu")
        jogo = false
    }
    
}
function colisor(){
    if(posYJog>=540 && tecla == 40 ){
        dirYJog = 0
    }
}
window.addEventListener('load',inicia)
document.addEventListener("keydown",teclaDw)
document.addEventListener("keyup",teclaUp)


