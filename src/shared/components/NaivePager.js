import React from 'react'
import {Pager} from 'react-bootstrap';
import {browserHistory} from 'react-router';

const NaivePager = ({page, totalPages, prefix}) => {
    const onClick = (url) => () => browserHistory.push(url);
    return (
        <Pager>
            {
                page > 1 ?
                    <Pager.Item previous onClick={onClick(`${prefix}/${page - 1}`)} className="left">
                        &laquo; Previous Page
                    </Pager.Item> :
                    null
            }
            {
                page < totalPages ?
                    <Pager.Item next onClick={onClick(`${prefix}/${page + 1}`)} className="right">
                        Next Page &raquo;
                    </Pager.Item> :
                    null
            }
        </Pager>
    );
};

export default NaivePager;
