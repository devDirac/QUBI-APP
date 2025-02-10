// Next, we will listen to a private channel for an event
// and update the data on events

import { useCallback, useEffect, useState } from "react"
import { usePrivateChannels } from "./chanel"

// A channel listens to a particular event
// Here is an example event from Laravel when sending notifications

const NOTIFICATION_EVENT ="server.created";

interface INotification {
  id: number,
  content: string
}

/**
 * Our notification channel which notifications
 */

function useNotificationChannel (authUserId: any, onChange: (notification: INotification) => void) {
  const channels = usePrivateChannels(authUserId)
  useEffect(() => {
    
    if (channels) {
      (channels as any).listenToAll((event:any, data:any) => {
        // do what you need to do based on the event name and data
        console.log(event, data)
     });
      channels.listen(NOTIFICATION_EVENT, onChange)
      // same as channels.notification(onChange)
      return () => {
        channels.stopListening(NOTIFICATION_EVENT)
      }
    }
  }, [channels, onChange])
}

export function Notifications({ authUserId }: { authUserId: any }) {
  
  const [notifications, setNotifications] = useState<Array<INotification>>([]);

  const handleNotificationsEvent = useCallback((notification: INotification) => {
    setNotifications( existingNotifications => ([notification].concat(existingNotifications)) )
  },[])

  useNotificationChannel(authUserId, handleNotificationsEvent);
  return (
    <div>
        {notifications.map(e=>{
            return (<li key={e.id}>{e.content}</li>);
        })}
    </div>
  )
}