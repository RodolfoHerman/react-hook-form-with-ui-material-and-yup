import React from 'react';

import GirlImage from "../assets/images/img_girl.jpg";
import { Stepper } from '../shared';
import DemoPage1 from './DemoPage1';
import DemoPage2 from './DemoPage2';
import DemoPage3 from './DemoPage3';

const StepPage = () => {
    return <Stepper 
        imageToShow={GirlImage}
        title="Demonstration of the Steps Component"
        subTitle="The component uses the 'Location' to perform the change between steps with the animation of the 'react-transition-group'"
        progressTitle="Change of steps"
        steps={[
            {
                element: (props) => <DemoPage1 {...props} />,
                header: "My Steps 1 Demo",
                subHeader: "Checking the Step 1 Subtitle demo. The important thing is for the change to take place."
            },
            {
                element: (props) => <DemoPage2 {...props} />,
                header: "My Steps 2 Demo",
                subHeader: "Checking the Step 2 Subtitle demo. The important thing is for the change to take place."
            },
            {
                element: (props) => <DemoPage3 {...props} />,
                header: "My Steps 3 Demo",
                subHeader: "Checking the Step 3 Subtitle demo. The important thing is for the change to take place.",
                subTitle: "The Son dictates the change of titles"
            },
        ]}
    />
}

export default StepPage;
