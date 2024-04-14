export const briefs = [
    {
        id: 1,
        dateDeCreation: "2024-04-09",
        titre: "Create a Landing Page",
        group: ["Yassere Mestaoui", "Ayman Benchamkha"],
        bootcamp: "React",
        formatteur: "AbdelEziz Mdidech",
        blocages:[
            {
                id: 1,
                etudiant: "Ayman Benchamkha",
                difficulte: "CSS Styling",
                valide: false,
                date: "2024-04-09",
            }
        ],
        dateDeRendment: "2024-04-30"
    },
    {
        id: 2,
        dateDeCreation: "2024-04-10",
        titre: "Build a CRUD Application",
        group: ["Ayman Benchamkha"],
        bootcamp: "React",
        blocages:[
            {
                id: 1,
                etudiant: "Ayman Benchamkha",
                difficulte: "JavaScript",
                valide: true,
                date: "2024-04-09",
            },
        ],
        formatteur: "AbdelEziz Mdidech",
        dateDeRendment: "2024-05-15"
    },
    {
        id: 3,
        dateDeCreation: "2024-04-11",
        titre: "Design a Responsive Website",
        bootcamp: "React",
        formatteur: "AbdelEziz Mdidech",
        group: ["Ayman Benchamkha", "Yassere Mestaoui"],
        blocages:[],
        dateDeRendment: "2024-05-05"
    },
    {
        id: 4,
        dateDeCreation: "2024-04-12",
        titre: "Develop an E-commerce Platform",
        bootcamp: "Express.js",
        formatteur: "Omar Essafi",
        blocageId: 3,
        group: ["Fatima Zahrae"],
        blocages:[
            {
                id: 1,
                etudiant: "Fatima Zahrae",
                difficulte: "API Integration",
                valide: false,
                date: "2024-04-09",
            },
        ],
        dateDeRendment: "2024-05-20"
    },
    {
        id: 5,
        dateDeCreation: "2024-04-13",
        titre: "Implement Authentication System",
        bootcamp: "Express.js",
        formatteur: "Omar Essafi",
        group: ["Fatima Zahrae"],
        blocages:[],
        dateDeRendment: "2024-05-10"
    },
];