import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../services/axiosInstance';
import { Container, Typography, CircularProgress } from '@mui/material';

const StaffDetailPage = () => {
    const { id } = useParams();
    const [staff, setStaff] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStaff = async () => {
            try {
                const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/user/staff-members/${id}`);
                setStaff(data);
            } catch (error) {
                console.error('Error fetching staff member:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStaff();
    }, [id]);

    if (loading) return <CircularProgress />;
    if (!staff) return <Typography>Staff member not found</Typography>;

    return (
        <Container>
            <Typography variant="h4">{staff.email}</Typography>
            <Typography>
                {staff.validFrom && staff.validTo
                    ? `Valid from ${new Date(staff.validFrom).toLocaleDateString()} to ${new Date(staff.validTo).toLocaleDateString()}`
                    : 'No expiration period defined'}
            </Typography>
        </Container>
    );
};

export default StaffDetailPage;
