import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import RegisterPage from '../src/components/RegisterPage';
import test, { describe } from 'node:test';

describe('RegisterPage', () => {
  test('submitting the form with valid data', async () => {
    const { getByLabelText, getByText } = render(<RegisterPage />);
    
    // Fill in the form fields with valid data
    fireEvent.change(getByLabelText('First Name'), { target: { value: 'John' } });
    fireEvent.change(getByLabelText('Last Name'), { target: { value: 'Smith' } });
    fireEvent.change(getByLabelText('Email'), { target: { value: 'johnsmith@example.com' } });
    fireEvent.change(getByLabelText('Password'), { target: { value: 'validPassword123' } });
    fireEvent.change(getByLabelText('Confirm Password'), { target: { value: 'validPassword123' } });
    
    // Submit the form
    fireEvent.submit(getByLabelText('Register'));
    await waitFor(() => {
      expect().toBeInTheDocument();
    });
  });

  test('validation errors are shown when fields are filled incorrectly', async () => {
    const { getByLabelText, getByText } = render(<RegisterPage />);
   
    fireEvent.change(getByLabelText('First Name'), { target: { value: '123' } });
    fireEvent.change(getByLabelText('Last Name'), { target: { value: '456' } });
    fireEvent.change(getByLabelText('Email'), { target: { value: 'invalid-email' } });
    fireEvent.change(getByLabelText('Password'), { target: { value: 'short' } });
    fireEvent.change(getByLabelText('Confirm Password'), { target: { value: 'different' } });
    
    
    fireEvent.submit(getByLabelText('Register'));

    expect(getByText('First name should contain only letters')).toBeInTheDocument();
    expect(getByText('Last name should contain only letters')).toBeInTheDocument();
    expect(getByText('Invalid email format')).toBeInTheDocument();
    expect(getByText('Password must be 8-16 characters and include at least one number')).toBeInTheDocument();
    expect(getByText('Passwords do not match')).toBeInTheDocument();
  });

});
function expect() {
    throw new Error('Function not implemented.');
}

