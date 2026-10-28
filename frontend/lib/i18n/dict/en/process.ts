// How the work goes, 4 steps; chosen by `${category}-${unit}` first, then by category.
import type { Step } from '../types';

const s = (t: string, d: string): Step => ({ t, d });

export const processEn: Record<string, Step[]> = {
  websites: [
    s('Discovery call', 'We talk through your business, your customers and what the site has to do. Everything is online: a video call, WhatsApp or Telegram.'),
    s('Structure and price', 'We agree the list of pages and features, the price and the timeline in a written agreement. 50% is paid upfront.'),
    s('Design and build', 'I build the site in parts and share a preview link, so changes are easy to make while the work is in progress.'),
    s('Launch and handover', 'I publish the site, connect your domain and show you how to edit texts and prices. The remaining 50% is paid after delivery.'),
  ],
  ecommerce: [
    s('Catalog and terms', 'We go through your range, payment and delivery options and where product data comes from: a spreadsheet, 1C or manual entry.'),
    s('Estimate', 'The store features, price and timeline are fixed in a written agreement. 50% is paid upfront.'),
    s('Building the store', 'I set up product cards, the cart and order intake. You check the store on a test link with your own products.'),
    s('Launch', 'I publish the store and show you how to add products and see orders. The remaining 50% is paid after delivery.'),
  ],
  bots: [
    s('Bot scenario', 'We sketch the customer journey together: what the bot asks, what it shows and when it hands the chat over to you.'),
    s('Estimate', 'We agree the buttons, texts, notifications, price and timeline in a written agreement. 50% is paid upfront.'),
    s('Build and test', 'I build the bot and give you test access: you press every button yourself and send me your comments.'),
    s('Launch', 'I connect the bot to your account and notifications and explain how to manage it. The remaining 50% is paid after delivery.'),
  ],
  ai: [
    s('Knowledge base', 'You send prices, terms, addresses and frequent questions. I turn them into the foundation for the assistant\'s answers.'),
    s('Rules and price', 'We agree the tone of the answers, when the assistant calls a human, and the price and timeline. 50% is paid upfront.'),
    s('Setup and review', 'I connect the model to your channel, then we test the answers together on real questions from your customers.'),
    s('Launch', 'I switch the assistant on and show you how to extend the knowledge base. The remaining 50% is paid after delivery.'),
  ],
  automation: [
    s('Process review', 'We look at how leads or data move today, where time is lost and which tools you already use.'),
    s('Diagram and price', 'I draw a diagram of what goes where, then give you a price and timeline. We fix them in the agreement; 50% is paid upfront.'),
    s('Setup', 'I connect the services to each other and test with sample data so that nothing gets lost.'),
    s('Launch and instructions', 'I switch the automation on with real data and hand over short instructions. The remaining 50% is paid after delivery.'),
  ],
  'seo-maps': [
    s('Business details', 'You send the name, address, opening hours, phone numbers and photos. If a card already exists, you give me access or a link.'),
    s('Estimate', 'I describe the scope, price and timeline. We fix them in a written agreement; 50% is paid upfront.'),
    s('Setup', 'I fill in and format the card, or fix the issues found, and then submit it for moderation.'),
    s('Delivery', 'I show you what changed and hand over recommendations. The remaining 50% is paid after delivery. I do not promise search positions.'),
  ],
  'seo-maps-month': [
    s('Audit and goals', 'I review the current state of your site and map cards, and together we define what we want to achieve and for which queries.'),
    s('Monthly plan', 'We fix the list of tasks and the price of the month in a written agreement. The payment routine for each month is agreed in advance.'),
    s('Work', 'I carry out the plan: site fixes, texts, map cards. I do not promise search positions.'),
    s('Report', 'At the end of the month I send a report on what was done and what is planned next. Continuing or stopping is your decision.'),
  ],
  support: [
    s('Describe the task', 'You write what is broken or what has to change and send a link or a screenshot. I need access to the site or hosting.'),
    s('Assessment', 'I look at the site and give you a price and timeline. Small tasks take little time to assess. 50% is paid upfront.'),
    s('The fix', 'I make the changes without breaking anything else and test them on different devices.'),
    s('Delivery', 'I show you the result and describe exactly what was changed. The remaining 50% is paid after delivery.'),
  ],
  'support-month': [
    s('Getting to know the site', 'I get access, review the state of the site and agree which tasks the monthly support covers.'),
    s('Terms', 'We fix the list of tasks and the price of the month in a written agreement. The payment routine for each month is agreed in advance.'),
    s('Work during the month', 'You send tasks in WhatsApp or Telegram, and I fix and update the site.'),
    s('Month summary', 'I send a list of what was done. Support can be continued or stopped for the next month.'),
  ],
  'support-hour': [
    s('Describe the problem', 'You briefly describe what is happening with your computer or program; a screenshot helps.'),
    s('Remote connection', 'We agree a time and connect remotely: a call and screen sharing, only with your permission.'),
    s('The fix', 'I set up, repair or install what is needed and explain what I am doing step by step.'),
    s('Check', 'We make sure everything works, and I give a few short tips to avoid the problem next time. Payment is for the time worked.'),
  ],
  'education-lesson': [
    s('Introduction', 'A short online chat about your goal, your current level and the times that suit you.'),
    s('Lesson plan', 'I build a programme around the goal: topics, order and the approximate number of lessons. The plan can change as we go.'),
    s('Lessons', 'We study online with practice in every lesson. After each lesson you get exercises and notes.'),
    s('Review', 'We regularly check what has worked and discuss the next steps. The payment routine for lessons is agreed in advance.'),
  ],
};
