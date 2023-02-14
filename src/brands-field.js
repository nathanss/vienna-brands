import apiFetch from '@wordpress/api-fetch';
import { useState, useEffect } from '@wordpress/element';
import { useFormContext } from '@woocommerce/components';

export function BrandsField() {
	const [ brands, setBrands ] = useState( [] );
	const { getInputProps } = useFormContext();
	useEffect( async () => {
		const brands = await wp.apiFetch( {
			path: 'wc/v3/products/brands',
			params: {},
		} );
		setBrands( brands );
	}, [] );

	const props = getInputProps( 'brandsv2' );

	const SelectControl = wc.components.__experimentalSelectControl;

	console.log(
		props.value.map( ( brand ) => ( {
			value: brand.id,
			label: brand.name,
		} ) )
	);

	return (
		<SelectControl
			{ ...props }
			multiple
			items={ brands.map( ( brand ) => ( {
				value: brand.id,
				label: brand.name,
			} ) ) }
			selected={ props.value.map( ( brand ) => ( {
				value: brand.id,
				label: brand.name,
			} ) ) }
			label="Brands"
			onSelect={ ( changed ) => {
				/*props.onChange( [
					...( props.value || [] ),
					changed.value,
				] );*/
				props.onChange( [
					...( props.value || [] ),
					{ id: changed.value, name: changed.label },
				] );
			} }
		/>
	);
}
