import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import type { AppLayoutProps } from '@/types';
import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';

export default function ({ children, breadcrumbs, ...props }: AppLayoutProps) {
    const { flash } = usePage().props as any;

    useEffect(() => {
        console.log(flash);
        if (flash.success) {
            toast.success(flash.success, { position: 'top-center' });
        }

        if (flash.failed) {
            toast.error(flash.failed, { position: 'top-center' });
        }
    }, [flash]);
    return (
        <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
            {children}
        </AppLayoutTemplate>
    );
}
