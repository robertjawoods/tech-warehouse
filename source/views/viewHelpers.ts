import * as arrayToTree from 'performant-array-to-tree';
import { TreeItem } from 'performant-array-to-tree';
import { CategoryService } from '../services/categoryService';
import { container } from '../core/IoC/inversify.config';

export const formatCurrency = (price, currencyCode) => {
	const formatter = new Intl.NumberFormat('en-GB', {
		style: 'currency',
		currency: currencyCode
	});

	return formatter.format(price);
};

export const getMenuSection = (node: TreeItem): string => {
	if (node.children.length === 0) {
		return `<li><a href='/products/${node.name}'>${node.web_name}</a></li>
        `;
	}

	return `<ul>   
                <li><a href='/products/${node.name}'>${node.web_name}</a></li>             
                ${node.children.map(getMenuSection).join('')}
            </ul>`;
};
