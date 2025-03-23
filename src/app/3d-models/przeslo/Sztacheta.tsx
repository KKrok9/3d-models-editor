import * as THREE from "three";
import { useMemo } from "react";

interface SztachetaProps {
    width: number;
    height: number;
    thickness: number;
    position: [number, number, number];
    boardStyle: "pointed" | "rounded" | "decorative" | "flat";
    color: string;
    materialType: "wood" | "metal";
}

const Sztacheta: React.FC<SztachetaProps> = ({
    width,
    height,
    thickness,
    position,
    boardStyle,
    color,
    materialType,
}) => {
    const createBoardShape = (): THREE.Shape => {
        const shape = new THREE.Shape();

        shape.moveTo(-width / 2, -height / 2);
        shape.lineTo(width / 2, -height / 2);

        switch (boardStyle) {
            case "pointed":
                shape.lineTo(width / 2, height / 2 - width / 2);
                shape.lineTo(0, height / 2);
                shape.lineTo(-width / 2, height / 2 - width / 2);
                break;
            case "rounded":
                shape.lineTo(width / 2, height / 2 - width / 2);
                const curve = new THREE.EllipseCurve(
                    0,
                    height / 2 - width / 2,
                    width / 2,
                    width / 2,
                    0,
                    Math.PI,
                    false
                );
                curve.getPoints(10).forEach((point) => {
                    shape.lineTo(point.x, point.y);
                });
                shape.lineTo(-width / 2, height / 2 - width / 2);
                break;
            case "decorative":
                shape.lineTo(width / 2, height / 2 - width);
                shape.lineTo(width / 4, height / 2 - width / 2);
                shape.lineTo(0, height / 2);
                shape.lineTo(-width / 4, height / 2 - width / 2);
                shape.lineTo(-width / 2, height / 2 - width);
                break;
            default:
                shape.lineTo(width / 2, height / 2);
                shape.lineTo(-width / 2, height / 2);
        }

        shape.lineTo(-width / 2, -height / 2);
        return shape;
    };

    const boardShape = useMemo(() => createBoardShape(), [width, height, boardStyle]);

    const extrudeSettings: THREE.ExtrudeGeometryOptions = {
        steps: 1,
        depth: thickness,
        bevelEnabled: false,
    };

    return (
        <group position={position}>
            <mesh castShadow receiveShadow>
                <extrudeGeometry args={[boardShape, extrudeSettings]} />
            </mesh>
        </group>
    );
};

export default Sztacheta;
