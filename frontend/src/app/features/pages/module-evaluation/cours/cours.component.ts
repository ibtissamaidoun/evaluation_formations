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
  selector: "app-cours-evaluation",
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonModule, RippleModule],
  template: `
    <div class="cours-evaluation-container">
      <h1 class="page-title">Cours Evaluation</h1>
      
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
export class CoursEvaluationComponent implements OnInit {
  questions: Question[] = [
    {
      id: 1,
      text: "How well does the course content align with your expectations?",
      options: ["Exceeds expectations", "Meets expectations", "Below expectations", "Far below expectations"],
    },
    {
      id: 2,
      text: "How clear were the learning objectives of the course?",
      options: ["Very clear", "Somewhat clear", "Unclear", "Not clear at all"],
    },
    {
      id: 3,
      text: "How would you rate the effectiveness of the professor's teaching methods?",
      options: ["Very effective", "Effective", "Somewhat effective", "Not effective at all"],
    },
    {
      id: 4,
      text: "How engaging was the professor during the lectures?",
      options: ["Very engaging", "Engaging", "Not engaging", "Very boring"],
    },
    {
      id: 5,
      text: "Did the professor encourage student participation?",
      options: ["Always", "Sometimes", "Rarely", "Never"],
    },
    {
      id: 6,
      text: "How relevant were the course materials (books, articles, slides)?",
      options: ["Very relevant", "Somewhat relevant", "Not very relevant", "Not relevant at all"],
    },
    {
      id: 7,
      text: "How would you rate the difficulty level of the course?",
      options: ["Too easy", "Just right", "Somewhat difficult", "Very difficult"],
    },
    {
      id: 8,
      text: "How often did the professor provide feedback on your progress?",
      options: ["Regularly", "Occasionally", "Rarely", "Never"],
    },
    {
      id: 9,
      text: "How satisfied are you with the organization and structure of the course?",
      options: ["Very satisfied", "Satisfied", "Dissatisfied", "Very dissatisfied"],
    },
    {
      id: 10,
      text: "How useful were the assignments and projects in enhancing your learning?",
      options: ["Very useful", "Somewhat useful", "Not very useful", "Not useful at all"],
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
      console.log("Évaluation des cours terminée", this.answers)

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
