export function makeSourceURL(image_name) {
    const url =
        "http://localhost:" + import.meta.env.VITE_BACKEND_PORT + "/images/";
    return url + image_name;
}

export function isNumber(str) {
    // Use a regular expression to check if the string is a number (integer or floating-point)
    return /^-?\d*\.?\d+$/.test(str);
}

export const formatDateAndTimeFromString = (dateString) => {
    const date = new Date(dateString);
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    console.log(date.toLocaleDateString("en-US", options));
    return date.toLocaleDateString("en-US", options);
};
