import { Notifications, Permissions } from 'expo';

import { getScores } from '../services';

export async function prepareNotification() {
    const scores = await getScores();
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);

    if (status === 'granted') {

        if (scores.length === 0) {
            //notificar logo
        } else {

            scores.sort((a, b) => {
                return b.date - a.date
            })

            const score = scores[0];

            const _24hago = 24 * 60 * 60 * 1000;
            const now = Date.now();
            const threshold = (now - _24hago) > score.date;

            const time = new Date();
            time.setHours(time.getHours() + 1);
            time.setMinutes(0);
            time.setSeconds(0);

            if (threshold) {
                Notifications.scheduleLocalNotificationAsync({
                    title: 'Quiz time!',
                    body: "Improve your skills practicing every day!",
                    android: {
                        sound: true,
                        priority: 'max',
                        vibrate: true,
                        sticky: false
                    }
                },
                    {
                        time,
                        repeat: 'day'
                    }
                );
            } else {
                Notifications.cancelAllScheduledNotificationsAsync();
            }

        }
    } else {
        console.log(`Permission denied for Notifications: ${status}`);
    }

}