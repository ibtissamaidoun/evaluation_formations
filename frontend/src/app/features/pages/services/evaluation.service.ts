import { Injectable } from "@angular/core"
import { BehaviorSubject, type Observable } from "rxjs"

export interface EvaluationAnswer {
  questionId: number
  answer: number
}

@Injectable({
  providedIn: "root",
})
export class EvaluationService {
  private answersSubject = new BehaviorSubject<EvaluationAnswer[]>([])

  constructor() {
    // Récupérer les réponses du localStorage si elles existent
    const savedAnswers = localStorage.getItem("courseEvaluationAnswers")
    if (savedAnswers) {
      this.answersSubject.next(JSON.parse(savedAnswers))
    }
  }

  getAnswers(): Observable<EvaluationAnswer[]> {
    return this.answersSubject.asObservable()
  }

  saveAnswer(questionId: number, answer: number): void {
    const currentAnswers = this.answersSubject.value
    const existingAnswerIndex = currentAnswers.findIndex((a) => a.questionId === questionId)

    let newAnswers: EvaluationAnswer[]

    if (existingAnswerIndex !== -1) {
      // Mettre à jour la réponse existante
      newAnswers = [...currentAnswers]
      newAnswers[existingAnswerIndex] = { questionId, answer }
    } else {
      // Ajouter une nouvelle réponse
      newAnswers = [...currentAnswers, { questionId, answer }]
    }

    // Mettre à jour le BehaviorSubject
    this.answersSubject.next(newAnswers)

    // Sauvegarder dans le localStorage
    localStorage.setItem("courseEvaluationAnswers", JSON.stringify(newAnswers))
  }

  clearAnswers(): void {
    this.answersSubject.next([])
    localStorage.removeItem("courseEvaluationAnswers")
  }

  submitEvaluation(): Promise<boolean> {
    // Ici, vous pourriez envoyer les réponses à votre API
    return new Promise((resolve) => {
      // Simuler un appel API
      setTimeout(() => {
        console.log("Évaluation soumise:", this.answersSubject.value)
        this.clearAnswers()
        resolve(true)
      }, 1000)
    })
  }
}
