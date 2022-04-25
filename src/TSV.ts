import {ProductType} from "./types/types";

export const getTSV = (products: ProductType[]) => {
    const keys = new Set();
    if (products.length) {
        const lines = [];
        products.forEach(product => {
            const result = [];
            for (const key in product)
                keys.add(key);
            for (const key of Array.from(keys))
                { // @ts-ignore
                    let value = product[key] !== undefined ? product[key] : "";
                    if (key === 'date') value = new Date(value);
                    result.push(value);
                }
            lines.push('\r\n');
            lines.push(result.join('\t'));
        });
        lines.unshift(Array.from(keys).join('\t'));
        return new File(lines, 'tsv.tsv');
    }
    return new File([], 'tsv.tsv');
}


