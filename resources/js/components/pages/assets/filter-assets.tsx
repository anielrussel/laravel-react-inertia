import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cleanParams } from '@/lib/helpers';
import { router } from '@inertiajs/react';
import { useState } from 'react';

interface FilterAssetsProps {
    filters: any;
}

export default function FilterAssets({ filters }: FilterAssetsProps) {
    const [name, setName] = useState(filters?.name || '');
    const [model, setModel] = useState(filters?.model || '');
    const [minPrice, setMinPrice] = useState(filters?.minPrice || '');
    const [maxPrice, setMaxPrice] = useState(filters?.maxPrice || '');

    const search = () => {
        router.get(
            '/assets',
            cleanParams({ name, model, minPrice, maxPrice }),
            { preserveState: true },
        );
    };
    return (
        <div className="flex gap-2">
            <Input
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <Input
                placeholder="Model"
                value={model}
                onChange={(e) => setModel(e.target.value)}
            />
            <Input
                placeholder="Min Price"
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
            />
            <Input
                placeholder="Max Price"
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
            />
            <Button onClick={search}>Filter</Button>
        </div>
    );
}
