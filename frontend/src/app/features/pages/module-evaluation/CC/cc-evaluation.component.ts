import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"
import { ButtonModule } from "primeng/button"
import { RippleModule } from "primeng/ripple"

interface Question {
  id: number
  text: string
  options: string[]
}

@Component({
  selector: "app-cc-evaluation",
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonModule, RippleModule],
  template: `
    <div class="cc-evaluation-container">
      <h1 class="page-title">Évaluation des Contrôles Continus</h1>
      
      <div class="evaluation-card">
        <div class="question-container">
        
          <div class="question-text">
            {{ currentQuestion.text }}
          </div>
        </div>
        
        <div class="options-container">
          <button 
            *ngFor="let option of currentQuestion.options; let i = index" 
            class="option-button" 
            [class.selected]="selectedOption === i"
            (click)="selectOption(i)"
          >
            {{ option }}
          </button>
        </div>
        
        <div class="navigation-buttons">
          <button 
            pButton 
            pRipple 
            label="Back" 
            class="p-button-text back-button" 
            (click)="previousQuestion()"
            [disabled]="currentQuestionIndex === 0"
          ></button>
          
          <button 
            pButton 
            pRipple 
            [label]="isLastQuestion ? 'Submit' : 'Next'" 
            class="p-button-rounded next-button" 
            (click)="nextQuestion()"
            [disabled]="selectedOption === null"
          ></button>
        </div>
      </div>
      
      <div class="progress-container">
        <div class="progress-text">Question {{ currentQuestionIndex + 1 }} of {{ questions.length }}</div>
        <div class="progress-bar">
          <div class="progress-fill" [style.width]="getProgressWidth()"></div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
    .cc-evaluation-container {
      padding: 2rem;
      background-color: #f8f9fa;
      min-height: calc(100vh - 60px);
    }
    
    .page-title {
      font-size: 2.5rem;
      font-weight: 600;
      color: #00695c;
      margin-bottom: 2rem;
    }
    
    .evaluation-card {
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
      padding: 2rem;
      margin-bottom: 2rem;
    }
    
    .question-container {
      display: flex;
      align-items: flex-start;
      margin-bottom: 3rem;
    }
  
    .question-text {
      font-size: 1.25rem;
      font-weight: 500;
      color: #333;
    }
    
    .options-container {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      margin-bottom: 3rem;
    }
    
    .option-button {
      flex: 1 0 calc(50% - 1rem);
      min-width: 200px;
      padding: 1rem;
      background-color: #e6f7f5;
      color: #00695c;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
      text-align: center;
    }
    
    .option-button:hover {
      background-color: #ccefeb;
    }
    
    .option-button.selected {
      background-color: #00695c;
      color: white;
    }
    
    .navigation-buttons {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .back-button {
      color: #00695c;
    }
    
    .next-button {
      background-color: #ffc107;
      border-color: #ffc107;
      color: #333;
      font-weight: 600;
      padding: 0.75rem 2rem;
    }
    
    .next-button:hover {
      background-color: #ffb300;
      border-color: #ffb300;
    }
    
    .next-button:disabled, .back-button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    
    .progress-container {
      margin-top: 2rem;
    }
    
    .progress-text {
      font-size: 0.9rem;
      color: #666;
      margin-bottom: 0.5rem;
      text-align: center;
    }
    
    .progress-bar {
      height: 6px;
      background-color: #e0e0e0;
      border-radius: 3px;
      overflow: hidden;
    }
    
    .progress-fill {
      height: 100%;
      background-color: #00695c;
      border-radius: 3px;
      transition: width 0.3s ease;
    }
    
    @media (max-width: 768px) {
      .option-button {
        flex: 1 0 100%;
      }
    }
    `,
  ],
})
export class CcEvaluationComponent implements OnInit {
  questions: Question[] = [
    {
      id: 1,
      text: "How clear were the exam questions and instructions?",
      options: [
        "Very clear – easy to understand",
        "Mostly clear – only minor points of confusion",
        "Somewhat unclear – several parts were confusing",
        "Very unclear – difficult to understand overall",
      ],
    },
    {
      id: 2,
      text: "How well did the exam content align with the course objectives and topics?",
      options: [
        "Extremely well aligned – fully reflected the course objectives",
        "Mostly aligned – covered most of the key topics",
        "Only somewhat aligned – some important topics were not covered",
        "Not aligned at all – did not reflect the course objectives",
      ],
    },
    {
      id: 3,
      text: "How appropriate was the difficulty level of the exam?",
      options: [
        "Very appropriate – challenging but fair for the course level",
        "Mostly appropriate – generally suitable, with minor exceptions",
        "Somewhat inappropriate – at times too easy or too difficult",
        "Very inappropriate – far too easy or far too difficult",
      ],
    },
    {
      id: 4,
      text: "How clearly were the grading criteria or scoring guidelines communicated to you?",
      options: [
        "Very clearly – expectations were well explained in advance",
        "Somewhat clearly – most criteria were explained, with some minor ambiguity",
        "Not very clearly – the grading criteria were vague or incomplete",
        "Not at all – the grading guidelines were not explained",
      ],
    },
    {
      id: 5,
      text: "How fair and consistent was the grading process for this exam?",
      options: [
        "Completely fair and consistent – grading was uniform for all students",
        "Mostly fair – generally consistent, with only minor inconsistencies",
        "Somewhat unfair or inconsistent – there were noticeable grading disparities",
        "Very unfair and inconsistent – grading felt biased or uneven",
      ],
    },
    {
      id: 6,
      text: "How satisfied were you with the feedback or explanations provided for your exam grade?",
      options: [
        "Very satisfied – feedback was detailed and very helpful",
        "Satisfied – received adequate feedback on performance",
        "Dissatisfied – feedback was minimal or not very clear",
        "Very dissatisfied – no useful feedback or justification was provided",
      ],
    },
    {
      id: 7,
      text: "How sufficient was the time allocated for completing the exam?",
      options: [
        "More than sufficient – had ample time to spare",
        "Sufficient – enough time to complete all parts of the exam",
        "Barely sufficient – finished but felt quite rushed",
        "Not sufficient at all – ran out of time before finishing",
      ],
    },
    {
      id: 8,
      text: "How well was the exam schedule and instructions communicated in advance?",
      options: [
        "Very well – all details were provided well ahead of time",
        "Generally well – most information was communicated clearly",
        "Not well – some details were unclear or given last-minute",
        "Very poorly – schedule/instructions were unclear or not communicated in time",
      ],
    },
    {
      id: 9,
      text: "How would you rate the organization of the exam environment (e.g., the exam room or online platform)?",
      options: [
        "Very well-organized – comfortable environment, no distractions or issues",
        "Well-organized – mostly comfortable, only minor issues",
        "Not well-organized – several organizational issues or distractions",
        "Very poorly organized – chaotic or uncomfortable exam setting",
      ],
    },
    {
      id: 10,
      text: "Overall, how would you rate this continuous assessment (exam)?",
      options: [
        "Very positive – an excellent overall assessment experience",
        "Somewhat positive – good overall, with only minor issues",
        "Somewhat negative – several aspects were unsatisfactory",
        "Very negative – a very poor overall experience",
      ],
    },
  ]

