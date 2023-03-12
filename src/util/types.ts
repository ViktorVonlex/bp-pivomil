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

export type Order = {
    service: string,
    product: string,
    font?: string,
    text?: string,
    picture?: string,
    size?: string,
    mail: string,
    price: number
}