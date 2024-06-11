interface standardDatas {
    id: string
    appdata?: any
}

export interface mappoint extends standardDatas {
    displayname?: string
    x: number
    y: number
    author: string
    contributor?: string
    mytype: string
}

export interface mapway extends standardDatas {
    displayname: string
    paths: Array<mappoint>
    author: string
    contributor?: string
    mytype: string
}
