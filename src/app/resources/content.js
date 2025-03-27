import { InlineCode } from "@/once-ui/components";

const person = {
  firstName: "MAGI",
  lastName: "ABHISHEKAR",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "WEB DEVELOPER",
  avatar: "/images/myAvatar.jpg",
  location: "Asia/Kolkata", 
  languages: ["HYD"], 
};

const newsletter = {
  display: true,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: (
    <>
      I occasionally write about design, technology, and share thoughts on the intersection of
      creativity and engineering.
    </>
  ),
};

const social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/theabhishekar",
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/theabhishekar-m/",
  },
  {
    name: "X",
    icon: "x",
    link: "https://x.com/theabhishekar?t=7lERznH8gQyEuWaYFewqvA&s=09",
  },
  {
    name: "Email",
    icon: "email",
    link: "mailto:theabhishekar@gmail.com?subject=Website%20Inquiry&body=Hello,%20I%20have%20a%20question...",
  },
];

const home = {
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Hi,I'm Abhishekar</>,
  subline: (
    <>
      I make <InlineCode>full-stack</InlineCode>products that people love, where I craft interative
      <br /> user experiences. After hours, I build my own projects.
    </>
  ),
};


const about = {
  label: "About",
  title: "About me",
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: true,
    link: "mailto:theabhishekar@gmail.com?subject=Website%20Inquiry&body=Hello,%20I%20have%20a%20question...",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        I'm aiming to be product maker (... and full stack developer) currently based in HYD, IND. I'm passionate about building products that help people and make a difference in the world. I'm also a big fan of open source software - which is why almost everything I build is open source! I also love educating others about technology and programming,
        I mainly write code in the T3 Stack
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "ASOCA",
        timeframe: "2023 - Present",
        role: "Jr Web Developer",
        achievements: [
          <>
            Redesigned the UI/UX for the FLY platform, resulting in a 20% increase in user
            engagement and 30% faster load times.
          </>,
          <>
            Spearheaded the integration of AI tools into design workflows, enabling designers to
            iterate 50% faster.
          </>,
        ],
        images: [
          // optional: leave the array empty if you don't want to display images
          {
            src: "/images/projects/project-01/Asoca.png",
            alt: "Once UI Project",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        company: "PRAGNA.AI",
        timeframe: "2024 - Present",
        role: "Lead Developer",
        achievements: [
          <>
            Developed a AI based chartbot for Department of Justice website , which resulted in a 30% growth in platforms, improving
            user experiences consistency by 40%.
          </>,
          <>
            Led a cross-functional team to launch this idea.
          </>,
        ],
        images: [
          {
            src: "/images/projects/project-01/PRAGNA.jpg",
            alt: "Once UI Project",
            width: 16,
            height: 9,
          },],
      },
    ],
  },
  studies: {
    display: true, // set to false to hide this section
    title: "Studies",
    institutions: [
      {
        name: "Vignana Bharathi Institute of Technology",
        description: <>Studing DATA SCIENCE.</>,
      },
      {
        name:"Sri Chaitanya Jr College",
        description: <>Indermediate in Computer Science.</>,
      },
      {
        name: "SETWIN",
        description: <>Studied IoT and Robotics.</>,
      },
    ],
  },
  technical: {
    display: true, // set to false to hide this section
    title: "Technical skills",
    skills: [
      {
        title: "Figma",
        description: <>Able to prototype in Figma with Once UI with unnatural speed.</>,
        images: [
          {
            src: "/images/projects/project-01/cover-02.jpg",
            alt: "Project image",
            width: 16,
            height: 9,
          },
          {
            src: "/images/projects/project-01/cover-03.jpg",
            alt: "Project image",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        title: "Next.js",
        description: <>Building next gen apps with Next.js + Once UI + Supabase.</>,
        // optional: leave the array empty if you don't want to display images
        images: [
          {
            src: "/images/projects/project-01/Commingsoon.jpg",
            alt: "Project image",
            width: 16,
            height: 9,
          },
        ],
      },
    ],
  },
};

const blog = {
  label: "Blog",
  title: "Writing about design and tech...",
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work = {
  label: "Work",
  title: "My projects",
  description: `Design and dev projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const gallery = {
  label: "Gallery",
  title: "My photo gallery",
  description: `A photo collection by ${person.name}`,
  images: [
    {
      src: "/images/gallery/img-01.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-02.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-03.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-04.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-05.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-06.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-07.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-08.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-09.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-10.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-11.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-12.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-13.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-14.jpg",
      alt: "image",
      orientation: "horizontal",
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };
