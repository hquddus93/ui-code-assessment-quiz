import * as React from 'react';
import QuestionsClass from "./questions";



export const App = () => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1>Lucid</h1>
        <h2>Welcome to UI Team code assessment!</h2>
        <QuestionsClass compiler="TypeScript" framework="React" />
  
        
    </div>
);
