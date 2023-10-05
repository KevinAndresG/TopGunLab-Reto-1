const contenedor = document.getElementById("tarjetas");
const inpt = document.querySelectorAll("input")
const displayCards = () => {
    contenedor.innerHTML = ""
    citas.forEach((cards) => {
        const card = document.createElement("div");
        card.setAttribute("id", "card-contaier")
        const h3Name = document.createElement("h3");
        h3Name.textContent = cards.nombre;
        const pFecha = document.createElement("p");
        pFecha.textContent = cards.fecha;
        const pHora = document.createElement("p");
        pHora.textContent = cards.hora;
        card.appendChild(h3Name);
        card.appendChild(pFecha);
        card.appendChild(pHora);
        contenedor.appendChild(card);
    })
}
const noCitas = () => {
    contenedor.innerHTML = ""
    const noCit = document.createElement("h2")
    noCit.textContent = "No Tienes Citas";
    contenedor.appendChild(noCit)
}
let citas = "citas" in localStorage ? JSON.parse(localStorage.getItem("citas")) : []
if (citas.length > 0) {
    displayCards()
} else {
    noCitas()
}
const agendar = document.getElementById("agendar");
const inpNombre = document.querySelector(".nombre");
const inpFecha = document.querySelector(".fecha");
agendar.addEventListener("click", (e) => {
    e.preventDefault();
    if (!inpNombre.value || !inpFecha.value) {
        inpt.forEach(inp => {
            inp.classList.add("error")
        })
        setTimeout(() => {
            inpt.forEach(inp => {
                inp.classList.remove("error")
            })
        }, 2000);
    } else {
        let nuevaCita = {
            nombre: "",
            fecha: "",
            hora: ""
        };
        const nombre = inpNombre.value
        const fecha = inpFecha.value.split(" ")[0]
        const hora = inpFecha.value.split(" ")[1]
        nuevaCita.nombre = nombre
        nuevaCita.fecha = fecha
        nuevaCita.hora = hora
        citas.push(nuevaCita)
        localStorage.setItem("citas", JSON.stringify(citas))
        inpFecha.value = ""
        inpNombre.value = ""
        displayCards()
    }
})
