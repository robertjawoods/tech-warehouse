import { TreeItem } from 'performant-array-to-tree';


const formatCurrency = (price, currencyCode) => {
    const formatter = new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: currencyCode
    });

    return formatter.format(price);
};

export { formatCurrency };