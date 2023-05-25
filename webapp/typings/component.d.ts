export namespace JSX {
  export interface Element {}
  export interface IntrinsicElements extends StencilIntrinsicElements {
    [tagName: string]: any;
  }
}