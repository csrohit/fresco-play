import { Action } from '@ngrx/store';

// define actions
export const LOAD_SECTIONS = '[Section] LOAD_SECTIONS';

// initial state
export const initialState = [
        'home', 'opinion', 'world', 'national', 'politics', 'business', 'technology',
        'science', 'health', 'sports', 'arts', 'books', 'movies', 'theater', 'fashion',
        'food', 'travel', 'magazine', 'realestate', 'automobiles'
    ];

// implement actions
export function sections (state = initialState, action: Action) {
    switch (action.type) {
        case LOAD_SECTIONS: {
            return 0;
        }
        default:
            return 0;
    }
}
