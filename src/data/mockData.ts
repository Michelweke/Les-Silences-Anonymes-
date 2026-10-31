import { Book, Thought, UserProfile } from '../types';

export const INITIAL_THOUGHTS: Thought[] = [
  {
    id: 'matin-aujourdhui',
    type: 'morning',
    title: 'PENSÉE DU JOUR',
    subtitle: 'La clarté après la veille',
    date: '2026-10-31',
    scheduledTime: '06:00',
    quote: {
      text: 'Les bontés de l’Éternel ne sont pas épuisées, ses compassions ne sont point à leur terme ; elles se renouvellent chaque matin.',
      author: 'Lamentations 3:22-23',
      source: 'Écritures Saintes'
    },
    greeting: 'Bonjour mon frère, bonjour ma sœur. Rendons grâce à Dieu pour ce souffle de vie nouveau.',
    meditation: 'Chaque matinée est une page vierge offerte par la grâce. Avant que le bruit du monde, les urgences et les sollicitations ne s’imposent à ton esprit, choisis d’accueillir le silence de Dieu. Ce silence n’est ni distance ni oubli : c’est l’espace secret où Dieu prépare ton cœur à porter sa paix. En déposant tes fardeaux dès l’aube, tu permets à Sa lumière de devancer tes pas.',
    application: 'Avant de consulter ton téléphone ou d’entamer ta première tâche, prends 3 minutes pour respirer calmement et confier tes priorités du jour au Seigneur.',
    prayer: 'Seigneur, merci pour ce jour nouveau. Que mon cœur reste attentif à Ta voix douce au milieu du tumulte.',
    blessing: 'Que la grâce du Très-Haut éclaire ta route et garde ton âme dans la sérénité.',
    status: 'published',
    readTimeEstimate: '1 min'
  },
  {
    id: 'soir-aujourdhui',
    type: 'evening',
    title: 'PENSÉE DU SOIR',
    subtitle: 'Déposer les armes au crépuscule',
    date: '2026-10-31',
    scheduledTime: '20:00',
    quote: {
      text: 'Je me couche et je m’endors en paix, car toi seul, ô Éternel ! tu me donnes la sécurité dans ma demeure.',
      author: 'Psaume 4:8',
      source: 'Livre des Psaumes'
    },
    meditation: 'Le soir n’est pas seulement la fin des activités extérieures, c’est le moment sacré où l’âme rend son tablier. Ce qui a été accompli aujourd’hui appartient à la grâce ; ce qui est resté inachevé peut désormais reposer dans la fidélité de Dieu. Ne transporte pas tes combats diurnes dans le sanctuaire de ton repos. Dieu veille pendant que tu dors : fais-Lui confiance pour le lendemain.',
    introspectionQuestion: 'Quel souci ou quelle frustration as-tu encore du mal à remettre entre les mains du Père avant de fermer les yeux ?',
    prayer: 'Père très bon, je Te remets mes victoires et mes limites de ce jour. Apaise mes pensées et purifie mes songes.',
    blessing: 'Passe une nuit paisible, abrité sous l’ombre bienfaisante des ailes du Tout-Puissant.',
    status: 'published',
    readTimeEstimate: '1 min'
  },
  {
    id: 'matin-hier',
    type: 'morning',
    title: 'PENSÉE DU JOUR',
    subtitle: 'La patience dans l’obscurité',
    date: '2026-10-30',
    scheduledTime: '06:00',
    quote: {
      text: 'Ce n’est ni par la puissance ni par la force, mais c’est par mon esprit, dit l’Éternel des armées.',
      author: 'Zacharie 4:6',
      source: 'L’Ancien Testament'
    },
    greeting: 'Paix et grâce à toi en ce matin que le Seigneur a façonné.',
    meditation: 'Lorsque nous nous débattons avec nos seules forces, l’épuisement nous guette toujours. La véritable maturité spirituelle commence quand nous cessons de vouloir tout contrôler pour laisser l’Esprit agir au plus profond de notre faiblesse. Laisse Dieu être Dieu dans chaque détail de ta journée.',
    application: 'Identifie une situation où tu t’obstines par tes propres forces, et formule une prière d’abandon sincère.',
    prayer: 'Seigneur, je dépose mon orgueil et mon agitation. Prends les rênes de mes actions et de mes paroles.',
    blessing: 'Que Sa force se déploie dans ta faiblesse tout au long de cette journée.',
    status: 'published',
    readTimeEstimate: '1 min'
  },
  {
    id: 'soir-hier',
    type: 'evening',
    title: 'PENSÉE DU SOIR',
    subtitle: 'Le baume du pardon',
    date: '2026-10-30',
    scheduledTime: '20:00',
    quote: {
      text: 'Soyez bons les uns envers les autres, compatissants, vous pardonnant réciproquement.',
      author: 'Éphésiens 4:32',
      source: 'Nouveau Testament'
    },
    meditation: 'Dormir avec de la rancœur, c’est inviter une épine dans son oreiller. Le pardon n’est pas un sentiment, c’est une décision spirituelle d’affranchissement. En choisissant de bénir celui qui t’a blessé ou en demandant pardon pour tes propres manquements, tu ouvres grand les écluses de la paix divine sur ton sommeil.',
    introspectionQuestion: 'Y a-t-il quelqu’un à qui tu dois accorder le pardon ce soir pour libérer ton propre cœur ?',
    prayer: 'Jésus, pardonne mes offenses comme je pardonne à ceux qui m’ont offensé. Remplis mon être de Ta douceur.',
    blessing: 'Dors sous la garde des anges, guéri de toute amertume.',
    status: 'published',
    readTimeEstimate: '1 min'
  },
  {
    id: 'matin-demain',
    type: 'morning',
    title: 'PENSÉE DU JOUR',
    subtitle: 'L’ancre de l’espérance',
    date: '2026-11-01',
    scheduledTime: '06:00',
    quote: {
      text: 'Cette espérance, nous la possédons comme une ancre de l’âme, sûre et solide.',
      author: 'Hébreux 6:19',
      source: 'Épîtres apostoliques'
    },
    greeting: 'Que la paix du Christ inonde ton être en ce début de nouveau mois.',
    meditation: 'Les tempêtes de l’existence secouent la barque, mais elles ne peuvent arracher l’ancre plantée dans le roc divin. Ton espérance n’est pas un vœu pieux, mais une certitude ancrée dans la résurrection et la fidélité éternelle de ton Père céleste.',
    application: 'Partage un mot d’encouragement ou un verset avec une personne de ton entourage qui traverse une saison difficile.',
    prayer: 'Garde mon espérance vivante, ô Dieu, par-delà les vents contraires.',
    blessing: 'Que ce jour t’apporte la joie paisible de te savoir aimé sans condition.',
    status: 'scheduled',
    readTimeEstimate: '1 min'
  }
];

