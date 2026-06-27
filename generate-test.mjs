import { writeFileSync } from 'fs';
import { calculerProfil } from './netlify/functions/lib/calculs.js';
import { assemblerContenu } from './netlify/functions/lib/textes.js';
import { genererRapportPDF } from './netlify/functions/lib/generateur-pdf.js';

const profil  = calculerProfil('Blaise', 'Ganhao', '17/02/1977');
console.log('Profil calculé :', JSON.stringify({
  cheminDeVie: profil.cheminDeVie,
  expression:  profil.expression,
  ame:         profil.ame,
  personnalite:profil.personnalite,
  anneePersonnelle: profil.anneePersonnelle,
  signe:       profil.signe,
  element:     profil.element,
  arcaneVie:   profil.arcaneVie.nom,
  arcaneAnnee: profil.arcaneAnnee.nom,
  planete:     profil.planete?.nom,
  loShu_fleches: profil.loShu?.flechesPresentes?.map(f => f.nom),
  lenormand_central: profil.lenormand?.positions?.[4]?.label,
}, null, 2));

const contenu = assemblerContenu(profil);
console.log('Contenu assemblé : OK');

const pdfBuf  = await genererRapportPDF(profil, contenu);
writeFileSync('/tmp/rapport-blaise-ganhao.pdf', pdfBuf);
console.log('PDF généré : /tmp/rapport-blaise-ganhao.pdf (' + pdfBuf.length + ' octets)');
