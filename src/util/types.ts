export type Item = {
    id: number,
    name: string,
    type?: string,
    price? : number,
    priceWOVat? : number,
    url? : string
}

export type SelectedFont = {
    selectedFont: Item,
    price: number
}

export type SelectedPicture = {
    picture: string,
    size: string,
    price: number
}

export type Order = {
    id?: number
    service: string,
    product: string,
    font?: string,
    text?: string,
    picture?: string,
    size?: string,
    mail: string,
    price: number
}

export type Picture = {
    id: number,
    name: string
    url: string
}

export type Size = {
    id: number,
    name: string,
    price: number,
    priceWoVat: number
}