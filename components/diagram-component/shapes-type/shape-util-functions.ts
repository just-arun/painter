
export interface fObjectInterface {
    x: number;
    y: number;
    h: number;
    w: number;
    text: string;
    style: string;
}

export const fObject = ({
    x,
    y,
    h,
    w,
    text,
    style,
}: fObjectInterface) => {
    return `
    
      <foreignObject
        x="${x}"
        y="${y}"
        width="${w}"
        height="${h}"
        requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"
      >
      <div style="${style}">
        <div>${text}</div>
      </div>
    </foreignObject>`;
}