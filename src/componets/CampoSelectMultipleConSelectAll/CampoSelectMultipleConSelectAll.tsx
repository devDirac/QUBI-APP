import React, { useState, useEffect, useCallback } from "react";
import { MultiSelect } from 'primereact/multiselect';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { locale, addLocale, updateLocaleOption, updateLocaleOptions, localeOption, localeOptions } from 'primereact/api';
import { Form } from "react-bootstrap";
import { FormControl } from "@mui/material";
import { TreeSelect } from 'primereact/treeselect';
import './style.scss';
interface CampoSelectMultipleConSelectAllProps {
    options: any
    label: any
    onInput: (data: any) => void
    value?:any
}

const CampoSelectMultipleConSelectAll = (props: CampoSelectMultipleConSelectAllProps) => {

    const [selectedNodeKeys, setSelectedNodeKeys] = useState<any>([]);

    const buildSelectedKeys = (nodes: any, selectedKeys: string[]): { [key: string]: boolean } => {
        const selectedKeysObj: any = {};
        const markSelectedNodes = (nodeList: any) => {
            nodeList.forEach((node:any) => {
                if (!node.children && selectedKeys.includes(node.key)) {
                    selectedKeysObj[node.key] = {"checked":true,"partialChecked":false};
                }
                else if (node.children) {
                    markSelectedNodes(node.children);
                    const anyChildSelected = node.children.some((child:any) => selectedKeysObj[child.key]);
                    if (anyChildSelected) {
                        selectedKeysObj[node.key] = {"checked":true,"partialChecked":false};
                    }
                }
            });
        };
        markSelectedNodes(nodes);
        return selectedKeysObj;
    };

    const getSelectedChildren = (nodes: any, selectedKeys: { [key: string]: boolean }) => {
        const selectedChildren: any = [];
        const findSelectedChildren = (nodeList: any) => {
            nodeList.forEach((node: any) => {
                if (!node.children && selectedKeys[node.key]) {
                    selectedChildren.push(node);
                }
                else if (node.children) {
                    findSelectedChildren(node.children);
                }
            });
        };
        findSelectedChildren(nodes);
        return selectedChildren;
    };

    useEffect(() => {
        const selectedChildren = getSelectedChildren(props?.options, selectedNodeKeys);
        const result = selectedChildren.map((r: any) => {
            return r?.value;
        })
        props?.onInput(result);
    }, [selectedNodeKeys]);

    useEffect(()=> {
        const valor = buildSelectedKeys(props?.options,props?.value || []);
        setSelectedNodeKeys(valor)
    },[props?.value])

    return (
        <div className="flex justify-content-center" style={{ width: '100%' }}>
            <p style={{ fontSize: 14, color: 'grey' }}>Contrato:</p>
            <TreeSelect
                value={selectedNodeKeys}
                onChange={(e: any) => { setSelectedNodeKeys(e.value) }}
                options={props?.options}
                metaKeySelection={false}
                className="md:w-20rem w-full"
                style={{ width: '100%' }}
                selectionMode="checkbox"
                filter
                display="comma"
                placeholder={props?.label}
            />
        </div>
    );
}

export default CampoSelectMultipleConSelectAll
