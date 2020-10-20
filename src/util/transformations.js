// Transform objects back and forth to how Formik wants fields presented

// Convert null field values in incoming to empty strings
export const toEmptyStrings = (incoming) => {
    let outgoing = { };
    for (const [key, value] of Object.entries(incoming)) {
        if (value !== null) {
            outgoing[key] = value;
        } else {
            outgoing[key] = "";
        }
    }
    return outgoing;
}

// Convert empty string values in incoming to nulls
export const toNullValues = (incoming) => {
    let outgoing = { };
    for (const [key, value] of Object.entries(incoming)) {
        if (value === "") {
            outgoing[key] = null;
        } else {
            outgoing[key] = value;
        }
    }
    return outgoing;
}

// For each incoming item, copy it's fields to outgoing.  In addition, if the
// item has a field with key {name}, assume it is an object and add
// {name}.{subName} fields to the outgoing item for each field in the
// named object.  NOTE:  This only goes one level deep.
export const withFlattenedObject = (incoming, name) => {
//    console.log("wFO incoming is " +
//        JSON.stringify(incoming, null, 2));
    let outgoing = { };
    for (const [key, value] of Object.entries(incoming)) {
        outgoing[key] = value;
        if ((key === name) && (value)) {
//            console.log("Object value  is " + JSON.stringify(value, null, 2));
            for (let subName in value) {
//                console.log("  Adding [" + name + "." + subName + "] = " + value[subName]);
                outgoing[name + "." + subName] = value[subName];
            }
        }
    }
//    console.log("wFO outgoing is " +
//        JSON.stringify(outgoing, null, 2));
    return outgoing;
}

// Call withFlattenedObject for each item in incoming array, and return the
// resulting outgoing array
export const withFlattenedObjects = (incoming, name) => {
    if (incoming.length === 0) {
        return [];
    }
//    console.log("wFOs incoming is  " +
//        JSON.stringify(incoming, null, 2));
    let outgoing = [];
    for (let index = 0; index < incoming.length; index++) {
        outgoing.push(withFlattenedObject(incoming[index], name));
    }
//    console.log("wFOs outgoing is  " +
//        JSON.stringify(outgoing, null, 2));
    return outgoing;
}
