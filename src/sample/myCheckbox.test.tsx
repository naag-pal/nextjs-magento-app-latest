import React from 'react';
import { act, fireEvent, render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MyCheckbox } from './MyCheckbox';

afterEach(cleanup);

const CHECKBOX_ID = 'my-checkbox';
const DIV_ID = 'my-div';

describe('Test ', () => {
  it('click', async () => {
    await act(() => {
      render(
        <div>
          <label htmlFor="checkbox">Check</label>
          <input id="checkbox" type="checkbox" />
        </div>
      );
    });
    await act(async () => {
      fireEvent.click(screen.getByText('Check'));
    });
    expect(await screen.getByLabelText('Check')).toBeChecked();
  });

  it('changes style of div as checkbox is checked/unchecked', async () => {
    const { getByTestId } = render(<MyCheckbox />);
    const checkbox = getByTestId(CHECKBOX_ID);
    const div = getByTestId(DIV_ID);
    expect(checkbox.checked).toEqual(false);
    expect(div.style['display']).toEqual('none');

    await act(async () => {
      fireEvent.click(checkbox);
    });
    expect(checkbox.checked).toEqual(true);
    expect(div.style['display']).toEqual('block');

    await act(async () => {
      fireEvent.click(checkbox);
    });
    expect(checkbox.checked).toEqual(false);
    expect(div.style['display']).toEqual('none');
  });
});
