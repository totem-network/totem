
export default (objectToClone: any) => {
    return JSON.parse(JSON.stringify(objectToClone));
}