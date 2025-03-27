"use client";
import * as THREE from "three";
import React, { useRef } from "react";
import Sztacheta from "./Sztacheta";
import RamaPrzesla from "./RamaPrzesla";
import { FencePanelProps } from "@/app/props/FencePanelProps";


const FencePanel: React.FC<FencePanelProps> = ({
    width,
    height,
    boardCount,
    boardStyle,
    boardThickness,
    boardColor,
    frameColor,
    boardMaterial,
    frameMaterial,
    displayTopFramePart,
    ref
}) => {

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
                    color={boardColor}
                    materialType={boardMaterial}
                />
            );
        }

        return boards;
    };

    return (
        <group ref={ref}>
            <RamaPrzesla
                color={frameColor}
                width={width}
                height={height}
                thickness={boardThickness}
                materialType={frameMaterial}
                displayTopFramePart={displayTopFramePart} />
            {generateBoards()}
        </group>
    );
};

export default FencePanel;
