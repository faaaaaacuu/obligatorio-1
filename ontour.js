
function onTour(tourStart, tourEnd) {
    if (tourStart === null || tourEnd === null) {
        return "no tour info";
    }

    let hoy = new Date();
    let start = new Date(tourStart);
    let end = new Date(tourEnd);

    if (hoy < start) {
        return "Up Coming";
    } else if (hoy > end) {
        return "Finished";
    } else {
        return "On Tour";
    }
}

     
