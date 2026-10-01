export interface PhotoSceneConfig {
  id: string;
  photoNumber: number;
  title: string;
  tag: string;
  image: string;
  compliment: string;
  feeling: string;
  bgType: number; // scene index for canvas background
}

export interface FlowerNote {
  id: string;
  icon: string;
  flowerName: string;
  poemTitle: string;
  text: string;
}

export interface LanternWish {
  id: string;
  wish: string;
  image?: string;
  title?: string;
}

export const STORY_CONFIG = {
  theme: {
    title: "A Small Journey",
    subtitle: "Happy Birthday, Pubu ❤️ Distance changed everything except how much I love you.",
    musicTrack: "Baarish Mein Phir - Saahel",
    youtubeId: "BOT2xl1-p6Q",
  },
  scene0: {
    lines: [
      "Your birthday feels a little different when you’re so far away.",
      "“I never knew how much of my everyday life was actually made up of you until you weren't here anymore.” 🥹❤️",
      "Happy birthday to the sister I wish I could celebrate beside."
    ],
    prompt: "Click anywhere to begin Pubu's journey...",
  },
  scene1: {
    quote: "Distance changed everything except how much I love you.",
    subtext: "You’re far away, but somehow still part of every little thing. I miss you more than I can explain, Pubu. ❤️",
  },
  photoScenes: [
    {
      id: "photo-1",
      photoNumber: 1,
      title: "Learning To Walk Alone",
      tag: "Memory I",
      image: "/photos/sister-photo-1.jpg",
      compliment: "I never realized how many little things I depended on you for until you weren’t here.",
      feeling: "Now I’m learning to call my own Uber, deal with presentations and assignments, figure things out on my own, and handle all those things I always thought I’d have you beside me for. I’m slowly learning to do things alone—not because I want to, but because you’re not here. And honestly, I miss having you to call for every little thing. I miss you more than I can explain, Pubu. ❤️",
      bgType: 1, // Night Sky stars
    },
    {
      id: "photo-2",
      photoNumber: 2,
      title: "My Forever Watch Partner",
      tag: "Memory II",
      image: "/photos/sister-photo-3.jpg",
      compliment: "I miss our little watch-time so much. 🥹",
      feeling: "I miss sitting together and watching İçerde, Halka, The Gift, Siccin, Vincenzo, and Bigg Boss—laughing, getting scared, discussing every scene, and sometimes arguing over what to watch next. 😂 Now I watch things alone, and somehow they just don’t feel the same without you beside me. I never thought I’d miss something as simple as watching a show with you this much. Come back soon, Pubu. I need my watch partner back. ❤️",
      bgType: 2, // Sunrise flower field
    },
    {
      id: "photo-3",
      photoNumber: 3,
      title: "My Unpaid Life Consultant",
      tag: "Memory III",
      image: "/photos/sister-photo-11.jpg",
      compliment: "I miss having my personal Google, my unpaid consultant, and my favourite person in the next room. 😂",
      feeling: "I miss having someone to blame when I can't decide anything. I miss our “just one episode” that somehow became five episodes. I miss pausing the show every two minutes because we had something to discuss. 😂 I miss having my favourite person in the next room. And yes… I even miss your annoying side. Sometimes. VERY rarely. 😂❤️",
      bgType: 3, // Floating particles
    },
    {
      id: "photo-4",
      photoNumber: 4,
      title: "Watching You Build Your Life",
      tag: "Memory IV",
      image: "/photos/sister-photo-4.jpg",
      compliment: "Watching you succeed makes me happier than you know. Still my sister, still my emergency contact. 😂",
      feeling: "Honestly, one of the things I’m happiest about is seeing you earn for yourself. You’ve worked so hard, become independent, and made all of us so, so proud. Watching you build your own life makes me genuinely happy. And I can’t lie… I’m also enjoying the benefits of having a sister who earns now. 😂❤️ And no matter how far away you are, you’ll always be the sister I’ll proudly brag about—and happily spend her money. Keep shining, Pubu. We’re always cheering for you. ❤️",
      bgType: 4, // Lantern sky
    },
  ] as PhotoSceneConfig[],
  scene2: {
    title: "The Flower Field",
    instruction: "Click each blooming flower to uncover a sisterly note",
    flowers: [
      {
        id: "f1",
        icon: "🌸",
        flowerName: "Wild Rose",
        poemTitle: "I. The Missing Pieces",
        text: `I miss our random talks about absolutely nothing.
I miss bothering you whenever I wanted. 😂

Life feels a little incomplete without you here.
Still my sister, still my emergency contact.

I hope you can feel how loved you are,
even from thousands of miles away. ❤️`,
      },
      {
        id: "f2",
        icon: "🌺",
        flowerName: "Morning Jasmine",
        poemTitle: "II. Celebrating From Afar",
        text: `I never thought celebrating your birthday without you would feel this strange.

I wish I could hug you today instead of sending you a birthday video.

One day, we’ll celebrate your birthday together again.
Until then, I’ll celebrate you from here. ❤️`,
      },
      {
        id: "f3",
        icon: "🌷",
        flowerName: "Golden Tulip",
        poemTitle: "III. The Birthday Gift",
        text: `Every year, I’ve always tried to give you something really special for your birthday.
So I’m not going to lie, it feels weird knowing I’m not there to give you your gift this time. 🥹

And honestly, I hate the thought of someone else giving you a better gift than I would. 😂
I know it’s silly, but I’ve always wanted my gift to be your favourite. ❤️`,
      },
      {
        id: "f4",
        icon: "🌼",
        flowerName: "Sunlit Daisy",
        poemTitle: "IV. Proud Of You Always",
        text: `Watching you succeed makes me happier than you know.
You’ve worked so hard, become independent, and made all of us so proud.

Suddenly, birthdays became a little more exciting for all of us.
I love seeing you take care of all of us in your own little ways.

Keep shining, Pubu. We’re always cheering for you. ❤️`,
      },
    ] as FlowerNote[],
  },
  scene4: {
    title: "Sky Lanterns",
    instruction: "Click each of the 5 lanterns to release your wishes with the illustration cards",
    lanterns: [
      {
        id: "l1",
        title: "Wish I",
        wish: "I wish we get many more birthdays to celebrate together, side by side, making the same silly memories we always do. 🥹❤️",
        image: "/photos/wish-cake.jpg",
      },
      {
        id: "l2",
        title: "Wish II",
        wish: "I wish you success in everything you’re working for. May all your hard work take you exactly where you want to be. ✨",
        image: "/photos/illustration-bench.jpg",
      },
      {
        id: "l3",
        title: "Wish III",
        wish: "And most importantly, I wish you always have people who love you, support you, and make you feel at home—no matter how far away you are. Happy birthday, Pubu. I love you and miss you so much. ❤️",
        image: "/photos/illustration-seaside.jpg",
      },
      {
        id: "l4",
        title: "Wish IV",
        wish: "I wish you endless courage, joy, and breakthroughs in your university journey and every new path you take. Keep shining bright and making everyone proud! 🎓✨",
        image: "/photos/illustration-lancashire.jpg",
      },
      {
        id: "l5",
        title: "Wish V",
        wish: "I wish that wherever life leads you, you always carry the warmth, prayers, and unconditional love of family in your heart. You are so deeply cherished. 🏡💖",
        image: "/photos/illustration-family.jpg",
      },
    ] as LanternWish[],
  },
  scene5: {
    title: "A Letter For Pubu",
    letterLines: [
      "I never realized how many little things I depended on you for until you weren’t here.",
      "Now I’m learning to call my own Uber, deal with presentations and assignments, and handle all those things I always thought I’d have you beside me for.",
      "I’m slowly learning to do things alone—not because I want to, but because you’re not here.",
      "And honestly, I miss having you to call for every little thing.",
      "“I never knew how much of my everyday life was actually made up of you until you weren't here anymore.” 🥹",
      "I wish I could hug you today instead of sending you a birthday video.",
      "Your birthday gift is staying safe with me until I can give it to you properly.",
      "Happy Birthday, Pubu. ❤️",
      "No matter how far away you are, I love you and miss you more than words can explain."
    ],
  },
  finale: {
    quote: "One day, we’ll celebrate your birthday together again. Until then, I’ll celebrate you from here. ❤️",
    birthdayWish: "Happy Birthday, Pubu! 🎂✨ May this year bring you endless reasons to smile, peace in your quietest moments, and all the warmth you so effortlessly bring into the world. Distance changed everything except how much I love you. Always cheering for you, from home to wherever life takes you! ❤️",
  },
};
