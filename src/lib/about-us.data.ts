export interface Img {
    path: string
    alt: string
}

interface Node {
    status: string
    dateStart: number
    dateEnd?: string
    description: string
    images?: Img[]
}

export const events: Node[] = [
    {
        status: 'Foundation',
        dateStart: 2004,
        description:
            "Camps Breakers was founded in 2004 by brothers Moh Ghraiz and Ahmed Alghariz, who formed the community dance team to represent the Palestinian people and draw attention to their ongoing struggle. CB Crew shares the unique beauty of dance and art with the people Gaza through teaching and performances, in addition to speaking around the world. Since it's creation, the crew has achieved multiple dreams, including the establishment of the first dance school in Nuseirat Refugee Camp, after bombing in 2009 rendered their previous practice studio unusable.",
        images: [
            {
                path: '/images/founders/founders_01_ahmed_alghariz_shark.webp',
                alt: 'Ahmed Alghariz, also known as Shark, founder of the Crew',
            },
            {
                path: '/images/founders/founders_02_moh_ghraiz_funk.webp',
                alt: 'Moh Ghraiz, also known as Funk, founder of the Crew',
            },
        ],
    },
    {
        status: 'Emergency Response Team',
        dateStart: 2009,
        dateEnd: 'current',
        description:
            'Since the 2009 bombing of their practice studio, CB Crew have weathered multiple wars and resulting traumatic losses. In response, team members have completed studies in psychology and art therapy in order to better help the community. Our crew believes the performing arts can impact meaningful change and help heal traumas. We offer specialized programs focusing on somatic release and coping skills to help children restore their sense of wellbeing and belonging.',
        images: [
            {
                path: '/images/emergency_response_team/emergency_response_team_01.webp',
                alt: 'Emergency Response Team activities - Image 1',
            },
            {
                path: '/images/emergency_response_team/emergency_response_team_02.webp',
                alt: 'Emergency Response Team activities - Image 2',
            },
            {
                path: '/images/emergency_response_team/emergency_response_team_03.webp',
                alt: 'Emergency Response Team activities - Image 3',
            },
            {
                path: '/images/emergency_response_team/emergency_response_team_04.webp',
                alt: 'Emergency Response Team activities - Image 4',
            },
            {
                path: '/images/emergency_response_team/emergency_response_team_05.webp',
                alt: 'Emergency Response Team activities - Image 5',
            },
            {
                path: '/images/emergency_response_team/emergency_response_team_06.webp',
                alt: 'Emergency Response Team activities - Image 6',
            },
            {
                path: '/images/emergency_response_team/emergency_response_team_07.webp',
                alt: 'Emergency Response Team activities - Image 7',
            },
        ],
    },
    {
        status: 'Art Therapy for children',
        dateStart: 2009,
        description:
            'In 2009, Save The Children partnered with Camps Breakers to provide art therapy programs for children in need of rehabilitation.',
        images: [
            {
                path: '/images/art_therapy_for_children/art_therapy_for_children_01.webp',
                alt: 'Art Therapy for Children Program - Image 1',
            },
            {
                path: '/images/art_therapy_for_children/art_therapy_for_children_02.webp',
                alt: 'Art Therapy for Children Program - Image 2',
            },
            {
                path: '/images/art_therapy_for_children/art_therapy_for_children_03.webp',
                alt: 'Art Therapy for Children Program - Image 3',
            },
            {
                path: '/images/art_therapy_for_children/art_therapy_for_children_04.webp',
                alt: 'Art Therapy for Children Program - Image 4',
            },
            {
                path: '/images/art_therapy_for_children/art_therapy_for_children_05.webp',
                alt: 'Art Therapy for Children Program - Image 5',
            },
            {
                path: '/images/art_therapy_for_children/art_therapy_for_children_06.webp',
                alt: 'Art Therapy for Children Program - Image 6',
            },
            {
                path: '/images/art_therapy_for_children/art_therapy_for_children_07.webp',
                alt: 'Art Therapy for Children Program - Image 7',
            },
        ],
    },
    {
        status: 'CB Crew Academy',
        dateStart: 2012,
        description:
            'Established in 2012, the CB Crew Academy provides more than 50 students with professional instruction in creative disciplines including dance, graffiti, and music. Featuring programs for both boys and girls, the Academy hosts weekly exhibitions and rewards the best performers, allowing the children an opportunity for healthy expression and competition. In addition, CB Crew Academy helps children meet their material needs by providing access to clothing and scholarships.',
        images: [
            {
                path: '/images/cb_academy/cb_academy_school_01.webp',
                alt: 'CB Crew Academy School - Image 1',
            },
            {
                path: '/images/cb_academy/cb_academy_school_02.webp',
                alt: 'CB Crew Academy School - Image 2',
            },
            {
                path: '/images/cb_academy/cb_academy_school_03.webp',
                alt: 'CB Crew Academy School - Image 3',
            },
            {
                path: '/images/cb_academy/cb_academy_school_04.webp',
                alt: 'CB Crew Academy School - Image 4',
            },
            {
                path: '/images/cb_academy/cb_academy_school_05.webp',
                alt: 'CB Crew Academy School - Image 5',
            },
            {
                path: '/images/cb_academy/cb_academy_school_06.webp',
                alt: 'CB Crew Academy School - Image 6',
            },
            {
                path: '/images/cb_academy/cb_academy_school_07.webp',
                alt: 'CB Crew Academy School - Image 7',
            },
            {
                path: '/images/cb_academy/cb_academy_school_08.webp',
                alt: 'CB Crew Academy School - Image 8',
            },
            {
                path: '/images/cb_academy/cb_academy_school_09.webp',
                alt: 'CB Crew Academy School - Image 9',
            },
            {
                path: '/images/cb_academy/cb_academy_school_10.webp',
                alt: 'CB Crew Academy School - Image 10',
            },
            {
                path: '/images/cb_academy/cb_academy_school_11.webp',
                alt: 'CB Crew Academy School - Image 11',
            },
            {
                path: '/images/cb_academy/cb_academy_school_12.webp',
                alt: 'CB Crew Academy School - Image 12',
            },
        ],
    },
    {
        status: 'Gaza is Alive',
        dateStart: 2015,
        description:
            'Gaza is Alive program is an artistic dance tour which connected the dancers of Gaza with the dancers in many countries in Europe aiming to exchange experiences and cultures.',
        images: [
            {
                path: '/images/gaza_is_alive/gaza_is_alive_01.webp',
                alt: 'Gaza is Alive Program - Image 1',
            },
            {
                path: '/images/gaza_is_alive/gaza_is_alive_02.webp',
                alt: 'Gaza is Alive Program - Image 2',
            },
            {
                path: '/images/gaza_is_alive/gaza_is_alive_03.webp',
                alt: 'Gaza is Alive Program - Image 3',
            },
            {
                path: '/images/gaza_is_alive/gaza_is_alive_04.webp',
                alt: 'Gaza is Alive Program - Image 4',
            },
            {
                path: '/images/gaza_is_alive/gaza_is_alive_05.webp',
                alt: 'Gaza is Alive Program - Image 5',
            },
        ],
    },
    {
        status: 'We will not get down',
        dateStart: 2022,
        description:
            'In 2022, CB Crew staged We Will Not Go Down, a program designed for and in collaboration with the orphans of Gaza, culminating in a final showcase.',
        images: [
            {
                path: '/images/we_will_not_go_down/we_will_not_go_down_01.webp',
                alt: 'We Will Not Go Down Program - Image 1',
            },
            {
                path: '/images/we_will_not_go_down/we_will_not_go_down_02.webp',
                alt: 'We Will Not Go Down Program - Image 2',
            },
            {
                path: '/images/we_will_not_go_down/we_will_not_go_down_03.webp',
                alt: 'We Will Not Go Down Program - Image 3',
            },
        ],
    },
    {
        status: 'Battle of the Week',
        dateStart: 2022,
        description:
            'A weekly dance competition for the boys and girls to bring their best moves and win the prize of best dancer of the week. The event takes place in CB Crew Academy',
        images: [
            {
                path: '/images/battle_of_the_week/battle_of_the_week_01.webp',
                alt: 'Battle of the Week Competition - Image 1',
            },
            {
                path: '/images/battle_of_the_week/battle_of_the_week_02.webp',
                alt: 'Battle of the Week Competition - Image 2',
            },
        ],
    },
    {
        status: 'Still Alive',
        dateStart: 2023,
        description:
            ' In 2023, CB Crew presented Still Alive, a series of showcases featuring various urban dancers and reflecting on the phases of Palestinian struggle through time.',
    },
    {
        status: 'Get Down for Gaza',
        dateStart: 2023,
        dateEnd: 'current',
        description:
            ' In 2024, CB Crew created Get Down for Gaza, a weekly international event that is taking place from the refugee camps of Gaza to NYC, Paris, and Dubai!',
        images: [
            {
                path: '/images/get_down_for_gaza/get_down_for_gaza_01.webp',
                alt: 'Get Down for Gaza Event - Image 1',
            },
            {
                path: '/images/get_down_for_gaza/get_down_for_gaza_02.webp',
                alt: 'Get Down for Gaza Event - Image 2',
            },
            {
                path: '/images/get_down_for_gaza/get_down_for_gaza_03.webp',
                alt: 'Get Down for Gaza Event - Image 3',
            },
            {
                path: '/images/get_down_for_gaza/get_down_for_gaza_04.webp',
                alt: 'Get Down for Gaza Event - Image 4',
            },
            {
                path: '/images/get_down_for_gaza/get_down_for_gaza_05.webp',
                alt: 'Get Down for Gaza Event - Image 5',
            },
            {
                path: '/images/get_down_for_gaza/get_down_for_gaza_06.webp',
                alt: 'Get Down for Gaza Event - Image 6',
            },
            {
                path: '/images/get_down_for_gaza/get_down_for_gaza_07.webp',
                alt: 'Get Down for Gaza Event - Image 7',
            },
            {
                path: '/images/get_down_for_gaza/get_down_for_gaza_08.webp',
                alt: 'Get Down for Gaza Event - Image 8',
            },
            {
                path: '/images/get_down_for_gaza/get_down_for_gaza_09.webp',
                alt: 'Get Down for Gaza Event - Image 9',
            },
        ],
    },
]
