import React from 'react';
import { render, screen, cleanup, fireEvent, waitFor } from '@magentopwa/utils/testUtils';
import OfflinePage from '../../pages/_offline';

describe('OfflinePage page layout', () => {
  it('should render without errors', async () => {
    render(<OfflinePage />);
    // OfflinePage
    expect(screen.getByTestId('OfflinePage')).toBeInTheDocument();
  });
});