export const INITIAL_BOOKS: Book[] = [
  {
    id: 'silence-de-dieu-vol1',
    title: 'Comprendre le silence de Dieu',
    author: 'Frère Emmanuel K.',
    category: 'Comprendre le silence de Dieu',
    shortDescription: 'Un guide pastoral et profond pour ceux qui prient dans la nuit sans entendre de réponse immédiate.',
    fullDescription: 'Pourquoi le ciel semble-t-il parfois d’airain ? Pourquoi Dieu se tait-il lorsque nous crions de détresse ? À travers les écrits bibliques d’Élie, de Job et du Christ au désert, cet ouvrage explore la pédagogie divine du silence. Un texte réconfortant pour transformer l’attente stérile en intimité féconde.',
    coverImage: '/src/assets/images/open_bible_candle_1793440595151.jpg',
    priceXof: 500,
    isFree: false,
    isSubscriptionIncluded: true,
    pageCount: 114,
    publishedYear: 2025,
    featured: true,
    isNew: true,
    sampleExcerpt: 'Le silence de Dieu n’est pas l’absence de Dieu. Lorsque le Créateur fait silence, Il ne s’éloigne pas : Il se penche pour écouter le battement de notre foi épurée...',
    chapters: [
      {
        id: 'chap-1',
        chapterNumber: 1,
        title: 'Chapitre 1 : Le mystère de l’apparente absence',
        content: `Le silence de Dieu n’est pas l’absence de Dieu. Lorsque le Créateur fait silence, Il ne s’éloigne pas : Il se penche pour écouter le battement de notre foi épurée.

Dans notre époque de bruit perpétuel, où chaque message exige une réponse instantanée et où l’impatience gouverne nos relations, le silence nous effraie. Nous le confondons avec le désintérêt, le rejet ou l’abandon. Pourtant, dans l’économie du Royaume des cieux, le silence est l’atelier secret où se forge la véritable confiance.

Regardons le prophète Élie sur la montagne d’Horeb. Il attendait l’Éternel dans le vent impétueux qui déchirait les rochers, mais l’Éternel n’était pas dans le vent. Il L’attendait dans le tremblement de terre, mais l’Éternel n’était pas dans la secousse. Puis vint un murmure doux et léger — une voix de fin silence. C’est là, et là seulement, qu’Élie s’enveloppa le visage dans son manteau.

Si ta vie ressemble aujourd’hui à un désert silencieux, ne fuis pas ce lieu. C’est précisément là que Dieu désire te parler au cœur.`
      },
      {
        id: 'chap-2',
        chapterNumber: 2,
        title: 'Chapitre 2 : La foi qui traverse l’attente',
        content: `Attendre Dieu ne signifie pas croiser les bras dans une résignation passive. L’attente biblique est un acte de haute vigilance spirituelle. 

C’est le veilleur qui scrute l’aurore au cœur de la nuit noire. Il sait que le soleil se lèvera, non pas parce qu’il en voit déjà les lueurs, mais parce que l’ordre du monde en a été ainsi établi par la Parole éternelle.

Lorsque tu pries pour la guérison, pour la réconciliation d’un foyer ou pour une percée financière, et que les jours s’écoulent sans signe visible, rappelle-toi que la graine enfouie sous terre travaille dans le secret le plus total avant de percer la surface. Ce travail invisible est souvent le plus déterminant de toute ton histoire avec Dieu.`
      },
      {
        id: 'chap-3',
        chapterNumber: 3,
        title: 'Chapitre 3 : La paix qui dépasse toute intelligence',
        content: `Quand le silence s’étire, une tentation insidieuse apparaît : combler nous-mêmes le vide par nos propres expédients. C’est l’erreur d’Abraham et de Sara avec Agar. L’impatience humaine produit toujours des fardeaux supplémentaires.

Le Christ à Gethsémané a éprouvé le poids de cette solitude : « Père, s’il est possible, que cette coupe s’éloigne de moi ! Toutefois, non pas ce que je veux, mais ce que tu veux. »

La paix qui surpasse toute intelligence ne naît pas de la disparition soudaine des problèmes, mais de la certitude absolue que notre vie est cachée avec le Christ en Dieu.`
      }
    ]
  },
  {
    id: 'combats-de-nuit',
    title: 'Les combats de nuit : Veiller et triompher',
    author: 'Pasteur David M.',
    category: 'Les combats de nuit',
    shortDescription: 'Armures et prières précises pour surmonter l’angoisse, les insomnies et les assauts de l’ennemi à la tombée du jour.',
    fullDescription: 'La nuit est le terrain privilégié des remises en question, des terreurs nocturnes et des doutes spirituels. Cet ouvrage vous équipe des armes de la foi pour transformer vos nuits d’angoisse en forteresses d’intercession et de paix surnaturelle.',
    coverImage: '/src/assets/images/night_sky_stars_1793440594481.jpg',
    priceXof: 500,
    isFree: false,
    isSubscriptionIncluded: true,
    pageCount: 140,
    publishedYear: 2024,
    featured: true,
    isNew: false,
    sampleExcerpt: 'La nuit n’est pas le territoire des ténèbres lorsque Christ y allume la lampe de Sa Parole. Apprends à déclarer la victoire du Sang de l’Agneau...',
    chapters: [
      {
        id: 'chap-nuit-1',
        chapterNumber: 1,
        title: 'Chapitre 1 : Pourquoi la nuit est un champ de bataille',
        content: `Lorsque le corps est au repos et que l’activité extérieure cesse, les barrières rationnelles s’abaissent. C’est souvent à cette heure que l’adversaire sème les pensées d’accusation, de regret et de peur du lendemain.

Mais la Bible nous enseigne que Dieu donne le repos à ses bien-aimés pendant leur sommeil. La nuit n’appartient pas à la terreur : elle appartient à Celui qui a séparé la lumière des ténèbres.`
      },
      {
        id: 'chap-nuit-2',
        chapterNumber: 2,
        title: 'Chapitre 2 : La louange à minuit',
        content: `Paul et Silas, jetés dans la prison intérieure de Philippes, les pieds liés dans les ceps, ne gémissaient pas. Vers le milieu de la nuit, ils priaient et chantaient les louanges de Dieu, et les autres prisonniers les écoutaient.

Soudain, il se fit un grand tremblement de terre, au point que les fondements de la prison furent ébranlés. Les portes s’ouvrirent et les liens de tous tombèrent. Ta louange à minuit a le pouvoir de briser les chaînes ancestrales et les prisons intérieures.`
      }
    ]
  },
  {
    id: 'connaitre-dieu-intimite',
    title: 'Apprendre à connaître Dieu intimement',
    author: 'Mère Marie-Thérèse',
    category: 'Apprendre à connaître Dieu',
    shortDescription: 'Passer de la foi reçue à la rencontre vivante avec le Père des miséricordes.',
    fullDescription: 'Connaître Dieu ne se résume pas à savoir des choses sur Lui. C’est entrer dans Son sanctuaire, goûter Sa présence et expérimenter au quotidien Sa tendresse inconditionnelle. Un livre fondamental pour tout disciple.',
    coverImage: '/src/assets/images/hero_dawn_light_1793440593712.jpg',
    priceXof: 500,
    isFree: false,
    isSubscriptionIncluded: true,
    pageCount: 168,
    publishedYear: 2025,
    featured: false,
    isNew: true,
    sampleExcerpt: 'L’intimité avec Dieu ne s’achète pas par des formules mécaniques. Elle découle d’un cœur humble qui accepte d’être regardé et aimé...',
    chapters: [
      {
        id: 'chap-conn-1',
        chapterNumber: 1,
        title: 'Chapitre 1 : Le Père qui nous attendait déjà',
        content: `Avant que nous ne cherchions Dieu, c’est Lui qui nous cherchait. Dès le jardin d’Éden, Son cri retentit à travers les âges : « Où es-tu ? »

Ce n’est pas la question d’un juge menaçant, mais celle d’un Père dont l’amour ne peut se résoudre à la séparation. Venir à Lui dans la prière, c’est simplement répondre à cette invitation constante.`
      }
    ]
  },
  {
    id: 'aimer-dieu-de-tout-son-coeur',
    title: 'Apprendre à aimer Dieu de tout son cœur',
    author: 'Pasteur Jean-Marc S.',
    category: 'Apprendre à aimer Dieu',
    shortDescription: 'Découvrir la beauté d’un amour qui engage l’intelligence, la volonté et les émotions.',
    fullDescription: '« Tu aimeras le Seigneur ton Dieu de tout ton cœur, de toute ton âme, de toute ta pensée et de toute ta force. » Comment obéir à ce commandement sans basculer dans le légalisme ? Par la grâce de l’Esprit Saint.',
    coverImage: '/src/assets/images/peaceful_path_1793440595586.jpg',
    priceXof: 500,
    isFree: false,
    isSubscriptionIncluded: true,
    pageCount: 96,
    publishedYear: 2024,
    featured: false,
    isNew: false,
    sampleExcerpt: 'Aimer Dieu, c’est vouloir ce qu’Il veut, trouver sa joie dans Sa joie, et Lui faire confiance même lorsque nous ne comprenons pas...',
    chapters: [
      {
        id: 'chap-aimer-1',
        chapterNumber: 1,
        title: 'Chapitre 1 : L’amour premier',
        content: `Nous L’aimons parce qu’Il nous a aimés le premier. Notre amour pour Dieu n’est que l’écho reconnaissant de Son amour souverain manifesté à la Croix.`
      }
    ]
  },
  {
    id: 'temoignages-afrique-foi',
    title: 'Témoignages de foi : Des ténèbres à la lumière',
    author: 'Collectif Les Silences Anonymes',
    category: 'Témoignages de foi',
    shortDescription: 'Sept récits authentiques de délivrance, de réconciliation et de miracles vécus en Afrique de l’Ouest.',
    fullDescription: 'À Abidjan, Cotonou, Lomé et Dakar, des hommes et des femmes ont vu la main de Dieu intervenir au milieu du désespoir le plus total. Leurs récits édifient et raniment la foi hésitante.',
    coverImage: '/src/assets/images/peaceful_path_1793440595586.jpg',
    priceXof: 500,
    isFree: false,
    isSubscriptionIncluded: true,
    pageCount: 132,
    publishedYear: 2025,
    featured: false,
    isNew: true,
    sampleExcerpt: 'Je n’avais plus de quoi payer le loyer, et ma fille était fiévreuse depuis trois nuits. C’est là que le miracle a commencé...',
    chapters: [
      {
        id: 'chap-tem-1',
        chapterNumber: 1,
        title: 'Témoignage 1 : L’oratoire de Yopougon',
        content: `J’avais perdu mon emploi il y a six mois. Chaque fin de mois devenait un supplice. Un jour, en lisant la pensée des Silences Anonymes, j’ai compris que ma valeur ne dépendait pas de mon salaire mais de mon statut d’enfant de Dieu...`
      }
    ]
  },
  {
    id: 'prieres-et-meditations-guide',
    title: 'Prières et méditations pour les saisons difficiles',
    author: 'Sœur Blandine A.',
    category: 'Prières et méditations',
    shortDescription: 'Cinquante prières structurées pour trouver les mots quand le cœur est lourd.',
    fullDescription: 'Quand les mots nous manquent, ces prières guidées tirées des Psaumes et de la tradition chrétienne soutiennent notre voix défaillante et nous hissent vers le trône de la grâce.',
    coverImage: '/src/assets/images/open_bible_candle_1793440595151.jpg',
    priceXof: 500,
    isFree: true,
    isSubscriptionIncluded: true,
    pageCount: 88,
    publishedYear: 2024,
    featured: false,
    isNew: false,
    sampleExcerpt: 'Seigneur, je n’ai pas de grand discours ce matin. Reçois simplement mon silence et mes larmes comme l’offrande de mon amour...',
    chapters: [
      {
        id: 'chap-priere-1',
        chapterNumber: 1,
        title: 'Prière dans le deuil et l’épreuve',
        content: `Dieu de toute consolation, Toi qui recueilles nos larmes dans Ton outre, viens visiter la solitude de mon cœur affligé. Répands la paix du consolateur sur mes plaies béantes.`
      }
    ]
  },
  {
    id: 'croissance-spirituelle-racines',
    title: 'Croissance spirituelle : Devenir un arbre au bord des eaux',
    author: 'Docteur Paul E.',
    category: 'Croissance spirituelle',
    shortDescription: 'Les disciplines spirituelles secrètes qui produisent du fruit durable en toutes saisons.',
    fullDescription: 'Comment passer de la superficialité spirituelle à un enracinement solide ? Cet ouvrage détaille la méditation de la Parole, le jeûne discret, la communion fraternelle et la générosité comme piliers de la maturité.',
    coverImage: '/src/assets/images/hero_dawn_light_1793440593712.jpg',
    priceXof: 500,
    isFree: false,
    isSubscriptionIncluded: true,
    pageCount: 152,
    publishedYear: 2025,
    featured: false,
    isNew: false,
    sampleExcerpt: 'L’arbre ne pousse pas en faisant du bruit. Ses racines s’étendent dans l’ombre de la terre pour trouver les nappes souterraines...',
    chapters: [
      {
        id: 'chap-croiss-1',
        chapterNumber: 1,
        title: 'Chapitre 1 : Le secret de la sève',
        content: `Il est comme un arbre planté près d’un courant d’eau, qui donne son fruit en sa saison, et dont le feuillage ne se flétrit point. Tout ce qu’il fait lui réussit.`
      }
    ]
  }
];

