import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"

interface CalendarDay {
  day: number | null
  isCurrentDay: boolean
  hasEvent: boolean
  eventType?: string
}

interface CalendarEvent {
  day: number
  description: string
}

@Component({
  selector: "app-calendar",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="widget">
      <h2>Calendrier</h2>
      <div class="calendar-container">
        <div class="calendar-header">
          <div class="calendar-navigation">
            <button class="nav-button">
              <i class="pi pi-chevron-left"></i>
            </button>
            <h3>{{ currentMonth }} {{ currentYear }}</h3>
            <button class="nav-button">
              <i class="pi pi-chevron-right"></i>
            </button>
          </div>
          
          <div class="calendar-weekdays">
            <div *ngFor="let day of weekDays" class="weekday">{{ day }}</div>
          </div>
          
          <div class="calendar-days">
            <ng-container *ngFor="let week of calendarDays">
              <div 
                *ngFor="let day of week" 
                class="calendar-day" 
                [class.current]="day.isCurrentDay" 
                [class.empty]="!day.day"
              >
                <span *ngIf="day.day">{{ day.day }}</span>
              </div>
            </ng-container>
          </div>
        </div>

        <div class="upcoming-events">
          <div *ngFor="let event of events" class="event">
            <div class="event-date">{{ event.day < 10 ? '0' + event.day : event.day }}</div>
            <div class="event-description">{{ event.description }}</div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
    .widget {
      background-color: white;
      border-radius: 8px;
      padding: 1.5rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      height: 100%;
    }

    .widget h2 {
      font-size: 1.2rem;
      font-weight: 600;
      color: #333;
      margin-bottom: 1rem;
    }

    .calendar-container {
      display: flex;
      flex-direction: column;
      height: calc(100% - 3rem);
    }

    .calendar-header {
      flex: 1;
    }

    .calendar-navigation {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;
    }

    .calendar-navigation h3 {
      font-size: 0.9rem;
      font-weight: 500;
      margin: 0;
    }

    .nav-button {
      background: none;
      border: none;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: #333;
      font-size: 0.8rem;
    }

    .nav-button:hover {
      background-color: #f8f9fa;
    }

    .calendar-weekdays {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      text-align: center;
      margin-bottom: 0.3rem;
    }

    .weekday {
      font-size: 0.7rem;
      font-weight: 500;
      color: #666;
    }

    .calendar-days {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 0.15rem;
    }

    .calendar-day {
      aspect-ratio: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.75rem;
      border-radius: 50%;
      cursor: pointer;
    }

    .calendar-day:hover:not(.empty) {
      background-color: #f8f9fa;
    }

    .calendar-day.current {
      background-color: #00695c;
      color: white;
    }

    .calendar-day.empty {
      cursor: default;
    }

    .upcoming-events {
      margin-top: 0.5rem;
      font-size: 0.8rem;
    }

    .event {
      display: flex;
      align-items: center;
      margin-bottom: 0.5rem;
    }

    .event-date {
      width: 24px;
      font-weight: 600;
      color: #00695c;
    }

    .event-description {
      font-size: 0.8rem;
    }
    `,
  ],
})
export class CalendarComponent implements OnInit {
  weekDays = ["Di", "Lu", "Ma", "Me", "Je", "Ve", "Sa"]
  calendarDays: CalendarDay[][] = []
  currentMonth = "Mai"
  currentYear = 2024

  events: CalendarEvent[] = [
    { day: 9, description: "Évaluation à terminer" },
    { day: 6, description: "Réunion pédagogique" },
    { day: 10, description: "Date limite pour feedback" },
  ]

  ngOnInit() {
    this.generateCalendar()
  }

  generateCalendar() {
    // Generate May 2024 calendar
    const firstDay = new Date(2024, 4, 1).getDay() // 0 = Sunday, 1 = Monday, etc.
    const daysInMonth = 31 // May has 31 days

    let currentDay = 1
    const calendar: CalendarDay[][] = []

    // Generate 6 weeks (rows)
    for (let week = 0; week < 6; week++) {
      const weekDays: CalendarDay[] = []

      // Generate 7 days (columns)
      for (let day = 0; day < 7; day++) {
        if ((week === 0 && day < firstDay) || currentDay > daysInMonth) {
          // Empty cell
          weekDays.push({ day: null, isCurrentDay: false, hasEvent: false })
        } else {
          // Day cell
          const hasEvent = this.events.some((event) => event.day === currentDay)
          weekDays.push({
            day: currentDay,
            isCurrentDay: currentDay === 14, // Highlight the 14th
            hasEvent: hasEvent,
          })
          currentDay++
        }
      }

      calendar.push(weekDays)

      // If we've used all days in the month, stop generating weeks
      if (currentDay > daysInMonth) {
        break
      }
    }

    this.calendarDays = calendar
  }
}
