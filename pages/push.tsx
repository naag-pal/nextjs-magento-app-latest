// 👇️ ts-nocheck ignores all ts errors in the file
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { Button } from '../src/components/UI';

declare global {
  interface Window {
    workbox?: any;
  }
}

const base64ToUint8Array = (base64) => {
  const padding = '='.repeat((4 - (base64.length % 4)) % 4);
  const b64 = (base64 + padding).replace(/-/g, '+').replace(/_/g, '/');

  const rawData = window.atob(b64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

const PushPage = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscription, setSubscription] = useState(null);
  const [registration, setRegistration] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator && window.workbox !== undefined) {
      // run only in browser
      navigator.serviceWorker.ready.then((reg) => {
        reg.pushManager.getSubscription().then((sub) => {
          if (sub && !(sub.expirationTime && Date.now() > sub.expirationTime - 5 * 60 * 1000)) {
            setSubscription(sub);
            setIsSubscribed(true);
          }
        });
        setRegistration(reg);
      });
    }
  }, []);

  const subscribeButtonOnClick = async (event) => {
    event.preventDefault();
    const sub = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: base64ToUint8Array(process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY),
    });
    // TODO: you should call your API to save subscription data on server in order to send web push notification from server
    setSubscription(sub);
    setIsSubscribed(true);
    console.log('web push subscribed!');
    console.log(sub);
  };

  const unsubscribeButtonOnClick = async (event) => {
    event.preventDefault();
    await subscription.unsubscribe();
    // TODO: you should call your API to delete or invalidate subscription data on server
    setSubscription(null);
    setIsSubscribed(false);
    console.log('web push unsubscribed!');
  };

  const sendNotificationButtonOnClick = async (event) => {
    event.preventDefault();
    if (subscription == null) {
      console.error('web push not subscribed');
      return;
    }

    await fetch('/api/notificationMessage', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        subscription,
      }),
    });
  };

  return (
    <>
      <div className="text-center">
        <h1 className="text-lg font-semibold mt-10 mb-10"> Sample Push Notifications</h1>
        <Button onClick={subscribeButtonOnClick} disabled={isSubscribed} className="mx-3">
          Subscribe
        </Button>
        <Button onClick={unsubscribeButtonOnClick} disabled={!isSubscribed} className="mx-3">
          Unsubscribe
        </Button>
        <Button onClick={sendNotificationButtonOnClick} disabled={!isSubscribed} className="mx-3">
          Send Notification
        </Button>
      </div>
    </>
  );
};

export default PushPage;
