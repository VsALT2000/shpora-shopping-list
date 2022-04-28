import { ArrowBackIcon } from "../Icons/Icons";
import styles from "./ReturnHeader.less";

interface Props {
    closeInput: () => void;
}

export const ReturnHeader: React.FC<Props> = ({ closeInput }) => {
    return (
        <div className={styles.returnHeader} onClick={closeInput}>
            <ArrowBackIcon />
        </div>
    );
};
