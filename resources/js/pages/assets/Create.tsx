import { Head, Link, router, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import assets from '@/routes/assets';
import { Button } from '@/components/ui/button';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { ArrowLeft, X } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create New Asset',
        href: '/assets/create',
    },
];

interface FormData {
    name: string;
    model: string;
    quantity: number | string;
    price: number | string;
    description: string;
    image: File | null;
}

export default function Create() {
    const { data, setData, processing, errors, reset, post } =
        useForm<FormData>({
            name: '',
            model: '',
            quantity: '',
            price: '',
            description: '',
            image: null,
        });

    const [actionType, setActionType] = useState<'addAnother' | 'back'>('back');
    const [preview, setPreview] = useState<string>();

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files;
        if (file && file.length > 0) {
            setData('image', file[0]);
            setPreview(URL.createObjectURL(file[0]));
        }
    };

    const handleRemoveImageFile = () => {
        setPreview(undefined);
        setData('image', null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault();

        post(assets.store().url, {
            forceFormData: true,
            onSuccess: () => {
                if (actionType === 'back') {
                    router.visit(assets.index());
                    reset();
                } else if (actionType === 'addAnother') {
                    reset();
                }

                handleRemoveImageFile();
            },
        });
    };

    useEffect(() => {
        if (Object.keys(errors).length > 0) {
            toast.error(
                <ul className="list-disc space-y-1 pl-4">
                    {Object.entries(errors).map(([key, message]) => (
                        <li key={key}>{message}</li>
                    ))}
                </ul>,
                { position: 'top-center' },
            );
        }
    }, [errors]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Craete New Assets" />
            <div className="mx-10">
                <Link href={assets.index()}>
                    <Button variant={'outline'} className="mt-10">
                        <ArrowLeft />
                        Back
                    </Button>
                </Link>
                <form onSubmit={handleSubmit} className="mx-50 mt-10 space-y-4">
                    <div>
                        <Label htmlFor="asset name">Name</Label>
                        <Input
                            type="text"
                            placeholder="Asset Name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                        />
                    </div>

                    <div>
                        <Label htmlFor="asset model">Model</Label>
                        <Input
                            type="text"
                            placeholder="Asset Model"
                            value={data.model}
                            onChange={(e) => setData('model', e.target.value)}
                        />
                    </div>

                    <div>
                        <Label htmlFor="asset quantity">Quantity</Label>
                        <Input
                            type="number"
                            placeholder="Asset Quantity"
                            value={data.quantity}
                            onChange={(e) =>
                                setData('quantity', Number(e.target.value))
                            }
                        />
                    </div>

                    <div>
                        <Label htmlFor="asset price">Price</Label>
                        <Input
                            type="price"
                            placeholder="Asset Price"
                            value={data.price}
                            onChange={(e) =>
                                setData('price', Number(e.target.value))
                            }
                        />
                    </div>

                    <div>
                        <Label htmlFor="asset image">Image</Label>
                        <Input
                            ref={fileInputRef}
                            type="file"
                            onChange={handleFileChange}
                            accept="image/png, image/jpeg, image/webp, image/avif"
                        />
                        {preview && (
                            <div className="relative mt-2 w-fit">
                                <img src={preview} alt="Preview" width={200} />
                                <button
                                    type="button"
                                    onClick={handleRemoveImageFile}
                                    className="absolute -top-2 -right-2 rounded-full bg-destructive p-0.5 text-destructive-foreground shadow-sm transition-opacity hover:opacity-80"
                                    aria-label="Remove image"
                                >
                                    <X size={14} />
                                </button>
                            </div>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="asset description">Description</Label>
                        <Textarea
                            placeholder="Asset Description"
                            value={data.description}
                            onChange={(e) =>
                                setData('description', e.target.value)
                            }
                        />
                    </div>

                    <div className="flex justify-end gap-3">
                        <Button
                            type="submit"
                            disabled={processing}
                            onClick={() => setActionType('addAnother')}
                        >
                            {processing && actionType === 'addAnother'
                                ? 'Saving...'
                                : 'Save & Add Another'}
                        </Button>
                        <Button
                            type="submit"
                            disabled={processing}
                            onClick={() => setActionType('back')}
                        >
                            {processing && actionType === 'back'
                                ? 'Saving...'
                                : 'Save & Close'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
