import { Link } from '@inertiajs/react';

export default function Pagination({ links }) {
    return (
        <div className="flex justify-center mt-6">
            <div className="flex flex-wrap -mb-1">
                {links.map((link, key) => {
                    if (link.url === null) {
                        return (
                            <div
                                key={key}
                                className="mr-1 mb-1 px-4 py-3 text-sm leading-4 text-gray-400 border rounded"
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        );
                    } else {
                        return (
                            <Link
                                key={key}
                                className={`mr-1 mb-1 px-4 py-3 text-sm leading-4 border rounded hover:bg-white focus:border-indigo-500 focus:text-indigo-500 ${link.active ? 'bg-indigo-500 text-white' : ''}`}
                                href={link.url}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        );
                    }
                })}
            </div>
        </div>
    );
}