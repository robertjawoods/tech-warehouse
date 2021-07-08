export const formatCurrency = (price, currencyCode) => {
    var formatter = new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: currencyCode,
    });

    return formatter.format(price);
}
