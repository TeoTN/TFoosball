import React from 'react'
import {Pager} from 'react-bootstrap';

const NaivePager = ({page, totalPages, prefix}) => {
    return (
        <Pager>
            {
                page > 1 ?
                    <Pager.Item previous href={`${prefix}/${page - 1}`}>&laquo; Previous Page</Pager.Item> :
                    null
            }
            {
                page < totalPages ?
                    <Pager.Item next href={`${prefix}/${page + 1}`}>Next Page &raquo;</Pager.Item> :
                    null
            }
        </Pager>
    );
};

export default NaivePager;
