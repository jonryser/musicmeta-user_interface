export enum ViewPortTypes {
    BOTTOM = 'bottom',
    LEFT = 'left',
    RIGHT = 'right',
    TOP = 'top',
}

export interface IViewport {
    [ViewPortTypes.BOTTOM]: number;
    [ViewPortTypes.LEFT]: number;
    [ViewPortTypes.RIGHT]: number;
    [ViewPortTypes.TOP]: number;
}
