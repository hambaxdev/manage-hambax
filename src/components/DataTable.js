import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
} from '@mui/material';

const DataTable = ({ columns, rows, getRowId, emptyMessage = 'Нет данных' }) => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        {columns.map((col) => (
                            <TableCell key={col.key}>{col.label}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.length > 0 ? (
                        rows.map((row) => (
                            <TableRow key={getRowId(row)}>
                                {columns.map((col) => (
                                    <TableCell key={col.key}>
                                        {typeof col.render === 'function' ? col.render(row) : row[col.key]}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length}>
                                <Typography variant="body2" align="center" sx={{ py: 2 }}>
                                    {emptyMessage}
                                </Typography>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default DataTable;
