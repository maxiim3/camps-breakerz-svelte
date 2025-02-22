export interface Img {
    path: string
    alt: string
}

interface Node {
    status: string
    date: number
    description: string
    images?: Img[]
}

export const events: Node[] = [
    {
        status: 'Foundation',
        date: 2004,
        description:
            'Camps Breakerz was founded in 2004 by brothers Moh Ghraiz and Ahmed Alghariz, who formed the community dance team to represent the Palestinian people and draw attention to their ongoing struggle. CB Crew shares the unique beauty of dance and art with the people Gaza through teaching and performances, in addition to speaking around the world. Since it’s creation, the crew has achieved multiple dreams, including the establishment of the first dance school in Nuseirat Refugee Camp, after bombing in 2009 rendered their previous practice studio unusable.',
        images: [
            {
                path: '/images/founders/founders-ahmed_alghariz_shark.webp',
                alt: 'Ahmed Alghariz, also known as Shark, founder of the Crew',
            },
            {
                path: '/images/founders/founders-moh_ghraiz_funk.webp',
                alt: 'Moh Ghraiz, also known as Funk, founder of the Crew',
            },
        ],
    },
    {
        status: 'Emergency Response Team',
        date: 2009,
        description:
            'Since the 2009 bombing of their practice studio, CB Crew have weathered multiple wars and resulting traumatic losses. In response, team members have completed studies in psychology and art therapy in order to better help the community. Our crew believes the performing arts can impact meaningful change and help heal traumas. We offer specialized programs focusing on somatic release and coping skills to help children restore their sense of wellbeing and belonging.',
        images: [
            {
                path: '/images/emergency_response_team/emergency_response_team-01.webp',
                alt: 'Pictures from the Emergency response Team event',
            },
            {
                path: '/images/emergency_response_team/emergency_response_team-02.webp',
                alt: 'Pictures from the Emergency response Team event',
            },
            {
                path: '/images/emergency_response_team/emergency_response_team-03.webp',
                alt: 'Pictures from the Emergency response Team event',
            },

            {
                path: '/images/emergency_response_team/emergency_response_team-04.webp',
                alt: 'Pictures from the Emergency response Team event',
            },
        ],
    },
    {
        status: 'Art Therapy for children',
        date: 2009,
        description:
            'In 2009, Save The Children partnered with Camps Breakerz to provide art therapy programs for children in need of rehabilitation.',
    },
    {
        status: 'CB Crew Academy',
        date: 2012,
        description:
            'Established in 2012, the CB Crew Academy provides more than 50 students with professional instruction in creative disciplines including dance, graffiti, and music. Featuring programs for both boys and girls, the Academy hosts weekly exhibitions and rewards the best performers, allowing the children an opportunity for healthy expression and competition. In addition, CB Crew Academy helps children meet their material needs by providing access to clothing and scholarships.',
        // -- Updated images from static/images/cb_academy --
        images: [
            {
                path: '/images/cb_academy/cb_academy-2e64987e-163a-48ab-9055-0dee823f3e93.webp',
                alt: 'CB Crew Academy image',
            },
            {
                path: '/images/cb_academy/cb_academy-3607a38f-7653-4ac8-89e0-1536d55daf0e.webp',
                alt: 'CB Crew Academy image',
            },
            {
                path: '/images/cb_academy/cb_academy-421401_331504910251615_55069037_n.webp',
                alt: 'CB Crew Academy image',
            },
            {
                path: '/images/cb_academy/cb_academy-7586fa56-0b14-4bf8-bd29-289d49d8a20a.webp',
                alt: 'CB Crew Academy image',
            },
            {
                path: '/images/cb_academy/cb_academy-90336750-62d7-4741-8773-52f76c2cb685.webp',
                alt: 'CB Crew Academy image',
            },
            {
                path: '/images/cb_academy/cb_academy-91cd13d0-5a1e-4a1a-9095-515c5fd92512.webp',
                alt: 'CB Crew Academy image',
            },
            {
                path: '/images/cb_academy/cb_academy-99421770-2b2d-4619-93dc-2e6f14e81790.webp',
                alt: 'CB Crew Academy image',
            },
            {
                path: '/images/cb_academy/cb_academy-gaza.webp',
                alt: 'CB Crew Academy image',
            },
            {
                path: '/images/cb_academy/cb_academy-gopr1246.webp',
                alt: 'CB Crew Academy image',
            },
            {
                path: '/images/cb_academy/cb_academy-img_0275.webp',
                alt: 'CB Crew Academy image',
            },
            {
                path: '/images/cb_academy/cb_academy-img_6419.webp',
                alt: 'CB Crew Academy image',
            },
        ],
    },
    {
        status: 'Rehabilitation Program',
        date: 2014,
        description:
            'In 2014, CB Crew launched Rebuild Gaza, a rehabilitation program that took place in Gaza City after bombardment and showcased dancing on piles of remaining rubble.',
    },
    {
        status: 'Make Music and Dance',
        date: 2019,
        description:
            'In 2019, CB Crew debuted Make Music and Dance, a project that took place in the Gaza City UN schools, at the time being used as a shelter for displaced people.',
    },
    {
        status: 'We will not get down',
        date: 2022,
        description:
            'In 2022, CB Crew staged We Will Not Go Down, a program designed for and in collaboration with the orphans of Gaza, culminating in a final showcase.',
    },
    {
        status: 'Still Alive',
        date: 2023,
        description:
            ' In 2023, CB Crew presented Still Alive, a series of showcases featuring various urban dancers and reflecting on the phases of Palestinian struggle through time.',
    },
    {
        status: 'Get Down for Gaza',
        date: 2024,
        description:
            ' In 2024, CB Crew created Get Down for Gaza, a weekly international event that is taking place from the refugee camps of Gaza to NYC, Paris, and Dubai!',
        images: [
            {
                path: '/images/get_down_for_gaza/get_down_for_gaza-01.webp',
                alt: 'Get down for Gaza Event',
            },
            {
                path: '/images/get_down_for_gaza/get_down_for_gaza-02.webp',
                alt: 'Get down for Gaza Event',
            },
        ],
    },
]
