const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Configurar motor de plantillas EJS
app.set('view engine', 'ejs');

// Carpeta para archivos estáticos (CSS, imágenes)
app.use(express.static('public'));

// --- RUTA 1: INICIO ---
app.get('/', (req, res) => {
    res.render('index', { 
        title: "Inicio",
        heroText: "EcoDiversión: Un parque de minijuegos con materiales reciclados."
    });
});

// --- RUTA 2: SOBRE NOSOTROS ---
app.get('/nosotros', (req, res) => {
    res.render('nosotros', { 
        title: "Sobre Nosotros",
        mision: "Entretener a niños, jóvenes y docentes cuidando el medio ambiente.",
        vision: "Demostrar que el reciclaje es una oportunidad para emprender responsablemente.",
        antecedentes: "En la institución existe un gran desafío con la basura sin clasificar. Decidimos crear un parque con materiales usados para darles una nueva vida."
    });
});

// --- RUTA 3: PROBLEMA Y SOLUCIÓN ---
app.get('/problema', (req, res) => {
    res.render('problema', { 
        title: "Problema y Solución",
        problema: "La cantidad excesiva y manejo inadecuado de residuos en escuelas y colegios. Falta de conciencia colectiva sobre el potencial de los desechos.",
        solucion: "Transformar desechos en juegos de destreza, puntería y lógica. Fusionar el tiempo libre con educación ambiental positiva."
    });
});

// --- RUTA 4: SECCIÓN SOCIAL (Impacto y Redes) ---
app.get('/social', (req, res) => {
    res.render('social', { 
        title: "Impacto Social",
        impacto: "Buscamos que la comunidad pierda la idea de 'basura' y gane oportunidades de aprendizaje interactivo.",
        objetivoRedes: "Utilizar Facebook, Instagram y TikTok para promover el cambio de hábitos.",
        socialLinks: {
            facebook: "https://facebook.com",
            tiktok: "https://tiktok.com",
            instagram: "https://instagram.com"
        }
    });
});

// --- BASE DE DATOS DE PROYECTOS (En memoria) ---
// Información basada en el documento EcoDiversión [cite: 3, 8, 19, 40]
const proyectosData = [
    {
        id: "juego-aros", // ID único para la URL
        name: "Juego de Aros",
        type: "Puntería",
        img: "/img/Juego de Aros.jpg",
        description: "Un clásico juego de feria recreado con materiales sostenibles. Los participantes deben lanzar aros tratando de encajarlos en las botellas.",
        benefits: "Mejora la coordinación mano-ojo y la precisión[cite: 8]. Fomenta la paciencia y el control motriz fino.",
        materials: "Botellas de plástico reutilizadas (rellenas de arena para estabilidad), cartón para la base y aros hechos de mangueras viejas o alambre recubierto."
    },
    {
        id: "juego-bolos",
        name: "Juego de Bolos",
        type: "Destreza",
        img: "/img/Juego de Bolos.jpg",
        description: "Una pista de bolos adaptada. Se utilizan botellas decoradas como pinos y una bola hecha de material compacto reciclado.",
        benefits: "Desarrolla la puntería, la fuerza controlada y la competitividad sana entre compañeros[cite: 64].",
        materials: "Botellas plásticas de igual tamaño, pintura ecológica, papel periódico para rellenar la bola y cartón para delimitar la pista."
    },
    {
        id: "bota-pato",
        name: "Juego de Bota al Pato",
        type: "Puntería",
        img: "/img/Juego de Bota al Pato.jpg",
        description: "El objetivo es derribar figuras (patos u otros diseños) lanzando una pelota desde una distancia marcada.",
        benefits: "Estimula la concentración y el cálculo de distancia/fuerza. Perfecto para liberar estrés de forma divertida[cite: 61].",
        materials: "Madera de palets para la estructura, latas o recortes de plástico para las figuras y bisagras reutilizadas."
    },
    {
        id: "juego-dardos",
        name: "Juego de Dardos",
        type: "Puntería",
        img: "/img/Juego de Dardos.jpg",
        description: "Un panel con globos o dianas pintadas donde los participantes ponen a prueba su puntería.",
        benefits: "Alta exigencia de enfoque visual y precisión. Ayuda a desarrollar la disciplina y la constancia.",
        materials: "Tablero de corcho o madera recuperada, globos biodegradables y dardos con puntas seguras."
    },
    {
        id: "juego-memoria",
        name: "Juego de Memoria",
        type: "Lógica",
        img: "/img/Juego de Memoria.jpg",
        description: "Un tablero gigante con tarjetas ocultas que deben ser emparejadas. Ideal para ejercitar la mente.",
        benefits: "Fortalece la memoria a corto plazo, la lógica y la agilidad mental.",
        materials: "Cuadrados de cartón resistente, impresiones de figuras ecológicas y tapas de botellas para el agarre."
    }
];

// --- RUTA: LISTA DE PROYECTOS ---
app.get('/proyectos', (req, res) => {
    res.render('proyectos', { 
        title: "Nuestros Proyectos", 
        juegos: proyectosData 
    });
});

// --- RUTA DINÁMICA: DETALLE DE PROYECTO ---
app.get('/proyectos/:id', (req, res) => {
    const idProyecto = req.params.id;
    // Buscamos el proyecto que coincida con el ID
    const proyectoEncontrado = proyectosData.find(p => p.id === idProyecto);

    if (proyectoEncontrado) {
        res.render('detalle-proyecto', { 
            title: proyectoEncontrado.name, 
            proyecto: proyectoEncontrado 
        });
    } else {
        res.status(404).send("Proyecto no encontrado :( ");
    }
});

app.listen(port, () => {
    console.log(`Servidor de EcoDiversión corriendo en http://localhost:${port}`);
});