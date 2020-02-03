import { useState, useEffect } from 'react';
// import { requestPemissionsAsync } from 'expo-location';
import { watchPositionAsync, Accuracy } from 'expo-location';
import * as Permissions from 'expo-permissions';

export default (shouldTrack, callback) => {
    // const [err, setErr] = useState(null);
    const [permissionStatus, setPermissionStatus] = useState(null);
    const [subscriber, setSubscriber] = useState(null);

    const startWatching = async () => {
        // try {
        //     await requestPemissionsAsync();
        // } catch (e) {
        //     setErr(e);
        // }
        const response = await Permissions.askAsync(Permissions.LOCATION);
        setPermissionStatus(response.status);

        const sub = await watchPositionAsync({
            accuracy: Accuracy.BestForNavigation,
            timeInterval: 1000,
            distanceInterval: 10
        },
            callback
        );
        setSubscriber(sub);
    };

    useEffect(() => {
        if (shouldTrack) {
            startWatching();
        } else {
            // stop watching
            subscriber.remove();
            setSubscriber(null);
        }
    }, [shouldTrack]);

    return [permissionStatus];
};