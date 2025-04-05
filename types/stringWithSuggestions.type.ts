/** Permits `string` but gives hints */
type StringWithSuggestions<S extends string> = (string & Record<never, never>) | S;

export default StringWithSuggestions;
