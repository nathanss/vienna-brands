import apiFetch from '@wordpress/api-fetch';
import { useState, useEffect } from '@wordpress/element';
import {
	__experimentalSelectControl as SelectControl,
} from '@woocommerce/components';

export function BrandsField() {
    const [ selected, setSelected ] = useState( [] );
    const [ brands, setBrands ] = useState([]);
    useEffect( async () => {
        const brands = await wp.apiFetch({ path: 'wc/v3/products/brands', params: {  } } );
        setBrands(brands.map( brand => ( { value: brand.slug, label: brand.name } )));
        console.log(brands);
    }, []);

    return <SelectControl
    multiple
    items={ brands }
    label="Multiple values"
    selected={ selected }
    onSelect={ ( item ) =>
        Array.isArray( selected ) &&
        setSelected( [ ...selected, item ] )
    }
    onRemove={ ( item ) =>
        setSelected( selected.filter( ( i ) => i !== item ) )
    } />;
}
