import apiFetch from '@wordpress/api-fetch';
import { useState, useEffect } from '@wordpress/element';

export function BrandsField() {
    const [ brands, setBrands ] = useState([]);
    useEffect( async () => {
        const brands = await wp.apiFetch({ path: 'wc/v3/products/brands', params: {  } } );
        setBrands(brands);
        console.log(brands);
    }, []);

    return <div></div>;
}
