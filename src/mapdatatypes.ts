interface standardDatas {
    id: string
    displayname?: string
    author?: string
}

export interface mappoint extends standardDatas {
    x?: number
    y?: number
    mytype: pointtype
}

export interface mapway extends standardDatas {
    paths: Array<mappoint>
    color: string
    mytype: waytype
}

export enum pointtype {
    _BLANK = '_blank',
    IC = 'ic',
    JCT = 'jct',
    PA = 'pa',
    SA = 'sa',
    TRAIN = 'train',
    SUBWAY = 'subway',
    MONORAIL = 'monorail',
    TRAM = 'tram',
    BUS = 'bus',
    AIRPORT = 'airport'
}

export enum waytype {
    EXPWY = 'expwy',
    TRAIN = 'train',
    TRAM = 'tram',
    MONORAIL = 'monorail',
    RAPPIDTRAIN = 'rappidtrain',
    BUS = 'bus',
    AIRLINE = 'airline',
    HIGHWAY = 'serverexpwy',
    SERVERHIGHWAY = 'serverload',
    ROAD = 'road'
}

export interface fv1 {
    points: [[string, string, string, number, number, string]]
    lines: [[string, string, string, string, string, string]]
}

export function fv1pointscv(str: string) {
    switch (str) {
        case '駅':
            return pointtype.TRAIN
        case '地下駅':
            return pointtype.SUBWAY
        case 'モノレール駅':
            return pointtype.MONORAIL
        case '路面電車停留所':
            return pointtype.TRAM

        case 'バス停':
            return pointtype.BUS
        case '空港':
            return pointtype.AIRPORT

        case 'IC':
            return pointtype.IC
        case 'JCT':
            return pointtype.JCT
        case 'PA':
            return pointtype.PA
        case 'SA':
            return pointtype.SA

        default:
            return pointtype._BLANK
    }
}

export function fv1linescv(str: string) {
    switch (str) {
        case '鉄道':
            return waytype.TRAIN
        case '路面電車':
            return waytype.TRAM
        case 'モノレール':
            return waytype.MONORAIL
        case '高速鉄道(新幹線等)':
            return waytype.RAPPIDTRAIN

        case 'バス路線':
            return waytype.BUS
        case '航空路線':
            return waytype.AIRLINE

        case '道路':
            return waytype.ROAD
        case '幹線道路':
            return waytype.HIGHWAY
        case '鯖道':
            return waytype.SERVERHIGHWAY
        case '高速道路':
            return waytype.EXPWY

        default:
            return waytype.ROAD
    }
}
