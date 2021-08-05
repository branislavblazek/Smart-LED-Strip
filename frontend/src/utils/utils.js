import { lensPath, set, split } from 'ramda';

export const setStateValue = state => path => value => (
    set(lensPath(path), value, state)
);

export const setStateValues = state => path => change => {
    if (!change) return null;
    const entries = Object.entries(change);
    return entries.reduce(
        (acc, [key, value]) => (
        set(lensPath([...path, ...split('.', key)]), value, acc)
        ), state,
    );
};
