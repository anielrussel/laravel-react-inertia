import { router } from '@inertiajs/react';
import { Button } from './ui/button';

interface PaginationProps {
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
    total: number;
}

export default function Pagination({ links, total }: PaginationProps) {
    return (
        <div className="mt-4 flex items-center justify-between gap-2">
            <p>{`Total Records: ${total}`}</p>

            <div className="space-x-2">
                {links.map((link, index) => {
                    // Skip non-clickable links (url=null)
                    if (!link.url) return null;

                    const label = link.label.replace(/&laquo;|&raquo;/g, ''); // remove arrows if needed

                    return (
                        <Button
                            key={index}
                            variant={link.active ? 'default' : 'outline'}
                            size="sm"
                            onClick={(e) => {
                                e.preventDefault();
                                if (link.url) {
                                    router.get(link.url);
                                }
                            }}
                        >
                            {label}
                        </Button>
                    );
                })}
            </div>
        </div>
    );
}