  currentQuestionIndex = 0
  selectedOption: number | null = null
  answers: { questionId: number; answer: number }[] = []

  get currentQuestion(): Question {
    return this.questions[this.currentQuestionIndex]
  }

  get isLastQuestion(): boolean {
    return this.currentQuestionIndex === this.questions.length - 1
  }

  constructor() {}

  ngOnInit() {
    // Récupérer les réponses précédentes si elles existent
    const savedAnswer = this.answers.find((a) => a.questionId === this.currentQuestion.id)
    if (savedAnswer) {
      this.selectedOption = savedAnswer.answer
    } else {
      this.selectedOption = null
    }
  }

  selectOption(index: number) {
    this.selectedOption = index
  }

  previousQuestion() {
    if (this.currentQuestionIndex > 0) {
      // Sauvegarder la réponse actuelle
      this.saveAnswer()

      // Passer à la question précédente
      this.currentQuestionIndex--

      // Récupérer la réponse précédente si elle existe
      const savedAnswer = this.answers.find((a) => a.questionId === this.currentQuestion.id)
      if (savedAnswer) {
        this.selectedOption = savedAnswer.answer
      } else {
        this.selectedOption = null
      }
    }
  }

  nextQuestion() {
    // Sauvegarder la réponse actuelle
    this.saveAnswer()

    if (this.currentQuestionIndex < this.questions.length - 1) {
      // Passer à la question suivante
      this.currentQuestionIndex++

      // Récupérer la réponse précédente si elle existe
      const savedAnswer = this.answers.find((a) => a.questionId === this.currentQuestion.id)
      if (savedAnswer) {
        this.selectedOption = savedAnswer.answer
      } else {
        this.selectedOption = null
      }
    } else {
      // Dernière question, terminer l'évaluation
      console.log("Évaluation des CC terminée", this.answers)

      // Utiliser window.location pour une navigation directe
      window.location.href = "/module-evaluation/cours/evaluation-complete"
    }
  }

  saveAnswer() {
    if (this.selectedOption !== null) {
      const existingAnswerIndex = this.answers.findIndex((a) => a.questionId === this.currentQuestion.id)

      if (existingAnswerIndex !== -1) {
        // Mettre à jour la réponse existante
        this.answers[existingAnswerIndex].answer = this.selectedOption
      } else {
        // Ajouter une nouvelle réponse
        this.answers.push({
          questionId: this.currentQuestion.id,
          answer: this.selectedOption,
        })
      }
    }
  }

  getProgressWidth(): string {
    const progress = ((this.currentQuestionIndex + 1) / this.questions.length) * 100
    return `${progress}%`
  }
}
