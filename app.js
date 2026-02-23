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
        objetivoRedes: "Utilizar Facebook e Instagram para promover el cambio de hábitos.",
        socialLinks: {
            facebook: "https://www.facebook.com/share/18WVfYfj8J/?mibextid=wwXIfr",
            instagram: "https://www.instagram.com/eco._diversion?igsh=YzZwN251MmcydDY4&utm_source=qr"
        }
    });
});

// --- BASE DE DATOS DE PROYECTOS (En memoria) ---
// Información basada en el documento EcoDiversión [cite: 3, 8, 19, 40]
const proyectosData = [
    {
        id: "juego-aros", 
        name: "Juego de Aros (Ring Toss)",
        type: "Puntería",
        img: "/img/aros.jpeg", // <-- Ruta actualizada con el nuevo nombre
        description: "Un clásico juego de feria muy colorido. Los participantes deben lanzar aros desde una distancia marcada tratando de encajarlos en los chupetes premiados.",
        benefits: "Mejora la coordinación mano-ojo, la precisión visual y fomenta el control motriz fino de una manera muy atractiva.",
        materials: "Cartón reciclado pintado para la base y el letrero de fondo, chupetes reales como objetivos y aros de plástico."
    },
    {
        id: "juego-bolos",
        name: "Juego de Bolos",
        type: "Destreza y Lógica",
        img: "/img/bolos.jpeg", // <-- Ruta actualizada
        description: "Una pista de bolos muy original. Los pinos están diseñados y ensamblados con cartón corrugado y cada uno tiene un valor numérico para sumar puntos al derribarlos.",
        benefits: "Desarrolla la puntería, la fuerza controlada y ayuda a practicar matemáticas básicas al tener que sumar los puntos obtenidos.",
        materials: "Cartón corrugado reciclado para dar volumen a los pinos, papel de colores para las etiquetas numéricas y marcadores para los detalles decorativos."
    },
    {
        id: "juego-dardos",
        name: "Juego de Dardos y Globos",
        type: "Puntería",
        img: "/img/dardos.jpeg", // <-- Ruta actualizada
        description: "¡Pon a prueba tu puntería reventando globos! Un colorido panel forrado donde los participantes lanzan dardos para intentar dar en el blanco y hacer estallar los globos.",
        benefits: "Exige un alto nivel de enfoque visual, cálculo de la fuerza y precisión. Ayuda a desarrollar la concentración y la coordinación mano-ojo.",
        materials: "Un tablero de base forrado con papel decorativo reutilizado, globos biodegradables de colores, un vasito de cartón y dardos con punta."
    },
    {
        id: "mini-golf",
        name: "Mini Golf de Cartón",
        type: "Destreza",
        img: "/img/golfin.jpeg", // <-- Ruta actualizada
        description: "¡Demuestra tu precisión en este divertido circuito! Los jugadores deben golpear la pelota intentando hacerla entrar en los diferentes agujeros de la caja, cada uno con una puntuación distinta.",
        benefits: "Fomenta la concentración, el control de la fuerza y la coordinación ojo-mano. También es excelente para practicar matemáticas rápidas al sumar los puntos.",
        materials: "Una caja de cartón grande reutilizada, papel decorativo de rayas, cartulina de colores para enmarcar las entradas, pelotas y un palo de golf."
    },
    {
        id: "bota-pato",
        name: "Bota al Pato (Duck Hunt)",
        type: "Puntería",
        img: "/img/pato-splash.jpeg", // <-- Ruta actualizada
        description: "¡Afina tu puntería y derriba los patos! Un stand de tiro clásico donde los participantes deben lanzar pequeñas pelotas para golpear el centro de los patitos ubicados en las repisas.",
        benefits: "Excelente para trabajar la coordinación motriz, la precisión de lanzamiento y el enfoque visual en un entorno de pura diversión.",
        materials: "Estructura de madera o cartón grueso reciclado, pintura ecológica para el decorado de fondo, figuras de patos recortadas y pelotas suaves."
    },
    {
        id: "juego-tetris",
        name: "Tetris Ecológico",
        type: "Lógica",
        img: "/img/tetris.jpeg", // <-- Ruta de tu nueva imagen
        description: "Un rompecabezas al estilo Tetris creado completamente con materiales reciclados. Los jugadores deben encajar las diferentes piezas de colores para completar el tablero perfecto sin dejar huecos.",
        benefits: "Estimula fuertemente el razonamiento espacial, la resolución de problemas y la agilidad mental. Es una forma táctil y divertida de practicar la lógica geométrica.",
        materials: "Cubetas de cartón de huevos recicladas (recortadas en las clásicas formas geométricas del Tetris) y pintura ecológica de colores vibrantes."
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