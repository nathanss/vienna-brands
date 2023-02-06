/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerPlugin } from '@wordpress/plugins';
import { TextControl } from '@wordpress/components';
import {
	useFormContext,
	__experimentalWooProductTabItem as WooProductTabItem,
	__experimentalWooProductSectionItem as WooProductSectionItem,
	__experimentalWooProductFieldItem as WooProductFieldItem,
	__experimentalProductFieldSection as ProductFieldSection,
} from '@woocommerce/components';

import './index.scss';

const TestFills = () => {
	const { getInputProps } = useFormContext();
	const inputFieldProps = getInputProps( 'test-field' );
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
				<TextControl
					label="Test field"
					name={ inputFieldProps.name }
					onChange={ inputFieldProps.onChange }
					value={ inputFieldProps.value }
				/>
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
