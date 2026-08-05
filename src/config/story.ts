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
    subtitle: "Every birthday deserves a little magic.",
    musicTrack: "Baarish Mein Phir - Saahel",
    youtubeId: "BOT2xl1-p6Q",
  },
  scene0: {
    lines: [
      "Every birthday deserves a little magic.",
      "Especially for someone who brings so much quiet warmth into the world.",
      "This is a small journey built just for you, to celebrate who you are."
    ],
    prompt: "Click anywhere to wake the light...",
  },
  scene1: {
    quote: "I'm glad our paths crossed.",
    subtext: "In a world full of noise, finding you gave everything a calm, clear meaning.",
  },
  photoScenes: [
    {
      id: "photo-1",
      photoNumber: 1,
      title: "Rooftop Calm",
      tag: "Memory I",
      image: "/photos/her-photo-1.jpg",
      compliment: "Looking up at the open sky in that yellow saree, carrying a quiet grace that is impossible to miss.",
      feeling: "To be completely honest, finding you feels like one of the best things that could have happened to me. Every single day, I find myself quietly looking at my phone, waiting for your text. In a place where everything often felt repetitive, you came into my life right at the very end and gave my entire BRAC experience a real, genuine meaning that I will carry with me forever.",
      bgType: 1, // Night Sky stars
    },
    {
      id: "photo-2",
      photoNumber: 2,
      title: "Festive Elegance",
      tag: "Memory II",
      image: "/photos/her-photo-2.jpg",
      compliment: "That soft, candid smile of yours in the middle of all the vibrant lights and colors.",
      feeling: "You have this effortless way of bringing warmth and comfort into any conversation without even trying. Even on the busiest or most ordinary days, seeing a message from you instantly brightens everything up. Getting to know you over this past month has been easily the best part of my daily routine.",
      bgType: 2, // Sunrise flower field
    },
    {
      id: "photo-3",
      photoNumber: 3,
      title: "Gentle Walkway",
      tag: "Memory III",
      image: "/photos/her-photo-3.jpg",
      compliment: "Standing along the green garden path in purple, looking so composed and lovely.",
      feeling: "I am genuinely so proud and grateful that our paths crossed when they did. You carry yourself with such quiet grace, kindness, and sincerity. It is rare to meet someone who feels so easy to talk to and so natural to be around—I truly value every small interaction we share.",
      bgType: 3, // Floating particles
    },
    {
      id: "photo-4",
      photoNumber: 4,
      title: "Quiet Elegance",
      tag: "Memory IV",
      image: "/photos/her-photo-4.jpg",
      compliment: "Sitting so poised and thoughtful, carrying an elegance that stays in your mind.",
      feeling: "Looking back, meeting you right towards the end of this chapter made everything feel complete. You brought light, laughter, and a sense of calm into my world. I genuinely hope this birthday gives you as much warmth, happiness, and peace as you have brought into my life.",
      bgType: 4, // Lantern sky
    },
  ] as PhotoSceneConfig[],
  scene2: {
    title: "The Flower Field",
    instruction: "Click on the blooming flowers to uncover the 4 poetic quotes",
    flowers: [
      {
        id: "f1",
        icon: "🌸",
        flowerName: "Wild Rose",
        poemTitle: "I. The Quiet Anchor",
        text: `You are the quiet standard of my heart,
The gentle rhythm when the world grows loud.
We are two shadows tethered from the start,
Drifting above the tempest and the crowd,
Bound by a truth no distance tears apart.`,
      },
      {
        id: "f2",
        icon: "🌺",
        flowerName: "Morning Jasmine",
        poemTitle: "II. The Sudden Spark",
        text: `It began as a spark in a winter chill,
A light that caught when I least looked away.
Now every whisper of yours has the skill
To turn the darkest night into bright day,
And hold the turning universe dead still.`,
      },
      {
        id: "f3",
        icon: "🌷",
        flowerName: "Golden Tulip",
        poemTitle: "III. Everyday Magic",
        text: `Love isn't always found in grand design,
Or spoken loud beneath a starlit sky.
It lives in simple moments, yours and mine,
A silent warmth when weary days pass by,
Where ordinary hours grow divine.`,
      },
      {
        id: "f4",
        icon: "🌼",
        flowerName: "Sunlit Daisy",
        poemTitle: "IV. The Sanctuary",
        text: `I used to think the darkness was my home,
Until your laughter rewrote every wall.
You showed my restless spirit where to roam,
And taught my heavy heart how soft to fall,
Turning the wildest sea into its foam.`,
      },
    ] as FlowerNote[],
  },
  scene4: {
    title: "Sky Lanterns",
    instruction: "Click each of the 3 lanterns to release your wishes with the illustration cards",
    lanterns: [
      {
        id: "l1",
        title: "Wish I",
        wish: "Mashrikaa, if peace had a face, I'd probably find it standing beside me like this.",
        image: "/photos/illustration-1.jpg",
      },
      {
        id: "l2",
        title: "Wish II",
        wish: "The flowers are beautiful... but somehow they're still losing the competition.",
        image: "/photos/illustration-2.jpg",
      },
      {
        id: "l3",
        title: "Wish III",
        wish: "If this is what an ordinary day looks like with you, I can't wait for the extraordinary ones.",
        image: "/photos/illustration-3.jpg",
      },
    ] as LanternWish[],
  },
  scene5: {
    title: "A Letter For You",
    letterLines: [
      "We haven't known each other for very long.",
      "But in this time, you've become the person whose texts I look forward to every single day.",
      "You gave my BRAC life a true, genuine meaning right at the very end.",
      "I am so proud to have found someone as warm and sincere as you.",
      "Happy Birthday.",
      "I hope this year brings you as much quiet happiness as you bring into my world."
    ],
  },
  finale: {
    quote: "You gave my BRAC life a true meaning at the end — and I'm so proud to have found you.",
    birthdayWish: "Happy Birthday ✨",
  },
};
