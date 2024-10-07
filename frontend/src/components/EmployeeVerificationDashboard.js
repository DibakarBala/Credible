import React from 'react';
import './EmployeeVerificationDashboard.css'; // Import the CSS file for styling

function generateRandomEmployees(num) {
    const statuses = ['Success', 'Pending'];
    const firstNames = ['Aarav', 'Vivaan', 'Aditya', 'Vihaan', 'Arjun', 'Sai', 'Reyansh', 'Krishna', 'Ishaan', 'Shaurya'];
    const lastNames = ['Sharma', 'Verma', 'Gupta', 'Mehta', 'Patel', 'Jain', 'Agarwal', 'Kumar', 'Reddy', 'Nair'];
    const employees = [];

    for (let i = 0; i < num; i++) {
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        employees.push({
            name: `${firstName} ${lastName}`,
            id: `EMP${1000 + i}`,
            status: statuses[Math.floor(Math.random() * statuses.length)]
        });
    }

    return employees;
}

function EmployeeVerificationDashboard() {
    const employees = generateRandomEmployees(20);

    return (
        <div className="dashboard-container">
            <h1>Employee Verification Dashboard</h1>
            <table className="employee-table">
                <thead>
                    <tr>
                        <th>Employee Name</th>
                        <th>Employee ID</th>
                        <th>Verification Status</th>
                        <th>QR Code</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee, index) => (
                        <tr key={index}>
                            <td>{employee.name}</td>
                            <td>{employee.id}</td>
                            <td>{employee.status}</td>
                            <td>
                                {employee.status === 'Success' ? (
                                    <button className="download-button">Download QR Code</button>
                                ) : (
                                    'N/A'
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default EmployeeVerificationDashboard;