import { requireRole } from '@/lib/core/session';
import React from 'react';

const DonorLayout = async ({ children }) => {

    await requireRole('donor');

    return (
        <div>
            {children}
        </div>
    );
};

export default DonorLayout;