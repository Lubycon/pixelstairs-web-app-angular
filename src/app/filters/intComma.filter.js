export function intCommaFilter() {
    const result = input => {
        if(!input) return input;
        if(!isNaN(input)) input += '';

        let output = input.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
        return output;
    };

    return result;
}
