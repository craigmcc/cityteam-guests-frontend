export const reportError = (prefix, err) => {
    console.error(`${prefix} Error: `, err);
    alert(`${prefix} Error: '${err.message}'`);
}
