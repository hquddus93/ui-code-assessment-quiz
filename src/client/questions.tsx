import * as React from 'react';
import * as Questions from '../server/data.json';
const Entities = require('html-entities').AllHtmlEntities;


export interface Props { 
    compiler: string; 
    framework: string;
    
}

export interface Quest {
    category: string,
    type: string,
    difficulty: string,
    question: string,
    correct_answer: string,
    incorrect_answers?: string[];

}

export interface State {
    quests: Quest[],
    currentQuestion: number,
    quizQuestions: Quest[],
    submittedAnswers: string[]

}

class QuestionsClass extends React.Component<Props, State> {
    state: State = {
        quests: Questions.results, //50
        currentQuestion: 0,
        quizQuestions: [],
        submittedAnswers: []
    }

    componentDidMount = () => {
        // gives an array of 10 q's
        while (this.state.quizQuestions.length < 10) {
            let num = Math.floor(Math.random() * this.state.quests.length)
            if (!this.state.quizQuestions.includes(this.state.quests[num])) {
                this.state.quizQuestions.push(this.state.quests[num])
            }
            
        }

    }

    shuffleAnswers = () => {
        // displays answer choices in alphabetical order
        let question = this.state.quizQuestions[this.state.currentQuestion];
        let answerChoices = question.incorrect_answers?.concat(question.correct_answer);
        debugger
        return answerChoices?.sort().map((ans, idx) => {
            const entities = new Entities();
            ans = entities.decode(ans)
            debugger
            return (
            <>
                <span>
                    <input type='radio' id={`ans-${idx}`} value={ans} onChange={this.handleChange}/> <label>{ans}</label>
                    <br />
                </span>
            </>
            )

        });


    }

    multipleChoice = () => {
        debugger
        const entities = new Entities();
        let question = entities.decode(this.state.quizQuestions[this.state.currentQuestion].question);
        return (
        <div>
            <h3>{question}</h3>
            {this.shuffleAnswers()}
            <br />
            {this.state.currentQuestion !== 9 ? <button onClick={this.handleClick}>NEXT</button> : <button onClick={this.checkAnswers}>Submit</button>} 

        </div>
        )
    }

    booleanQuestion = () => {
        debugger
        const entities = new Entities();
        let question = entities.decode(this.state.quizQuestions[this.state.currentQuestion].question);
        return (
        <>
        <p>{question}</p>
        <span>
            <input type='radio' id='true' value="true" onChange={this.handleChange}/> <label>True</label>
        </span>
        <span>
            <input type='radio' id='false' value="false" onChange={this.handleChange}/><label>False</label>
        </span>
        {this.state.currentQuestion !== 9 ? <button onClick={this.handleClick}>NEXT</button> : <button onClick={this.checkAnswers}>Submit</button>} 
        


        </>)

    }

    shortAnswer= () => {
        debugger
        const entities = new Entities();
        let question = entities.decode(this.state.quizQuestions[this.state.currentQuestion].question);
        return (
            <>
            <p>{question}</p>
            <span>
                <input onChange={this.update}/>
            </span>
                {this.state.currentQuestion !== 9 ? <button onClick={this.handleClick}>NEXT</button> : <button onClick={this.handleSubmit}>Submit</button>} 
            </>
        )
    }

    checkAnswers = () => {
        let count = 0;

        for (let i = 0; i < this.state.quizQuestions.length; i++) {
            if (this.state.submittedAnswers[i] === this.state.quizQuestions[i].correct_answer) {
                count ++;
            }
        }
        debugger

    }

    handleSubmit = () => {
        // checkAnswers()
    }

    update = (field:any) => {
        debugger
        this.setState({
            submittedAnswers: this.state.submittedAnswers.concat([field.target.value])
        })


    }

    handleClick = () => {
    

        debugger
        //next button 
        this.setState({
            currentQuestion: (this.state.currentQuestion + 1)
        });
    }

    handleChange = (event:any) => {
        // clicking an answer choice
        let array = Array.from(event.target.parentElement.childNodes)


        debugger
        this.setState({submittedAnswers: this.state.submittedAnswers.concat([event.target.value])
        })
        debugger

    }


     render () {

        //  if else statements deciding which type of question to render


    this.componentDidMount();
        debugger
         let question = this.state.quizQuestions[this.state.currentQuestion];
         if (question.type === 'multiple') {
            return this.multipleChoice()
         } else if (question.type === 'text') {
            return this.shortAnswer();
         } else if (question.type === 'boolean') {
            return this.booleanQuestion();
         }

    };
};



export default QuestionsClass;