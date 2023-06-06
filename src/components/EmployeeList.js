/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState }  from 'react';
import { useNavigate } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';
import Employee from './Employee';

const EmployeeList = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [employees, setEmployees] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await EmployeeService.getEmployees();
                setEmployees(response.data);
            } catch (e) {
                console.log(e);
            }
            setLoading(false);
        };
        fetchData();
    },[]);

    const deleteEmployee = (e, id) => {
        e.preventDefault();
        EmployeeService.deleteEmployee(id).then((res) => {
            if(employees){
                setEmployees((prevElement) => {
                     return prevElement.filter((employee) => employee.id !== id);
            });
        }
    });
    };
  return (
    <div className='container mx-auto my-8'>
    <div className='h-12'>
      <button
      onClick={() => navigate("/addEmployee")}
      className='rounded 
      bg-slate-600 text-white
       px-6 py-2'>Add Employee</button>
    </div>
    <div className='flex shadow border-b'>
    <table className='min-w-full'>
        <thead className='bg-gray-50'>
        <tr>
        <th className='text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6'>First Name</th>
        <th className='text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6'>Last Name</th>
        <th className='text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6'>Email Id</th>
        <th className='text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6'>Actions</th>
        </tr>
        </thead>
        {!loading && (
        <tbody className='bg-white'>
            {employees.map((employee) => (
        // <tr key={employee.id}>
        // <td className='text-left px-6 py-4 whitespace-nowrap'>
        //     <div className='text-sm text-gray-500'>{employee.firstName}</div>
        // </td>
        // <td className='text-left px-6 py-4 whitespace-nowrap'>
        //     <div className='text-sm text-gray-500'>{employee.lastName}</div>
        // </td>        <td  className='text-left px-6 py-4 whitespace-nowrap'>
        //     <div className='text-sm text-gray-500'>{employee.emailId}</div>
        // </td>
        // <td className='text-right px-6 py-3 whitespace-nowrap font-medium text-sm'>
        // <a href='#' 
        // className='text-indigo-600
        //  hover:text-indigo-800 px-4'>Edit</a>
       
        // <a href='#'
        // className='text-indigo-600
        // hover:text-indigo-800 px-4'>Delete</a>
        // </td>
        // </tr>
        <Employee employee={employee} deleteEmployee={deleteEmployee} key={employee.id}></Employee>
        ))}
        </tbody>
        )}
    </table> 
    </div>
    </div>
  );
}

export default EmployeeList;
