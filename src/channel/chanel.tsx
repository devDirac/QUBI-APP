import React, { useEffect, useState, useMemo } from "react"
import Echo from "laravel-echo"
import Pusher from "pusher-js"
import env from "react-dotenv";

/**
 * Pusher configuration
 */
const pusherConfig = {
  broadcaster: 'pusher',
  key: '202b5b3a317e8063552d',
  cluster: 'us2',
  wssPort: 6001,
  authEndpoint: `${env.API_URL}/broadcasting/auth`
}


/**
 * Context for Channels
 */
type TChannels = Echo | undefined
export const ChannelsContext = React.createContext<TChannels>(undefined)


/**
 * Channel Context Provider
 */
export function ChannelsProvider({
  children,
  authUser,
  authToken
}: {
  children: React.ReactNode,
  authUser?: any
  authToken?: string
}) {
  const [channels, setChannels] = useState<TChannels>(undefined)
  useEffect(() => {
      const channels:any = getChannels(pusherConfig, authToken,authUser);
      setChannels(channels);
      channels.private(`office-dashboard`).listenToAll((event:any, data:any) => {
   });
      return () => {
         // disconnect from server and reset the channels
         channels.disconnect()
         setChannels(undefined)
      }
  }, [authUser, authToken])
  return (
    <ChannelsContext.Provider value={channels}>
      {children}
    </ChannelsContext.Provider>
  )
}

/**
 * Hook to use the channels provided via context
 */
export function useChannels() {
  const channels = React.useContext(ChannelsContext)
  return channels
}

/**
 * Use private channels
 * It simple return the useChannels with authenticated user bindings
 */ 
export function usePrivateChannels (authUserId: any) {
  const channels = useChannels();
  return useMemo(() => {
    return channels && channels.private("user." + authUserId)
  }, [channels, authUserId])
}
    
/**
 * Get the channels
 */
function getChannels(pusherConfig: any, authToken?: string,authUser?:any) {
  const client = new Pusher(pusherConfig.key, {
    cluster: pusherConfig.cluster,
    forceTLS: true,
    authEndpoint: pusherConfig.authEndpoint,
    auth: authToken ? {
      headers: {
        // pass the authorization token when using private channels
        Authorization: `Bearer ${authToken}`,
      },
    }: undefined,
  })
  const channel = client.subscribe('user');
  channel.bind('server.created', (datas:any)=>{
  });

  const channels = new Echo({
    broadcaster: "pusher",
    client,
  });



  return channels
}