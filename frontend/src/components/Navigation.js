import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
    return (
        <nav>
            {/* ... existing links ... */}
            <Link to="/employee-verification">Employee Verification Dashboard</Link>
        </nav>
    );
}

export default Navigation;