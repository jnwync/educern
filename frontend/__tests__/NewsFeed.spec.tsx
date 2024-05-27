import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import axios from 'axios';
import NewsFeed from '../src/components/NewsFeed';
import test, { describe } from 'node:test';
import { expect } from '@jest/globals';
import '@testing-library/jest-dom/extend-expect';

jest.mock('axios');

describe('NewsFeed Component', () => {
  const mockPosts = [
    {
      post_id: 1,
      user_id: 1,
      caption: 'Test Caption 1',
      content: 'Test Content 1',
      user: {
        user_id: 1,
        first_name: 'John',
        last_name: 'Pine',
        profile: 'profile1.jpg'
      },
      votes: 10,
      File: [],
      Comment: [],
    },
    {
      post_id: 2,
      user_id: 2,
      caption: 'Test Caption 2',
      content: 'Test Content 2',
      user: {
        user_id: 2,
        first_name: 'Jane',
        last_name: 'Doe',
        profile: 'profile2.jpg'
      },
      votes: 20,
      File: [],
      Comment: [],
    }
  ];

  beforeEach(() => {
    axios.get.mockResolvedValue({ data: mockPosts });
  });

  test('fetches and displays posts correctly', async () => {
    render(<NewsFeed />);

    await waitFor(() => {
      expect(screen.getByText('Test Caption 1')).toBeInTheDocument();
      expect(screen.getByText('Test Caption 2')).toBeInTheDocument();
    });
  });

  test('handles errors during post fetching', async () => {
    axios.get.mockRejectedValue(new Error('Error fetching posts'));

    render(<NewsFeed />);

    await waitFor(() => {
      expect(screen.getByText('No posts available.')).toBeInTheDocument();
    });
  });

  test('shows and hides the post creation form', async () => {
    render(<NewsFeed />);

    const createButton = screen.getByText('Create New Post');
    fireEvent.click(createButton);

    await waitFor(() => {
      expect(screen.getByText('Submit')).toBeInTheDocument();
    });

    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);

    await waitFor(() => {
      expect(screen.queryByText('Submit')).not.toBeInTheDocument();
    });
  });

  test('adds a new post correctly to the state', async () => {
    render(<NewsFeed />);

    const newPost = {
      post_id: 3,
      user_id: 3,
      caption: 'New Post Caption',
      content: 'New Post Content',
      user: {
        user_id: 3,
        first_name: 'Alice',
        last_name: 'Smith',
        profile: 'profile3.jpg'
      },
      votes: 5,
      File: [],
      Comment: [],
    };

    // Simulate opening the form and creating a new post
    const createButton = screen.getByText('Create New Post');
    fireEvent.click(createButton);

    await waitFor(() => {
      expect(screen.getByText('Submit')).toBeInTheDocument();
    });

    // Mock the PostForm's onPostCreated prop
    const postForm = screen.getByText('Submit').closest('form');
    fireEvent.submit(postForm);

    await waitFor(() => {
      expect(screen.getByText('New Post Caption')).toBeInTheDocument();
    });
  });
});
