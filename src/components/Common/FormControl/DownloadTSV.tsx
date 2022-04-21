import React from 'react';
import {getTSV} from "../../../TSV";
import {ProductType} from "../../../types/types";
import {DownloadIcon} from "../Icons/Icons";

interface Props {
    products: ProductType[];
    name: string;
    className: string;
}

const DownloadTsv: React.FC<Props> = ({products, name, className}) => {
    const createLink = () => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(getTSV(products));
        link.download = `${name}.txt`;
        link.click();
    }

    return (
        <DownloadIcon onClick={createLink} className={className}/>
    );
};

export default DownloadTsv;