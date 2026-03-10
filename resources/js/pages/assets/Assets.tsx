import { Head, Link, useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import assets from '@/routes/assets';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { FolderSearch } from 'lucide-react';
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Assets',
        href: '/assets',
    },
];

interface Asset {
    id: number;
    name: string;
    model: string;
    quantity: number;
    price: number;
    description: string;
    image: string;
}

interface PageProps {
    assets: Asset[];
}

export default function Assets() {
    const { assets: assetData } = usePage().props as unknown as PageProps;

    const { delete: destroy, processing } = useForm();

    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);
    const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

    const handleCloseModal = () => {
        setIsOpenDeleteModal(false);
        setSelectedAsset(null);
    };
    const handleDelete = (asset: Asset) => {
        if (!selectedAsset) return;

        destroy(assets.destroy(asset.id).url, {
            onSuccess: () => {
                handleCloseModal();
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Assets" />
            <div className="mx-10 mt-10 space-y-4">
                <div className="flex justify-end">
                    <Link href={assets.create()}>
                        <Button>Create New Asset</Button>
                    </Link>
                </div>

                <div>
                    {assetData.length > 0 ? (
                        <Table>
                            <TableCaption>A list of all assets.</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-25">ID</TableHead>
                                    <TableHead className="w-25">
                                        Image
                                    </TableHead>
                                    <TableHead className="w-50">Name</TableHead>
                                    <TableHead>Model</TableHead>
                                    <TableHead className="w-26">
                                        Quantity
                                    </TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {assetData.map((asset) => (
                                    <TableRow key={asset.id}>
                                        <TableCell className="font-medium">
                                            {asset.id}
                                        </TableCell>
                                        <TableCell>
                                            <img
                                                src={asset.image}
                                                alt={asset.name}
                                                width={60}
                                            />
                                        </TableCell>
                                        <TableCell>{asset.name}</TableCell>
                                        <TableCell>{asset.model}</TableCell>
                                        <TableCell>{asset.quantity}</TableCell>
                                        <TableCell>{asset.price}</TableCell>
                                        <TableCell>
                                            {asset.description}
                                        </TableCell>
                                        <TableCell className="space-x-2">
                                            <Link
                                                href={assets.edit(asset.id).url}
                                            >
                                                <Button
                                                    size={'sm'}
                                                    variant={'secondary'}
                                                >
                                                    Edit
                                                </Button>
                                            </Link>
                                            <Button
                                                size={'sm'}
                                                variant={'destructive'}
                                                onClick={() => {
                                                    setSelectedAsset(asset);
                                                    setIsOpenDeleteModal(true);
                                                }}
                                            >
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <div>
                            <Card>
                                <CardContent className="flex flex-col items-center justify-center py-10">
                                    <FolderSearch className="h-16 w-16 text-gray-400" />
                                    <p className="text-xs">No results found.</p>
                                </CardContent>
                            </Card>
                        </div>
                    )}
                </div>
            </div>

            <AlertDialog
                open={isOpenDeleteModal}
                onOpenChange={handleCloseModal}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            {`Do you want to delete ${selectedAsset ? selectedAsset.name : ''}?`}
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete the asset.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <Button
                            disabled={processing}
                            onClick={() => handleDelete(selectedAsset as Asset)}
                        >
                            {processing ? 'Deleting...' : 'Delete'}
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AppLayout>
    );
}
