import React from 'react';
import './FaceRecognition.css'

const FaceRecognition = ({imageUrl, box}) => {

    return (
        <div className='center ma'>
            <div id='parentToBoxes'className='absolute mt2'>
                <img id='inputimage' alt=''src={imageUrl} width='500px' height='auto' />
                <div id='boxy'>
                {
                    box.map(function(x) {
                        return (
                            <div className='bounding-box' style={{top: x.topRow, right:x.rightCol, bottom: x.bottomRow, left: x.leftCol}}></div>
                        )
                    })
                }
                </div>
            </div>
            
        </div>

    )
}

export default FaceRecognition;