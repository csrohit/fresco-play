import { sections } from './sections.reducer';

describe('The sections reducer', () => {
    it('should return the list of sections, when LOAD_SECTIONS is dispatched', () => {
        // previous state + action = expectedState
        const state = [
            'home', 'opinion', 'world', 'national', 'politics', 'business', 'technology',
            'science', 'health', 'sports', 'arts', 'books', 'movies', 'theater', 'fashion',
            'food', 'travel', 'magazine', 'realestate', 'automobiles'
        ];
        const createAction = { type: 'LOAD_SECTIONS', payload: {} };
        const result = sections(state, createAction);

        // expectation
        expect(result).toEqual(state);
    });
    it('should return the initial state if no action is dispatched', () => {
        const state = [
            'home', 'opinion', 'world', 'national', 'politics', 'business', 'technology',
            'science', 'health', 'sports', 'arts', 'books', 'movies', 'theater', 'fashion',
            'food', 'travel', 'magazine', 'realestate', 'automobiles'
        ];
        const createAction = {type: '', payload: {}};
        const result = sections(state, createAction);

        expect(result).toEqual(state);
    });
});
