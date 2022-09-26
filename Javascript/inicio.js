const juegos = [{ 
    id: 1, 
    titulo: "Elden Ring", 
    generos: "Aventura", 
    clasificacion: "+16", precio: 1499, 
    img: './Imagenes/Elden-Ring.png'
    },
    { 
     id: 2, 
     titulo: "Outlast 2", 
     generos: "Terror", 
     clasificacion: "+16", 
     precio: 2999, 
     img: './Imagenes/outlast2.webp'},
    { 
     id: 3, 
     titulo: "Lego Skywalker Saga", 
     generos: "Aventura", 
     clasificacion: "+16", 
     precio: 1999, 
     img: './Imagenes/legos.jpg'},
    { 
     id: 4, 
     titulo: "Fifa 22", 
     generos: "Deportes", 
     clasificacion: "ATP", 
     precio: 2999, 
     img: './Imagenes/fifa22.jpg.webp'}]
const containerDiv = document.querySelector(".contenedor")
const carritoDiv=document.getElementById('carritoDiv')
const btns = document.querySelectorAll(".btn")
const pagoExitoso = document.querySelector(".realizado")
console.log(containerDiv)
console.log(carritoDiv)
console.log(btns)

let carrito = JSON.parse(localStorage.getItem("carrito")) || []

pagoExitoso.addEventListener('click', () => {
  carrito.length = 0
  agregarCarrito()
})

function crearCards(){
    juegos.forEach(juego=>{
        containerDiv.innerHTML += `
        
          <div class="card tarjeta col-3">
            <h6 class="titulos">${juego.titulo}</h6>
            <img class="imgI img-thumbnail rounded" src="${juego.img}" alt="">
            <p class="text-bold precios"><b>$${juego.precio}</b></p>
            <p class="text-muted">${juego.generos}</p>
            <button id="btn-agregar${juego.id}" class="btn btn-outline-light">Agregar</button>
          </div>
      ` 
    })
    
  agregarFuncion()

}


function agregarFuncion(){
juegos.forEach((juego) => {
  document
    .querySelector(`#btn-agregar${juego.id}`)
    .addEventListener("click", ()=>
      {console.log(juego)
        agregarJuegoCarrito(juego)
    })
  })
}

function agregarJuegoCarrito(juego) {
  let existe = carrito.some(juegoSome => juegoSome.id === juego.id)
  if(existe === false){
    juego.cantidad = 1;
    carrito.push(juego)}
    agregarCarrito()
  
} 



const eliminarJuego = (juegoId) => {
  const item  = carrito.find((juego) => juego.id === juegoId)
  const indice = carrito.indexOf(item)
  carrito.splice(indice, 1)
  agregarCarrito()
}


const agregarCarrito = () =>{
    carritoDiv.innerHTML = ""
  carrito.forEach((juego)=>{
    const div = document.createElement('div')
    div.className = ('agregado')
      div.innerHTML = `
      <div>
        <p> <img class = "modalImg" src="${juego.img}"> <b>${juego.titulo}</b> - $${juego.precio}   <button onclick = "eliminarJuego(${juego.id})" class = "borrar btn btn-danger">Borrar</button> </p>
        </div>
    `
    carritoDiv.appendChild(div)
  })
 localStorage.setItem("carrito", JSON.stringify(carrito))
 
}
const comprar = document.querySelector(".realizado")

function compraRealizada(){
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Su orden ha sido realizada correctamente',
    text: 'Le enviamos la factura via email, que disfrutes!',
    footer: '<b>Cyberstore</b>'
  })
} comprar.addEventListener('click', compraRealizada)


crearCards()
agregarCarrito()