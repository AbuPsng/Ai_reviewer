import { responseObject } from "@/helpers/responseObject";
import { NextResponse } from "next/server";
import OpenAI from "openai";
const reviews = [
  "Can you offer more vegetarian options on the menu?",
  "Why is the grocery store always out of fresh bananas?",
  "Can the park open earlier for morning joggers?",
  "Why aren’t there more benches in the playground?",
  "Can you add more flavors to the ice cream selection?",
  "Why don’t buses arrive on time during peak hours?",
  "Can the gym offer flexible membership plans?",
  "Why is the library closed on weekends?",
  "Can you make the streetlights brighter at night?",
  "Why isn’t there a recycling bin in the neighborhood?",
  "Can the cafe include non-dairy milk options?",
  "Why does the post office take so long for deliveries?",
  "Can the swimming pool have longer hours on weekends?",
  "Why isn’t there a walking track in the local park?",
  "Can you add more seating in the waiting area?",
  "Why don’t schools include more outdoor activities?",
  "Can you offer discounts for early morning customers?",
  "Why isn’t there a fresh produce market nearby?",
  "Can the bakery add gluten-free bread options?",
  "Why don’t more restaurants have high chairs for kids?",
  "Can the train station have better signage for directions?",
  "Why are there no water fountains in public areas?",
  "Can you plant more trees along the sidewalks?",
  "Why is the parking lot so poorly lit at night?",
  "Can the supermarket restock popular items more quickly?",
  "Why isn’t there a bike rack near the shopping mall?",
  "Can you add a shade over the park swings?",
  "Why is the queue at the pharmacy always so long?",
  "Can the local events be better advertised?",
  "Why don’t restaurants offer smaller portion options?",
  "Can the bus stop have a shelter for rainy days?",
  "Why aren’t there more picnic tables in the park?",
  "Can the laundromat install card payment options?",
  "Why does the ATM run out of cash so often?",
  "Can the grocery store have more organic options?",
  "Why is the community center closed during holidays?",
  "Can the beach have more trash bins along the shore?",
  "Why don’t public restrooms have better maintenance?",
  "Can you add more safety signs on the hiking trails?",
  "Why isn’t there a weekend farmers’ market nearby?",
  "Can the dog park have separate areas for small dogs?",
  "Why don’t more restaurants offer takeout containers?",
  "Can the pharmacy have more staff during busy hours?",
  "Why isn’t there a free yoga class in the community?",
  "Can the local train have an app for live tracking?",
  "Why don’t supermarkets open earlier on weekends?",
  "Can you add a vending machine in the waiting area?",
  "Why is there no bike-sharing service in the city?",
  "Can the car wash offer a monthly membership plan?",
  "Why aren’t there more shaded parking spots?",
  "Can the playground equipment be updated more often?",
  "Why isn’t there a shuttle service to the shopping mall?",
  "Can the movie theater offer healthier snack options?",
  "Why don’t grocery stores have more self-checkout lanes?",
  "Can you provide more seating at the bus terminal?",
  "Why isn’t there a water refill station at the park?",
  "Can the cafe introduce more seasonal drink options?",
  "Why doesn’t the park have a jogging and cycling track?",
  "Can the local bakery offer fresh items later in the day?",
  "Why are there no pet-friendly cafes in the area?",
  "Can the library host more community events for kids?",
  "Why don’t coffee shops have more comfortable seating?",
  "Can the city add more public charging stations?",
  "Why is the parking so expensive in the downtown area?",
  "Can the train station have more escalators or elevators?",
  "Why don’t public pools have adult-only swim hours?",
  "Can you install more bike lanes around the city?",
  "Why aren’t there more discounts for bulk purchases?",
  "Can the local store stock more locally-made products?",
  "Why is the farmer’s market only open once a week?",
  "Can the post office have a self-service kiosk?",
  "Why don’t more restaurants include calorie counts on menus?",
  "Can the community hall host a monthly book exchange?",
  "Why isn’t there a coffee shop closer to the park?",
  "Can the bus service provide free Wi-Fi for passengers?",
  "Why aren’t there more kid-friendly events in the area?",
  "Can the city offer more curbside recycling programs?",
  "Why don’t grocery stores highlight local produce better?",
  "Can the dog park include water fountains for dogs?",
  "Why isn’t there a shuttle to the nearest airport?",
  "Can you offer more training programs at the community center?",
  "Why isn’t there a public garden in the neighborhood?",
  "Can the mall add more seating in common areas?",
  "Why aren’t there more walking tours of the city?",
  "Can the cafe offer reusable cup discounts for regulars?",
  "Why doesn’t the local market have a late-night shopping day?",
  "Can you provide more parking for bicycles at the library?",
  "Why isn’t there a lost and found desk in the mall?",
  "Can the local grocery store add more frozen meal options?",
  "Why don’t supermarkets have a quiet hour for sensitive shoppers?",
  "Can the cinema add more family-friendly movie showings?",
  "Why isn’t there an open gym in the community park?",
  "Can the city offer more curbside recycling programs?",
  "Why don’t grocery stores highlight local produce better?",
  "Can the dog park include water fountains for dogs?",
  "Why isn’t there a shuttle to the nearest airport?",
  "Can you offer more training programs at the community center?",
  "Why isn’t there a public garden in the neighborhood?",
  "Can the mall add more seating in common areas?",
  "Why aren’t there more walking tours of the city?",
  "Can the cafe offer reusable cup discounts for regulars?",
  "Why doesn’t the local market have a late-night shopping day?",
  "Can you provide more parking for bicycles at the library?",
  "Why isn’t there a lost and found desk in the mall?",
  "Can the local grocery store add more frozen meal options?",
  "Why don’t supermarkets have a quiet hour for sensitive shoppers?",
  "Can the cinema add more family-friendly movie showings?",
  "Why isn’t there an open gym in the community park?",
];

export async function GET() {
  try {
    const randomNumber1 = Math.floor(Math.random() * 100);
    const randomNumber2 = Math.floor(Math.random() * 100);
    const randomNumber3 = Math.floor(Math.random() * 100);

    const data = [
      reviews[randomNumber1],
      reviews[randomNumber2],
      reviews[randomNumber3],
    ];

    return responseObject({
      success: true,
      message: "Suggestion fetch successfully",
      statusCode: 200,
      data,
    });
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      const { name, status, headers, message } = error;
      return NextResponse.json(
        {
          name,
          headers,
          message,
        },
        { status }
      );
    } else {
      console.log("Error while taking a messages for ai", error);
    }
  }
}