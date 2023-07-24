import { Box } from '@mui/material';
import React from 'react';
import Popup from 'reactjs-popup';

 
export default function PopupJob() {
    return (
        <div>
            <Popup trigger=
                {<button>JOB REQUEST</button>}
                position="right center">
                    <Box>
                    <div
                    style ={{
                        background: "grey",
                        display: "flex",
                        width: 200,
                        padding: 20,
                    }}>
                        <td>
                        <h4>#Machine0001</h4>
                        <label> Number of box: </label>
                            <input
                                type='number'
                                step="1"
                                min='0'
                            />
                            <button>Sent job</button>
                        </td>
                    </div>
                    </Box>
            </Popup>
        </div>
    )
};
