interface shadeType {
    shadeName: string;
    colour: string;
}

interface productType {
    name: string;
    shades: shadeType[];
    category: string;
    price: string;
    displayColors?: string[]
}