(function () {
  'use strict';

  /* ─── DST (identique à tropicale.js) ─── */

  function lastSundayOfMonth(year, month) {
    var d = new Date(year, month, 0);
    d.setDate(d.getDate() - d.getDay());
    return d.getDate();
  }

  function nthSundayOfMonth(year, month, n) {
    var d = new Date(year, month - 1, 1);
    var dow = d.getDay();
    var firstSun = (dow === 0) ? 1 : 8 - dow;
    return firstSun + (n - 1) * 7;
  }

  function getUTCOffset(year, month, day, tzRule, stdOffset) {
    if (tzRule === 'none') return stdOffset;
    if (tzRule === 'eu' || tzRule === 'uk') {
      if (tzRule === 'eu' && year < 1976) return stdOffset;
      var startDay = lastSundayOfMonth(year, 3);
      var endDay   = lastSundayOfMonth(year, 10);
      var inDST = (month > 3 && month < 10)
               || (month === 3 && day >= startDay)
               || (month === 10 && day < endDay);
      return inDST ? stdOffset + 1 : stdOffset;
    }
    if (tzRule === 'us') {
      var sMonth, sDay, eMonth, eDay;
      if (year >= 2007) {
        sMonth = 3;  sDay = nthSundayOfMonth(year, 3, 2);
        eMonth = 11; eDay = nthSundayOfMonth(year, 11, 1);
      } else {
        sMonth = 4;  sDay = nthSundayOfMonth(year, 4, 1);
        eMonth = 10; eDay = lastSundayOfMonth(year, 10);
      }
      var inDST2 = (month > sMonth && month < eMonth)
                || (month === sMonth && day >= sDay)
                || (month === eMonth && day < eDay);
      return inDST2 ? stdOffset + 1 : stdOffset;
    }
    return stdOffset;
  }

  /* ─── 12 Animaux du Zodiaque Chinois ─── */
  var ANIMAUX = [
    {
      nom: 'Rat', hanzi: '鼠', sym: '🐀', pinyin: 'Shǔ',
      annees: '1924, 1936, 1948, 1960, 1972, 1984, 1996, 2008, 2020',
      mots: 'Ingénieux · Adaptable · Charmant · Stratège',
      personal: "L'intelligence du Rat est de nature aquatique — elle s'insinue partout, contourne les résistances, trouve l'interstice où passer. Ce n'est pas l'intelligence de la démonstration mais celle de l'observation silencieuse, de la mémoire longue et du calcul patient. Ce que vous accumulez n'est jamais anodin : chaque connexion, chaque information, chaque avantage acquis s'intègre dans un réseau intérieur dont vous seul connaissez la carte. Votre croissance exige que vous appreniez à distinguer la prudence juste de la méfiance stérile — l'Eau sait aussi se laisser traverser par la lumière.",
      pro: "Le Rat excelle là où d'autres se perdent : dans les environnements à haute information, les marchés instables, les projets qui demandent à la fois vision stratégique et réactivité tactique. Votre sens du réseau est un capital que peu savent exploiter avec autant de naturel. La difficulté n'est pas de démarrer — vous maîtrisez l'élan — mais de tenir un cap quand la curiosité vous attire vers chaque nouvelle ouverture. La concentration n'est pas une contrainte : c'est le levier qui transforme votre vivacité en réalisations durables.",
      relational: "En lien, vous êtes d'une loyauté discrète mais absolue envers ceux qui ont mérité votre confiance — et cette distinction compte pour vous plus que tout. Vous n'offrez pas votre intérieur facilement : la méfiance initiale n'est pas de la froideur, c'est une forme de respect de la chose précieuse que vous êtes sur le point de partager. Votre défi est de laisser l'autre entrer avant qu'il ait tout prouvé, de consentir à la vulnérabilité comme condition d'un amour véritable plutôt que comme une imprudence à éviter."
    },
    {
      nom: 'Buffle', hanzi: '牛', sym: '🐂', pinyin: 'Niú',
      annees: '1925, 1937, 1949, 1961, 1973, 1985, 1997, 2009, 2021',
      mots: 'Persévérant · Fiable · Patient · Déterminé',
      personal: "La Terre qui constitue votre nature n'est pas inerte — elle est la terre profonde, celle qui soutient sans se montrer, qui nourrit sans réclamer. Votre force est une force de fond, imperceptible aux impatients, décisive dans la durée. Vous n'êtes pas lent : vous êtes méthodique, ce qui est une forme d'intelligence que la société moderne peine à reconnaître à sa juste valeur. Votre zone de croissance est dans l'assouplissement : les cycles naturels incluent la saison du lâcher-prise, et la résistance au mouvement finit par coûter plus cher que l'adaptation.",
      pro: "Là où d'autres peinent à tenir dans la répétition, vous construisez. Votre endurance face aux tâches longues et ingrates est une compétence rare — peut-être la plus rare dans un monde obsédé par l'instantané. Les organisations qui vous accueillent héritent d'une colonne vertébrale. Votre défi professionnel n'est pas l'efficacité — vous en avez plus qu'il n'en faut — mais la capacité à accueillir les méthodes nouvelles sans les percevoir comme une attaque contre ce qui a fonctionné. L'innovation et la rigueur peuvent coexister.",
      relational: "Votre façon d'aimer ressemble à votre façon de travailler : profonde, silencieuse, absolue dans l'engagement une fois pris. Vos proches ne reçoivent peut-être pas de grands discours, mais ils savent que vous serez là. Ce que vous avez à apprivoiser, c'est l'expression — non par obligation mais parce que les êtres que vous aimez ont besoin d'entendre ce que vous ressentez, pas seulement de le vivre. Et parfois, votre soin protecteur peut devenir une forme douce d'étouffement qu'il vous faudra reconnaître avant qu'il crée de la distance."
    },
    {
      nom: 'Tigre', hanzi: '虎', sym: '🐅', pinyin: 'Hǔ',
      annees: '1926, 1938, 1950, 1962, 1974, 1986, 1998, 2010, 2022',
      mots: 'Courageux · Charismatique · Passionné · Leader',
      personal: "Le Bois du Tigre est le bois jeune — celui qui monte vite, qui cherche la lumière avec une urgence presque physique. Vous portez une vitalité qui peut déconcerter ceux qui vous entourent, une présence qui occupe l'espace sans en avoir toujours conscience. Votre courage est réel et non performé : là où d'autres calculent les risques, vous avancez parce que rester immobile vous est insupportable. La leçon de la maturité pour vous est celle de la patience stratégique — non comme renoncement, mais comme art de choisir le bon moment pour votre élan naturel.",
      pro: "Les environnements en transformation, les rôles de pionnier, les situations de crise où votre résolution est un phare : voilà votre terrain. Vous avez une capacité à inspirer qui ne s'enseigne pas, et les équipes autour de vous le sentent. La difficulté vient dans les phases longues, administratives, répétitives — celles qui demandent la rigueur tranquille du Buffle plutôt que la fougue du Tigre. Cultiver ce second registre sans trahir le premier est votre défi professionnel le plus formateur.",
      relational: "En amour, vous êtes entier, généreux jusqu'à l'excès, et vous aimez avec une intensité qui peut intimider autant qu'elle attire. Vous cherchez un partenaire à votre hauteur — quelqu'un qui n'est pas écrasé par votre présence mais qui sait aussi tenir la sienne. Ce que vous avez à travailler, c'est l'alternance des rôles : laisser l'autre prendre la scène sans y voir une rivalité, reconnaître que la lumière partagée brille plus longtemps que celle que vous tenez seul."
    },
    {
      nom: 'Lapin', hanzi: '兔', sym: '🐇', pinyin: 'Tù',
      annees: '1927, 1939, 1951, 1963, 1975, 1987, 1999, 2011, 2023',
      mots: 'Diplomate · Sensible · Raffiné · Intuitif',
      personal: "Le Bois du Lapin est celui de la plante qui pousse doucement mais sûrement — moins spectaculaire que le Tigre, mais d'une persistance remarquable. Vous percevez les atmosphères avant même que les mots soient prononcés, vous sentez les tensions sous-jacentes que d'autres ne remarqueront qu'au moment de la crise. Cette acuité est un don et une charge. Votre raffinement esthétique n'est pas superficiel : il est le signe d'une intelligence sensible qui traite le monde en nuances là où d'autres ne voient que des contrastes. Votre travail intérieur est d'apprendre que l'harmonie véritable supporte parfois le frottement.",
      pro: "Dans les environnements de négociation, de création, de communication ou de conseil, votre finesse est un atout décisif. Vous savez lire les non-dits, ajuster le ton, trouver la formulation qui dénoue. Votre difficulté est le risque calculé : votre prudence naturelle peut vous faire passer à côté d'opportunités qui nécessitent une prise d'élan rapide. Apprendre à distinguer le risque insensé du risque fécond est une compétence que vous pouvez développer — et qui changera votre trajectoire.",
      relational: "Vous offrez une tendresse qui enveloppe sans envahir, une écoute qui fait sentir à l'autre qu'il existe pleinement. Le romantisme n'est pas pour vous une posture mais un langage naturel. Ce que vous avez à apprivoiser, c'est votre propre intérieur : la tendance à absorber les émotions des autres au point d'oublier les vôtres, la politesse qui diffère des vérités nécessaires. Un lien véritable peut tenir la vérité — parfois, il en a besoin pour durer."
    },
    {
      nom: 'Dragon', hanzi: '龙', sym: '🐉', pinyin: 'Lóng',
      annees: '1928, 1940, 1952, 1964, 1976, 1988, 2000, 2012, 2024',
      mots: 'Ambitieux · Visionnaire · Magnétique · Puissant',
      personal: "La Terre du Dragon n'est pas la terre patiente du Buffle ou de la Chèvre — c'est la terre volcanique, celle qui a traversé le feu et en porte la mémoire. Vous avez une vision naturelle du monde qui dépasse les cadres ordinaires : là où d'autres voient ce qui est, vous voyez ce qui pourrait être. Ce don visionnaire est votre signature. Votre défi est d'habiter cette grandeur sans qu'elle devienne une prison d'attentes démesurées — à votre égard d'abord, envers les autres ensuite. La vulnérabilité n'est pas l'ennemi du magnétisme : elle en est la profondeur.",
      pro: "Entrepreneur dans l'âme, vous êtes à l'aise dans les rôles de créateur, de visionnaire, de fondateur. Vos idées ont une ampleur qui inspire, et votre enthousiasme est contagieux à un point que vous sous-estimez. Le défi n'est pas de démarrer — c'est de déléguer avec confiance, d'accepter que d'autres puissent réaliser ce que vous avez imaginé sans que cela diminue votre apport. Le Dragon qui sait s'entourer devient un multiplicateur ; celui qui veut tout tenir seul s'épuise.",
      relational: "Vous aimez avec une générosité royale et une intensité qui fait de chaque relation une expérience unique. Ce que vous cherchez, c'est un partenaire qui admire votre force sans en être dominé — quelqu'un qui peut vous tenir tête avec douceur. Votre apprentissage le plus profond en amour est celui de la perfectibilité : accepter que l'autre soit imparfait, que vous le soyez aussi, et que c'est précisément dans cet espace d'imperfection partagée que naît l'amour le plus durable."
    },
    {
      nom: 'Serpent', hanzi: '蛇', sym: '🐍', pinyin: 'Shé',
      annees: '1929, 1941, 1953, 1965, 1977, 1989, 2001, 2013, 2025',
      mots: 'Sage · Intuitif · Mystérieux · Profond',
      personal: "Le Feu du Serpent est un feu intérieur — contenu, concentré, discret. Là où le Cheval brûle ouvertement, vous gardez la flamme en vous, et c'est de là que vient votre fascination naturelle sur les autres. Votre intuition est l'une des plus fines du zodiaque : vous lisez les gens, les situations, les non-dits avec une précision qui peut déconcerter. Cette intelligence profonde mérite d'être au service de quelque chose de grand. Votre travail intérieur passe par la méfiance — non pas pour la supprimer mais pour la mettre à sa juste place, comme discernement plutôt que comme barrage.",
      pro: "Chercheur, thérapeute, stratège, artiste, financier — partout où la profondeur d'analyse et la vision à long terme sont valorisées, vous excellez naturellement. Votre discrétion est un outil professionnel : vous observez, vous comprenez, vous agissez au bon moment avec une économie de moyens remarquable. Ce que vous avez à développer, c'est la transmission : partager votre savoir plutôt que le garder comme un pouvoir. Le Serpent qui enseigne devient une force bien plus grande que celui qui protège jalousement ses secrets.",
      relational: "Vous aimez avec une exclusivité et une profondeur qui peuvent être à la fois un don et un fardeau pour l'autre. Votre dévotion est totale — et votre sensualité subtile crée des liens d'une intensité rare. Mais cette intensité porte aussi le risque de la possession : confondre l'amour avec la fusion, la fidélité avec la surveillance. Le défi est d'aimer sans vouloir contenir, de faire confiance sans cesser de sentir — un équilibre exigeant mais libérateur pour les deux."
    },
    {
      nom: 'Cheval', hanzi: '马', sym: '🐎', pinyin: 'Mǎ',
      annees: '1930, 1942, 1954, 1966, 1978, 1990, 2002, 2014, 2026',
      mots: 'Libre · Énergique · Passionné · Aventurier',
      personal: "Le Feu du Cheval est expansif, joyeux, impatient de se répandre. Vous avez un rapport à la vie qui ressemble à un galop : plein, direct, engagé avec une totalité qui force l'admiration. Les grands espaces ne sont pas pour vous un luxe mais une nécessité physiologique — intérieure autant qu'extérieure. Votre apprentissage le plus profond est celui de la profondeur dans la durée : découvrir que la liberté la plus riche n'est pas celle de ne jamais s'arrêter, mais celle de choisir consciemment où planter les sabots.",
      pro: "Dans la vente, le marketing, l'entrepreneuriat, la politique, le journalisme de terrain — partout où l'énergie communicative et l'adaptabilité sont des ressources directes — vous êtes dans votre élément. Votre enthousiasme ouvre les portes que d'autres mettraient des années à franchir. La discipline administrative, la rigueur des phases longues, la persévérance dans les moments sans éclat : voilà les muscles que vous avez à développer pour que votre feu produise des résultats durables plutôt que de belles flambées.",
      relational: "En amour, vous aimez avec une passion qui peut être fulgurante — et qui demande un partenaire capable de la tenir sans s'y consumer. Vous cherchez une complicité vivante, une relation qui bouge, qui surprend, qui respecte votre besoin de respirer. Ce que vous avez à apprendre, c'est que l'engagement profond n'est pas une cage mais une ancre librement choisie — et que ce choix répété chaque jour est peut-être la forme de liberté la plus courageuse qui soit."
    },
    {
      nom: 'Chèvre', hanzi: '羊', sym: '🐑', pinyin: 'Yáng',
      annees: '1931, 1943, 1955, 1967, 1979, 1991, 2003, 2015, 2027',
      mots: 'Créatif · Doux · Altruiste · Artistique',
      personal: "La Terre de la Chèvre est la terre nourricière, celle du jardin plutôt que du champ : elle produit la beauté, les herbes aromatiques, les formes délicates qui donnent sens et douceur à la vie. Votre sensibilité artistique n'est pas une fragilité — c'est une intelligence du monde qui perçoit ce que les esprits purement rationnels manquent. Vous avez une capacité à créer de la beauté et de l'harmonie là où il n'y en avait pas, et cela a une valeur immense. Votre défi est d'arrêter de vous excuser d'être ce que vous êtes, et de construire une confiance en soi qui vient de l'intérieur plutôt que de la validation des autres.",
      pro: "Dans les métiers créatifs, humanitaires, soignants ou pédagogiques, votre générosité naturelle et votre sens esthétique sont vos ressources les plus précieuses. Vous inspirez confiance et douceur dans les environnements qui en manquent. Votre zone de croissance est économique : apprendre à valoriser votre travail, à fixer des limites claires, à ne pas confondre générosité et sacrifice de soi. Le talent sans stratégie s'épuise — la Chèvre qui apprend à protéger son pré devient bien plus puissante.",
      relational: "Vous aimez en prenant soin, en offrant, en anticipant les besoins de l'autre avec une intuition remarquable. Ce soin est un langage d'amour authentique. Ce que vous avez à apprendre, c'est de l'articuler : dire ce dont vous avez besoin, non comme une exigence mais comme un partage. L'attente silencieuse que l'autre devine finit par créer de la déception des deux côtés. Exprimer votre vulnérabilité est un acte de confiance — et la confiance est ce qui permet à l'amour de durer."
    },
    {
      nom: 'Singe', hanzi: '猴', sym: '🐒', pinyin: 'Hóu',
      annees: '1932, 1944, 1956, 1968, 1980, 1992, 2004, 2016, 2028',
      mots: 'Inventif · Curieux · Espiègle · Polyvalent',
      personal: "Le Métal du Singe est le métal brillant, celui qui réfléchit tout, qui s'adapte à toutes les formes sans perdre sa nature essentielle. Votre intelligence est une intelligence de la multiplicité : vous êtes à l'aise dans la complexité, vous maîtrisez les changements de registre, vous apprenez vite et vous vous ennuyez encore plus vite. Cette vivacité est précieuse. Votre travail intérieur est celui de la profondeur — non pas de vous forcer à la lenteur, mais d'aller au bout de quelques choses choisies avec discernement plutôt que d'effleurer tout ce qui brille.",
      pro: "Dans la technologie, la communication, les arts de la scène, le business innovant, la recherche multidisciplinaire — partout où la polyvalence est une ressource — vous êtes redoutable. Votre capacité à apprendre de nouveaux langages, à innover, à trouver des solutions créatives là où les autres stagnent est un avantage compétitif rare. Ce que vous avez à construire, c'est la réputation de fiabilité : montrer que vous allez au bout, que votre éclat n'est pas superficiel mais engage une réelle profondeur.",
      relational: "Vous êtes un partenaire stimulant, joueur, affectueux à votre façon — une façon qui demande à l'autre une certaine liberté de ton et de rythme. Vous avez besoin d'être surpris, intellectuellement nourri, jamais ennuyé. Ce que vous avez à développer, c'est la constance affective : la capacité à tenir une présence émotionnelle dans les moments ordinaires, sans briller, sans jeu, avec simplement la solidité d'un engagement qui dure même quand ce n'est pas excitant."
    },
    {
      nom: 'Coq', hanzi: '鸡', sym: '🐓', pinyin: 'Jī',
      annees: '1933, 1945, 1957, 1969, 1981, 1993, 2005, 2017, 2029',
      mots: 'Méthodique · Perfectionniste · Loyal · Courageux',
      personal: "Le Métal du Coq est le métal ciselé, celui de l'orfèvre et du chirurgien — précis, exigeant, refusant le flou. Vous avez une capacité d'analyse et un sens du détail qui vous permettent de voir ce que les autres ratent, d'identifier la faille là où personne ne regardait. Cette acuité est votre signature. Votre défi est d'en faire un outil de service plutôt qu'un juge impitoyable — sur les autres d'abord, sur vous-même surtout. Le perfectionnisme qui ne sait pas s'arrêter se retourne contre celui qui l'exerce.",
      pro: "Dans tous les métiers exigeant précision, méthode, qualité de présentation et rigueur analytique, vous êtes sans égal. Votre exigence garantit un résultat dont vous pouvez être fier, et elle élève le niveau de ceux qui vous entourent. Votre défi professionnel est la délégation : accepter que quelqu'un fasse les choses différemment de vous sans que cela soit inférieur, reconnaître que la perfection attendue des autres démobilise là où votre excellence personnelle était censée inspirer.",
      relational: "Votre loyauté est absolue, votre engagement sans faille, votre soutien concret dans les épreuves. Ce sont des qualités rares que vos proches reconnaissent profondément. Ce que vous avez à apprivoiser, c'est la douceur dans l'expression de vos observations : votre regard acéré, précieux dans tant de contextes, peut blesser là où il cherchait à améliorer. L'amour a besoin d'être regardé avec l'œil de la grâce, pas seulement de l'exactitude."
    },
    {
      nom: 'Chien', hanzi: '狗', sym: '🐕', pinyin: 'Gǒu',
      annees: '1934, 1946, 1958, 1970, 1982, 1994, 2006, 2018, 2030',
      mots: 'Fidèle · Honnête · Généreux · Juste',
      personal: "La Terre du Chien est la terre gardée, celle qui délimite et protège — non par peur mais par sens aigu de ce qui est juste et de ce qui mérite d'être défendu. Vous portez un sens moral qui n'est pas rigidité mais boussole intérieure : vous savez instinctivement ce qui est juste, et cette clarté vous distingue. Votre défi est de ne pas transformer cette vigilance éthique en anxiété généralisée, de ne pas passer votre vie à veiller sur les autres au point d'oublier de vous occuper de vous-même avec la même qualité d'attention.",
      pro: "Dans les rôles de conseiller, d'avocat, de défenseur, de soignant ou de travailleur social, vous êtes dans votre élément naturel. Votre dévouement est total et votre loyauté envers vos engagements est une ressource professionnelle rare. Ce que vous avez à développer, c'est la capacité à faire valoir votre travail avec la même énergie que vous mettez à servir : savoir vous défendre, négocier, exiger la reconnaissance que vous méritez sans attendre que quelqu'un vous y autorise.",
      relational: "Vous offrez à vos proches une fidélité et une honnêteté qui constituent les fondements d'une union durable. Votre présence dans les moments difficiles est d'une valeur inestimable. Ce que vous avez à apprivoiser, c'est la réception : laisser entrer l'amour de l'autre sans l'accueillir avec méfiance, accepter d'être soutenu, de ne pas toujours avoir à être le rocher. La vulnérabilité partagée n'affaiblit pas le lien — elle le rend vivant."
    },
    {
      nom: 'Cochon', hanzi: '猪', sym: '🐖', pinyin: 'Zhū',
      annees: '1935, 1947, 1959, 1971, 1983, 1995, 2007, 2019, 2031',
      mots: 'Généreux · Sincère · Optimiste · Bienveillant',
      personal: "L'Eau du Cochon est l'eau de source — claire, généreuse, disponible. Vous avez une bonhomie naturelle et un optimisme qui ne sont pas naïfs mais fondamentaux : vous croyez au bien dans les gens, et cette croyance crée souvent autour de vous une atmosphère de confiance que les autres ne savent pas toujours produire. Votre défi est de développer un discernement qui n'altère pas votre ouverture mais vous protège des prédateurs de bonne foi, de ceux qui prennent sans donner et que votre générosité attire irrésistiblement.",
      pro: "Dans les secteurs du bien-être, de la gastronomie, de l'hôtellerie, de la médecine, de l'éducation ou de toute activité centrée sur la qualité de vie des autres, vous vous épanouissez naturellement. Votre générosité inspire confiance et fidélité. Ce que vous avez à renforcer, c'est votre sens des affaires : apprendre à valoriser votre offre, à dire non sans culpabilité, à protéger vos ressources comme conditions de durabilité de votre service — vous ne pouvez donner que si vous prenez soin de ce qui vous permet de donner.",
      relational: "Vous aimez avec une générosité et une tendresse qui débordent naturellement — l'autre se sent accueilli, nourri, en sécurité. Votre sincérité totale est un don rare dans un monde où beaucoup calculent. Ce que vous avez à développer, c'est un regard lucide sur l'autre : votre tendance à idéaliser peut vous rendre aveugle aux signaux importants. Aimer avec les yeux ouverts n'est pas aimer moins — c'est aimer avec plus de sagesse et de durabilité."
    }
  ];

  /* ─── 5 Éléments ─── */
  var ELEMENTS = [
    {
      nom: 'Bois', hanzi: '木', sym: '🌿', pinyin: 'Mù',
      couleur: 'var(--emerald)',
      annees: 'Terminant en 4 ou 5',
      mots: 'Croissance · Créativité · Générosité · Expansion',
      personal: "L'élément Bois insuffle à votre personnalité une énergie de croissance, d'ouverture et de renouveau permanent. Comme un arbre qui s'étend vers la lumière tout en ancrant ses racines, vous avez un talent naturel pour vous développer tout en restant connecté à vos valeurs profondes. Votre défi est de ne pas vous disperser en voulant croître dans toutes les directions à la fois.",
      pro: "Le Bois favorise les vocations créatives, humanitaires et éducatives. Votre vision à long terme, votre générosité d'idées et votre capacité à faire germer des projets novateurs sont vos atouts professionnels. Vous excellez dans tout ce qui touche à la planification stratégique, aux arts vivants ou aux métiers du développement humain.",
      relational: "En relation, vous apportez une générosité du cœur et une ouverture d'esprit qui enrichissent le lien. Vous cherchez à grandir avec l'autre et à partager une vision commune de l'avenir. Votre défi est de ne pas devenir trop idéaliste dans vos attentes et de nourrir la relation concrètement au quotidien."
    },
    {
      nom: 'Feu', hanzi: '火', sym: '🔥', pinyin: 'Huǒ',
      couleur: 'var(--rose)',
      annees: 'Terminant en 6 ou 7',
      mots: 'Passion · Leadership · Éclat · Dynamisme',
      personal: "L'élément Feu vous dote d'une vitalité ardente, d'un charisme naturel et d'un enthousiasme communicatif qui éclaire votre entourage. Vous êtes animé d'une passion sincère pour la vie et les idées. Votre défi est de maîtriser votre intensité pour éviter de vous consumer ou de brûler les ponts dans vos élans d'impatience.",
      pro: "Le Feu favorise les rôles de leader, d'entrepreneur et de visionnaire. Votre capacité à inspirer, à motiver et à créer de l'enthousiasme autour de vos projets est votre principale ressource professionnelle. Vous brillez dans la communication, la performance, la direction et toute activité où votre rayonnement est un moteur de résultats.",
      relational: "En amour, vous aimez avec une intensité et une chaleur qui réchauffent le cœur de l'autre. Votre générosité émotionnelle et votre capacité à créer des moments inoubliables font de vous un partenaire mémorable. Votre défi est de laisser l'autre avoir ses propres espaces de silence et de fraîcheur, sans y voir un manque d'intérêt."
    },
    {
      nom: 'Terre', hanzi: '土', sym: '🌍', pinyin: 'Tǔ',
      couleur: 'var(--gold)',
      annees: 'Terminant en 8 ou 9',
      mots: 'Stabilité · Prudence · Fiabilité · Ancrage',
      personal: "L'élément Terre vous confère une solidité intérieure rare, un sens des réalités pragmatique et une capacité à rester calme dans les turbulences. Vous êtes l'ancre naturelle de votre entourage. Votre défi est d'éviter que votre sagesse pratique ne devienne conservatisme excessif, et de vous autoriser à rêver et à expérimenter au-delà de ce qui est sûr.",
      pro: "La Terre favorise les carrières dans l'immobilier, la finance, l'administration, la gestion patrimoniale ou tout métier ancré dans la durée et la solidité. Votre sens de l'organisation, votre fiabilité et votre prudence naturelle font de vous un pilier. Votre défi professionnel est d'oser l'innovation et d'accepter que la prise de risque calculée fait partie de la réussite.",
      relational: "En relation, vous offrez une sécurité émotionnelle et matérielle précieuse et un engagement solide dans la durée. Votre partenaire peut compter sur votre présence et votre soutien concret. Votre défi est d'exprimer davantage vos sentiments profonds et de cultiver la spontanéité pour nourrir la vivacité du lien."
    },
    {
      nom: 'Métal', hanzi: '金', sym: '⚙️', pinyin: 'Jīn',
      couleur: 'var(--slate)',
      annees: 'Terminant en 0 ou 1',
      mots: 'Précision · Discipline · Force · Intégrité',
      personal: "L'élément Métal vous dote d'une rigueur intérieure, d'une volonté d'acier et d'un sens de l'intégrité qui forge le respect. Vous avez la capacité de transformer la pression en excellence. Votre défi est d'assouplir un perfectionnisme qui peut se retourner contre vous, et d'apprendre à reconnaître vos réussites sans attendre la perfection absolue.",
      pro: "Le Métal favorise les métiers de précision, de justice, de finance ou de technologie avancée. Votre capacité à couper dans les excès, à maintenir un cap sous pression et à livrer un travail d'une qualité irréprochable est votre signature professionnelle. Votre défi est de développer votre intelligence émotionnelle pour travailler de façon harmonieuse avec des collaborateurs plus sensibles.",
      relational: "En amour, vous êtes loyal, direct et d'une honnêteté absolue avec votre partenaire. Votre engagement est total et vos principes clairement exprimés. Votre défi est d'adoucir votre exigence naturelle et de cultiver la tendresse spontanée, car l'amour se nourrit aussi de douceur et d'imperfection partagée."
    },
    {
      nom: 'Eau', hanzi: '水', sym: '💧', pinyin: 'Shuǐ',
      couleur: 'var(--cyan)',
      annees: 'Terminant en 2 ou 3',
      mots: 'Intuition · Fluidité · Profondeur · Sagesse',
      personal: "L'élément Eau vous investit d'une intuition profonde, d'une intelligence émotionnelle raffinée et d'une capacité à vous adapter avec fluidité aux circonstances. Comme l'eau qui contourne les obstacles, vous trouvez toujours un chemin. Votre défi est de ne pas vous laisser submerger par les émotions des autres ni par vos propres profondeurs intérieures au point de perdre votre direction.",
      pro: "L'Eau favorise les vocations liées à la psychologie, à la philosophie, à la recherche, à la diplomatie ou aux arts. Votre capacité d'écoute, votre intelligence d'analyse et votre sensibilité aux dynamiques humaines font de vous un conseiller ou un créateur de haut vol. Votre défi est d'oser vous engager avec clarté et assertivité quand la situation l'exige.",
      relational: "En amour, vous offrez une compréhension émotionnelle profonde et une empathie naturelle qui crée des connexions intimes rares. Votre sensibilité et votre capacité à ressentir l'autre dans ses nuances les plus fines vous rendent précieux. Votre défi est de ne pas vous dissoudre dans la relation et de maintenir un espace intérieur qui n'appartient qu'à vous."
    }
  ];

  /* ─── Dates du Nouvel An Chinois ─── */
  var CNY_DATES = {
    1924:[2,5],1925:[1,24],1926:[2,13],1927:[2,2],1928:[1,23],1929:[2,10],
    1930:[1,30],1931:[2,17],1932:[2,6],1933:[1,26],1934:[2,14],1935:[2,4],
    1936:[1,24],1937:[2,11],1938:[1,31],1939:[2,19],1940:[2,8],1941:[1,27],
    1942:[2,15],1943:[2,5],1944:[1,25],1945:[2,13],1946:[2,2],1947:[1,22],
    1948:[2,10],1949:[1,29],1950:[2,17],1951:[2,6],1952:[1,27],1953:[2,14],
    1954:[2,3],1955:[1,24],1956:[2,12],1957:[1,31],1958:[2,18],1959:[2,8],
    1960:[1,28],1961:[2,15],1962:[2,5],1963:[1,25],1964:[2,13],1965:[2,2],
    1966:[1,21],1967:[2,9],1968:[1,30],1969:[2,17],1970:[2,6],1971:[1,27],
    1972:[2,15],1973:[2,3],1974:[1,23],1975:[2,11],1976:[1,31],1977:[2,18],
    1978:[2,7],1979:[1,28],1980:[2,16],1981:[2,5],1982:[1,25],1983:[2,13],
    1984:[2,2],1985:[2,20],1986:[2,9],1987:[1,29],1988:[2,17],1989:[2,6],
    1990:[1,27],1991:[2,15],1992:[2,4],1993:[1,23],1994:[2,10],1995:[1,31],
    1996:[2,19],1997:[2,7],1998:[1,28],1999:[2,16],2000:[2,5],2001:[1,24],
    2002:[2,12],2003:[2,1],2004:[1,22],2005:[2,9],2006:[1,29],2007:[2,18],
    2008:[2,7],2009:[1,26],2010:[2,14],2011:[2,3],2012:[1,23],2013:[2,10],
    2014:[1,31],2015:[2,19],2016:[2,8],2017:[1,28],2018:[2,16],2019:[2,5],
    2020:[1,25],2021:[2,12],2022:[2,1],2023:[1,22],2024:[2,10],2025:[1,29],
    2026:[2,17],2027:[2,6],2028:[1,26],2029:[2,13],2030:[2,3],2031:[1,23]
  };

  /* ─── 12 Shíchen — Animaux de l'Heure (時辰) ─── */
  /* idx 0 = Rat (23h-01h), 1 = Buffle (01h-03h), …, 11 = Cochon (21h-23h) */
  var SHICHEN = [
    {
      animal: 'Rat', hanzi: '子', pinyin: 'Zǐ', tranche: '23h – 01h', sym: '🐀',
      hidden: "Sous votre surface se tient une intelligence de collecteur : vous stockez, enregistrez, analysez en silence. Votre monde intérieur est un réseau dense d'associations, de souvenirs, d'observations que personne ne soupçonne. Vos proches les plus proches aperçoivent parfois cette profondeur — une remarque d'une précision déconcertante, un souvenir d'un détail que tout le monde avait oublié. Cette mémoire émotionnelle et factuelle constitue votre richesse secrète. L'Eau de minuit dans laquelle vous êtes né reflète le ciel sans le posséder — et c'est cette disponibilité intérieure qui vous rend capable de comprendre les autres à un niveau qu'ils n'atteignent pas eux-mêmes.",
      instinct: "Face à une situation nouvelle ou menaçante, votre premier réflexe est de scanner. Avant de parler, avant d'agir, vous évaluez : qui est là, quels sont les enjeux, où sont les sorties, comment tirer avantage ou au moins éviter le pire. Cet instinct de survie élaboré est si naturel chez vous qu'il fonctionne en arrière-plan permanent. Dans les moments de stress, vous cherchez à contrôler l'information avant que l'information ne vous contrôle. Ce réflexe vous protège — et parfois vous empêche de simplement vivre un moment sans le gérer.",
      relation: "Dans les liens intimes, vous aimez prudemment mais profondément. La confiance ne se donne pas — elle s'accumule, comme vos réserves, avec patience. Quand quelqu'un entre dans votre cercle intérieur, il y entre pour de bon, et vous lui offrez une loyauté discrète mais totale. Ce que vos proches ont parfois du mal à voir, c'est que derrière votre apparent détachement se cache une affectivité intense que vous protégez jalousement. Votre défi affectif est d'ouvrir ce coffre-fort intérieur avant que l'autre n'abandonne à la porte."
    },
    {
      animal: 'Buffle', hanzi: '丑', pinyin: 'Chǒu', tranche: '01h – 03h', sym: '🐂',
      hidden: "Ce que peu voient chez vous, c'est une ténacité qui ressemble de l'extérieur à de l'entêtement mais qui est, de l'intérieur, une forme de fidélité à soi-même d'une grande pureté. Vous portez vos convictions comme une armure intérieure — non par orgueil mais parce que vous avez appris, souvent à vos dépens, que changer de direction à chaque vent vous coûtait plus qu'il ne vous gagnait. Votre monde intérieur est un espace de calme et de certitude rare dans lequel vous revenez quand le monde extérieur s'agite. Vos proches sentent cette solidité sans toujours savoir d'où elle vient.",
      instinct: "Votre réflexe premier est de stabiliser. Quand une situation dérape, quand une décision s'impose dans l'urgence, vous cherchez instinctivement le point d'ancrage : qu'est-ce qui tient, qu'est-ce qui est sûr, quel est le chemin le plus solide. Là où d'autres paniquent ou improvisent, vous ralentissez — non par manque de réactivité mais parce que votre intelligence sait que la précipitation coûte. Ce réflexe de stabilisation est un atout précieux ; il devient un frein quand la situation demande une adaptation rapide que vous résistez par principe.",
      relation: "Dans les liens profonds, vous êtes d'une présence constante qui a la valeur de l'eau courante : souvent oubliée jusqu'au moment où elle manque. Vous n'exprimez pas votre affection avec des mots mais avec des actes répétés, des présences fiables, des engagements tenus. Ce que vous avez à apprendre dans l'intimité, c'est de laisser voir votre vie émotionnelle : non pas tout partager, mais en laisser passer suffisamment pour que l'autre sache qu'il touche quelque chose de vivant sous la surface calme que vous lui offrez."
    },
    {
      animal: 'Tigre', hanzi: '寅', pinyin: 'Yín', tranche: '03h – 05h', sym: '🐅',
      hidden: "Sous votre charisme évident se tient un être bien plus vulnérable que ce que vous laissez voir. Votre dimension secrète est une sensibilité aux injustices et aux souffrances du monde qui vous traverse avec une force que vous apprenez à ne pas montrer — non par calcul mais parce que vous avez compris très tôt que cette sensibilité pouvait être perçue comme une faiblesse. Elle n'en est pas une. Elle est la source de votre sens de la justice, de votre courage, de votre capacité à vous battre pour quelque chose qui dépasse votre intérêt immédiat.",
      instinct: "Votre premier réflexe face à l'obstacle ou à l'injustice est de charger. Pas métaphoriquement — concrètement. Votre corps se mobilise avant votre analyse, votre élan précède votre réflexion. Cette spontanéité est ce qui vous rend magnétique dans les moments de crise, et ce qui peut vous faire payer le prix d'une impulsivité non maîtrisée dans les contextes qui demandent de la finesse. Votre travail instinctif est d'apprendre à faire une pause entre le déclencheur et la réaction — non pour vous freiner, mais pour choisir la forme que prend votre force.",
      relation: "Dans les liens intimes, vous aimez avec une intensité qui peut submerger autant qu'elle porte. Votre générosité affective est immense et sincère, et vos proches le savent. Ce que vous avez à travailler dans l'intimité, c'est l'espace : laisser l'autre exister dans sa différence sans y lire une opposition, partager le territoire émotionnel sans en être le seul garant. L'amour du Tigre devient sa version la plus belle quand il apprend à rugir avec douceur."
    },
    {
      animal: 'Lapin', hanzi: '卯', pinyin: 'Mǎo', tranche: '05h – 07h', sym: '🐇',
      hidden: "Votre vie intérieure est d'une richesse que vous protégez avec une discrétion presque instinctive. Sous votre douceur apparente se tient un observateur fin qui analyse constamment les dynamiques de groupe, les jeux de pouvoir, les non-dits — et qui en tire des conclusions d'une précision que vous gardez souvent pour vous. Vous avez une vie intérieure peuplée d'émotions délicates, de sensations fines, de perceptions esthétiques que peu de gens soupçonnent derrière votre politesse de surface. Ceux qui ont la chance d'accéder à cet espace intérieur découvrent une profondeur et une tendresse qui les touchent durablement.",
      instinct: "Face à un conflit ou à une tension, votre premier réflexe est de chercher la sortie douce : trouver le compromis, adoucir l'angle, trouver les mots qui permettent à tout le monde de garder la face. Cet instinct de paix est précieux et fait de vous un médiateur naturel. Il devient un piège quand il vous empêche de dire une vérité nécessaire ou de tenir une limite juste — quand la paix que vous préservez est celle de la surface au détriment de votre propre intégrité. Distinguer la diplomatie de l'évitement est votre apprentissage instinctif central.",
      relation: "Dans les liens profonds, vous aimez avec une délicatesse et une attention aux besoins de l'autre qui créent une intimité rare. Vous savez rendre les moments ordinaires beaux, les échanges quotidiens précieux. Ce que vous avez à développer dans l'affectif, c'est la capacité à vous laisser pleinement voir : à montrer non seulement votre douceur mais aussi vos besoins, vos frustrations, vos désirs — sans peur que la vérité abîme ce que vous avez construit avec tant de soin."
    },
    {
      animal: 'Dragon', hanzi: '辰', pinyin: 'Chén', tranche: '07h – 09h', sym: '🐉',
      hidden: "Ce que vos proches voient rarement, c'est le doute. Derrière votre assurance naturelle et votre capacité à occuper l'espace avec aisance se cache une exigence intérieure d'une sévérité parfois implacable. Vous vous jugez à l'aune de vos propres standards — qui sont souvent bien au-delà de ce que vous demandez aux autres. Cette dimension secrète est à la fois le moteur de votre accomplissement et la source d'une solitude intérieure que peu soupçonnent. Les moments où votre masque de puissance se fissure sont ceux où vous êtes le plus pleinement vous-même.",
      instinct: "Face à une situation qui demande une réponse, votre réflexe est de prendre les commandes. Pas par arrogance mais parce que quelque chose en vous se met en marche automatiquement : vision, plan, mobilisation des ressources. Vous êtes câblé pour le leadership d'urgence. Le défi est dans les situations qui ne demandent pas de leader mais un participant parmi d'autres — quand votre instinct de commande crée des frictions là où la collaboration aurait suffi. Savoir quand entrer et quand s'effacer est peut-être votre apprentissage instinctif le plus subtil.",
      relation: "Dans les liens intimes, vous aimez avec une générosité et une force qui peuvent être à la fois rassurantes et intimidantes. Vous attendez de l'autre qu'il soit à la hauteur de votre intensité — et cette attente, non formulée, pèse parfois plus lourd que vous ne le réalisez. Ce que vos proches ont besoin de recevoir de vous, ce n'est pas seulement votre protection et votre éclat, c'est aussi votre fragilité : le Dragon qui montre sa blessure est celui qui crée les liens les plus indestructibles."
    },
    {
      animal: 'Serpent', hanzi: '巳', pinyin: 'Sì', tranche: '09h – 11h', sym: '🐍',
      hidden: "Votre monde intérieur est un espace de silence habité. Là où d'autres pensent à voix haute, vous ruminez en profondeur — vous prenez le temps, parfois long, de laisser les choses se décanter avant d'en parler. Cette patience de l'intérieur n'est pas de la lenteur : c'est de la maturité. Vous portez une sagesse instinctive qui vient d'une capacité à observer la vie humaine avec un recul que la plupart n'atteignent qu'après de nombreuses années. Vos proches sentent cette profondeur sans toujours la nommer ; ils savent qu'auprès de vous, il y a quelque chose de plus dense que ce qui se voit en surface.",
      instinct: "Votre premier réflexe face à une situation nouvelle est l'observation. Avant de bouger, vous lisez : les visages, les dynamiques, les intentions implicites. Votre instinct de lecture humaine est d'une précision remarquable — vous avez souvent su qui était qui bien avant que les autres ne le comprennent. Ce que vous avez à surveiller, c'est la tendance à rester dans cette phase d'observation au-delà du nécessaire, à différer l'action par excès de précaution. Parfois, le bon moment ne se lit pas — il s'invente.",
      relation: "Dans les liens intimes, vous aimez avec une intensité et une fidélité qui sont rares et précieuses. Vous voulez être vraiment connu — pas seulement apprécié — et cette exigence de profondeur rend vos relations moins nombreuses mais d'une qualité particulière. Ce que vous avez à apprivoiser dans l'affectif, c'est la possessivité : distinguer le désir de fusion profonde du besoin de contrôle, laisser l'autre exister librement sans y voir une menace pour le lien que vous avez construit avec tant de soin."
    },
    {
      animal: 'Cheval', hanzi: '午', pinyin: 'Wǔ', tranche: '11h – 13h', sym: '🐎',
      hidden: "Votre dimension secrète est une nostalgie — non du passé, mais de quelque chose d'indéfini que vous cherchez dans chaque nouveau départ. Vous portez en vous une quête que vous ne savez pas toujours nommer mais que vous ressentez comme une urgence : il y a quelque chose à vivre, à comprendre, à toucher, qui se dérobe toujours légèrement. Cette quête est ce qui alimente votre mouvement perpétuel. Vos proches les plus intimes vous voient parfois vous arrêter — dans un regard perdu, dans un silence inattendu — et c'est dans ces moments qu'ils vous voient vraiment.",
      instinct: "Face à la contrainte ou à l'inconfort, votre instinct premier est de trouver la sortie. Pas nécessairement en fuyant — mais en cherchant le mouvement, l'alternative, la direction différente. Vous n'êtes pas fait pour rester immobile dans une situation qui vous comprime : votre intelligence cherche l'ouverture, le relâchement, l'espace où respirer à nouveau. Ce réflexe de liberté est votre force vitale. Il devient une limite quand il vous empêche de traverser les passages inconfortables qui mènent à la profondeur.",
      relation: "Dans les liens profonds, vous apportez une vitalité et une présence qui illuminent le quotidien de ceux que vous aimez. Votre affection est expressive, enthousiaste, sincèrement généreuse dans les bons moments. Ce que vous avez à construire dans l'intimité, c'est la présence dans les moments plats : rester là quand ce n'est pas excitant, tenir la main dans les périodes ordinaires, montrer que votre amour n'est pas conditionnel à l'intensité du moment."
    },
    {
      animal: 'Chèvre', hanzi: '未', pinyin: 'Wèi', tranche: '13h – 15h', sym: '🐑',
      hidden: "Derrière votre douceur apparente se tient un artiste intérieur d'une sensibilité intense : vous percevez la beauté et la laideur du monde avec une acuité qui peut être douloureuse. Votre monde imaginaire est riche, peuplé de nuances, de symboles, de résonances que vous avez rarement l'occasion d'exprimer pleinement. Ce que peu soupçonnent, c'est à quel point vous portez les atmosphères des lieux et des gens — vous absorbez émotionnellement votre environnement avec une porosité qui demande une gestion consciente.",
      instinct: "Votre premier réflexe face à l'incertitude ou à l'adversité est de chercher le soutien — humain, spirituel, environnemental. Vous avez besoin de vous sentir entouré pour mobiliser votre force. Ce n'est pas une faiblesse : c'est une intelligence relationnelle qui sait que l'être humain est un être de lien. Ce que vous avez à développer, c'est la capacité à vous soutenir vous-même dans les moments où personne n'est disponible, à puiser dans votre propre ressource intérieure sans attendre que l'extérieur vous la redonne.",
      relation: "Dans l'intimité, vous aimez avec une tendresse et un soin qui créent un espace de sécurité rare. Vous savez rendre l'autre précieux, le faire sentir vu et chéri dans ses détails les plus fins. Ce que vous avez à apprendre dans les liens profonds, c'est d'articuler vos propres besoins avec la même clarté et la même douceur que vous mettez à percevoir ceux de l'autre. L'amour est un dialogue — et votre voix mérite d'y prendre toute sa place."
    },
    {
      animal: 'Singe', hanzi: '申', pinyin: 'Shēn', tranche: '15h – 17h', sym: '🐒',
      hidden: "Votre dimension cachée est une quête de sens que votre vivacité permanente dissimule parfois même à vos propres yeux. Sous l'agilité, l'humour, la facilité apparente se tient un esprit qui cherche — qui cherche à comprendre, à connecter les points, à trouver le fil rouge qui traverse la diversité de vos expériences. Vous avez des questions plus profondes que ce que vous laissez voir, des inquiétudes plus sérieuses que votre légèreté de surface ne le suggère. Vos proches qui vous connaissent vraiment savent que votre intelligence est moins superficielle qu'il n'y paraît — elle est simplement rapide là où d'autres sont lents.",
      instinct: "Face à un problème, votre réflexe premier est de trouver l'angle original — la solution que personne n'avait encore envisagée. Votre cerveau fait des connexions latérales à une vitesse qui vous étonne parfois vous-même. Cet instinct créatif et innovant est votre plus grand atout. Sa face d'ombre est l'impatience avec les démarches linéaires et répétitives : vous avez tendance à sauter les étapes quand votre cerveau a déjà vu la fin, ce qui peut produire des résultats brillants mais fragiles dans leurs fondations.",
      relation: "Dans les liens intimes, vous apportez une présence stimulante, une intelligence émotionnelle réelle sous la légèreté apparente, et une capacité à faire rire qui allège les moments lourds. Ce que vous avez à construire dans l'affectif, c'est la permanence : la capacité à être présent de façon constante, à ne pas disparaître dans vos projets ou vos nouvelles passions au moment où l'autre a besoin de vous. La profondeur que vous cherchez dans le monde, vous pouvez aussi la trouver dans un lien qui tient dans le temps."
    },
    {
      animal: 'Coq', hanzi: '酉', pinyin: 'Yǒu', tranche: '17h – 19h', sym: '🐓',
      hidden: "Ce que vos proches voient rarement, c'est votre vulnérabilité face au jugement. Votre sens du détail et votre exigence ne s'appliquent pas seulement au monde extérieur : vous vous scrutez avec une sévérité que peu soupçonnent sous votre assurance. Vous vous souciez profondément de ce que les autres pensent — non par vanité superficielle mais parce que votre intégrité est centrale à votre identité et que toute faillite à vos propres standards vous coûte intérieurement. Ceux qui accèdent à cet espace découvrent quelqu'un de bien plus tendre et incertain que la droiture affichée ne le laisse supposer.",
      instinct: "Face à une tâche ou à une situation, votre premier réflexe est de l'évaluer par rapport à un standard. Votre œil interne mesure, compare, identifie les imperfections avant même que le résultat ne soit terminé. Cet instinct de qualité est ce qui vous différencie dans tout ce que vous faites. Il devient un obstacle quand il paralyse : quand votre critique interne est si active qu'elle empêche l'engagement, quand la peur de ne pas faire parfaitement vous empêche de commencer.",
      relation: "Dans les liens profonds, vous aimez avec une loyauté et une sincérité qui sont des fondations solides. Vous êtes présent, fiable, profondément attaché une fois que la confiance est établie. Ce que vous avez à apprendre dans l'intimité, c'est la douceur du regard : voir votre partenaire avec l'indulgence que vous vous refusez souvent, comprendre que les imperfections partagées ne diminuent pas la valeur du lien — elles en sont parfois ce qui le rend précieux et réel."
    },
    {
      animal: 'Chien', hanzi: '戌', pinyin: 'Xū', tranche: '19h – 21h', sym: '🐕',
      hidden: "Votre face cachée est une anxiété de fond que votre loyauté apparente dissimule avec succès. Vous portez une vigilance permanente : est-ce que ceux que j'aime vont bien, est-ce que je fais suffisamment, est-ce que le monde est en ordre. Cette vigilance est l'expression d'un amour profond et d'un sens des responsabilités réel — mais elle peut aussi peser lourd dans votre vie intérieure. Ce que peu voient, c'est que vous avez besoin d'être rassuré autant que vous rassurez, soutenu autant que vous soutenez. Votre générosité sera d'autant plus libre quand vous l'aurez appris.",
      instinct: "Votre premier réflexe face à une situation ambiguë est de vérifier les intentions. Qui est vraiment là, que veulent-ils réellement, peut-on leur faire confiance ? Ce questionnement n'est pas de la paranoïa — c'est votre sens aigu du discernement moral qui cherche à distinguer l'authentique du superficiel. Il devient une limite quand il vous ferme à des liens potentiellement précieux par excès de précaution. Apprendre à accorder une confiance provisoire est un acte de courage qui vous coûte — et qui vous rapporte.",
      relation: "Dans les liens intimes, votre fidélité est absolue et votre présence dans les moments difficiles d'une valeur inestimable. Vous êtes là — vraiment là, pas seulement en surface. Ce que vous avez à apprendre dans l'affectif, c'est de recevoir : d'accepter l'amour de l'autre sans le minorer ou le mettre à l'épreuve, d'ouvrir votre monde intérieur sans craindre la déception. Être aimé est aussi un apprentissage — et le Chien qui s'y autorise est d'une beauté particulière."
    },
    {
      animal: 'Cochon', hanzi: '亥', pinyin: 'Hài', tranche: '21h – 23h', sym: '🐖',
      hidden: "Votre monde intérieur est un espace de plaisir et de sensorialité que vous habitez avec une joie discrète. Vous aimez les bonnes choses — les textures, les saveurs, les atmosphères chaleureuses, les conversations qui durent — et ce rapport au plaisir n'est pas une faiblesse mais une intelligence du corps et du moment présent. Ce que vos proches voient rarement, c'est votre vie intérieure plus complexe qu'il n'y paraît : vous portez des doutes, des aspirations profondes, des questionnements existentiels que votre bonhomie naturelle dissimule avec une grande efficacité.",
      instinct: "Face à un conflit ou à une tension, votre premier réflexe est de chercher la réconciliation — et si la réconciliation n'est pas possible immédiatement, d'absorber la tension en vous plutôt que d'en faire une bataille. Cet instinct de paix est une forme de sagesse et de générosité. Il devient problématique quand il vous conduit à avaler des situations inacceptables plutôt qu'à les nommer, à garder pour vous des frustrations qui finissent par peser plus lourd que le conflit qu'elles évitaient. Votre instinct de paix mérite d'être associé à un instinct de vérité.",
      relation: "Dans les liens intimes, vous aimez avec une générosité du cœur et une capacité à créer des moments de bonheur partagé qui sont votre signature affective. Vous savez rendre l'ordinaire joyeux et l'autre précieux. Ce que vous avez à développer dans l'affectif, c'est la lucidité : voir l'autre tel qu'il est réellement, avec ses ombres et ses contradictions, sans que cette vision n'altère votre amour mais le rende simplement plus adulte et plus durable."
    }
  ];

  /* ─── Calcul de l'année chinoise ─── */
  function getChineseYear(year, month, day) {
    var cny = CNY_DATES[year];
    var correctedYear = year;
    if (cny && month !== null) {
      if (month < cny[0] || (month === cny[0] && day < cny[1])) {
        correctedYear = year - 1;
      }
    }
    var animalIdx  = ((correctedYear - 4) % 12 + 12) % 12;
    var stemIdx    = ((correctedYear - 4) % 10 + 10) % 10;
    var elementIdx = Math.floor(stemIdx / 2);
    var polarite   = (stemIdx % 2 === 0) ? 'Yang' : 'Yin';
    return { animal: ANIMAUX[animalIdx], element: ELEMENTS[elementIdx], polarite: polarite, correctedYear: correctedYear, cny: cny };
  }

  /* ─── Heure solaire locale → animal de l'heure ─── */
  function getSolarHour(year, month, day, localHour, localMinute, lon, tzRule, stdOffset) {
    var utcOffset = getUTCOffset(year, month, day, tzRule, stdOffset);
    var utcHour   = localHour + localMinute / 60 - utcOffset;
    var solar     = utcHour + lon / 15;
    return ((solar % 24) + 24) % 24;
  }

  /* idx = floor((solarHour + 1) / 2) % 12
     Vérif : 23h→0(Rat), 0h→0(Rat), 1h→1(Buffle), 11h→6(Cheval), 13h→7(Chèvre) */
  function getHourAnimalIdx(solarHour) {
    return Math.floor((solarHour + 1) / 2) % 12;
  }

  /* ─── Rendu de la carte animal de l'année ─── */
  function renderAnimalCard(animal, polarite, element, annee) {
    return '<div class="ch-result-card">'
      + '<div class="ch-rc-header">'
        + '<span class="ch-rc-sym">' + animal.sym + '</span>'
        + '<div class="ch-rc-meta">'
          + '<h4 class="ch-rc-name">' + animal.nom + ' ' + animal.hanzi + '</h4>'
          + '<span class="ch-rc-pinyin">' + animal.pinyin + ' · ' + polarite + ' · Année ' + annee + '</span>'
          + '<div class="ch-rc-badges">'
            + '<span class="ch-badge" style="color:' + element.couleur + ';border-color:' + element.couleur + ';background:rgba(0,0,0,0.2);">' + element.sym + ' ' + element.nom + ' ' + polarite + '</span>'
            + '<span class="ch-badge">' + animal.mots + '</span>'
          + '</div>'
        + '</div>'
      + '</div>'
      + '<div class="at-plans-section">'
        + '<div class="at-plan-item">'
          + '<h5 class="at-plan-title">🌱 Plan Personnel</h5>'
          + '<p class="at-rc-interp">' + animal.personal + '</p>'
        + '</div>'
        + '<div class="at-plan-item">'
          + '<h5 class="at-plan-title">💼 Plan Professionnel</h5>'
          + '<p class="at-rc-interp">' + animal.pro + '</p>'
        + '</div>'
        + '<div class="at-plan-item">'
          + '<h5 class="at-plan-title">💖 Plan Relationnel</h5>'
          + '<p class="at-rc-interp">' + animal.relational + '</p>'
        + '</div>'
      + '</div>'
      + '</div>';
  }

  /* ─── Rendu de la carte élément ─── */
  function renderElementCard(element, polarite, animal) {
    return '<div class="ch-result-card ch-element-card" style="border-color:' + element.couleur + '33;">'
      + '<div class="ch-rc-header">'
        + '<span class="ch-rc-sym">' + element.sym + '</span>'
        + '<div class="ch-rc-meta">'
          + '<h4 class="ch-rc-name" style="color:' + element.couleur + ';">' + element.nom + ' ' + element.hanzi + ' (' + polarite + ')</h4>'
          + '<span class="ch-rc-pinyin">Élément · ' + element.pinyin + ' · modifie le ' + animal.nom + '</span>'
          + '<div class="ch-rc-badges">'
            + '<span class="ch-badge" style="color:' + element.couleur + ';border-color:' + element.couleur + ';background:rgba(0,0,0,0.2);">' + element.mots + '</span>'
          + '</div>'
        + '</div>'
      + '</div>'
      + '<div class="at-plans-section">'
        + '<div class="at-plan-item" style="border-left-color:' + element.couleur + '55;">'
          + '<h5 class="at-plan-title" style="color:' + element.couleur + ';">🌱 Influence Personnelle</h5>'
          + '<p class="at-rc-interp">' + element.personal + '</p>'
        + '</div>'
        + '<div class="at-plan-item" style="border-left-color:' + element.couleur + '55;">'
          + '<h5 class="at-plan-title" style="color:' + element.couleur + ';">💼 Influence Professionnelle</h5>'
          + '<p class="at-rc-interp">' + element.pro + '</p>'
        + '</div>'
        + '<div class="at-plan-item" style="border-left-color:' + element.couleur + '55;">'
          + '<h5 class="at-plan-title" style="color:' + element.couleur + ';">💖 Influence Relationnelle</h5>'
          + '<p class="at-rc-interp">' + element.relational + '</p>'
        + '</div>'
      + '</div>'
      + '</div>';
  }

  /* ─── Rendu de la carte ascendant (時辰) ─── */
  function renderHourAnimalCard(sh, solarHour) {
    var h  = Math.floor(solarHour);
    var m  = Math.round((solarHour - h) * 60);
    if (m >= 60) { h = (h + 1) % 24; m = 0; }
    var hs = 'Heure solaire : ' + h + 'h' + (m < 10 ? '0' + m : '' + m);
    return '<div class="ch-result-card ch-shichen-card">'
      + '<div class="ch-rc-header">'
        + '<span class="ch-rc-sym">' + sh.sym + '</span>'
        + '<div class="ch-rc-meta">'
          + '<h4 class="ch-rc-name" style="color:var(--cyan);">' + sh.animal + ' ' + sh.hanzi + '</h4>'
          + '<span class="ch-rc-pinyin">' + sh.pinyin + ' · 時辰 · ' + sh.tranche + '</span>'
          + '<div class="ch-rc-badges">'
            + '<span class="ch-badge" style="color:var(--cyan);border-color:rgba(34,211,238,0.3);background:rgba(34,211,238,0.05);">' + hs + '</span>'
            + '<span class="ch-badge" style="color:var(--cyan);border-color:rgba(34,211,238,0.2);">Ascendant Chinois</span>'
          + '</div>'
        + '</div>'
      + '</div>'
      + '<div class="at-plans-section">'
        + '<div class="at-plan-item ch-shichen-plan">'
          + '<h5 class="at-plan-title" style="color:var(--cyan);">🌙 La Facette Secrète</h5>'
          + '<p class="at-rc-interp">' + sh.hidden + '</p>'
        + '</div>'
        + '<div class="at-plan-item ch-shichen-plan">'
          + '<h5 class="at-plan-title" style="color:var(--cyan);">⚡ L\'Instinct Primaire</h5>'
          + '<p class="at-rc-interp">' + sh.instinct + '</p>'
        + '</div>'
        + '<div class="at-plan-item ch-shichen-plan">'
          + '<h5 class="at-plan-title" style="color:var(--cyan);">🫶 La Dynamique Affective</h5>'
          + '<p class="at-rc-interp">' + sh.relation + '</p>'
        + '</div>'
      + '</div>'
      + '</div>';
  }

  /* ─── Initialisation ─── */
  function init() {
    var form = document.getElementById('ch-form');
    if (!form || form.dataset.init) return;
    form.dataset.init = '1';

    var villeEl   = document.getElementById('ch-ville');
    var customDiv = document.getElementById('ch-custom-coords');

    if (villeEl && customDiv) {
      villeEl.addEventListener('change', function () {
        customDiv.style.display = (villeEl.value === 'custom') ? 'block' : 'none';
      });
    }

    document.getElementById('ch-exemple').addEventListener('click', function () {
      document.getElementById('ch-annee').value  = '1990';
      document.getElementById('ch-mois').value   = '6';
      document.getElementById('ch-jour').value   = '15';
      document.getElementById('ch-heure').value  = '16';
      document.getElementById('ch-minute').value = '0';
      if (villeEl) {
        villeEl.value = '48.8566|2.3522|eu|1'; /* Paris */
        if (customDiv) customDiv.style.display = 'none';
      }
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var annee  = parseInt(document.getElementById('ch-annee').value, 10);
      var mois   = parseInt(document.getElementById('ch-mois').value,  10) || null;
      var jour   = parseInt(document.getElementById('ch-jour').value,  10) || null;
      var heure  = document.getElementById('ch-heure').value.trim();
      var minute = document.getElementById('ch-minute').value.trim();

      if (!annee || annee < 1900 || annee > 2100) return;

      /* ── Signe de l'année ── */
      var result       = getChineseYear(annee, mois, jour);
      var wasCorrected = (result.correctedYear !== annee);
      var cnyInfo      = result.cny ? 'Nouvel An Chinois ' + annee + ' : ' + result.cny[1] + '/' + result.cny[0] : '';

      document.getElementById('chAnimalCard').innerHTML  = renderAnimalCard(result.animal, result.polarite, result.element, result.correctedYear);
      document.getElementById('chElementCard').innerHTML = renderElementCard(result.element, result.polarite, result.animal);

      var noteEl = document.getElementById('chCnyNote');
      if (noteEl) {
        noteEl.innerHTML = cnyInfo
          ? (wasCorrected
              ? '<strong>Note :</strong> Né·e avant le ' + cnyInfo + ' — vous appartenez à l\'année <strong>' + result.correctedYear + '</strong> (' + result.animal.nom + ' ' + result.element.nom + ').'
              : '<strong>Note :</strong> ' + cnyInfo + '. Votre signe est confirmé.')
          : '';
      }

      /* ── Ascendant 時辰 ── */
      var hourBlock = document.getElementById('chHourBlock');
      var hourCard  = document.getElementById('chHourCard');

      if (heure !== '' && !isNaN(parseInt(heure, 10)) && hourBlock && hourCard) {
        var lh = parseInt(heure,  10);
        var lm = parseInt(minute, 10) || 0;

        if (lh >= 0 && lh <= 23 && lm >= 0 && lm <= 59) {
          var lon = 2.3522, tzRule = 'eu', stdOffset = 1;
          var calcMois = mois || 6;
          var calcJour = jour || 15;

          if (villeEl && villeEl.value && villeEl.value !== '' && villeEl.value !== 'custom') {
            var parts = villeEl.value.split('|');
            lon       = parseFloat(parts[1]);
            tzRule    = parts[2];
            stdOffset = parseFloat(parts[3]);
          } else if (villeEl && villeEl.value === 'custom') {
            var lonEl = document.getElementById('ch-lon');
            var tzEl  = document.getElementById('ch-tz-offset');
            if (lonEl && lonEl.value) lon = parseFloat(lonEl.value);
            if (tzEl  && tzEl.value)  { stdOffset = parseFloat(tzEl.value); tzRule = 'none'; }
          }

          var solarH = getSolarHour(annee, calcMois, calcJour, lh, lm, lon, tzRule, stdOffset);
          var idx    = getHourAnimalIdx(solarH);
          hourCard.innerHTML = renderHourAnimalCard(SHICHEN[idx], solarH);
          hourBlock.removeAttribute('hidden');
        } else {
          hourBlock.setAttribute('hidden', '');
        }
      } else if (hourBlock) {
        hourBlock.setAttribute('hidden', '');
      }

      var res = document.getElementById('chResultats');
      res.removeAttribute('hidden');
      res.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
  document.addEventListener('astro:page-load', init);
})();
