/* ─────────────────────────────────────────────────────────────────────────
   tarot-thoth-planes.js — Lectures par plan de vie (78 cartes Thoth × 3 plans)
   Plans : personnel · professionnel · relationnel
   Tradition : Thoth Tarot (Aleister Crowley, Frieda Harris)
   ───────────────────────────────────────────────────────────────────────── */
window.tarotThothPlanes = (function () {

  var MAJORS = {
    '00': {
      name: 'Le Fou',
      personnel: { kw: 'libération cosmique', text: 'Un appel à franchir le gouffre et à faire confiance au vide divin. Abandonnez les limites de la rationalité commune pour renaître dans l\'innocence pure.' },
      professionnel: { kw: 'aventure créative', text: 'Un départ imprévu et audacieux se dessine. L\'élan spirituel et la liberté totale comptent plus que la sécurité matérielle immédiate.' },
      relationnel: { kw: 'liaison sans entraves', text: 'Une rencontre caractérisée par une liberté absolue et l\'absence de jalousie. Un amour sauvage et hors-norme qui refuse d\'être enclos.' }
    },
    '01': {
      name: 'Le Mage',
      personnel: { kw: 'manifestation active', text: 'Le pouvoir d\'ordonner le chaos par la parole et le geste conscient. Vous possédez les clés de la transmutation ; parlez avec intention.' },
      professionnel: { kw: 'création verbale', text: 'Nouveau projet, communication brillante ou invention. Votre esprit alerte manipule les symboles et capte les opportunités avec agilité.' },
      relationnel: { kw: 'échange magnétique', text: 'Une attraction mentale stimulante. La relation progresse grâce au dialogue spirituel et à la séduction intellectuelle réciproque.' }
    },
    '02': {
      name: 'La Prêtresse',
      personnel: { kw: 'intuition voilée', text: 'La descente dans les eaux du temple intérieur. Restez réceptif aux messages nocturnes et aux rêves ; la vérité réside dans le silence sous-jacent.' },
      professionnel: { kw: 'savoir ésotérique', text: 'Période propice aux études profondes, à l\'écriture et à la recherche occulte. N\'agissez pas encore dans la matière, attendez le reflux.' },
      relationnel: { kw: 'lien télépathique', text: 'Une relation de nature psychique élevée, caractérisée par une forte intuition mutuelle et une distance physique parfois sacrée.' }
    },
    '03': {
      name: 'L\'Impératrice',
      personnel: { kw: 'croissance organique', text: 'La force de la Mère Nature en pleine floraison. Permettez à votre créativité esthétique et à vos émotions de se matérialiser en toute sensualité.' },
      professionnel: { kw: 'abondance fertile', text: 'Succès marquant dans les entreprises créatives et collaboratives. Vos projets germent et se développent de manière prolifique.' },
      relationnel: { kw: 'amour inconditionnel', text: 'Une union chaleureuse, harmonieuse et génératrice de vie (ou de projets communs). Sensualité exacerbée et dévouement mutuel.' }
    },
    '04': {
      name: 'L\'Empereur',
      personnel: { kw: 'volonté souveraine', text: 'L\'établissement de règles de vie claires et d\'une discipline personnelle de fer. Dompter l\'impulsion par la raison structurelle.' },
      professionnel: { kw: 'autorité organisatrice', text: 'Leadership affirmé, structuration d\'entreprise ou poste de haute responsabilité. La réussite passe par la rigueur administrative.' },
      relationnel: { kw: 'protection stable', text: 'Une relation reposant sur des fondations solides et un cadre rassurant, bien que parfois teinté d\'un besoin d\'ordre ou de contrôle.' }
    },
    '05': {
      name: 'Le Hiérophante',
      personnel: { kw: 'initiation intérieure', text: 'Le ralliement à des principes éthiques supérieurs. Recherche d\'un enseignement sacré qui donne du sens à votre cheminement individuel.' },
      professionnel: { kw: 'transmission de sagesse', text: 'Enseignement, conseil, ou diplomatie au sein de structures établies. Respectez les codes sacrés tout en restant fidèle à votre vérité.' },
      relationnel: { kw: 'alliance spirituelle', text: 'Une union scellée par des valeurs partagées ou une reconnaissance officielle. Partenariat fondé sur le respect et le sacré.' }
    },
    '06': {
      name: 'Les Amants',
      personnel: { kw: 'mariage alchimique', text: 'La fusion de vos polarités intérieures (ombre/lumière, masculin/féminin). C\'est par l\'intégration de vos propres contradictions que vous trouverez la paix.' },
      professionnel: { kw: 'choix de valeur', text: 'Une décision cruciale impliquant une association d\'idées ou de partenaires. Choisissez l\'option qui préserve votre intégrité spirituelle.' },
      relationnel: { kw: 'union sacrée', text: 'Une attraction magnétique irrésistible. Rencontre de l\'âme sœur où le désir physique se transmute en connexion spirituelle.' }
    },
    '07': {
      name: 'Le Chariot',
      personnel: { kw: 'triomphe de l\'âme', text: 'Vous portez le Graal intérieur. Avancez droit devant en canalisant vos contradictions psychiques avec une volonté indomptable.' },
      professionnel: { kw: 'victoire totale', text: 'Succès éclatant après une lutte intense. Un changement de statut, un déplacement majeur ou une conquête de marché vous couronne de lauriers.' },
      relationnel: { kw: 'dépassement des conflits', text: 'Le couple triomphe des obstacles externes par une action résolue et une direction claire commune. Protégez le foyer.' }
    },
    '08': {
      name: 'L\'Ajustement',
      personnel: { kw: 'équilibre dynamique', text: 'L\'univers ajuste vos poids intérieurs. L\'alignement absolu avec la réalité élimine toute distorsion mentale ou auto-illusion.' },
      professionnel: { kw: 'contrat équitable', text: 'Signature officielle, régularisation administrative ou arbitrage juste. Prenez du recul et agissez en toute neutralité logique.' },
      relationnel: { kw: 'équilibre karmique', text: 'Une relation honnête sans faux-semblants. Chacun fait face à ses responsabilités avec décence et équité objective.' }
    },
    '09': {
      name: 'L\'Ermite',
      personnel: { kw: 'lumière solitaire', text: 'Retirez-vous dans le désert de votre esprit. Le flambeau de la vérité intérieure est votre seule guidance face aux bruits du monde.' },
      professionnel: { kw: 'expertise occulte', text: 'Travail minutieux accompli dans l\'ombre, recherche fondamentale ou spécialisation rare. Le temps de la graine exige de la patience.' },
      relationnel: { kw: 'solitude sacrée', text: 'Une période d\'introspection nécessaire pour guérir le cœur. Une relation mûre fondée sur l\'indépendance de deux chemins.' }
    },
    '10': {
      name: 'La Fortune',
      personnel: { kw: 'cycles du destin', text: 'Le mouvement perpétuel des forces célestes. Acceptez les hauts et les bas comme des expressions de la loi cosmique sans vous y attacher.' },
      professionnel: { kw: 'changement imprévu', text: 'Une opportunité soudaine se présente, modifiant radicalement vos perspectives matérielles. Saisissez la roue au sommet.' },
      relationnel: { kw: 'rencontre synchrone', text: 'Un événement inattendu bouscule le cours des choses. Une relation marquée par le timing divin ou les coïncidences.' }
    },
    '11': {
      name: 'La Luxure',
      personnel: { kw: 'passion vitale', text: 'La fusion de votre esprit avec l\'énergie instinctive primitive. Domptez vos peurs par la joie extatique et la volupté d\'exister.' },
      professionnel: { kw: 'force créatrice', text: 'Investissement passionné dans des projets artistiques ou novateurs. Votre charisme brut emporte l\'adhésion générale.' },
      relationnel: { kw: 'extase érotique', text: 'Une passion dévorante, physique et spirituelle. Une relation d\'une intensité rare qui réveille les forces de vie latentes.' }
    },
    '12': {
      name: 'Le Pendu',
      personnel: { kw: 'renoncement salvateur', text: 'La suspension forcée du moi extérieur. Lâchez prise sur vos désirs immédiats afin de voir l\'univers sous un angle nouveau.' },
      professionnel: { kw: 'stagnation créatrice', text: 'Les projets sont gelés temporairement. Profitez de cette pause pour réorienter vos structures et réévaluer vos objectifs profonds.' },
      relationnel: { kw: 'dévouement sacrificiel', text: 'Période de suspension dans le lien. Acceptation du sacrifice temporaire de l\'ego pour permettre la métamorphose de l\'amour.' }
    },
    '13': {
      name: 'La Mort',
      personnel: { kw: 'mutation radicale', text: 'La faux alchimique tranche les résidus obsolètes. Acceptez la putréfaction de l\'ancien moi pour libérer le potentiel d\'une renaissance.' },
      professionnel: { kw: 'fin de cycle', text: 'Rupture définitive de contrat, transition de carrière radicale. Une porte se ferme irrévocablement pour libérer vos vrais talents.' },
      relationnel: { kw: 'rupture initiatique', text: 'Fin d\'une dynamique relationnelle devenue toxique ou limitante. La séparation douloureuse ouvre la voie à un renouveau éclatant.' }
    },
    '14': {
      name: 'L\'Art',
      personnel: { kw: 'alchimie intérieure', text: 'La fusion heureuse de vos aspects duels dans le creuset de l\'âme. Vous apprenez à équilibrer le feu et l\'eau avec grâce.' },
      professionnel: { kw: 'synthèse créative', text: 'Métiers artistiques, sciences de la santé ou design de pointe. Succès par l\'intégration de compétences diverses et novatrices.' },
      relationnel: { kw: 'harmonie transmutée', text: 'Une relation fluide et réparatrice où les différences s\'enrichissent mutuellement pour créer un équilibre supérieur.' }
    },
    '15': {
      name: 'Le Diable',
      personnel: { kw: 'force chtonienne', text: 'L\'intégration de vos pulsions inconscientes et de votre force matérielle brute. Riez de vos propres limitations pour vous en libérer.' },
      professionnel: { kw: 'ambition concrète', text: 'Opportunités financières substantielles et pouvoir matériel. Usez de cette force créatrice de la terre sans vous y aliéner.' },
      relationnel: { kw: 'liaison instinctive', text: 'Une attirance charnelle irrésistible et des dynamiques de pouvoir. Une opportunité de regarder vos attachements secrets en face.' }
    },
    '16': {
      name: 'La Tour',
      personnel: { kw: 'illumination disruptive', text: 'L\'éclair de la conscience brise vos forteresses d\'illusions. L\'effondrement de vos certitudes rigides vous rend enfin libre.' },
      professionnel: { kw: 'rupture libératrice', text: 'Un choc structurel (crise financière, restructuration) qui balaie ce qui était fragile. C\'est le moment de reconstruire.' },
      relationnel: { kw: 'vérité foudroyante', text: 'Une explication orageuse ou une rupture brutale qui élimine les mensonges accumulés. Retour salutaire à la vérité nue.' }
    },
    '17': {
      name: 'L\'Étoile',
      personnel: { kw: 'espérance céleste', text: 'L\'écoulement de l\'élixir spirituel purifie votre esprit. Reprenez confiance en vos guides invisibles et en l\'avenir cosmique.' },
      professionnel: { kw: 'visibilité rayonnante', text: 'Vos projets reçoivent une bénédiction céleste. Succès artistique, reconnaissance de votre intégrité et inspiration féconde.' },
      relationnel: { kw: 'amour purifié', text: 'Une complicité tendre, dénuée d\'ego. La relation baigne dans la confiance mutuelle, la sérénité et une foi renouvelée.' }
    },
    '18': {
      name: 'La Lune',
      personnel: { kw: 'traversée de l\'ombre', text: 'La descente dans les peurs ancestrales et les abîmes de l\'inconscient. Affrontez les monstres du seuil avec courage pour renaître.' },
      professionnel: { kw: 'intrigues cachées', text: 'Attention aux faux-semblants et aux manipulations dans le milieu professionnel. Fiez-vous uniquement à votre instinct profond.' },
      relationnel: { kw: 'projection illusoire', text: 'Période de doutes, de jalousie ou de peurs inconscientes projetées sur l\'autre. Naviguez dans ces eaux avec grande prudence.' }
    },
    '19': {
      name: 'Le Soleil',
      personnel: { kw: 'conscience rayonnante', text: 'La joie pure de l\'être éveillé. Votre énergie solaire se diffuse sans limite, réchauffant votre environnement intérieur.' },
      professionnel: { kw: 'réussite éclatante', text: 'Victoire publique majeure, honneurs et prospérité matérielle. Votre leadership naturel inspire le respect et le succès.' },
      relationnel: { kw: 'union lumineuse', text: 'Un amour partagé au grand jour, d\'une clarté totale et d\'une chaleur infinie. Bonheur conjugal ou amical absolu.' }
    },
    '20': {
      name: 'L\'Éon',
      personnel: { kw: 'appel de l\'ère nouvelle', text: 'Une transformation panoramique de votre conscience. Vous percevez votre vie sous la perspective de l\'évolution karmique globale.' },
      professionnel: { kw: 'vocation révélée', text: 'Changement de cap majeur dicté par un appel intérieur profond. Vous commencez une œuvre novatrice qui marquera votre époque.' },
      relationnel: { kw: 'renaissance du lien', text: 'Une relation qui prend une dimension spirituelle supérieure ou un renouveau total après une crise profonde.' }
    },
    '21': {
      name: 'L\'Univers',
      personnel: { kw: 'accomplissement suprême', text: 'Le Grand Œuvre est achevé. Vous dansez en harmonie avec le cosmos, intégré au grand Tout cosmique.' },
      professionnel: { kw: 'couronnement absolu', text: 'Succès final, achèvement d\'une carrière ou d\'un projet de vie monumental. Ouverture sur l\'international ou le global.' },
      relationnel: { kw: 'harmonie cosmique', text: 'L\'union parfaite. Vous trouvez votre juste place aux côtés de l\'autre dans une complicité spirituelle totale.' }
    }
  };

  // On crée dynamiquement les mineurs avec des textes esotériques Thoth
  var MINORS = {};

  // Suits: W, C, S, D
  // Définissons les noms et thèmes pour remplir le dictionnaire des mineurs
  var suitsInfo = {
    W: { name: 'Bâtons', element: 'Feu', planeSuffix: 'créativité et de volonté.' },
    C: { name: 'Coupes', element: 'Eau', planeSuffix: 'émotions et d\'intuition.' },
    S: { name: 'Épées', element: 'Air', planeSuffix: 'mental et d\'esprit critique.' },
    D: { name: 'Disques', element: 'Terre', planeSuffix: 'matière, de corps et d\'argent.' }
  };

  var pipTitles = {
    W: {
      '01': { name: 'As de Bâtons', kw: 'étincelle originelle', p: 'Volonté naissante', pr: 'Nouveau projet passionnant', r: 'Attraction spontanée' },
      '02': { name: 'Deux de Bâtons (Domination)', kw: 'pouvoir concentré', p: 'Affirmation de sa souveraineté', pr: 'Prise de contrôle', r: 'Domination ou charisme' },
      '03': { name: 'Trois de Bâtons (Vertu)', kw: 'intégrité de l\'action', p: 'Loyauté envers soi-même', pr: 'Consolidation commerciale', r: 'Confiance établie' },
      '04': { name: 'Quatre de Bâtons (Achèvement)', kw: 'structure harmonieuse', p: 'Fondations personnelles solides', pr: 'Succès organisationnel', r: 'Harmonie domestique' },
      '05': { name: 'Cinq de Bâtons (Lutte)', kw: 'tension constructive', p: 'Dépassement de soi par l\'effort', pr: 'Compétition commerciale', r: 'Frictions amoureuses stimulantes' },
      '06': { name: 'Six de Bâtons (Victoire)', kw: 'triomphe mérité', p: 'Clarté mentale triomphante', pr: 'Succès commercial ou promotion', r: 'Reconnaissance du partenaire' },
      '07': { name: 'Sept de Bâtons (Vaillance)', kw: 'courage solitaire', p: 'Défense acharnée de ses valeurs', pr: 'Résistance face à la concurrence', r: 'Protéger son espace d\'amour' },
      '08': { name: 'Huit de Bâtons (Rapidité)', kw: 'énergie fulgurante', p: 'Pensée claire et rapide', pr: 'Communication imminente et vive', r: 'Déclarations amoureuses soudaines' },
      '09': { name: 'Neuf de Bâtons (Force)', kw: 'résistance intérieure', p: 'Ancrage de sa propre volonté', pr: 'Dernière ligne droite avant succès', r: 'Défenses relationnelles préservées' },
      '10': { name: 'Dix de Bâtons (Oppression)', kw: 'fardeau igné', p: 'Rigueur excessive écrasant l\'élan', pr: 'Surmenage professionnel lourd', r: 'Responsabilités relationnelles pesantes' }
    },
    C: {
      '01': { name: 'As de Coupes', kw: 'élixir d\'amour', p: 'Ouverture spirituelle du cœur', pr: 'Vocation artistique naissante', r: 'Amour inconditionnel pur' },
      '02': { name: 'Deux de Coupes (Amour)', kw: 'union magnétique', p: 'Harmonie émotionnelle interne', pr: 'Partenariat d\'affaires fluide', r: 'Rencontre amoureuse fusionnelle' },
      '03': { name: 'Trois de Coupes (Abondance)', kw: 'joie spirituelle', p: 'Gratitude et plénitude intérieure', pr: 'Succès d\'équipe chaleureux', r: 'Célébrations partagées entre amis' },
      '04': { name: 'Quatre de Coupes (Luxe)', kw: 'satiété stagnante', p: 'Fatigue face aux plaisirs faciles', pr: 'Bannir l\'apathie professionnelle', r: 'Lassitude sentimentale dans le couple' },
      '05': { name: 'Cinq de Coupes (Déception)', kw: 'deuil émotionnel', p: 'Acceptation de la putréfaction du passé', pr: 'Échec de projet menant à une leçon', r: 'Chagrin ou regrets amoureux cuisants' },
      '06': { name: 'Six de Coupes (Plaisir)', kw: 'source de jouvence', p: 'Simplicité émotionnelle retrouvée', pr: 'Projet artistique authentique', r: 'Complicité tendre et nostalgique' },
      '07': { name: 'Sept de Coupes (Débauche)', kw: 'mirage des désirs', p: 'Dispersion mentale dans l\'illusion', pr: 'Attention aux promesses d\'affaires suspectes', r: 'Fantasmes toxiques ou jalousie' },
      '08': { name: 'Huit de Coupes (Indolence)', kw: 'désert affectif', p: 'Retrait nécessaire par manque d\'eau', pr: 'Démission salutaire d\'un travail vide', r: 'Séparation par tarissement du lien' },
      '09': { name: 'Neuf de Coupes (Bonheur)', kw: 'plénitude du cœur', p: 'Bénédiction et bien-être physique', pr: 'Réussite matérielle épanouissante', r: 'Bonheur partagé et volupté' },
      '10': { name: 'Dix de Coupes (Satiété)', kw: 'paix des désirs', p: 'Apaisement total des émotions', pr: 'Achèvement réussi et serein', r: 'Amour installé et stable' }
    },
    S: {
      '01': { name: 'As d\'Épées', kw: 'glaive de clarté', p: 'Discernement mental souverain', pr: 'Percée logique résolvant la crise', r: 'Vérité tranchante exprimée' },
      '02': { name: 'Deux d\'Épées (Paix)', kw: 'trêve mentale', p: 'Esprit en paix évitant le jugement', pr: 'Négociation suspendue en attente', r: 'Équilibre et respect des distances' },
      '03': { name: 'Trois d\'Épées (Chagrin)', kw: 'vérité douloureuse', p: 'Libération d\'une illusion mentale', pr: 'Rupture d\'association nécessaire', r: 'Chagrin d\'amour ou trahison révélée' },
      '04': { name: 'Quatre d\'Épées (Trêve)', kw: 'repos de l\'esprit', p: 'Silence contemplatif salvateur', pr: 'Mise en veille productive d\'un projet', r: 'Besoin de distance dans le couple' },
      '05': { name: 'Cinq d\'Épées (Défaite)', kw: 'ruine logique', p: 'Prise de conscience de son orgueil', pr: 'Crise d\'idées ou perte financière', r: 'Querelle destructive et stérile' },
      '06': { name: 'Six de Épées (Science)', kw: 'pensée rationnelle', p: 'Régulation logique de la pensée', pr: 'Progrès technique ou voyage d\'études', r: 'Dialogue constructif et apaisé' },
      '07': { name: 'Sept d\'Épées (Futilité)', kw: 'dispersion mentale', p: 'Instabilité des intentions', pr: 'Stratégie peu fiable ou évitement', r: 'Manque de franchise dans les échanges' },
      '08': { name: 'Huit d\'Épées (Interférence)', kw: 'analyse paralysante', p: 'Confusion par sur-rationalisation', pr: 'Projet entravé par trop de détails', r: 'Interférences externes bloquant le lien' },
      '09': { name: 'Neuf d\'Épées (Cruauté)', kw: 'tourmente psychique', p: 'Culpabilité inconsciente dévoilée', pr: 'Période de stress intense et peur d\'échouer', r: 'Cruauté psychologique ou auto-sabotage' },
      '10': { name: 'Dix d\'Épées (Ruine)', kw: 'mort de l\'opinion', p: 'Effondrement des dogmes personnels', pr: 'Faillite salutaire d\'un projet stérile', r: 'Rupture inévitable purgeant le passé' }
    },
    D: {
      '01': { name: 'As de Disques', kw: 'germe terrestre', p: 'Ancrage de sa vitalité corporelle', pr: 'Nouvelle base financière solide', r: 'Amour charnel et ancré' },
      '02': { name: 'Deux de Disques (Changement)', kw: 'mouvement rotatif', p: 'Flexibilité face aux variations de la vie', pr: 'Adaptation fluide des ressources', r: 'Légèreté et jeu dans le lien' },
      '03': { name: 'Trois de Disques (Travaux)', kw: 'œuvre constructive', p: 'Discipline corporelle productive', pr: 'Labeur minutieux et collectif récompensé', r: 'Bâtir des projets concrets ensemble' },
      '04': { name: 'Quatre de Disques (Pouvoir)', kw: 'structure solide', p: 'Ancrage protecteur et limites claires', pr: 'Consolidation de biens immobiliers', r: 'Sécurité rassurante mais possessive' },
      '05': { name: 'Cinq de Disques (Inquiétude)', kw: 'instabilité matérielle', p: 'Peur du manque physique ou psychologique', pr: 'Difficultés de trésorerie passagères', r: 'Inquiétudes partagées pesant sur le lien' },
      '06': { name: 'Six de Disques (Succès)', kw: 'prospérité partagée', p: 'Harmonie des forces matérielles', pr: 'Bénéfices accrus et investissement juste', r: 'Générosité et soutien réciproque' },
      '07': { name: 'Sept de Disques (Échec)', kw: 'stagnation de plomb', p: 'Patience face au ralentissement terrestre', pr: 'Projet freiné demandant réévaluation', r: 'Lassitude par manque de perspectives' },
      '08': { name: 'Huit de Disques (Prudence)', kw: 'cuisson lente', p: 'Discipline de vie méthodique', pr: 'Labeur soigné et sécurité de carrière', r: 'Patience attentive construisant le couple' },
      '09': { name: 'Neuf de Disques (Gain)', kw: 'richesse méritée', p: 'Bien-être et épanouissement physique', pr: 'Récolte substantielle de vos efforts', r: 'Confort partagé et harmonie matérielle' },
      '10': { name: 'Dix de Disques (Richesse)', kw: 'pierre philosophale', p: 'Intégration complète de la matière', pr: 'Prospérité durable et transmission', r: 'Héritage partagé ou foyer très stable' }
    }
  };

  var courtNames = {
    '11': { name: 'Princesse', element: 'Terre' },
    '12': { name: 'Prince', element: 'Air' },
    '13': { name: 'Reine', element: 'Eau' },
    '14': { name: 'Chevalier', element: 'Feu' }
  };

  // Remplissons les mineurs de façon dynamique et détaillée
  for (var suit in suitsInfo) {
    var info = suitsInfo[suit];
    
    // Pips 01 à 10
    for (var numStr in pipTitles[suit]) {
      var cardId = suit + numStr;
      var t = pipTitles[suit][numStr];
      MINORS[cardId] = {
        name: t.name,
        personnel: { kw: t.kw, text: 'Cette carte vous invite à ancrer votre plan personnel dans l\'énergie du ' + info.element + '. ' + t.p + ' : c\'est le moment de cultiver cet aspect pour parfaire votre équilibre.' },
        professionnel: { kw: t.kw, text: 'Dans le travail, ' + t.pr + '. Agissez avec rigueur pour canaliser au mieux ces courants dans vos projets concrets.' },
        relationnel: { kw: t.kw, text: 'Sur le plan relationnel, ' + t.r + '. Le lien exige une attention particulière pour faire fleurir ces dynamiques.' }
      };
    }
    
    // Court cards 11 à 14
    for (var courtNum in courtNames) {
      var cardId = suit + courtNum;
      var c = courtNames[courtNum];
      var courtCardName = c.name + ' de ' + info.name;
      var elementalMix = c.element + ' de ' + info.element;
      
      MINORS[cardId] = {
        name: courtCardName,
        personnel: { 
          kw: elementalMix.toLowerCase(), 
          text: 'Incorporez la dynamique de la carte (' + elementalMix + ') dans votre être. Cela vous demande d\'harmoniser les aspects actifs et passifs de votre ' + info.planeSuffix 
        },
        professionnel: { 
          kw: 'maîtrise élémentaire', 
          text: 'Une présence charismatique ou une compétence clé se manifeste dans vos affaires. C\'est le moment d\'adopter la posture du ' + courtCardName + ' (rigueur et détermination).' 
        },
        relationnel: { 
          kw: 'attraction subtile', 
          text: 'Une personne incarnant l\'énergie de la carte (' + elementalMix + ') influence positivement ou met au défi votre équilibre relationnel. Restez ouvert.' 
        }
      };
    }
  }

  function getPlanes(cardId) {
    if (!cardId) return null;
    // Pour supporter les IDs de disques stockés en Dxx mais pouvant venir de la détection de suit 'D'
    var id = cardId;
    if (MAJORS[id]) return MAJORS[id];
    if (MINORS[id]) return MINORS[id];
    // Support si la détection a converti P en D
    if (id.charAt(0) === 'P') {
      var diskId = 'D' + id.slice(1);
      if (MINORS[diskId]) return MINORS[diskId];
    }
    return null;
  }

  function normalizeId(id) {
    if (!id) return '';
    if (id.charAt(0) === 'D') return 'P' + id.slice(1);
    return id;
  }

  function getPlaneReading(cardId, plane) {
    var card = getPlanes(cardId);
    return card ? card[plane] : null;
  }

  function getAllPlanes(cardId) {
    var p = {
      personnel: getPlaneReading(cardId, 'personnel'),
      professionnel: getPlaneReading(cardId, 'professionnel'),
      relationnel: getPlaneReading(cardId, 'relationnel')
    };
    if (!p.personnel) return null;
    var card = getPlanes(cardId);
    var name = card ? card.name : cardId;
    return { name: name, personnel: p.personnel, professionnel: p.professionnel, relationnel: p.relationnel };
  }

  function analyzeFamilies(cards) {
    var counts = { lumiere: 0, ombre: 0, mouvement: 0, introspection: 0, structure: 0 };
    var lumiereIds = ['17','19','21','14','10','07','11','W01','W06','W14','C01','C09','C10','S01','P09','P10'];
    var ombreIds = ['15','16','13','18','12','09','S03','S09','S10','P04','P05','C04','C05'];
    var mouvementIds = ['00','01','07','11','06','W08','W12','S08'];
    var introspectionIds = ['02','09','08','20','S04','S07','C08','P07'];
    var structureIds = ['04','05','03','P03','P08','W04'];

    cards.forEach(function (c) {
      var cid = normalizeId(c.id);
      if (lumiereIds.indexOf(cid) !== -1) counts.lumiere++;
      if (ombreIds.indexOf(cid) !== -1) counts.ombre++;
      if (mouvementIds.indexOf(cid) !== -1) counts.mouvement++;
      if (introspectionIds.indexOf(cid) !== -1) counts.introspection++;
      if (structureIds.indexOf(cid) !== -1) counts.structure++;
    });
    return counts;
  }

  function detectDynamic(cards) {
    var lumiereIds = ['17','19','21','14','10','07','11','W01','W06','W14','C01','C09','C10','S01','P09','P10'];
    var ombreIds = ['15','16','13','18','12','09','S03','S09','S10','P04','P05','C04','C05'];
    var tensionIds = ['06','08','12','15','16','W05','S02','S05'];

    var lumiereCount = 0, ombreCount = 0, tensionCount = 0;
    cards.forEach(function (c) {
      var cid = normalizeId(c.id);
      if (lumiereIds.indexOf(cid) !== -1) lumiereCount++;
      if (ombreIds.indexOf(cid) !== -1) ombreCount++;
      if (tensionIds.indexOf(cid) !== -1) tensionCount++;
    });

    if (lumiereCount >= 2 && ombreCount === 0) return 'lumiere';
    if (ombreCount >= 2 && lumiereCount === 0) return 'ombre';
    if (lumiereCount > 0 && ombreCount > 0) return 'tension';
    if (tensionCount >= 2) return 'tension';
    return 'mixte';
  }

  function buildNarrative(cards, plane, families, dynamic) {
    var n = cards.length;
    var first = cards[0], last = cards[n - 1];
    var firstId = normalizeId(first.id);
    var lastId = normalizeId(last.id);

    var firstIsLight = ['17','19','21','14','10','07','11','W01','W06','W14','C01','C09','C10','S01','P09','P10'].indexOf(firstId) !== -1;
    var lastIsLight = ['17','19','21','14','10','07','11','W01','W06','W14','C01','C09','C10','S01','P09','P10'].indexOf(lastId) !== -1;
    var firstIsShadow = ['15','16','13','18','12','09','S03','S09','S10','P04','P05','C04','C05'].indexOf(firstId) !== -1;
    var lastIsShadow = ['15','16','13','18','12','09','S03','S09','S10','P04','P05','C04','C05'].indexOf(lastId) !== -1;

    if (plane === 'personnel') {
      if (firstIsShadow && lastIsLight) return 'Ce tirage raconte un passage intérieur : tu traverses une zone d\'ombre qui débouche sur une lumière. Ce que tu as affronté dans l\'obscurité — doutes, deuils, renoncements — t\'a préparé à recevoir ce qui vient. La traversée n\'est pas un détour, elle est le chemin lui-même.';
      if (firstIsLight && lastIsShadow) return 'Ce tirage invite à la lucidité intérieure : après une période d\'ouverture, quelque chose demande à être regardé en face. Ce n\'est pas une chute — c\'est un appel à descendre dans ce qui avait été mis de côté pour que rien ne reste inachevé en toi.';
      if (dynamic === 'lumiere') return 'Plusieurs cartes de lumière se répondent dans ce tirage : elles amplifient un message d\'ouverture intérieure, de réconciliation avec toi-même et d\'alignement profond. Tu es dans une phase où ce que tu es vraiment peut enfin se montrer sans masque.';
      if (dynamic === 'ombre') return 'Plusieurs cartes d\'ombre traversent ce tirage : elles signalent ce qui doit être traversé consciemment. Une partie de toi demande à être reconnue — peut-être ta vulnérabilité, ta colère, ta tristesse. L\'ombre ignorée ne disparaît pas : elle agit à ton insu.';
      if (dynamic === 'tension') return 'Ce tirage met en scène une tension intérieure féconde entre lumière et ombre. Tu portes en toi des polarités qui cherchent à s\'harmoniser : force et douceur, action et lâcher-prise, raison et intuition. La maturité vient quand on accepte d\'habiter ces tensions.';
      return 'Ce tirage compose une mosaïque d\'énergies intérieures complémentaires. Aucune facette de toi n\'est isolée — chacune prend son sens dans le dialogue avec les autres. Tu es un être complexe, et ce tirage te demande de la nuance et de l\'écoute intérieure.';
    }

    if (plane === 'professionnel') {
      if (firstIsShadow && lastIsLight) return 'Ce tirage raconte une traversée professionnelle : tu sors (ou tu vas sortir) d\'une période difficile pour entrer dans une phase de reconnaissance et d\'accomplissement. Ce que tu as appris dans l\'adversité vaut plus que ce que tu aurais acquis dans la facilité.';
      if (firstIsLight && lastIsShadow) return 'Ce tirage invite à la vigilance professionnelle : après une période favorable, quelque chose demande à être consolidé ou transformé. Une structure montre ses limites, un projet révèle ses failles. Ce n\'est pas un échec annoncé — c\'est un appel à regarder ce qui doit être renforcé.';
      if (dynamic === 'lumiere') return 'Plusieurs cartes de lumière se répondent dans ce tirage : elles amplifient un message d\'accomplissement professionnel, de reconnaissance et d\'alignement entre ta vocation et ton action. C\'est le moment d\'oser proposer, lancer, signer.';
      if (dynamic === 'ombre') return 'Plusieurs cartes d\'ombre traversent ce tirage : elles signalent ce qui doit être regardé en face dans ta vie professionnelle. Un projet qui ne te ressemble plus, un environnement qui épuise, une direction qui n\'est plus la tienne.';
      if (dynamic === 'tension') return 'Ce tirage met en scène une tension féconde entre ambition et prudence, entre expansion et recentrage. Les cartes ne te demandent ni de foncer tête baissée ni de tout paralyser — elles t\'invitent à avancer avec discernement.';
      return 'Ce tirage compose une mosaïque d\'énergies professionnelles complémentaires. La diversité des cartes suggère qu\'il n\'y a pas une seule voie toute tracée : il y a la tienne, à construire avec patience, en assemblant les pièces comme un artisan assemble son œuvre.';
    }

    if (plane === 'relationnel') {
      if (firstIsShadow && lastIsLight) return 'Ce tirage raconte une traversée relationnelle : tu sors (ou tu vas sortir) d\'une période de tensions, de deuils ou de désillusions pour entrer dans une phase de liens plus justes et plus nourrissants. Les liens qui viennent seront différents — plus vrais, plus libres.';
      if (firstIsLight && lastIsShadow) return 'Ce tirage invite à la lucidité relationnelle : après une période d\'harmonie, quelque chose demande à être regardé en face dans tes liens. Une relation montre ses limites, un schéma se répète. Ce n\'est pas une rupture annoncée — c\'est un appel à clarifier.';
      if (dynamic === 'lumiere') return 'Plusieurs cartes de lumière se répondent dans ce tirage : elles amplifient un message d\'ouverture du cœur, de liens nourrissants et de connexions justes. C\'est le moment d\'accueillir ce qui se présente, d\'approfondir ce qui existe, de gratitude pour ce qui porte.';
      if (dynamic === 'ombre') return 'Plusieurs cartes d\'ombre traversent ce tirage : elles signalent ce qui doit être regardé en face dans tes relations. Une dépendance à clarifier, une limite à poser, un lien à transformer ou à quitter.';
      if (dynamic === 'tension') return 'Ce tirage met en scène une tension féconde entre besoin d\'union et besoin d\'indépendance, entre donner et recevoir. Les cartes ne te demandent ni de te fondre ni de te couper — elles t\'invitent à trouver ta juste place dans le lien.';
      return 'Ce tirage compose une mosaïque d\'énergies relationnelles complémentaires. Accepte que tes relations ne sont pas toutes au même stade : certaines demandent de l\'attention, d\'autres du recul, d\'autres encore de l\'engagement.';
    }

    return 'Ce tirage compose une mosaïque d\'énergies complémentaires.';
  }

  function buildConseil(cards, plane, dynamic, spreadType) {
    var conseilsBySpread = {
      'arbre-de-vie': {
        personnel: {
          lumiere: 'L\'Arbre de Vie confirme un alignement intérieur remarquable. Honorez la fluidité de l\'énergie qui descend de votre idéal (Kether) à votre réalité (Malkuth).',
          ombre: 'L\'Arbre de Vie révèle des blocages le long des sentiers. Prenez le temps de méditer sur chaque Sephiroth où l\'ombre se manifeste pour fluidifier votre être.',
          tension: 'Les forces actives et passives de l\'Arbre (Piliers de la Rigueur et de la Miséricorde) s\'opposent. Cherchez la voie du milieu, le pilier de la Conscience.',
          mixte: 'Votre Arbre de Vie présente un paysage psychique diversifié. Stabilisez d\'abord votre ancrage quotidien avant de viser les sommets spirituels.'
        },
        professionnel: {
          lumiere: 'La concrétisation de vos ambitions est hautement favorisée. C\'est le moment d\'acter la matérialisation de vos idées.',
          ombre: 'Des obstacles ou des doutes entravent la réalisation de vos projets. Identifiez à quelle étape (inspiration, structure ou action) l\'énergie s\'arrête.',
          tension: 'Arbitrez entre la rigueur budgétaire et la créativité expansive. Un équilibre ferme mais souple est la clé du succès.',
          mixte: 'Votre situation professionnelle demande d\'harmoniser vos forces d\'organisation avec vos aspirations de carrière réelles.'
        },
        relationnel: {
          lumiere: 'Vos relations baignent dans une belle réciprocité et un respect sacré. Nourrissez ces connexions saines.',
          ombre: 'Des non-dits ou des projections altèrent la clarté du lien. Posez des limites saines et exprimez votre vérité avec douceur.',
          tension: 'Le besoin de fusion s\'oppose au besoin d\'affirmation de soi. Ne vous oubliez pas dans la relation, cultivez votre souveraineté.',
          mixte: 'Certains de vos liens exigent un réajustement. Donnez la priorité à l\'honnêteté et à la bienveillance.'
        }
      },
      'etoile-de-david': {
        personnel: {
          lumiere: 'L\'Étoile de David montre un bel équilibre des archétypes planétaires en vous. Faites confiance à votre sagesse innée.',
          ombre: 'Certaines influences planétaires sont assombries. Accordez une attention particulière aux aspects de votre vie régis par ces astres.',
          tension: 'Les oppositions planétaires créent des tensions intérieures. Utilisez la force de la conscience neutre pour unifier ces contraires.',
          mixte: 'Les dynamiques planétaires fluctuent. Prenez du recul et observez les cycles de votre humeur sans vous y attacher.'
        },
        professionnel: {
          lumiere: 'Les vents astrologiques soutiennent vos activités et vos finances. Foncez avec enthousiasme et rigueur.',
          ombre: 'Saturne ou d\'autres aspects limitants ralentissent vos affaires. Utilisez cette période pour restructurer vos bases de travail.',
          tension: 'Conflit d\'intérêts ou tensions entre partenaires. Cherchez un arbitrage juste et neutre.',
          mixte: 'Le contexte professionnel évolue. Adaptez-vous aux cycles du marché avec souplesse.'
        },
        relationnel: {
          lumiere: 'Magnétisme et harmonie sont au rendez-vous. Profitez de ces moments de partage complice.',
          ombre: 'Des forces de possession ou des illusions troublent le lien. Clarifiez vos attentes mutuelles.',
          tension: 'Des tensions d\'ego perturbent la paix relationnelle. Lâchez prise sur le besoin d\'avoir raison.',
          mixte: 'Les sentiments oscillent. Restez fidèle à vos engagements fondamentaux tout en respectant le rythme de l\'autre.'
        }
      },
      'angle-mort': {
        personnel: {
          lumiere: 'La prise de conscience de votre potentiel caché vous propulse vers l\'avant. Accueillez vos forces naissantes.',
          ombre: 'Des peurs inconscientes ou des parts d\'ombre refoulées émergent. Regardez-les avec compassion pour les dissoudre.',
          tension: 'Conflit entre ce que vous montrez et ce que vous ressentez. Faites le choix de l\'authenticité.',
          mixte: 'Votre psyché est en phase de transition. Soyez à l\'écoute des rêves et des synchronicités.'
        },
        professionnel: {
          lumiere: 'Des compétences insoupçonnées sont prêtes à être exploitées. Osez prendre de nouvelles responsabilités.',
          ombre: 'Des erreurs répétées proviennent d\'un angle mort. Demandez un retour honnête à des collègues de confiance.',
          tension: 'Dissonance entre vos objectifs de carrière et vos actions. Réalignez vos efforts journaliers.',
          mixte: 'Prenez le temps d\'analyser votre positionnement professionnel actuel avant de postuler ou de changer.'
        },
        relationnel: {
          lumiere: 'Une communication transparente dissipe les malentendus. Le lien s\'enrichit de cette clarté retrouvée.',
          ombre: 'Des non-dits ou des projections inconscientes faussent les échanges. Osez exprimer ce que vous gardez secret.',
          tension: 'Tension entre vos désirs relationnels et la réalité du partage. Ouvrez le dialogue de manière constructive.',
          mixte: 'Observez la façon dont vous réagissez aux attitudes de votre entourage pour mieux vous comprendre.'
        }
      },
      'spirituel': {
        personnel: {
          lumiere: 'L\'Alignement Alchimique confirme une circulation fluide des énergies élémentaires en vous. Maintenez cette cohérence.',
          ombre: 'Un déséquilibre élémentaire est présent. Nourrissez l\'élément affaibli (action, émotions, intellect ou corps physique).',
          tension: 'Tension entre le Feu (action) et l\'Eau (ressenti), ou entre l\'Air (pensée) et la Terre (matière). Cherchez l\'équilibre dynamique.',
          mixte: 'Votre métabolisme énergétique réclame de la douceur. Équilibrez votre rythme de vie.'
        },
        professionnel: {
          lumiere: 'Vos idées et vos actions sont parfaitement matérialisées. Vos gains reflètent votre investissement.',
          ombre: 'Votre travail manque d\'inspiration ou d\'ancrage. Redonnez du sens à vos tâches quotidiennes.',
          tension: 'Tension entre vos idées novatrices et les contraintes de votre poste. Soyez pragmatique.',
          mixte: 'Adaptez votre charge de travail afin de préserver votre santé physique et mentale.'
        },
        relationnel: {
          lumiere: 'Vos échanges sont fluides, équilibrés et chaleureux. Le partage est mutuellement ressourçant.',
          ombre: 'La relation manque de profondeur émotionnelle ou de communication intellectuelle. Rétablissez le contact.',
          tension: 'Tension entre l\'affectif et le rationnel au sein du couple. Apprenez à écouter le point de vue de l\'autre.',
          mixte: 'Prenez soin de préserver l\'équilibre entre vos activités individuelles et le temps partagé.'
        }
      }
    };

    var defaultConseils = {
      personnel: {
        lumiere: 'Accorde-toi du temps pour intégrer ce qui s\'ouvre. La lumière intérieure se cultive dans la durée, pas dans l\'urgence.',
        ombre: 'Ne fuis pas ce qui se présente, même si c\'est inconfortable. L\'ombre traversée devient une alliée.',
        tension: 'Tiens les deux pôles sans choisir trop vite. La vérité n\'est jamais d\'un seul côté.',
        mixte: 'Cultive la patience du tisserand : chaque fil a sa place.'
      },
      professionnel: {
        lumiere: 'C\'est le moment d\'oser proposer, lancer, signer. Les énergies sont favorables.',
        ombre: 'Prends du recul avant toute décision importante. Vérifie les contrats, clarifie les intentions.',
        tension: 'Cherche le point d\'équilibre entre ambition et prudence.',
        mixte: 'Avance par étapes, en testant chaque terrain avant de t\'engager.'
      },
      relationnel: {
        lumiere: 'Ouvre ton cœur sans te diluer. Les liens qui se présentent sont porteurs de lumière.',
        ombre: 'Prends soin de tes limites. Distingue ce qui te nourrit de ce qui t\'épuise.',
        tension: 'Ne cherche pas à résoudre les tensions par la fuite ou par la fusion.',
        mixte: 'Accepte que tes relations ne sont pas toutes au même stade.'
      }
    };

    var activeConseils = conseilsBySpread[spreadType] || defaultConseils;
    var planeConseils = activeConseils[plane] || {};
    return planeConseils[dynamic] || planeConseils.mixte || 'Restez attentif aux messages du tirage.';
  }

  function buildQuestion(plane, dynamic, families, spreadType) {
    var questionsBySpread = {
      'arbre-de-vie': {
        personnel: {
          lumiere: 'Qu\'allez-vous faire de cette vitalité intérieure pour manifester vos plus hauts idéaux ?',
          ombre: 'Quelle part de votre structure psychologique (le pouvoir, la rigueur, le ressenti) refusez-vous d\'intégrer ?',
          tension: 'Comment pouvez-vous réconcilier vos forces actives et passives au centre de votre conscience ?',
          mixte: 'Si vous deviez définir le sentier sur lequel vous marchez actuellement, vers quelle Sephirah mènerait-il ?'
        },
        professionnel: {
          lumiere: 'Votre plan professionnel est solide. Quels nouveaux territoires êtes-vous prêt à conquérir ?',
          ombre: 'À quel niveau (inspiration, organisation, action) votre élan professionnel subit-il des fuites d\'énergie ?',
          tension: 'Comment concilier le besoin d\'autorité structurelle avec la flexibilité humaine nécessaire ?',
          mixte: 'Quel est l\'accomplissement concret auquel vous aspirez le plus dans votre carrière actuelle ?'
        },
        relationnel: {
          lumiere: 'Vos relations sont harmonieuses. De quelle façon pouvez-vous partager cette bénédiction autour de vous ?',
          ombre: 'Dans quelle mesure vos peurs ou vos doutes relationnels vous empêchent-ils de faire confiance ?',
          tension: 'Comment maintenir le juste équilibre entre donner (miséricorde) et poser des limites (rigueur) ?',
          mixte: 'Quel est le besoin relationnel prioritaire que vous souhaitez exprimer ou combler ?'
        }
      },
      'etoile-de-david': {
        personnel: {
          lumiere: 'Vos forces planétaires s\'expriment de façon harmonieuse. Quelle qualité astrologique est votre plus grand atout en ce moment ?',
          ombre: 'Quel aspect de votre vie (la discipline, la passion, la communication) vous semble le plus négligé ou obscurci ?',
          tension: 'Comment équilibrer les aspects dynamiques et réceptifs de votre nature astrale ?',
          mixte: 'Quelle énergie planétaire (solaire, lunaire, martienne, etc.) réclame votre conscience aujourd\'hui ?'
        },
        professionnel: {
          lumiere: 'La chance et l\'action sont alignées. Quelle opportunité majeure devez-vous saisir en priorité ?',
          ombre: 'Quelles limitations saturniennes ou conflits d\'autorité ralentissent votre progression professionnelle ?',
          tension: 'Comment équilibrer l\'effort intense (Mars) et le repos nécessaire (Lune) pour éviter l\'épuisement ?',
          mixte: 'Quelle est la prochaine étape de structuration requise pour consolider votre position professionnelle ?'
        },
        relationnel: {
          lumiere: 'L\'amour et le partage dominent. Comment célébrer au mieux ce rayonnement affectif avec vos proches ?',
          ombre: 'Quelles blessures passées ou peurs de rejet projetez-vous sur votre partenaire actuel ?',
          tension: 'Comment gérer la tension entre votre désir d\'indépendance et votre besoin de sécurité affective ?',
          mixte: 'Qu\'attendez-vous réellement de vos relations en termes de soutien et d\'échange spirituel ?'
        }
      },
      'angle-mort': {
        personnel: {
          lumiere: 'Quelle nouvelle facette de votre potentiel êtes-vous prêt à révéler au monde et à vous-même ?',
          ombre: 'Quelle peur ou habitude inconsciente entretenez-vous dans l\'obscurité de votre esprit ?',
          tension: 'Comment concilier l\'image publique que vous projetez avec vos sentiments intimes réels ?',
          mixte: 'Qu\'avez-vous appris sur vous-même à travers les récents retours de votre entourage ?'
        },
        professionnel: {
          lumiere: 'Quels talents ou atouts professionnels possédez-vous sans oser les exploiter pleinement ?',
          ombre: 'Quel comportement répétitif ou réaction automatique nuit à votre réussite professionnelle sans que vous le sachiez ?',
          tension: 'Comment réduire l\'écart entre vos compétences réelles et la perception qu\'en ont vos supérieurs ?',
          mixte: 'Quels feedbacks professionnels devriez-vous écouter plus attentivement pour progresser ?'
        },
        relationnel: {
          lumiere: 'Quel aspect positif de votre personnalité vos proches apprécient-ils et que vous avez tendance à minimiser ?',
          ombre: 'Quelle projection inconsciente ou exigence muette imposez-vous à votre partenaire ou à vos amis ?',
          tension: 'Comment harmoniser vos besoins affectifs exprimés avec vos blocages relationnels inconscients ?',
          mixte: 'Quels schémas relationnels répétitifs observez-vous dans vos liens d\'amitié ou d\'amour ?'
        }
      },
      'spirituel': {
        personnel: {
          lumiere: 'L\'Alignement Alchimique est en place. Comment utiliser cette force pour approfondir votre paix intérieure ?',
          ombre: 'Quel élément (le Feu de la volonté, l\'Eau du sentiment, l\'Air de la logique, ou la Terre du corps) réclame votre attention immédiate ?',
          tension: 'Où se situe la principale source de tiraillement entre votre volonté active (Feu) et votre réceptivité émotionnelle (Eau) ?',
          mixte: 'De quelle façon pouvez-vous incarner plus concrètement vos valeurs spirituelles dans votre quotidien ?'
        },
        professionnel: {
          lumiere: 'Votre activité est alignée avec votre âme. De quelle manière pouvez-vous inspirer vos collègues ?',
          ombre: 'Quel aspect de votre travail (créativité, relations, logique ou rémunération) présente le plus grand décalage avec vos valeurs ?',
          tension: 'Comment concilier vos idéaux professionnels élevés avec les contraintes concrètes de rentabilité ?',
          mixte: 'Quel projet alchimique ou créatif souhaiteriez-vous initier pour renouveler votre enthousiasme ?'
        },
        relationnel: {
          lumiere: 'Vos relations favorisent votre croissance spirituelle. Comment témoigner votre gratitude à vos proches ?',
          ombre: 'Quelle dynamique relationnelle toxique ou stérile draine votre énergie spirituelle ?',
          tension: 'Comment équilibrer la clarté mentale et verbale (Air) avec la tendresse physique (Terre) dans vos liens ?',
          mixte: 'De quelle façon vos relations actuelles reflètent-elles votre propre processus d\'évolution intérieure ?'
        }
      }
    };

    var questions = {
      personnel: {
        lumiere: 'Qu\'est-ce que je fais du temps et de l\'énergie que cette lumière me donne ?',
        ombre: 'Quelle partie de moi ai-je cessé d\'écouter ?',
        tension: 'Qu\'est-ce que je cherche à réconcilier en moi depuis longtemps ?',
        mixte: 'Si je devais nommer l\'élan central de ce moment de ma vie, quel serait-il ?'
      },
      professionnel: {
        lumiere: 'Quel projet ou quelle direction ai-je le courage d\'incarner maintenant ?',
        ombre: 'Qu\'est-ce que je construis qui ne me ressemble plus ?',
        tension: 'Quel est le prix que je paie pour ma situation actuelle ?',
        mixte: 'Si je n\'avais aucune contrainte matérielle, à quoi consacrerais-je vraiment mon énergie ?'
      },
      relationnel: {
        lumiere: 'Quel lien mérite aujourd\'hui plus de présence et de gratitude ?',
        ombre: 'Quelle relation me demande de poser une limite ?',
        tension: 'Qu\'est-ce que je projette sur l\'autre qui m\'appartient ?',
        mixte: 'Quel type de lien ai-je vraiment envie de nourrir ?'
      }
    };

    var planeQuestions = questions[plane] || {};
    var dynamicQuestion = planeQuestions[dynamic] || planeQuestions.mixte;
    return (questionsBySpread[spreadType] && questionsBySpread[spreadType][plane] && questionsBySpread[spreadType][plane][dynamic]) || dynamicQuestion || 'Quelle est la leçon de ce tirage ?';
  }

  function composeSynthesis(narrative, dynamic, families, plane, planeLabel, spreadType) {
    var parts = [narrative];
    var dominant = null, max = 0;
    Object.keys(families).forEach(function (k) {
      if (families[k] > max) { max = families[k]; dominant = k; }
    });

    if (max >= 2) {
      var observationsBySpread = {
        'arbre-de-vie': {
          personnel: {
            lumiere: 'L\'Arbre de Vie confirme un alignement intérieur profond : les Sephiroth convergent vers la lumière de la conscience.',
            ombre: 'L\'Arbre de Vie met en lumière des blocages inconscients : certains sentiers demandent un effort de lucidité pour être fluidifiés.',
            mouvement: 'L\'Arbre de Vie indique une forte transition d\'énergies : l\'influx descend pour transformer vos structures psychiques.',
            introspection: 'L\'Arbre de Vie invite au recueillement et à l\'introspection : intégrez la sagesse du silence intérieur.',
            structure: 'L\'Arbre de Vie demande d\'ancrer vos fondations : renforcez Malkuth, votre présence corporelle et concrète.'
          },
          professionnel: {
            lumiere: 'L\'Arbre de Vie valide la réussite et la justesse de vos ambitions professionnelles.',
            ombre: 'L\'Arbre de Vie signale des obstacles ou des pertes d\'énergie dans la manifestation concrète de votre travail.',
            mouvement: 'Un mouvement de réorientation professionnelle s\'amorce : l\'arbre de vos activités change de feuillage.',
            introspection: 'Réévaluez vos priorités professionnelles à la lumière de vos valeurs profondes.',
            structure: 'Organisez vos ressources avec rigueur : posez des cadres concrets pour vos projets.'
          },
          relationnel: {
            lumiere: 'L\'Arbre de Vie montre une harmonie et une élévation spirituelle au sein de vos relations.',
            ombre: 'Des déséquilibres de pouvoir ou des projections altèrent la fluidité de vos échanges relationnels.',
            mouvement: 'Mouvement relationnel intense : de nouveaux liens se forment ou vos engagements évoluent.',
            introspection: 'Prenez du recul pour comprendre ce que vos relations révèlent de votre propre intériorité.',
            structure: 'Posez des cadres et des limites relationnelles claires pour protéger votre espace intérieur.'
          }
        },
        'etoile-de-david': {
          personnel: {
            lumiere: 'L\'Étoile de David montre un bel accord des sept forces planétaires en vous.',
            ombre: 'Des tensions ou des déséquilibres planétaires obscurcissent temporairement votre paysage psychique.',
            mouvement: 'Les dynamiques planétaires oscillent de façon créative : accompagnez le flux de cette métamorphose.',
            introspection: 'L\'Étoile de David suggère un besoin de recentrage et de méditation sur vos polarités.',
            structure: 'Structurez votre discipline personnelle pour stabiliser vos variations émotionnelles.'
          },
          professionnel: {
            lumiere: 'Les influences célestes favorisent l\'expansion et le succès de vos projets.',
            ombre: 'Des contraintes ou des retards ralentissent vos transactions. Restez patient et rigoureux.',
            mouvement: 'Des opportunités d\'affaires soudaines modifient vos plans de manière positive.',
            introspection: 'Prenez le temps d\'étudier le marché et de clarifier vos objectifs profonds.',
            structure: 'Renforcez la gestion comptable et logistique de vos activités.'
          },
          relationnel: {
            lumiere: 'Vos liens d\'affection sont protégés et magnétisés par de belles énergies astrales.',
            ombre: 'Des doutes ou des illusions sentimentales perturbent l\'harmonie de vos partages.',
            mouvement: 'Une rencontre importante ou une clarification majeure redéfinit votre espace amoureux.',
            introspection: 'Interrogez vos motivations profondes au sein de vos relations pour dissiper les malentendus.',
            structure: 'Clarifiez les règles de vie commune ou d\'engagement réciproque.'
          }
        },
        'angle-mort': {
          personnel: {
            lumiere: 'La prise de conscience de vos ressources cachées est imminente. Accueillez cette révélation.',
            ombre: 'Ce tirage signale des peurs refoulées ou des résistances psychologiques qu\'il est temps d\'éclairer.',
            mouvement: 'Vos barrières intérieures se fissurent pour laisser émerger votre être authentique.',
            introspection: 'Prenez le temps d\'analyser vos rêves et vos réactions instinctives pour débusquer vos angles morts.',
            structure: 'Posez des repères stables en vous pour accueillir les révélations de l\'inconscient sans vous perdre.'
          },
          professionnel: {
            lumiere: 'Vos compétences cachées sont prêtes à être reconnues et valorisées professionnellement.',
            ombre: 'Des freins ou des erreurs répétées proviennent d\'habitudes de travail inconscientes.',
            mouvement: 'Un changement de poste ou de responsabilités va révéler vos véritables aptitudes.',
            introspection: 'Faites le point sur vos forces et vos faiblesses professionnelles avec neutralité.',
            structure: 'Mettez en place des processus d\'évaluation réguliers pour corriger les angles morts.'
          },
          relationnel: {
            lumiere: 'L\'honnêteté et la transparence favorisent la confiance au sein de vos liens.',
            ombre: 'Des projections ou des malentendus inconscients enveniment les relations à votre insu.',
            mouvement: 'Une mise au point salutaire bouscule les habitudes relationnelles figées.',
            introspection: 'Analysez l\'origine de vos jugements ou de vos attentes envers vos proches.',
            structure: 'Établissez une charte de communication plus saine avec votre entourage.'
          }
        },
        'spirituel': {
          personnel: {
            lumiere: 'L\'Alignement Alchimique confirme une circulation fluide des énergies élémentaires en vous.',
            ombre: 'Un déséquilibre alchimique se manifeste, indiquant qu\'un élément requiert votre attention.',
            mouvement: 'Votre feu intérieur s\'active ou vos émotions se fluidifient de manière dynamique.',
            introspection: 'Prenez le temps d\'écouter le message spirituel de votre corps et de votre esprit.',
            structure: 'Intégrez des rituels quotidiens d\'ancrage physique et mental.'
          },
          professionnel: {
            lumiere: 'Votre travail reflète parfaitement la synergie de vos talents et de vos efforts.',
            ombre: 'Votre activité actuelle présente un décalage par rapport à vos aspirations profondes.',
            mouvement: 'Un élan de changement ou de reconversion anime votre plan professionnel.',
            introspection: 'Méditez sur le sens de vos activités et de vos contributions matérielles.',
            structure: 'Réorganisez votre cadre de travail pour le rendre plus conforme à votre écologie personnelle.'
          },
          relationnel: {
            lumiere: 'Vos relations sont un miroir d\'évolution spirituelle réciproque.',
            ombre: 'Un manque de communication ou d\'accord émotionnel pèse sur vos partages.',
            mouvement: 'Vos liens évoluent vers plus d\'authenticité et de liberté d\'expression.',
            introspection: 'Écoutez ce que l\'autre réveille en vous sur le plan spirituel.',
            structure: 'Posez des balises relationnelles claires qui préservent le respect mutuel.'
          }
        }
      };

      var observations = observationsBySpread[spreadType] || {};
      var planeObs = observations[plane] || {};
      var dominantObs = planeObs[dominant];
      if (dominantObs) {
        parts.push(dominantObs);
      }
    }

    var clotures = {
      personnel: 'Cette lecture est un miroir, pas un verdict. Elle éclaire une facette de ta vie intérieure — ce que tu en fais reste ton choix le plus précieux.',
      professionnel: 'Cette lecture est un miroir, pas un verdict. Elle éclaire une facette de ta vie active — ce que tu en fais reste ton choix le plus précieux.',
      relationnel: 'Cette lecture est un miroir, pas un verdict. Elle éclaire une facette de ta vie relationnelle — ce que tu en fais reste ton choix le plus précieux.'
    };
    parts.push(clotures[plane] || clotures.personnel);

    return parts.join(' ');
  }

  function projectSpread(cards, plane, spreadType) {
    if (!cards || !cards.length) return null;

    var planeLabel = { personnel: 'personnel', professionnel: 'professionnel', relationnel: 'relationnel' }[plane] || plane;

    var introsBySpread = {
      'arbre-de-vie': {
        personnel: 'Cette lecture projette l\'Arbre de Vie sur votre architecture intérieure. Les 10 Sephiroth décodent l\'alignement de vos plans psychiques, depuis la couronne de votre idéal (Kether) jusqu\'à l\'ancrage de votre incarnation (Malkuth).',
        professionnel: 'Cette lecture projette l\'Arbre de Vie sur votre dynamique professionnelle. Elle examine la descente de vos projets depuis la conception originelle jusqu\'à leur concrétisation matérielle et financière.',
        relationnel: 'Cette lecture projette l\'Arbre de Vie sur le terrain du lien. Les 10 Sephiroth révèlent l\'équilibre entre votre force d\'affirmation, votre réceptivité et l\'harmonie du cœur dans vos relations.'
      },
      'etoile-de-david': {
        personnel: 'Cette lecture projette l\'Étoile de David (les sept planètes sacrées) sur votre équilibre psychologique. Chaque pointe dévoile l\'influence d\'un pôle astrologique sur votre conscience.',
        professionnel: 'Cette lecture projette l\'Étoile de David sur vos affaires. Les 7 forces planétaires (de la rigueur de Saturne à la chance de Jupiter) qualifient la viabilité et l\'expansion de vos projets.',
        relationnel: 'Cette lecture projette l\'Étoile de David sur vos liens d\'affection. Elle explore l\'attraction et le magnétisme entre vous et l\'autre à travers le spectre des archétypes planétaires.'
      },
      'angle-mort': {
        personnel: 'Cette lecture projette le tirage de l\'Angle Mort (Fenêtre de Johari) sur votre conscience. Les 4 quadrants révèlent ce qui est connu, caché ou insoupçonné dans votre dynamique interne.',
        professionnel: 'Cette lecture projette le tirage de l\'Angle Mort sur votre posture professionnelle. Elle met en lumière vos compétences inconscientes ainsi que vos angles morts opérationnels.',
        relationnel: 'Cette lecture projette le tirage de l\'Angle Mort sur vos interactions. Elle décode les projections inconscientes et la transparence émotionnelle entre vous et votre entourage.'
      },
      'spirituel': {
        personnel: 'Cette lecture projette l\'Alignement Alchimique des Éléments sur votre miroir intérieur. Les 4 cartes équilibrent le Feu de votre volonté, l\'Eau de vos émotions, l\'Air de vos pensées, et la Terre de votre corps.',
        professionnel: 'Cette lecture projette l\'Alignement Alchimique des Éléments sur votre carrière. Elle analyse comment vos initiatives (Feu), vos ressentis (Eau), votre logique (Air) et vos gains (Terre) se structurent.',
        relationnel: 'Cette lecture projette l\'Alignement Alchimique des Éléments sur vos liens. Elle évalue l\'équilibre élémentaire au sein de vos relations pour une communication plus saine.'
      }
    };

    var intros = introsBySpread[spreadType] || {
      personnel: 'Cette lecture projette ton tirage sur le miroir intérieur. Elle ne parle pas de ce que tu fais, mais de ce que tu es en train de devenir.',
      professionnel: 'Cette lecture projette ton tirage sur le terrain du monde concret : vocation, projets, place sociale, ressources.',
      relationnel: 'Cette lecture projette ton tirage sur le terrain du lien : amour, famille, partenariats, communauté.'
    };

    var entries = cards.map(function (card) {
      var r = getPlaneReading(card.id, plane);
      return {
        cardId: card.id,
        cardName: card.name,
        kw: r ? r.kw : '',
        text: r ? r.text : 'Lecture indisponible pour cette carte sur ce plan.'
      };
    });

    var families = analyzeFamilies(cards);
    var dynamic = detectDynamic(cards);
    var narrative = buildNarrative(cards, plane, families, dynamic);
    var conseil = buildConseil(cards, plane, dynamic, spreadType);
    var question = buildQuestion(plane, dynamic, families, spreadType);
    var synth = composeSynthesis(narrative, dynamic, families, plane, planeLabel, spreadType);

    return {
      plane: plane,
      planeLabel: planeLabel,
      intro: intros[plane] || '',
      entries: entries,
      synth: synth,
      conseil: conseil,
      question: question
    };
  }

  return {
    getPlanes: getPlanes,
    getPlaneReading: getPlaneReading,
    getAllPlanes: getAllPlanes,
    projectSpread: projectSpread,
    MAJORS: MAJORS,
    MINORS: MINORS
  };
})();

