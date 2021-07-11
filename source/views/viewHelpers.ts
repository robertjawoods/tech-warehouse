import { CategoryService } from '../services/categoryService';
import { container } from '../core/IoC/inversify.config';

import * as arrayToTree from "performant-array-to-tree";
import { TreeItem } from 'performant-array-to-tree';

export const formatCurrency = (price, currencyCode) => {
    var formatter = new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: currencyCode,
    });

    return formatter.format(price);
}

export const getMenuSection = (node: TreeItem): string => {
    if (!node.children.length) {
        return `<a href='/products/${node.name}'>${node.web_name}</a>`
    }

    return `<div class="subnav">
                <a href='/products/${node.name} '>
                    <button class="subnavbtn">${node.web_name} <i class="fa fa-caret-down"></i></button>
                </a>
                    <div class="subnav-content">
                        ${getMenuSection(node.children[0])}
                    </div>
            </div>`;
};