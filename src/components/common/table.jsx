import React from 'react';
import TableBody from './table-body';
import TableHeader from './table-header';

const Table = ({ columns, sortColumn, onSort, data }) => {
    return ( 
        <table className="table m-2">
            <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort}/>
            <TableBody columns={columns} data={data}/>
        </table>
     );
}
 
export default Table;