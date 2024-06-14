interface standardDatas {
    id: string
    appdata?: any
}

export interface mappoint extends standardDatas {
    displayname?: string
    x: number
    y: number
    author: string
    contributor?: string[]
    mytype: pointtype
}

export interface mapway extends standardDatas {
    displayname?: string
    paths: Array<mappoint>
    author: string
    contributor?: string[]
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
    LOAD = 'load'
}
