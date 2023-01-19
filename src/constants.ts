import { Idea } from "./types";

export const MAX_CHARACTER_COUNT = 144;

export const dummy_card_data: Idea[] = [
  {
    id: "1",
    title: "Eco-Friendly Cleaning Service",
    description:
      "A cleaning service that uses only environmentally-friendly products and methods.",
    created: new Date("2020-01-01"),
  },
  {
    id: "2",
    title: "Virtual Wardrobe Organizer",
    description:
      "An app that helps users keep track of their clothing inventory, create outfits, and plan their wardrobe.",
    created: new Date("2020-02-22"),
    updated: new Date("2020-02-23"),
  },
  {
    id: "3",
    title: "Smart Grocery List",
    description:
      "An app that generates a grocery list based on a user's dietary restrictions, meal plans, and favorite recipes. Get healthier today!",
    created: new Date("2020-03-11"),
  },
  {
    id: "4",
    title: "Mindful Movement Studio",
    description:
      "A studio that offers a variety of classes that combine physical movement with mindfulness and meditation practices.",
    created: new Date("2020-04-02"),
  },
  {
    id: "5",
    title: "E-Bike Rental Service",
    description:
      "A service that rents electric bikes for daily or weekly use, making it easy for people to try out e-bikes before buying one.",
    created: new Date("2020-05-15"),
    updated: new Date("2020-05-16"),
  },
  {
    id: "6",
    title: "Online Pet Sitting Service",
    description:
      "A service that connects pet owners with pet sitters who can watch their pets remotely via webcam.",
    created: new Date("2020-06-05"),
  },
];
