import React from 'react';
import { Show } from './App3/Show';
import { Button } from './App3/Button';
import {Color} from './App3/color';
function App2() {
    return (
        <div>
            <Color>
                <Show />
                <Button />
            </Color>
        </div>
    );
}

export default App2;