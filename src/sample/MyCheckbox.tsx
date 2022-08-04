import React, { useState } from 'react';

export const MyCheckbox = (props) => {
  const [style, setStyle] = useState({ display: 'none' });

  const myHandler = (e) => {
    setStyle({
      display: e.target.checked ? 'block' : 'none',
    });
  };

  return (
    <div>
      <input type="checkbox" data-testid="my-checkbox" name="cb" onClick={myHandler} />
      <div data-testid="my-div" style={style}>
        This should only be visible when checkbox is checked.
      </div>
    </div>
  );
};
