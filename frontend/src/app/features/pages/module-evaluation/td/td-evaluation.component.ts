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
  selector: "app-td-evaluation",
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonModule, RippleModule],
  template: `
    <div class="td-evaluation-container">
      <h1 class="page-title">Évaluation des TDs</h1>
      
      <div class="evaluation-card">
        <div class="question-container">
          <div class="yellow-square"></div>
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
    .cours-evaluation-container {
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
export class TdEvaluationComponent implements OnInit {
  questions: Question[] = [
    {
      id: 1,
      text: "How relevant was the content of the tutorial sessions to the overall course objectives?",
      options: [
        "Highly relevant – directly supportive of the course material and objectives",
        "Mostly relevant – generally aligned with the course, with only minor digressions",
        "Only slightly relevant – had limited alignment with the main course content",
        "Not relevant at all – largely unrelated to the course objectives",
      ],
    },
    {
      id: 2,
      text: "To what extent did the tutorial sessions help you understand the course material better?",
      options: [
        "To a great extent – they greatly enhanced my understanding of the material",
        "To a moderate extent – they somewhat improved my understanding",
        "Only slightly – they had limited impact on my understanding",
        "Not at all – they did not help improve my understanding of the material",
      ],
    },
    {
      id: 3,
      text: "How would you rate the appropriateness of the difficulty level of the tutorial content?",
      options: [
        "Very appropriate – the difficulty was just right for your level",
        "Mostly appropriate – only slightly too easy or too hard at times",
        "Somewhat inappropriate – often either too easy or too difficult",
        "Very inappropriate – consistently at the wrong level (far too easy or far too hard)",
      ],
    },
    {
      id: 4,
      text: "How would you rate the overall organization and structure of the tutorial sessions?",
      options: [
        "Excellent – very well organized and structured",
        "Good – generally well organized, with only minor issues",
        "Fair – somewhat disorganized or inconsistent at times",
        "Poor – very disorganized and lacking clear structure",
      ],
    },
    {
      id: 5,
      text: "How do you evaluate the pacing and time management of the tutorial sessions?",
      options: [
        "Excellent – the pace was always appropriate and time was used effectively",
        "Good – the pacing was mostly appropriate, with only minor timing issues",
        "Fair – at times sessions were too slow or too rushed",
        "Poor – sessions were often too slow or too rushed, indicating poor time management",
      ],
    },
    {
      id: 6,
      text: "How clear were the goals and objectives of each tutorial session?",
      options: [
        "Very clear – the purpose and objectives were always well explained",
        "Mostly clear – the objectives were usually evident, with only occasional confusion",
        "Somewhat unclear – often unsure about the session's goals or what was expected",
        "Not clear at all – the sessions lacked clear objectives or purpose",
      ],
    },
    {
      id: 7,
      text: "How clearly did the professor explain concepts and problems during the tutorial sessions?",
      options: [
        "Very clear – explanations were always easy to understand",
        "Generally clear – most explanations were understandable, with few exceptions",
        "Somewhat unclear – some explanations were confusing or needed additional clarification",
        "Very unclear – explanations were often difficult to follow",
      ],
    },
    {
      id: 8,
      text: "How well did the professor encourage student participation and interaction during the sessions?",
      options: [
        "Extremely well – actively encouraged questions and discussions throughout",
        "Quite well – often invited participation and responded to student input",
        "Not much – only occasionally encouraged questions or interaction",
        "Not at all – did not encourage participation; sessions were mostly one-sided",
      ],
    },
    {
      id: 9,
      text: "How would you rate the professor's approachability and helpfulness during the tutorial sessions?",
      options: [
        "Excellent – very approachable and always willing to help with questions or difficulties",
        "Good – generally approachable and helpful, with rare exceptions",
        "Fair – not very approachable and only somewhat helpful when consulted",
        "Poor – unapproachable and unhelpful when students needed assistance",
      ],
    },
    {
      id: 10,
      text: "How would you evaluate the professor's preparation and organization for each tutorial session?",
      options: [
        "Excellent – always well-prepared and highly organized",
        "Good – usually prepared and organized, with only minor lapses",
        "Fair – sometimes appeared unprepared or disorganized",
        "Poor – often seemed unprepared and disorganized",
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
      console.log("Évaluation des TD terminée", this.answers)

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
