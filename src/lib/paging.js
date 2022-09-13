'use strict';

export function get(page, page_size, total) {
    page = page * 1;
    page_size = page_size * 1;

    return {
        'page': page,
        'page_size': page_size,
        'total': total
    };
}