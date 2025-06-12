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
  selector: "app-tp-evaluation",
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonModule, RippleModule],
  template: `
    <div class="tp-evaluation-container">
      <h1 class="page-title">Évaluation des TPs</h1>
      
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
    .tp-evaluation-container {
      padding: 2rem;
      background-color: #f8f9fa;
      min-height: calc(100vh - 60px);
    }
    
    .page-title {
      font-size: 2.5rem;
      font-weight: 600;
      color:#2a9d8f;
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
      background-color:  #e6f7f5;
      color: #2a9d8f;
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
      background-color:#2a9d8f;
      color: white;
    }
    
    .navigation-buttons {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .back-button {
      color: #2a9d8f;
    }
    
    .next-button {
      background-color: #ffc107;
      border-color: #ffc107;
      color: white;
      font-weight: 600;
      padding: 0.75rem 2rem;
    }
    
    .next-button:hover {
      background-color:  #ffb300;
      border-color:  #ffb300;
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
      background-color: #ffb300;
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
export class TpEvaluationComponent implements OnInit {
  questions: Question[] = [
    {
      id: 1,
      text: "The content of the lab sessions was relevant to the course objectives and topics.",
      options: [
        "Strongly agree – The lab content was highly relevant to the course",
        "Agree – The lab content was mostly relevant to the course",
        "Disagree – The lab content was largely not relevant to the course",
        "Strongly disagree – The lab content was not at all relevant to the course",
      ],
    },
    {
      id: 2,
      text: "The lab activities helped me deepen my understanding of the subject matter.",
      options: [
        "Strongly agree – The labs were extremely effective in reinforcing my understanding",
        "Agree – The labs were generally helpful for my understanding",
        "Disagree – The labs did little to improve my understanding",
        "Strongly disagree – The labs were not at all helpful for my understanding",
      ],
    },
    {
      id: 3,
      text: "The difficulty level of the lab tasks was appropriate (neither too easy nor too difficult) for my level.",
      options: [
        "Strongly agree – The lab exercises were at an ideal difficulty level",
        "Agree – The lab exercises were mostly at a suitable difficulty level",
        "Disagree – The lab exercises were somewhat inappropriate in difficulty",
        "Strongly disagree – The lab exercises were far from an appropriate difficulty level",
      ],
    },
    {
      id: 4,
      text: "The lab sessions were well organized and structured.",
      options: [
        "Strongly agree – The sessions were extremely well organized and followed a clear structure",
        "Agree – The sessions were generally well organized with a reasonable structure",
        "Disagree – The sessions were not very well organized or structured",
        "Strongly disagree – The sessions were poorly organized and lacked structure",
      ],
    },
    {
      id: 5,
      text: "The instructions and materials for the lab exercises were clear and easy to follow.",
      options: [
        "Strongly agree – Lab instructions/materials were very clear and straightforward",
        "Agree – Lab instructions/materials were mostly clear and understandable",
        "Disagree – Lab instructions/materials were somewhat unclear or confusing",
        "Strongly disagree – Lab instructions/materials were not clear at all and very confusing",
      ],
    },
    {
      id: 6,
      text: "Sufficient time and resources were provided to complete the lab activities.",
      options: [
        "Strongly agree – We had ample time and all necessary resources (equipment, software, etc.)",
        "Agree – We usually had enough time and most required resources",
        "Disagree – We often lacked either enough time or some resources",
        "Strongly disagree – We rarely had sufficient time or necessary resources to finish the work",
      ],
    },
    {
      id: 7,
      text: "The professor explained the lab objectives, concepts, and procedures clearly.",
      options: [
        "Strongly agree – Explanations were extremely clear and easy to understand",
        "Agree – Explanations were generally clear, with only minor confusion",
        "Disagree – Explanations were often unclear or hard to follow",
        "Strongly disagree – Explanations were very unclear and confusing",
      ],
    },
    {
      id: 8,
      text: "The professor was approachable and provided helpful guidance when students needed assistance.",
      options: [
        "Strongly agree – The professor was very approachable and always helpful with questions",
        "Agree – The professor was usually approachable and gave help when needed",
        "Disagree – The professor was not very approachable or was slow to help",
        "Strongly disagree – The professor was unapproachable and unhelpful when assistance was needed",
      ],
    },
    {
      id: 9,
      text: "The professor's teaching methods in the lab (e.g. demonstrations, examples, guidance) were effective in helping me learn.",
      options: [
        "Strongly agree – Teaching methods were highly effective in aiding my learning",
        "Agree – Teaching methods were mostly effective and helpful",
        "Disagree – Teaching methods were only slightly effective or had issues",
        "Strongly disagree – Teaching methods were ineffective and did not help me learn",
      ],
    },
    {
      id: 10,
      text: "The professor encouraged students to participate actively and ask questions during the lab sessions.",
      options: [
        "Strongly agree – The professor actively encouraged participation and questions",
        "Agree – The professor generally encouraged participation and questions",
        "Disagree – The professor did little to encourage participation or questions",
        "Strongly disagree – The professor discouraged or ignored student participation and questions",
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
      console.log("Évaluation des TP terminée", this.answers)

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
