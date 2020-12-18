import { useState, useEffect } from 'react'
import { 
  Accuracy, 
  requestPermissionsAsync, 
  watchPositionAsync 
} from 'expo-location'

export default (shouldTrack, callback) => {
  const [err, setErr] = useState(null)

  useEffect(() => {
    let subscriber
    const startWatching = async () => {
      try {
        const { granted } = await requestPermissionsAsync();
        if (!granted) {
          console.log("Permissions not granted")
          throw new Error('Location permission not granted');
        }
        subscriber = await watchPositionAsync(
          {
            accuracy: Accuracy.BestForNavigation,
            timeInterval: 1000,
            distanceInterval: 10
          }, 
          callback
        )
      } catch (e) {
        setErr(e);
      }
    };

    if(shouldTrack) {
      startWatching()
    } else {
      if (subscriber) {
        subscriber.remove()
      }
      subscriber = null
    }

    // Return a cleanup function.
    // The next time it's called, is sees we returned a cleanup function.
    // So it calls that first and then runs.
    return () => {
      if (subscriber) {
        subscriber.remove()
      }
    }
  }, [shouldTrack, callback])

  return [err]

}
