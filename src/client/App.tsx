import * as React from 'react';
import QuestionsClass from "./questions";

// function startQuiz() {
//     return <QuestionsClass compiler="TypeScript" framework="React" />

// }

export const App = () => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1>Lucid</h1>
        <h2>Welcome to UI Team code assessment!</h2>
        <QuestionsClass compiler="TypeScript" framework="React" />
        {/* <button onClick={() => startQuiz()}>Start Quiz</button> */}

        
    </div>
);