export const INITIAL_USER: UserProfile = {
  id: 'user-demo-1',
  name: 'Michel',
  email: 'michelweke03@gmail.com',
  city: 'Abidjan',
  country: 'Côte d’Ivoire',
  timezone: 'Africa/Abidjan (GMT+0)',
  morningNotif: {
    enabled: true,
    time: '06:00'
  },
  eveningNotif: {
    enabled: true,
    time: '20:00'
  },
  subscription: {
    active: false,
    expiresAt: null,
    startedAt: null,
    plan: 'monthly'
  },
  purchasedBookIds: ['prieres-et-meditations-guide'],
  favoriteThoughtIds: ['matin-aujourdhui', 'soir-hier'],
  bookmarkedPassages: [
    {
      bookId: 'silence-de-dieu-vol1',
      chapterId: 'chap-1',
      textSnippet: 'Le silence de Dieu n’est pas l’absence de Dieu. Lorsque le Créateur fait silence, Il ne s’éloigne pas...',
      note: 'À relire dans les moments d’attente.',
      date: '2026-10-30'
    }
  ],
  readingProgress: {
    'silence-de-dieu-vol1': {
      chapterId: 'chap-1',
      percentage: 42,
      lastReadAt: '2026-10-31T08:15:00Z'
    }
  }
};
