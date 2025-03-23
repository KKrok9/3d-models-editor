import * as THREE from "three";
import { useMemo } from "react";
import WoodMaterial from "../materials/WoodMaterial";
import MetalMaterial from "../materials/MetalMaterial";

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

        shape.lineTo(width / 2, height / 2);
        shape.lineTo(-width / 2, height / 2);

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
                {materialType === "wood" ? <WoodMaterial color={color} /> : <MetalMaterial color={color} />}
            </mesh>
        </group>
    );
};

export default Sztacheta;
