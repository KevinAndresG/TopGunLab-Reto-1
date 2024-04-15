const contenedor = document.getElementById("tarjetas");
const inpt = document.querySelectorAll("input")
let citas = "citas" in localStorage ? JSON.parse(localStorage.getItem("citas")) : []

const displayCards = () => {
    contenedor.innerHTML = ""
    if (citas.length > 0) {
        citas.forEach((cards, i) => {
            const card = document.createElement("div");
            card.setAttribute("id", "card-contaier")
            const del = document.createElement("span");
            del.textContent = "X"
            del.addEventListener("click", () => {
                citas.splice(i, 1);
                localStorage.setItem("citas", JSON.stringify(citas))
                displayCards();
            })
            const h3Name = document.createElement("h3");
            h3Name.textContent = cards.nombre;
            const pFecha = document.createElement("p");
            pFecha.textContent = cards.fecha;
            card.appendChild(h3Name);
            card.appendChild(pFecha);
            card.insertBefore(del, card.firstChild);
            contenedor.appendChild(card);
        })
    } else {
        noCitas()
    }
}
const noCitas = () => {
    contenedor.innerHTML = ""
    const noCit = document.createElement("h2")
    noCit.textContent = "No Tienes Citas";
    contenedor.appendChild(noCit)
}
const agendar = document.getElementById("agendar");
const inpNombre = document.querySelector(".nombre");
const inpFecha = document.querySelector(".fecha");
agendar.addEventListener("click", (e) => {
    e.preventDefault();
    if (!inpNombre.value || !inpFecha.value) {
        inpt.forEach(inp => {
            if (!inp.value) {
                inp.classList.add("error")
            }
        })
        setTimeout(() => {
            inpt.forEach(inp => {
                inp.classList.remove("error")
            })
        }, 1000);
    } else {
        let nuevaCita = {
            nombre: "",
            fecha: "",
        };
        const nombre = inpNombre.value
        const fecha = inpFecha.value.split(" ")[0]
        nuevaCita.nombre = nombre
        nuevaCita.fecha = fecha
        citas.push(nuevaCita)
        localStorage.setItem("citas", JSON.stringify(citas))
        inpFecha.value = ""
        inpNombre.value = ""
        displayCards()
    }
})
displayCards()