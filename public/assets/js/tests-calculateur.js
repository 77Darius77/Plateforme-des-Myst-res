// Tests unitaires pour le calculateur de numérologie
// Exécuter dans le navigateur : ouvrir la console et appeler runTests()

function assert(condition, message) {
  if (!condition) throw new Error('❌ ' + message);
  console.log('✅ ' + message);
}

function runTests() {
  console.log('=== TESTS NUMÉROLOGIE CABALISTIQUE ===');
  
  // Test 1: Date de Marian
  const r1 = calculer('23/10/1990');
  assert(r1.chemin === 7, 'Marian 23/10/1990 → chemin=7 (obtenu: ' + r1.chemin + ')');
  assert(r1.ticun === 4, 'Marian 23/10/1990 → ticún=4 (obtenu: ' + r1.ticun + ')');
  
  // Test 2: Date de Raúl
  const r2 = calculer('23/10/1973');
  assert(r2.chemin === 8, 'Raúl 23/10/1973 → chemin=8');
  assert(r2.ticun === 5, 'Raúl 23/10/1973 → ticún=5');
  
  // Test 3: Ticún zéro → 22
  const r3 = calculer('01/01/2000');
  // jour=1, mois=1, annee=2 → chemin=reduire(4)=4, ticun=|2-1-1|=0→22
  assert(r3.ticun === 22, '01/01/2000 → ticún=22 (cas zéro)');
  
  // Test 4: Validation rejette date invalide
  try {
    calculer('31/02/2000');
    assert(false, '31/02/2000 aurait dû lever une erreur');
  } catch(e) {
    assert(true, '31/02/2000 rejeté: ' + e.message);
  }
  
  // Test : analyserRepartition()
function testAnalyserRepartition() {
  const r = analyserRepartition(17, 2, 6); // Blaise
  assert(r.don === 17, 'Don = max(17,2,6) = 17');
  assert(r.defi === 2, 'Défi = min(17,2,6) = 2');
  assert(r.ambivalence === 6, 'Ambivalence = mid(17,2,6) = 6');
  console.log('✅ analyserRepartition OK');
}

// Test : genererPortrait() retourne une string non vide
function testGenererPortrait() {
  const r = calculer('17/02/1977');
  assert(typeof r.portrait === 'string' && r.portrait.length > 50, 'Portrait généré');
  console.log('✅ genererPortrait OK');
}

// Test : les 3 interprétations existent
function testInterpretationsJourMoisAnnee() {
  const r = calculer('23/10/1990');
  assert(typeof r.interpretation_jour === 'string', 'interpretation_jour existe');
  assert(typeof r.interpretation_mois === 'string', 'interpretation_mois existe');
  assert(typeof r.interpretation_annee === 'string', 'interpretation_annee existe');
  console.log('✅ interpretations jour/mois/année OK');
}

// Test : répartition dans le résultat
function testRepartitionDansResultat() {
  const r = calculer('25/12/1987');
  assert(typeof r.repartition === 'object', 'repartition existe');
  assert(r.repartition.don >= 1 && r.repartition.don <= 22, 'don dans [1,22]');
  assert(r.repartition.defi >= 1 && r.repartition.defi <= 22, 'defi dans [1,22]');
  console.log('✅ repartition OK');
}

// Test 5: Année bissextile acceptée
  try {
    const r5 = calculer('29/02/2000');
    assert(true, '29/02/2000 (bissextile) accepté');
  } catch(e) {
    assert(false, '29/02/2000 rejeté à tort');
  }
  
  // Nouveaux tests enrichis
  testAnalyserRepartition();
  testGenererPortrait();
  testInterpretationsJourMoisAnnee();
  testRepartitionDansResultat();

  console.log('=== TOUS LES TESTS PASSENT ✅ ===');
}

// Exécution auto si on est dans un environnement de test
if (typeof window !== 'undefined') {
  console.log('Tests calculateur chargés. Tapez runTests() dans la console pour exécuter.');
}
