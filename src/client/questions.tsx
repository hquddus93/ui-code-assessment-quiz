import React from 'react';
import * as Questions from '../server/data.json';

export interface QuestionsClassProps { 
    compiler: string; 
    framework: string;
    
}

// 1, how many questions per quiz

// export interface QuestionsClassState {
//     quests: [];

// }


class QuestionsClass extends React.Component<QuestionsClassProps, {}> {

    render () {
       const quests = Questions.results.map(quest => quest);
        debugger
     

       for (let i=0; i < quests.length; i++){
           debugger
               return <p>{quests[i].question}</p>
       }

    };
};



export default QuestionsClass;