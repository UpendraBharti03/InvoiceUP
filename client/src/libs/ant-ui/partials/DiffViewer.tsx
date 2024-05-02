import React from 'react';
import _ from 'lodash';

// Static keys that are ignored in all comparisons
const staticIgnoredKeys: string[] = ['_id', '__v', 'error', 'createdAt', 'updatedAt', 'createdBy', 'updatedBy', 'owner', 'organisation', 'team'];

// Interface representing the difference between two objects
interface Difference {
    path: string[];
    valueOld: any;
    valueNew: any;
}

/**
 * Recursively compares two objects and identifies the differences.
 * @param oldObj - The original object
 * @param newObj - The new object to compare against
 * @param dynamicIgnoredKeys - Additional keys to be ignored dynamically for this comparison
 * @param deepLevel - The maximum depth of recursion
 * @param path - The current path in the object hierarchy
 * @returns An array of differences between the two objects
 */
export function deepDifference({
    oldObj,
    newObj,
    dynamicIgnoredKeys = [],
    deepLevel = Infinity,
    path = [],
}: {
    oldObj: Record<string, any>;
    newObj: Record<string, any>;
    dynamicIgnoredKeys?: string[];
    deepLevel?: number;
    path?: string[];
}): Difference[] {
    // Combine static and dynamic ignored keys, removing duplicates
    let differences: Difference[] = [];

    // Helper function to check if a key should be ignored
    const shouldIgnoreKey = (key: string) => staticIgnoredKeys.includes(key) || dynamicIgnoredKeys.includes(key);

    // Compare keys in oldObj
    for (const key in oldObj) {
        if (oldObj.hasOwnProperty(key) && !shouldIgnoreKey(key)) {
            // If values are arrays and deepLevel > 0, recursively check nested differences
            // TODO: Need to handle array of objects different correctly because of a bug (if they are equal but their indexes are different then it will fail)
            if (Array.isArray(oldObj[key]) && Array.isArray(newObj[key]) && deepLevel > 0) {
                differences = differences.concat(
                    deepDifference({
                        oldObj: oldObj[key],
                        newObj: newObj[key],
                        dynamicIgnoredKeys,
                        deepLevel: deepLevel - 1,
                        path: path.concat(key),
                    })
                );
            }
            // If values are objects and deepLevel > 0, recursively check nested differences
            else if (typeof oldObj[key] === 'object' && typeof newObj[key] === 'object' && deepLevel > 0) {
                differences = differences.concat(
                    deepDifference({
                        oldObj: oldObj[key],
                        newObj: newObj[key],
                        dynamicIgnoredKeys,
                        deepLevel: deepLevel - 1,
                        path: path.concat(key),
                    })
                );
            } else if (!_.isEqual(oldObj[key], newObj[key])) {
                // nested check for ignored keys and delete them from both objects
                const oldObjWithoutIgnoredKeys = _.cloneDeep(oldObj[key]);
                const newObjWithoutIgnoredKeys = _.cloneDeep(newObj[key]);
                if (typeof oldObj[key] === 'object') {
                    for (const nestedKey in oldObj[key]) {
                        if (shouldIgnoreKey(nestedKey)) {
                            delete oldObjWithoutIgnoredKeys[nestedKey];
                            delete newObjWithoutIgnoredKeys[nestedKey];
                        }
                    }
                }
                // Add differences at this level
                differences.push({
                    path: path.concat(key),
                    valueOld: oldObjWithoutIgnoredKeys,
                    valueNew: newObjWithoutIgnoredKeys,
                });
            }
        }
    }

    // Check for keys in newObj that are not in oldObj
    for (const key in newObj) {
        if (newObj.hasOwnProperty(key) && !oldObj.hasOwnProperty(key) && !shouldIgnoreKey(key)) {
            // nested check for ignored keys and delete them from new object
            const newObjWithoutIgnoredKeys = _.cloneDeep(newObj[key]);
            if (typeof newObj[key] === 'object') {
                for (const nestedKey in newObj[key]) {
                    if (shouldIgnoreKey(nestedKey)) {
                        delete newObjWithoutIgnoredKeys[nestedKey];
                    }
                }
            }
            // Add differences for new keys
            differences.push({ path: path.concat(key), valueOld: undefined, valueNew: newObjWithoutIgnoredKeys });
        }
    }

    console.log('-> differences in deepLevel ' + deepLevel, differences);
    return differences;
}

/**
 * Checks if a given value is a MongoDB ObjectId.
 * @param value - The value to check
 * @returns True if the value matches the pattern of a MongoDB ObjectId, false otherwise
 */
