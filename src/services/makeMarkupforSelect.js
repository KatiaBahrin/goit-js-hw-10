export function makeMarkupforSelect(data) {
    return data.map(element => {
        return `<option value="${element.id}">${element.name}</option>`
    }).join("");
};