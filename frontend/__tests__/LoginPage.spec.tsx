import React from 'react';
import '@testing-library/jest-dom';
import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import LoginPage from '../src/components/LoginPage';
import { describe, it } from 'node:test';

jest.mock('axios');

describe('LoginPage', () => {
  it('renders email and password inputs', () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });

  it('submits the form with correct data', async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    const mockLoginResponse = {
      data: {
        token: 'mocked-token',
        user_id: 'mocked-user-id',
      },
    };
    mockedAxios.post.mockResolvedValue(mockLoginResponse);

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByText('Sign in');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledTimes(1);
      expect(mockedAxios.post).toHaveBeenCalledWith('http://localhost:3000/users/login', {
        email: 'test@example.com',
        password: 'password',
      });
      expect(localStorage.getItem('Token')).toBe('mocked-token');
      expect(localStorage.getItem('user_id')).toBe('mocked-user-id');
    });

    // You can add assertions for navigation using the mocked useNavigate hook if needed
  });

  it('displays error message on failed login', async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    const errorMessage = 'Invalid credentials';
    mockedAxios.post.mockRejectedValue({ message: errorMessage });

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    const submitButton = screen.getByText('Sign in');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });
});
