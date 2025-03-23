import Image from "next/image";
import styles from "./page.module.scss";
import EditorScene from "./components/editor-scene/EditorScene";
import SidePanel from "./components/side-panel/SidePanel";

export default function Home() {
    return (
        <div className={styles.page}>
            <div className={styles.left_side}>
                <EditorScene />
            </div>
            <div className={styles.right_side}>
                <SidePanel />
            </div>
        </div>
    );
}
