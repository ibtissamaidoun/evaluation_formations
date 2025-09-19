import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"

interface CalendarDay {
  day: number | null
  isCurrentDay: boolean
  hasEvent: boolean
  isToday: boolean
}

interface CalendarEvent {
  day: string
  description: string
}

@Component({
  selector: "app-teacher-calendar",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="calendar-widget">
      <h3>Calendrier</h3>
      
      <div class="calendar-header">
        <button class="nav-button">
          <i class="pi pi-chevron-left"></i>
        </button>
        <h4>Mai 2024</h4>
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
            [class.has-event]="day.hasEvent"
            [class.today]="day.isToday"
          >
            <span *ngIf="day.day">{{ day.day }}</span>
          </div>
        </ng-container>
      </div>
      
      <div class="upcoming-events">
        <div *ngFor="let event of events" class="event">
          <div class="event-date">{{ event.day }}</div>
          <div class="event-description">{{ event.description }}</div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
    .calendar-widget {
      background-color: white;
      border-radius: 8px;
      padding: 1rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    h3 {
      font-size: 1rem;
      font-weight: 600;
      color: #333;
      margin-bottom: 0.75rem;
      margin-top: 0;
    }

    .calendar-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.75rem;
    }

    .calendar-header h4 {
      font-size: 0.9rem;
      font-weight: 500;
      margin: 0;
      color: #333;
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
      margin-bottom: 0.5rem;
    }

    .weekday {
      font-size: 0.7rem;
      font-weight: 500;
      color: #666;
      padding: 0.25rem 0;
    }

    .calendar-days {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 0.15rem;
      margin-bottom: 1rem;
    }

    .calendar-day {
      aspect-ratio: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.75rem;
      border-radius: 50%;
      cursor: pointer;
      position: relative;
    }

    .calendar-day:hover:not(.empty) {
      background-color: #f8f9fa;
    }

    .calendar-day.current {
      background-color: #00695c;
      color: white;
    }

    .calendar-day.today {
      background-color: #00BCD4;
      color: white;
    }

    .calendar-day.has-event::after {
      content: '';
      position: absolute;
      bottom: 1px;
      left: 50%;
      transform: translateX(-50%);
      width: 3px;
      height: 3px;
      background-color: #FFC107;
      border-radius: 50%;
    }

    .calendar-day.empty {
      cursor: default;
    }

    .upcoming-events {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .event {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .event-date {
      width: 24px;
      font-weight: 600;
      color: #00695c;
      font-size: 0.8rem;
    }

    .event-description {
      font-size: 0.8rem;
      color: #333;
    }
    `,
  ],
})
export class TeacherCalendarComponent implements OnInit {
  weekDays = ["Di", "Lu", "Ma", "Me", "Je", "Ve", "Sa"]
  calendarDays: CalendarDay[][] = []

  events: CalendarEvent[] = [
    { day: "09", description: "Évaluation à terminer" },
    { day: "06", description: "Réunion pédagogique" },
    { day: "10", description: "Date limite pour feedback" },
  ]

  ngOnInit() {
    this.generateCalendar()
  }

  generateCalendar() {
    // Generate May 2024 calendar
    const firstDay = new Date(2024, 4, 1).getDay() // 0 = Sunday, 1 = Monday, etc.
    const daysInMonth = 31 // May has 31 days
    const today = 15 // Highlight the 15th as today

    let currentDay = 1
    const calendar: CalendarDay[][] = []

    // Generate 6 weeks (rows)
    for (let week = 0; week < 6; week++) {
      const weekDays: CalendarDay[] = []

      // Generate 7 days (columns)
      for (let day = 0; day < 7; day++) {
        if ((week === 0 && day < firstDay) || currentDay > daysInMonth) {
          // Empty cell
          weekDays.push({
            day: null,
            isCurrentDay: false,
            hasEvent: false,
            isToday: false,
          })
        } else {
          // Day cell
          const hasEvent = this.events.some((event) => Number.parseInt(event.day) === currentDay)
          weekDays.push({
            day: currentDay,
            isCurrentDay: currentDay === today,
            hasEvent: hasEvent,
            isToday: currentDay === today,
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
