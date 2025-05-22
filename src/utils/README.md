# Google Analytics 4 Implementation

This document explains the Google Analytics 4 (GA4) implementation in the project.

## Overview

Google Analytics 4 has been integrated into the application to track user interactions and page views. The implementation uses the Google Analytics 4 measurement ID `G-CM9C6BWEET`.

## Files Modified

1. **src/utils/analytics.js** - Contains the core functionality for GA4 integration:
   - `initGA()` - Initializes Google Analytics
   - `trackPageView(path)` - Tracks page views
   - `trackEvent(eventName, eventParams)` - Tracks custom events

2. **src/index.js** - Initializes Google Analytics when the application starts

3. **src/App.js** - Tracks page views when the route changes using the `useEffect` hook in the `AppContent` component

## How It Works

1. When the application starts, the `initGA()` function is called in `index.js`, which adds the Google Analytics script to the document and initializes the dataLayer and gtag function.

2. When the user navigates to a different page, the `trackPageView()` function is called in the `AppContent` component, which sends a page_view event to Google Analytics.

3. Custom events can be tracked using the `trackEvent()` function, which can be imported and used in any component.

## Usage

### Tracking Page Views

Page views are automatically tracked when the route changes. No additional code is needed.

### Tracking Custom Events

To track custom events, import the `trackEvent` function from `utils/analytics.js` and call it with the event name and parameters:

```javascript
import { trackEvent } from '../utils/analytics';

// Track a button click
trackEvent('button_click', { button_name: 'submit' });

// Track a form submission
trackEvent('form_submit', { form_name: 'contact' });
```

## Testing

To verify that Google Analytics is working correctly:

1. Open the application in a web browser
2. Open the browser's developer tools
3. Go to the Network tab
4. Filter for "google-analytics" or "collect"
5. Navigate to different pages and check that requests are being sent to Google Analytics