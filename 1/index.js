const data = {
  tree: [
    {
      name: "name1",
      tree_1: [
        { name: "name2" },
        { name: "name3" },
        {
          name: "name4",
          tree_2: [
            { name: "name5" },
            { name: "name6" },
            {
              tree_3: [
                { name: undefined },
                { name: "name7", age: 20 },
                { name: "name8", age: 15 },
                { name: "name9", age: 31 },
                { name: "name10", age: 30 },
                { name: undefined, age: undefined },
                { name: "empty", age: "empty" },
              ],
            },
          ],
        },
        { name: "name11" },
      ],
    },
    {
      name: "name12",
      tree_4: [{ name: "name3" }],
    },
  ],
};

//#region helpers
function validateFieldObject(obj, field = undefined, invalidValues = []) {
    if (typeof obj !== "object") {
        return false;
    }

    if (field === undefined) {
        return true;
    }

    const value = obj[field];

    if (value === undefined || value === null || invalidValues.includes(value)) {
        return false;
    }

    return true;
}

function sortStrings(a, b) {
    return a.localeCompare(b);
}

function sortByField(elements, field) {
    return elements.sort((a,b) => {
        const first = a[field];
        const second = b[field];
        if (typeof first === "string" && typeof second === "string") {
            return sortStrings(first, second);
        } else return 1;
    })
}
//#endregion

const defaultOptions = {
    validateField: undefined,
    invalidValuesForValidatingField: [],
    sortResultByField: undefined,
}


// result function
function findData(object, field, options = defaultOptions) {
    const { validateField, invalidValuesForValidatingField, sortResultByField } = options
    if (typeof object !== "object" || object === undefined || object === null) {
        return new Error("Current object is not object");
    }
    const pairs = Object.entries(object);
    for(const pair of pairs) {
        const objField = pair[0];
        const objValue = pair[1];
        if (objField === field) {
            if (Array.isArray(objValue)) {
                return sortByField(objValue.filter(el => validateFieldObject(el, validateField, invalidValuesForValidatingField)), sortResultByField);
            } else {
                throw new Error("value is not an array");
            }
        } else {
            if (Array.isArray(objValue)) {
                let result = null;
                for(const el of objValue) {
                    result = findData(el, field, options);
                    if (result?.length) {
                        return result;
                    }
                }
            }
        }
    }
    return [];
}

console.log(findData(data, "tree_3", { 
    validateField: "name", 
    invalidValuesForValidatingField: ["empty"],
    sortResultByField: "name" 
}));