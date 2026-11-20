import heroBanner from '../../assets/images/promo-banner.png';
import './about.css';

type TeamMember = {
  name: string;
  role: string;
  contribution: string;
  github: string;
};

const teamMembers: TeamMember[] = [
  {
    name: 'Yekaterina Alexeyenko',
    role: 'Frontend Developer',
    contribution: 'Developed the product catalog, product cards, and filtering functionality.',
    github: 'https://github.com/YekaterinaAlex',
  },
  {
    name: 'Tatiana Golub',
    role: 'Frontend Developer',
    contribution: 'Responsible for the products list, main page, and shopping cart functionality.',
    github: 'https://github.com/Tatiana-Golub',
  },
];

function createHero(): HTMLElement {
  const hero = document.createElement('section');
  hero.className = 'about__hero';

  const banner = document.createElement('img');
  banner.className = 'about__banner';
  banner.src = heroBanner;
  banner.alt = 'Use promo code SALE10 in your cart and get 10% off';

  hero.append(banner);

  return hero;
}

function createStoreDescription(): HTMLElement {
  const section = document.createElement('section');
  section.className = 'about__intro';

  const eyebrow = document.createElement('p');
  eyebrow.className = 'about__eyebrow';
  eyebrow.textContent = 'OUR STORY';

  const title = document.createElement('h1');
  title.className = 'about__title';
  title.textContent = 'A Little About Us';

  const description = document.createElement('p');
  description.className = 'about__description';
  description.textContent =
    'Candle & Co. is all about bringing warmth and beauty into everyday life. We believe that even the simplest moments deserve a little magic. Explore our collection of thoughtfully selected candles and find something special for your home.';

  section.append(eyebrow, title, description);

  return section;
}

function createTeamCard(member: TeamMember): HTMLElement {
  const card = document.createElement('article');
  card.className = 'team-card';

  const name = document.createElement('h3');
  name.className = 'team-card__name';
  name.textContent = member.name;

  const role = document.createElement('p');
  role.className = 'team-card__role';
  role.textContent = member.role;

  const contribution = document.createElement('p');
  contribution.className = 'team-card__contribution';
  contribution.textContent = member.contribution;

  const github = document.createElement('a');
  github.className = 'team-card__github';
  github.href = member.github;
  github.target = '_blank';
  github.rel = 'noopener noreferrer';
  github.textContent = 'GitHub ↗';
  github.setAttribute('aria-label', `${member.name} GitHub profile`);

  card.append(name, role, contribution, github);

  return card;
}

function createTeamSection(): HTMLElement {
  const section = document.createElement('section');
  section.className = 'team';

  const eyebrow = document.createElement('p');
  eyebrow.className = 'team__eyebrow';
  eyebrow.textContent = 'THE PEOPLE BEHIND THE PROJECT';

  const title = document.createElement('h2');
  title.className = 'team__title';
  title.textContent = 'Meet the Team';

  const subtitle = document.createElement('p');
  subtitle.className = 'team__subtitle';
  subtitle.textContent = 'Two developers, one shared idea.';

  const cards = document.createElement('div');
  cards.className = 'team__cards';

  cards.append(...teamMembers.map(createTeamCard));

  section.append(eyebrow, title, subtitle, cards);

  return section;
}

export function AboutPage(): HTMLElement {
  const section = document.createElement('div');
  section.className = 'about';

  section.append(createHero(), createStoreDescription(), createTeamSection());

  return section;
}
