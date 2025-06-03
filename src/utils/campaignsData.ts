// Updated Campaign interface that matches your campaignsData structure
export interface Campaign {
    id: string;
    title: string;
    image: any; // require() for local images
    participants: number;
    progress: number; // percentage (0-100)
    category: 'food' | 'water' | 'education' | 'other';
    goal: number; // Required: total goal amount
    raised: number; // Required: amount raised so far
    description: string; // Required: campaign description
    organizationName: string; // Required: name of the organization
}

// Dummy campaigns data
export const campaignsData: Campaign[] = [
    {
        id: '1',
        title: 'Alimentar a los niños palestinos',
        image: require('../assets/campaign-palestine.png'),
        participants: 550,
        progress: 70,
        category: 'food',
        goal: 20000,
        raised: 14000,
        organizationName: 'Médicos Sin Fronteras',
        description: 'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen.',
    },
    {
        id: '2',
        title: 'Agua limpia para Yemen',
        image: require('../assets/campaign-water.png'),
        participants: 150,
        progress: 75,
        category: 'water',
        goal: 15000,
        raised: 11250,
        organizationName: 'UNICEF',
        description: 'Ayudar a proporcionar agua limpia y potable a las familias necesitadas en Yemen. Este proyecto busca construir pozos de agua y sistemas de purificación para comunidades rurales.',
    },
    {
        id: '3',
        title: 'Refugio de emergencia',
        image: require('../assets/campaign-shelter.png'),
        participants: 250,
        progress: 35,
        category: 'other',
        goal: 30000,
        raised: 10500,
        organizationName: 'Cruz Roja Internacional',
        description: 'Construcción de refugios temporales para familias desplazadas por conflictos. Proporcionamos refugio seguro y digno para quienes más lo necesitan.',
    },
];