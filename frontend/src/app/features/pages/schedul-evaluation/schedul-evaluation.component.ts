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
  selector: "app-schedule-evaluation",
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonModule, RippleModule],
  template: `
    <div class="espace-evaluation-container">
      <h1 class="page-title">Évaluation des Horaires</h1>
      
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
    .espace-evaluation-container {
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
    
    .yellow-square {
      width: 60px;
      height: 60px;
      background-color: #ffc107;
      margin-right: 1rem;
      flex-shrink: 0;
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
      text-align: left;
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
export class SchedulEvaluationComponent implements OnInit {
  questions: Question[] = [
    {
      id: 1,
      text: "Overall Weekly Schedule Satisfaction: How satisfied are you with the overall weekly class schedule (including lectures, tutorials/TD, and lab sessions/TP)?",
      options: [
        "A. Very satisfied – The weekly schedule is excellent and meets my needs.",
        "B. Somewhat satisfied – The schedule is good, with only minor issues.",
        "C. Somewhat dissatisfied – The schedule has several problems or inconveniences.",
        "D. Very dissatisfied – The weekly schedule is poor and needs major improvement.",
      ],
    },
    {
      id: 2,
      text: "Daily Time Distribution: How do you feel about the distribution of classes throughout each day (morning, afternoon, and evening)?",
      options: [
        "A. Very well distributed – Class times are very balanced across the day.",
        "B. Fairly well distributed – Class times are mostly convenient, with some balance.",
        "C. Not well distributed – Many classes are clumped or at less ideal times.",
        "D. Poorly distributed – The timing of classes each day is very unbalanced or inconvenient.",
      ],
    },
    {
      id: 3,
      text: "Weekly Workload Balance: What is your view on how classes are spread across the week (Monday–Friday)?",
      options: [
        "A. Very balanced – Classes are evenly spread; no day feels overloaded.",
        "B. Somewhat balanced – A few days are heavier, but generally the spread is okay.",
        "C. Not very balanced – There is an uneven distribution; some days are much busier than others.",
        "D. Very unbalanced – The weekly schedule is extremely uneven, with clear overload on certain days.",
      ],
    },
    {
      id: 4,
      text: "Lecture/TD/TP Session Balance: How balanced is the time allocated to different session types – lectures (cours), tutorials (TD), and practical labs (TP) – in your schedule?",
      options: [
        "A. Very balanced – There is an excellent mix of lectures, TD, and TP sessions.",
        "B. Moderately balanced – The mix of session types is generally good, with slight imbalance.",
        "C. Slightly unbalanced – One type of session (lecture, TD, or TP) dominates the schedule too much.",
        "D. Not balanced at all – The schedule is poor in mixing session types (very skewed toward one type).",
      ],
    },
    {
      id: 5,
      text: "Breaks and Rest Periods: How satisfied are you with the breaks between classes and the time provided for meals or rest during the day?",
      options: [
        "A. Very satisfied – Breaks (including lunch break) are well-timed and sufficient.",
        "B. Satisfied – Breaks are mostly adequate, with only minor timing issues.",
        "C. Dissatisfied – Breaks are often too short or poorly placed in the schedule.",
        "D. Very dissatisfied – There is very little time to rest or eat, making the schedule exhausting.",
      ],
    },
    {
      id: 6,
      text: "Free Time for Self-Study: How do you feel about the amount of free time you have in your weekly schedule for self-study or extracurricular activities?",
      options: [
        "A. Very pleased – I have plenty of free time to study and pursue other activities.",
        "B. Somewhat pleased – I have a decent amount of free time, though more would be better.",
        "C. Somewhat unhappy – Free time is limited; it's hard to fit in study or other activities.",
        "D. Very unhappy – My schedule is so full that I have almost no time for self-study or rest.",
      ],
    },
    {
      id: 7,
      text: "Scheduling Conflicts/Overlaps: How often do you face overlapping classes or scheduling conflicts in your timetable?",
      options: [
        "A. Never – I never encounter overlapping classes or conflicts.",
        "B. Rarely – Conflicts occur very infrequently (almost never a problem).",
        "C. Sometimes – I occasionally have overlaps or conflicts in the schedule.",
        "D. Often – Overlapping classes or schedule conflicts happen frequently.",
      ],
    },
    {
      id: 8,
      text: "Impact on Concentration and Learning: To what extent does the class schedule support or hinder your ability to concentrate and learn effectively throughout the day?",
      options: [
        "A. Greatly supports – The schedule is very conducive to maintaining focus and learning.",
        "B. Somewhat supports – The schedule is generally fine, with only minor concentration issues.",
        "C. Somewhat hinders – The timing/sequence of classes makes it hard to stay focused at times.",
        "D. Greatly hinders – The schedule significantly undermines my concentration and learning.",
      ],
    },
    {
      id: 9,
      text: "Regular Semester Manageability: How manageable is your class schedule during normal semester weeks (outside of exam periods)?",
      options: [
        "A. Very manageable – Workload and class timing during the semester are very comfortable.",
        "B. Manageable – The regular schedule is okay to handle, with some busy periods.",
        "C. Hard to manage – The semester schedule is somewhat overwhelming at times.",
        "D. Overwhelming – The regular weekly schedule is too intense and hard to keep up with.",
      ],
    },
    {
      id: 10,
      text: "Exam Period Scheduling: During exam periods, how well is the schedule adjusted to allow time for studying and reduce stress?",
      options: [
        "A. Very well adjusted – Exam timing and any classes are scheduled very considerately (plenty of study time).",
        "B. Fairly well adjusted – The exam period schedule is somewhat reasonable, though it could be better.",
        "C. Not well adjusted – The scheduling during exams is not ideal, leaving limited study or rest time.",
        "D. Not adjusted at all – The exam period schedule is very stressful (exams/classes packed with little time to prepare).",
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
      console.log("Évaluation des horaires terminée", this.answers)

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
