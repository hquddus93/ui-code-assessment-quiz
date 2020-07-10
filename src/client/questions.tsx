import * as React from 'react';
import * as Questions from '../server/data.json';
const styles = require('../stylesheets/styles.css')
const Entities = require('html-entities').AllHtmlEntities;


interface Props { 
    compiler: string; 
    framework: string;
    
}

interface Quest {
    category: string,
    type: string,
    difficulty: string,
    question: string,
    correct_answer: string,
    incorrect_answers?: string[];

}

interface State {
    quests: Quest[],
    currentQuestion: number,
    quizQuestions: Quest[],
    submittedAnswers: string[]
    field: string,
    selectedAnswer: string,
    key: number

}

class QuestionsClass extends React.Component<Props, State> {
    state: State = {
        quests: Questions.results, //50
        currentQuestion: 0,
        quizQuestions: [],
        submittedAnswers: [],
        field: "",
        selectedAnswer: "",
        key: 0
    }

    componentDidMount = () => {
        // gives an array of X # q's
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
        return answerChoices?.sort().map((ans, idx) => {
            const entities = new Entities();
            ans = entities.decode(ans)
            this.state.key++
        return (
            <span>
                <input type='radio' key={this.state.key + idx} checked={this.state.selectedAnswer === ans} value={ans} name='answerChoice' onChange={this.handleChange}/> <label>{ans}</label>
                <br />
            </span>
            )

        });


    }

    multipleChoice = () => {
        // renders MC question decoded
        const entities = new Entities();
        let question = entities.decode(this.state.quizQuestions[this.state.currentQuestion].question);
        return (
        <div>
            <h3>{question}</h3>
            {this.shuffleAnswers()}
            <br />

            <p id='errors' className='hidden'>Answer is required</p>
            <br />
            {this.state.currentQuestion !== this.state.quizQuestions.length - 1 ? <button onClick={this.handleClick}>NEXT</button> : <button onClick={this.checkAnswers}>Submit</button>} 

        </div>
        )
    }

    booleanQuestion = () => {
        // renders boolean question decoded
        const entities = new Entities();
        let question = entities.decode(this.state.quizQuestions[this.state.currentQuestion].question);
        return (
        <div>
            <h3>{question}</h3>
            <span>
                <input type='radio' id='true' value="true" name='boolean' checked={this.state.selectedAnswer === 'true'} onChange={this.handleChange}/> <label>True</label>
            </span>
            <br />
            <span>
                <input type='radio' id='false' value="false" name='boolean' checked={this.state.selectedAnswer === 'false'} onChange={this.handleChange}/><label>False</label>
            </span>
            <br />
            <p id='errors' className='hidden'>Answer is required</p>
            <br />

            {this.state.currentQuestion !== this.state.quizQuestions.length - 1 ? <button onClick={this.handleClick}>NEXT</button> : <button onClick={this.checkAnswers}>Submit</button>} 
        
        </div>
        )

    }

    shortAnswer= () => {
        // renders short answer q's decoded
        const entities = new Entities();
        let question = entities.decode(this.state.quizQuestions[this.state.currentQuestion].question);
        return (
            <div>
            <h3>{question}</h3>
            <span>
                <input onChange={this.update} placeholder="" value={this.state.field}/>
            </span>
            <br />
            <p id='errors' className='hidden'>Answer is required</p>
            <br />
                {this.state.currentQuestion !== this.state.quizQuestions.length - 1 ? <button onClick={this.handleClick}>NEXT</button> : <button onClick={this.checkAnswers}>Submit</button>} 
            </div>
        )
    }

    checkAnswers = () => {
        // submits the last answer and makes sure error still renders if empty
        this.handleClick();
        let count = 0;
        for (let i = 0; i < this.state.quizQuestions.length; i++) {
            if (this.state.submittedAnswers[i] === this.state.quizQuestions[i].correct_answer) {
                // calculates # of correct answers
                count += 1;
            }
        }
        return (
            <div>
                <h3>Summary</h3>
                <p>Correct: {count}</p>
                <p>Wrong: {this.state.quizQuestions.length - count}</p>
                <p>Final Score: {count / this.state.quizQuestions.length * 100 }%</p>
                <button onClick={() => window.location.reload()}>Retake Quiz</button>
            </div>
        )
    }

    renderErrors = () => {
        // displays error message when user clicks next without putting an answer
        let error = document.getElementById('errors');
        error?.classList.remove('hidden');
        error?.classList.add('errors');
    }

    update = (field:any) => {
        // updates state for short answer questions
        this.setState({
            field: field.target.value
        })


    }

    handleClick = () => {
        // checks to see if there is short answer stored in the state 
        if (this.state.field.length > 0) {
            this.setState({submittedAnswers: this.state.submittedAnswers.concat(this.state.field)})
            // increments currentQuestion and resets state
            this.setState({
                currentQuestion: (this.state.currentQuestion + 1),
                field: "",
                selectedAnswer: ""
            });
        }

        // checks to see if there is a MC/boolean answer stored in the state 
        if (this.state.selectedAnswer.length > 0) {
            this.setState({submittedAnswers: this.state.submittedAnswers.concat(this.state.selectedAnswer)})
            // increments currentQuestion and resets state
            this.setState({
                currentQuestion: (this.state.currentQuestion + 1),
                field: "",
                selectedAnswer: ""
            });
        }

        // skips error rendering on checkAnswers()
        if (this.state.selectedAnswer.length === 0 && this.state.field.length === 0 && this.state.currentQuestion < this.state.quizQuestions.length) {

            this.renderErrors();
        }   
    }

    handleChange = (event:any) => {
        // selecting an answer choice
        this.setState({selectedAnswer: event.target.value
        })
    }


     render () {
        //  if else statements deciding which type of question to render or render summary

    this.componentDidMount();
         let error = document.getElementById('errors');
         error?.classList.remove('errors');
         error?.classList.add('hidden');
         let question = this.state.quizQuestions[this.state.currentQuestion];

         if (question && question.type === 'multiple') {
            return this.multipleChoice()
         } else if (question && question.type === 'text') {
            return this.shortAnswer();
         } else if (question && question.type === 'boolean') {
            return this.booleanQuestion();
         } else {
            return this.checkAnswers();
         }

    };
};



export default QuestionsClass;