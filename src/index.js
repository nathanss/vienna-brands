/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerPlugin } from '@wordpress/plugins';
import { useState } from '@wordpress/element';
import {
	__experimentalWooProductTabItem as WooProductTabItem,
	__experimentalWooProductSectionItem as WooProductSectionItem,
	__experimentalWooProductFieldItem as WooProductFieldItem,
	__experimentalProductFieldSection as ProductFieldSection,
	__experimentalSelectControl as SelectControl,
} from '@woocommerce/components';

/** 
 * Internal dependencies
*/
import './index.scss';
import { BrandsField } from './brands-field';

const sampleItems = [
	{ value: 'apple', label: 'Apple' },
	{ value: 'pear', label: 'Pear' },
	{ value: 'orange', label: 'Orange' },
	{ value: 'grape', label: 'Grape' },
	{ value: 'banana', label: 'Banana' },
];

const TestFills = () => {
	return (
		<>
			<WooProductSectionItem
				id="tab/general"
				tabs={ [ { name: 'tab/general', order: 2 } ] }
				pluginId={ 'woocommerce' }
			>
				<ProductFieldSection
					id="section/brands"
					title={ __( 'Brands', 'woocommerce' ) }
					description={ __( 'Brands description.', 'woocommerce' ) }
				></ProductFieldSection>
			</WooProductSectionItem>
			<WooProductFieldItem
				id="field/test"
				section="section/brands"
				sections={ [ { name: 'section/brands', order: 1 } ] }
				pluginId={ 'woocommerce' }
			>
				<BrandsField />
			</WooProductFieldItem>
		</>
	);
};

registerPlugin( 'wc-admin-product-editor-form-tab-testfills', {
	// @ts-expect-error 'scope' does exist. @types/wordpress__plugins is outdated.
	scope: 'woocommerce-product-editor',
	render: () => {
		return <TestFills />;
	},
} );