function isMongoId(value: string): boolean {
    return /^[0-9a-fA-F]{24}$/.test(value);
}

/**
 * Formats a value for display in React.
 * @param value - The value to format
 * @param labelKey - The key to use for the label
 * @returns React node representing the formatted value
 */
function formatValue(value: any, labelKey = ''): React.ReactNode {
    // Exclude values containing potential MongoDB ObjectId values
    if (typeof value === 'string' && isMongoId(value)) {
        return null; // Return null to indicate exclusion
    }

    if (Array.isArray(value)) {
        // Format array values
        const nonExcludedItems = value.map((item, index) => formatValue(item)).filter((item) => item !== null);
        return nonExcludedItems.length > 0 ? <span style={{ color: '#3498db' }}>[{nonExcludedItems.join(', ')}]</span> : null;
    }

    if (typeof value === 'object' && value !== null) {
        if (labelKey && Object.keys(value)?.includes(labelKey)) {
            return (
                <div key={value['label']} style={{ marginLeft: '10px' }}>
                    <span style={{ color: '#e67e22' }}>{labelKey}:</span> {formatValue(value[labelKey])}
                </div>
            );
        }

        // Format object values
        const nonExcludedEntries = Object.entries(value)
            .map(([nestedKey, val]) => {
                const formattedNestedValue = formatValue(val);
                return formattedNestedValue !== null ? (
                    <div key={nestedKey} style={{ marginLeft: '10px' }}>
                        <span style={{ color: '#e67e22' }}>{nestedKey}:</span> {formattedNestedValue}
                    </div>
                ) : null;
            })
            .filter((entry) => entry !== null);
        return nonExcludedEntries.length > 0 ? nonExcludedEntries : null;
    }

    // Format other values
    const formattedValue = typeof value === 'string' ? value.replace(/'/g, '') : value;
    return <span style={{ color: '#555' }}>{`${formattedValue}`}</span>;
}

/**
 * React component for displaying the differences between two objects.
 * @param oldObj - The original object
 * @param newObj - The new object to compare against
 * @param dynamicIgnoredKeys - Dynamic keys to be ignored for this comparison
 * @param deepLevel - Maximum depth of recursion
 * @param labelKey - The key to display in ui for objects
 * @returns React component for displaying differences
 */
export function DiffViewer({
    oldObj,
    newObj,
    dynamicIgnoredKeys = [],
    deepLevel,
    labelKey = '',
}: {
    oldObj: Record<string, any>;
    newObj: Record<string, any>;
    dynamicIgnoredKeys: string[];
    deepLevel: number;
    labelKey?: string;
}) {
    // Find the differences between the two objects
    const differences: Difference[] = deepDifference({ oldObj, newObj, dynamicIgnoredKeys, deepLevel });

    // Use lodash's isEqual to check deep equality
    const areEqual = _.isEqual(oldObj, newObj);

    return (
        <div>
            {areEqual ? (
                <p style={{ color: '#555', fontStyle: 'italic' }}>Objects are equal, no differences found.</p>
            ) : (
                <div
                    // style={{
                    //     border: '1px solid #ccc',
                    //     padding: '20px',
                    //     marginTop: '20px',
                    //     borderRadius: '8px',
                    //     boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                    // }}
                >
                    {differences.length > 0 ? (
                        differences.map((diff, index) => (
                            <div key={index} style={{ marginBottom: '10px', padding: '10px', borderRadius: '8px', background: '#f9f9f9' }}>
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        marginBottom: '5px',
                                    }}
                                >
                                    <span style={{ color: '#555', fontWeight: 'bold', marginRight: '5px' }}>{diff.path.join('.')}:</span>
                                    {diff.valueOld !== undefined ? (
                                        <div>
                                            <span
                                                style={{
                                                    color: '#888',
                                                    textDecoration: 'line-through',
                                                    marginLeft: '5px',
                                                }}
                                            >
                                                {formatValue(diff.valueOld, labelKey)}
                                            </span>
                                        </div>
                                    ) : (
                                        <span style={{ color: 'red', marginLeft: '5px' }}>-</span>
                                    )}
                                    {/*{(!diff.valueOld || !diff.valueNew) && <span style={{ color: 'red', marginLeft: '5px' }}>-</span>}*/}
                                    {diff.valueNew !== undefined ? (
                                        <span style={{ color: '#3498db', marginLeft: '5px' }}>{formatValue(diff.valueNew, labelKey)}</span>
                                    ) : (
                                        <span style={{ color: 'red', marginLeft: '5px' }}>-</span>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p style={{ color: '#555', fontStyle: 'italic' }}>No differences found.</p>
                    )}
                </div>
            )}
        </div>
    );
}
