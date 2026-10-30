import type { ReviewsDict } from '../types';

export const reviewsEn: ReviewsDict = {
  title: 'Client reviews',
  description: 'Client reviews of websites, landing pages, bots and automation. Leave your own review.',
  h1: 'Client reviews',
  lead: 'What clients say about their projects. Reviews appear on the site after moderation.',
  formTitle: 'Leave a review',
  labels: { name: 'Name', company: 'Company', city: 'City', rating: 'Rating', text: 'Review' },
  placeholders: {
    name: 'What should I call you',
    company: 'Company or project name',
    city: 'For example, Almaty',
    text: 'What you liked and what the result was',
  },
  submit: 'Leave a review',
  sending: 'Sending…',
  success: 'Thank you! Your review will appear on the site after moderation.',
  error: 'The review could not be sent. Please try again later or message me on WhatsApp.',
  throttled: 'Too many reviews in a short time. Try again in a few minutes.',
  invalid: 'Please check the form fields.',
  errors: {
    name: 'Enter your name: 2 to 80 characters.',
    company: 'The company name must be 100 characters or fewer.',
    city: 'The city name must be 100 characters or fewer.',
    rating: 'Choose a rating from 1 to 5.',
    text: 'The review must be 10 to 2000 characters.',
  },
  gisLabel: 'Reviews on 2GIS',
  emptyText: 'No reviews yet. Be the first to leave one below.',
  ratingLabel: (rating) => `Rated ${rating} out of 5`,
  all: 'All reviews',
};
