import { useEffect, useState } from 'react'
import { TodayEvent } from '../../api/api.interface'
import { getAppLogo, getTodayEvents } from '../../api/api'
import moment from 'jalali-moment'
import { EventsDisplay } from './events/eventsDisplay'
import { NewsDisplay } from './news/newsDisplay'
interface Prop {
  currentDate: moment.Moment
}
export function DayEventsComponent({ currentDate }: Prop) {
  const [events, setEvents] = useState<TodayEvent[]>([])
  const [gif, setGif] = useState<string | null>(null)

  useEffect(() => {
    async function fetchEvents() {
      const data = await getTodayEvents()

      const sorted = data.sort((a, b) =>
        a.isHoliday === b.isHoliday ? 0 : a.isHoliday ? -1 : 1
      )
      setEvents(sorted)

      let gif = sorted[0]?.gif || null
      if (!gif) {
        gif = sorted.find((event) => event.gif !== null)?.gif || null
      }

      if (gif) {
        setGif(gif)
      } else {
        getAppLogo().then((logo) => {
          if (logo) {
            setGif(logo)
          }
        })
      }
    }

    fetchEvents()
  }, [currentDate])

  return (
    <div>
      <div className="w-full bg-gray-400 dark:bg-[#a8a8a8] h-0.5 mt-1 sm:invisible xs:invisible h-xs:invisible"></div>
      <div className="flex flex-row-reverse  justify-between p-2 lg:p-0 h-28 sm:invisible xs:invisible h-xs:invisible">
        <div className="flex-col items-end w-72 h-24 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800">
          <div className="px-4 py-2 w-full text-right">
            {<EventsDisplay events={events} />}
            {<NewsDisplay />}
          </div>
        </div>
        <div className="w-2/5 h-full flex items-center pb-px justify-center">
          {<img className="h-16" src={gif} />}
        </div>
      </div>
    </div>
  )
}