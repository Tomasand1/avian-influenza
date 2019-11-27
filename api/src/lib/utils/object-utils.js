export class ObjectUtils {
    static get(obj, key) {
        return key.split('.').reduce((objR, keyR) => {
            if (typeof objR === 'undefined' || objR === null) {
                return objR;
            } else {
                return objR[keyR];
            }
        }, obj);
    }

    static deepMerge(prevObj, nextObj) {
        // Merge recursively undefined / null objects and primitives
        // Add array only if doesn't exist
        for (const key in prevObj) {
            if (nextObj[key] == null) {
                nextObj[key] = prevObj[key];
            } else if (
                typeof nextObj[key] === 'object' &&
                !Array.isArray(nextObj[key])
            ) {
                nextObj[key] = ObjectUtils.deepMerge(
                    prevObj[key],
                    nextObj[key],
                );
            }
        }
        return nextObj;
    }
}
