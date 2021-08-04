import React, { Component } from 'react'

export default class Paginator {
    constructor(item) {
        this.item = item
    }

    paginate(page, perPage) {
        const start = (page - 1) * perPage;
        const stop = page * perPage;

        return this.item.slice(start, stop);
    }
}


