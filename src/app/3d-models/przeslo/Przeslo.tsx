"use client";
import * as THREE from "three";
import React, { useRef } from "react";
import Sztacheta from "./Sztacheta";
import RamaPrzesla from "./RamaPrzesla";

interface FencePanelProps {
    width: number;
    height: number;
    boardCount: number;
    boardStyle: "pointed" | "rounded" | "decorative" | "flat";
    frameStyle: string;
    boardThickness: number;
    boardColor: string;
    frameColor: string;
    boardMaterial: "wood" | "metal";
    frameMaterial: "wood" | "metal";
    hasTopDecoration: boolean;
}

const FencePanel: React.FC<FencePanelProps> = ({
    width,
    height,
    boardCount,
    boardStyle,
    frameStyle,
    boardThickness,
    boardColor,
    frameColor,
    boardMaterial,
    frameMaterial,
    hasTopDecoration,
}) => {
    const groupRef = useRef<THREE.Group>(null);

    const frameThickness = boardThickness * 1.5;
    const innerWidth = width - frameThickness * 2;
    const boardWidth = innerWidth / (boardCount * 2 - 1);
    const spacing = boardWidth;

    const generateBoards = () => {
        const boards = [];

        for (let i = 0; i < boardCount; i++) {
            const posX = -innerWidth / 2 + boardWidth / 2 + i * (boardWidth + spacing);

            boards.push(
                <Sztacheta
                    key={i}
                    width={boardWidth}
                    height={height - frameThickness * 2}
                    thickness={boardThickness}
                    position={[posX, 0, 0]}
                    boardStyle={boardStyle}
                    color={'#8B4513'}
                    materialType={boardMaterial}
                />
            );
        }

        return boards;
    };

    return (
        <group ref={groupRef}>
            <RamaPrzesla width={width}
                height={height}
                thickness={boardThickness}
                color={frameColor}
                materialType={frameMaterial}
                hasTopDecoration={hasTopDecoration} />
            {generateBoards()}
        </group>
    );
};

export default FencePanel;
