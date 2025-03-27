export type FencePanelProps = {
    width: number;
    height: number;
    boardCount: number;
    boardStyle: "flat" | "pointed" | "rounded" | "decorative";
    frameStyle: string;
    boardThickness: number;
    boardColor: string;
    frameColor: string;
    boardMaterial: "wood" | "metal";
    frameMaterial: "wood" | "metal";
    displayTopFramePart: boolean;
};
