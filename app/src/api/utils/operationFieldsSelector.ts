
// TODO: use recursion, but with max depth if not able with graphql

// TODO: handle multiple matches
const findSelectionRecursive = (selectionSet: any, query: string): any => {
    const queryParts = query.split(':');

    if (queryParts.length === 0) {
        return;
    }

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < selectionSet.selections.length; i++) {
        const selection = selectionSet.selections[i];

        if (selection.name.value === queryParts[0]) {
            if (queryParts.length === 1) {
                return selection;
            } else {
                const newQueryParts = [...queryParts];
                newQueryParts.shift();

                if (selection.selectionSet && newQueryParts) {
                    return findSelectionRecursive(
                        selection.selectionSet,
                        newQueryParts.join(':'),
                    );
                } else {
                    return;
                }
            }
        } else {
            if (selection.selectionSet) {
                return findSelectionRecursive(
                    selection.selectionSet,
                    query,
                );
            } else {
                return;
            }
        }
    }

    return;
};

const operationFieldsSelector = (operation: any, query: string) => {
    const fieldsSelection = findSelectionRecursive(operation.selectionSet, query);
    const result: string[] = [];

    if (fieldsSelection.selectionSet) {
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < fieldsSelection.selectionSet.selections.length; i++) {
            const fieldSelection = fieldsSelection.selectionSet.selections[i];

            result.push(fieldSelection.name.value);
        }
    }

    return result;
};

export default operationFieldsSelector;
