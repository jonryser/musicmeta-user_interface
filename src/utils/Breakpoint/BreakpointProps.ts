/**
 * BreakPoint data will have breakpoint values as properties.
 *     {
 *         Infinity: true,
 *         1024: false,
 *         767: 'maybe',
 *     }
 * Note that the Infinity value is used to represent the largest
 * imaginable (or unimaginable) width possible. This value MUST
 * always be present. Any number may be used to represent any width
 * desired and all other widths are optional.
 */
export interface BreakpointData {
    [key: number]: any;
}
