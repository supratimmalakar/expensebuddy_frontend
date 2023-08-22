const debounce = (cb, t) => {
let timer;
return (...args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
        cb(...args)
    }, t)
}
}
export default debounce