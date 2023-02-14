import apiFetch from '@wordpress/api-fetch';
import { useState, useEffect } from '@wordpress/element';
import { useFormContext } from '@woocommerce/components';

export function BrandsField() {
    const [brands, setBrands] = useState([]);
    const { getInputProps } = useFormContext();
    useEffect(async () => {
        const brands = await wp.apiFetch({
            path: 'wc/v3/products/brands',
            params: {},
        });
        setBrands(brands.map((brand) => ({
            value: brand.id,
            label: brand.name,
        })));
    }, []);

    const props = getInputProps('brandsv2');
    const brandsProps = getInputProps('brands');

    useEffect(() => {
        brandsProps.onChange( (props.value || []).map( br => br.value ));
    }, [ props.value ]);

    const SelectControl = wc.components.__experimentalSelectControl;

    return (
        <SelectControl
            {...props}
            multiple
            items={brands}
            selected={brands.filter(br => (props.value || []).find(v => v.value === br.value))}
            label="Brands"
            onSelect={(changed) => {
                if (!(props.value || []).find(v => v.value === changed.value)) {
                    props.onChange([
                        ...(props.value || []),
                        changed,
                    ]);
                }
            }}
            onRemove={(item) =>
                props.onChange((props.value || []).filter((i) => i.value !== item.value))
            }
        />
    );
}
